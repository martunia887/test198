import * as React from 'react';
import uuid from 'uuid';
import { Schema, Node, Fragment } from 'prosemirror-model';
import { EditorState, Plugin, PluginKey, StateField } from 'prosemirror-state';
import {
  AnalyticsEventPayload,
  CreateUIAnalyticsEventSignature,
} from '@atlaskit/analytics-next';
import {
  MentionProvider,
  MentionItem,
  isSpecialMention,
  MentionDescription,
  ELEMENTS_CHANNEL,
  TeamMember,
} from '@atlaskit/mention';
import { mention } from '@atlaskit/adf-schema';
import {
  ProviderFactory,
  ContextIdentifierProvider,
} from '@atlaskit/editor-common';

import { analyticsService } from '../../analytics';
import { EditorPlugin, Command, EditorAppearance } from '../../types';
import { Dispatch } from '../../event-dispatcher';
import { PortalProviderAPI } from '../../ui/PortalProvider';
import WithPluginState from '../../ui/WithPluginState';
import {
  pluginKey as typeAheadPluginKey,
  PluginState as TypeAheadPluginState,
  createInitialPluginState,
} from '../type-ahead/pm-plugins/main';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import ToolbarMention from './ui/ToolbarMention';
import mentionNodeView from './nodeviews/mention';
import {
  buildTypeAheadInsertedPayload,
  buildTypeAheadCancelPayload,
  buildTypeAheadRenderedPayload,
} from './analytics';
import {
  addAnalytics,
  analyticsPluginKey,
  analyticsEventKey,
  AnalyticsDispatch,
  ACTION,
  ACTION_SUBJECT,
  INPUT_METHOD,
  EVENT_TYPE,
  ACTION_SUBJECT_ID,
} from '../analytics';
import { TypeAheadItem } from '../type-ahead/types';
import { isTeamStats, isTeamType } from './utils';
import { IconMention } from '../quick-insert/assets';

export interface TeamInfoAttrAnalytics {
  teamId: String;
  includesYou: boolean;
  memberCount: number;
}

const mentionsPlugin = (
  createAnalyticsEvent?: CreateUIAnalyticsEventSignature,
): EditorPlugin => {
  let sessionId = uuid();
  const fireEvent = <T extends AnalyticsEventPayload>(payload: T): void => {
    if (createAnalyticsEvent) {
      if (payload.attributes && !payload.attributes.sessionId) {
        payload.attributes.sessionId = sessionId;
      }
      createAnalyticsEvent(payload).fire(ELEMENTS_CHANNEL);
    }
  };

  return {
    nodes() {
      return [{ name: 'mention', node: mention }];
    },

    pmPlugins() {
      return [
        {
          name: 'mention',
          plugin: ({ providerFactory, dispatch, portalProviderAPI, props }) =>
            mentionPluginFactory(
              dispatch,
              providerFactory,
              portalProviderAPI,
              fireEvent,
              props.appearance,
            ),
        },
      ];
    },

    secondaryToolbarComponent({ editorView, disabled }) {
      return (
        <WithPluginState
          editorView={editorView}
          plugins={{
            typeAheadState: typeAheadPluginKey,
            mentionState: mentionPluginKey,
          }}
          render={({
            typeAheadState = createInitialPluginState(),
            mentionState = {},
          }: {
            typeAheadState: TypeAheadPluginState;
            mentionState: MentionPluginState;
          }) =>
            !mentionState.mentionProvider ? null : (
              <ToolbarMention
                editorView={editorView}
                isDisabled={disabled || !typeAheadState.isAllowed}
              />
            )
          }
        />
      );
    },

    pluginsOptions: {
      quickInsert: ({ formatMessage }) => [
        {
          title: formatMessage(messages.mention),
          description: formatMessage(messages.mentionDescription),
          priority: 400,
          keyshortcut: '@',
          icon: () => <IconMention label={formatMessage(messages.mention)} />,
          action(insert, state) {
            const mark = state.schema.mark('typeAheadQuery', {
              trigger: '@',
            });
            const mentionText = state.schema.text('@', [mark]);
            const tr = insert(mentionText);
            return addAnalytics(tr, {
              action: ACTION.INVOKED,
              actionSubject: ACTION_SUBJECT.TYPEAHEAD,
              actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_MENTION,
              attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
              eventType: EVENT_TYPE.UI,
            });
          },
        },
      ],
      typeAhead: {
        trigger: '@',
        // Custom regex must have a capture group around trigger
        // so it's possible to use it without needing to scan through all triggers again
        customRegex: '\\(?(@)',
        getItems(
          query,
          state,
          _intl,
          { prevActive, queryChanged },
          tr,
          dispatch,
        ) {
          if (!prevActive && queryChanged) {
            analyticsService.trackEvent(
              'atlassian.fabric.mention.picker.trigger.shortcut',
            );
            if (!tr.getMeta(analyticsPluginKey)) {
              (dispatch as AnalyticsDispatch)(analyticsEventKey, {
                payload: {
                  action: ACTION.INVOKED,
                  actionSubject: ACTION_SUBJECT.TYPEAHEAD,
                  actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_MENTION,
                  attributes: { inputMethod: INPUT_METHOD.KEYBOARD },
                  eventType: EVENT_TYPE.UI,
                },
              });
            }
          }

          const pluginState = getMentionPluginState(state);
          const mentions =
            !prevActive && queryChanged ? [] : pluginState.mentions || [];

          const mentionContext = {
            ...pluginState.contextIdentifierProvider,
            sessionId,
          };
          if (queryChanged && pluginState.mentionProvider) {
            pluginState.mentionProvider.filter(query || '', mentionContext);
          }

          return mentions.map(
            (mention: MentionDescription): TypeAheadItem => ({
              title: mention.id,
              render: ({ isSelected, onClick, onMouseMove }) => (
                <MentionItem
                  mention={mention}
                  selected={isSelected}
                  onMouseMove={onMouseMove}
                  onSelection={onClick}
                />
              ),
              mention,
            }),
          );
        },
        selectItem(state, item, insert, { mode }) {
          const { schema } = state;

          const pluginState = getMentionPluginState(state);
          const { mentionProvider } = pluginState;
          const { id, name, nickname, accessLevel, userType } = item.mention;
          const renderName = nickname ? nickname : name;
          const typeAheadPluginState = typeAheadPluginKey.getState(
            state,
          ) as TypeAheadPluginState;

          const mentionContext = {
            ...pluginState.contextIdentifierProvider,
            sessionId,
          };
          if (mentionProvider) {
            mentionProvider.recordMentionSelection(
              item.mention,
              mentionContext,
            );
          }

          const pickerElapsedTime = typeAheadPluginState.queryStarted
            ? Date.now() - typeAheadPluginState.queryStarted
            : 0;

          analyticsService.trackEvent(
            'atlassian.fabric.mention.picker.insert',
            {
              mode,
              isSpecial: isSpecialMention(item.mention) || false,
              accessLevel: accessLevel || '',
              mentionee: id,
              duration: pickerElapsedTime,
              queryLength: (typeAheadPluginState.query || '').length,
              ...(pluginState.contextIdentifierProvider as any),
            },
          );

          fireEvent(
            buildTypeAheadInsertedPayload(
              pickerElapsedTime,
              typeAheadPluginState.upKeyCount,
              typeAheadPluginState.downKeyCount,
              sessionId,
              mode,
              item.mention,
              pluginState.mentions,
              typeAheadPluginState.query || '',
            ),
          );

          sessionId = uuid();

          if (mentionProvider && isTeamType(userType)) {
            return insert(buildNodesForTeamMention(schema, item.mention));
          }

          return insert(
            schema.nodes.mention.createChecked({
              text: `@${renderName}`,
              id,
              accessLevel,
              userType: userType === 'DEFAULT' ? null : userType,
            }),
          );
        },
        dismiss(state) {
          const typeAheadPluginState = typeAheadPluginKey.getState(
            state,
          ) as TypeAheadPluginState;

          const pickerElapsedTime = typeAheadPluginState.queryStarted
            ? Date.now() - typeAheadPluginState.queryStarted
            : 0;

          fireEvent(
            buildTypeAheadCancelPayload(
              pickerElapsedTime,
              typeAheadPluginState.upKeyCount,
              typeAheadPluginState.downKeyCount,
              sessionId,
              typeAheadPluginState.query || '',
            ),
          );

          sessionId = uuid();
        },
      },
    },
  };
};

export default mentionsPlugin;

/**
 * Actions
 */

export const ACTIONS = {
  SET_PROVIDER: 'SET_PROVIDER',
  SET_RESULTS: 'SET_RESULTS',
  SET_CONTEXT: 'SET_CONTEXT',
};

export const setProvider = (provider: MentionProvider | undefined): Command => (
  state,
  dispatch,
) => {
  if (dispatch) {
    dispatch(
      state.tr.setMeta(mentionPluginKey, {
        action: ACTIONS.SET_PROVIDER,
        params: { provider },
      }),
    );
  }
  return true;
};

export const setResults = (results: MentionDescription[]): Command => (
  state,
  dispatch,
) => {
  if (dispatch) {
    dispatch(
      state.tr.setMeta(mentionPluginKey, {
        action: ACTIONS.SET_RESULTS,
        params: { results },
      }),
    );
  }
  return true;
};

export const setContext = (
  context: ContextIdentifierProvider | undefined,
): Command => (state, dispatch) => {
  if (dispatch) {
    dispatch(
      state.tr.setMeta(mentionPluginKey, {
        action: ACTIONS.SET_CONTEXT,
        params: { context },
      }),
    );
  }
  return true;
};

/**
 *
 * ProseMirror Plugin
 *
 */

export const mentionPluginKey = new PluginKey('mentionPlugin');

export function getMentionPluginState(state: EditorState) {
  return mentionPluginKey.getState(state) as MentionPluginState;
}

export type MentionPluginState = {
  mentionProvider?: MentionProvider;
  contextIdentifierProvider?: ContextIdentifierProvider;
  mentions?: Array<MentionDescription>;
};

function mentionPluginFactory(
  dispatch: Dispatch,
  providerFactory: ProviderFactory,
  portalProviderAPI: PortalProviderAPI,
  fireEvent: (payload: any) => void,
  editorAppearance?: EditorAppearance,
) {
  let mentionProvider: MentionProvider;

  return new Plugin({
    key: mentionPluginKey,
    state: {
      init() {
        return {};
      },
      apply(tr, pluginState) {
        const { action, params } = tr.getMeta(mentionPluginKey) || {
          action: null,
          params: null,
        };

        let newPluginState = pluginState;

        switch (action) {
          case ACTIONS.SET_PROVIDER:
            newPluginState = {
              ...pluginState,
              mentionProvider: params.provider,
            };
            dispatch(mentionPluginKey, newPluginState);
            return newPluginState;

          case ACTIONS.SET_RESULTS:
            newPluginState = {
              ...pluginState,
              mentions: params.results,
            };
            dispatch(mentionPluginKey, newPluginState);
            return newPluginState;

          case ACTIONS.SET_CONTEXT:
            newPluginState = {
              ...pluginState,
              contextIdentifierProvider: params.context,
            };
            dispatch(mentionPluginKey, newPluginState);
            return newPluginState;
        }

        return newPluginState;
      },
    } as StateField<MentionPluginState>,
    props: {
      nodeViews: {
        mention: mentionNodeView(
          portalProviderAPI,
          providerFactory,
          editorAppearance,
        ),
      },
    },
    view(editorView) {
      const providerHandler = (
        name: string,
        providerPromise?: Promise<MentionProvider | ContextIdentifierProvider>,
      ) => {
        switch (name) {
          case 'mentionProvider':
            if (!providerPromise) {
              return setProvider(undefined)(
                editorView.state,
                editorView.dispatch,
              );
            }

            (providerPromise as Promise<MentionProvider>)
              .then(provider => {
                if (mentionProvider) {
                  mentionProvider.unsubscribe('mentionPlugin');
                }

                mentionProvider = provider;
                setProvider(provider)(editorView.state, editorView.dispatch);

                provider.subscribe(
                  'mentionPlugin',
                  (mentions, query, stats) => {
                    setResults(mentions)(editorView.state, editorView.dispatch);

                    let duration: number = 0;
                    let userIds: string[] | null = null;
                    let teams: TeamInfoAttrAnalytics[] | null = null;

                    if (!isTeamStats(stats)) {
                      duration = stats && stats.duration;
                      teams = null;
                      userIds = mentions
                        .map(mention =>
                          isTeamType(mention.userType) ? mention.id : null,
                        )
                        .filter(m => !!m) as string[];
                    } else {
                      // is from team mention
                      duration = stats && stats.teamMentionDuration;
                      userIds = null;
                      teams = mentions
                        .map(mention =>
                          isTeamType(mention.userType)
                            ? {
                                teamId: mention.id,
                                includesYou: mention.context!.includesYou,
                                memberCount: mention.context!.memberCount,
                              }
                            : null,
                        )
                        .filter(m => !!m) as TeamInfoAttrAnalytics[];
                    }

                    const payload = buildTypeAheadRenderedPayload(
                      duration,
                      userIds,
                      query || '',
                      teams,
                    );
                    fireEvent(payload);
                  },
                );
              })
              .catch(() =>
                setProvider(undefined)(editorView.state, editorView.dispatch),
              );
            break;

          case 'contextIdentifierProvider':
            if (!providerPromise) {
              return setContext(undefined)(
                editorView.state,
                editorView.dispatch,
              );
            }
            (providerPromise as Promise<ContextIdentifierProvider>).then(
              provider => {
                setContext(provider)(editorView.state, editorView.dispatch);
              },
            );
            break;
        }
        return;
      };

      providerFactory.subscribe('mentionProvider', providerHandler);
      providerFactory.subscribe('contextIdentifierProvider', providerHandler);

      return {
        destroy() {
          if (providerFactory) {
            providerFactory.unsubscribe('mentionProvider', providerHandler);
            providerFactory.unsubscribe(
              'contextIdentifierProvider',
              providerHandler,
            );
          }
          if (mentionProvider) {
            mentionProvider.unsubscribe('mentionPlugin');
          }
        },
      };
    },
  });
}

/**
 * When a team mention is selected, we render a team link and list of member/user mentions
 * in editor content
 */
function buildNodesForTeamMention(
  schema: Schema,
  selectedMention: MentionDescription,
): Fragment {
  const { nodes, marks } = schema;
  const { name, id: teamId, accessLevel, context } = selectedMention;
  const teamUrl = `${window.location.origin}/people/team/${teamId}`;

  const openBracketText = schema.text('(');
  const closeBracketText = schema.text(')');
  const emptySpaceText = schema.text(' ');
  const teamLink = schema.text(name!, [marks.link.create({ href: teamUrl })]);

  const inlineNodes: Node[] = [teamLink, emptySpaceText, openBracketText];

  const members: TeamMember[] =
    context && context.members ? context.members : [];
  members.forEach((member: TeamMember, index) => {
    const text = `@${member.name}`;
    const userMentionNode = nodes.mention.createChecked({
      text,
      id: member.id,
      accessLevel,
      userType: 'DEFAULT',
    });

    inlineNodes.push(userMentionNode);
    // should not add empty space after the last user mention.
    if (index !== members.length - 1) {
      inlineNodes.push(emptySpaceText);
    }
  });

  inlineNodes.push(closeBracketText);
  return Fragment.fromArray(inlineNodes);
}
