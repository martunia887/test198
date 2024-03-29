import {
  createEditorFactory,
  insertText,
  sendKeyToPm,
} from '@atlaskit/editor-test-helpers';
import { doc, p, mention, a } from '@atlaskit/editor-test-helpers';
import { MockMentionResource } from '@atlaskit/util-data-test';
import { selectCurrentItem } from '../../../../plugins/type-ahead/commands/select-item';
import { dismissCommand } from '../../../../plugins/type-ahead/commands/dismiss';
import { ProviderFactory } from '@atlaskit/editor-common';
import { MentionProvider, MentionDescription } from '@atlaskit/mention';
import { EditorView } from 'prosemirror-view';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next';

describe('mentionTypeahead', () => {
  const createEditor = createEditorFactory();
  const sessionIdRegex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
  const expectedActionSubject = 'mentionTypeahead';
  const contextIdentifiers = {
    containerId: 'container-id',
    objectId: 'object-id',
    childObjectId: 'child-object-id',
  };

  type TestDependencies = {
    editorView: EditorView;
    sel: number;
    mentionProvider: MentionProvider;
    createAnalyticsEvent: CreateUIAnalyticsEventSignature;
    event: any;
  };
  type TestExecutor = (
    deps: TestDependencies,
    ...args: any[]
  ) => void | Promise<void>;

  /**
   * Higher order function automatically creating the editor and triggering the
   * mention typeahead with the provided query.
   *
   * @param query The mention query to insert in the editor.
   * @param test Test case function to be passed to Jest
   * @return Promise resolving with the return value of the test.
   */
  const withMentionQuery = (query: string, test: TestExecutor) => async (
    ...args: any[]
  ) => {
    const { event, createAnalyticsEvent } = analyticsMocks();
    const { editorView, sel, mentionProvider } = await editor({
      createAnalyticsEvent,
    });
    const mentionResults = subscribe(mentionProvider, query);
    insertText(editorView, `@${query}`, sel);
    // Ensures results have been handled by the plugin before moving on
    await mentionResults;

    return await Promise.resolve(
      test(
        {
          editorView,
          sel,
          mentionProvider,
          createAnalyticsEvent,
          event,
        },
        ...args,
      ),
    );
  };

  /**
   * Sets the editor up to be used in the test suite, using default options
   * relevant to all tests.
   *
   * @param options List of options to add or override when creating the editor.
   * @return Object containing `editorView`, `sel` and `mentionProvider`.
   */
  const editor = async (options?: any) => {
    const mentionProvider = Promise.resolve(new MockMentionResource({}));
    const contextIdentifierProvider = Promise.resolve(contextIdentifiers);
    const { editorView, sel } = createEditor({
      doc: doc(p('{<>}')),
      editorProps: {
        mentionProvider,
        contextIdentifierProvider,
        allowAnalyticsGASV3: true,
      },
      providerFactory: ProviderFactory.create({
        mentionProvider,
        contextIdentifierProvider,
      }),
      ...options,
    });

    return {
      editorView,
      sel,
      // Ensures providers are resolved before using the editor
      mentionProvider: await mentionProvider,
      contextIdentifierProvider: await contextIdentifierProvider,
    };
  };

  /**
   * Subscribes to the given `mentionProvider` and returns a promise that only
   * resolves when it gets notified of results for the given `query`.
   *
   * @param mentionProvider Mention provider to listen to for change events.
   * @param query Query string for which the subscrition resolves.
   *              Default: empty string.
   * @return Promise resolving with `MentionDescription[]`
   */
  const subscribe = (mentionProvider: MentionProvider, query = '') => {
    return new Promise<MentionDescription[]>(resolve => {
      const subscribeKey = 'mentionPluginTest';
      mentionProvider.subscribe(subscribeKey, (mentions, resultQuery) => {
        if (query === resultQuery) {
          mentionProvider.unsubscribe(subscribeKey);
          resolve(mentions);
        }
      });
    });
  };

  /**
   * Creates and return mocks for analytics to be passed to the editor.
   *
   * @return Object containing the mocks `event` and `createAnalyticsEvent`.
   */
  const analyticsMocks = () => {
    const event = { fire: jest.fn().mockName('event.fire') };
    const createAnalyticsEvent = jest
      .fn(payload =>
        // We're only interested in recording events for 'mentionTypeahead'
        // ignoring all others
        payload.actionSubject === expectedActionSubject
          ? event
          : { fire: jest.fn() },
      )
      .mockName('createAnalyticsEvent');

    return {
      createAnalyticsEvent,
      event,
    };
  };

  describe('fabric-elements analytics', () => {
    it(
      'should fire typeahead cancelled event',
      withMentionQuery('all', ({ editorView, event, createAnalyticsEvent }) => {
        jest.clearAllMocks();
        dismissCommand()(editorView.state, editorView.dispatch);

        expect(createAnalyticsEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'cancelled',
            actionSubject: expectedActionSubject,
            eventType: 'ui',
            attributes: expect.objectContaining({
              packageName: '@atlaskit/editor-core',
              packageVersion: expect.any(String),
              sessionId: expect.stringMatching(sessionIdRegex),
              spaceInQuery: false,
              queryLength: 3,
              duration: expect.any(Number),
            }),
          }),
        );
        expect(event.fire).toHaveBeenCalledTimes(1);
        expect(event.fire).toHaveBeenCalledWith('fabric-elements');
      }),
    );

    it.each([
      ['pressed', () => selectCurrentItem('enter'), 'enter'],
      ['clicked', () => selectCurrentItem(), undefined],
    ])(
      'should fire typeahead %s event',
      withMentionQuery(
        'here',
        (
          { editorView, event, createAnalyticsEvent },
          expectedActionName,
          selectCurrentItem,
          keyboardKey,
        ) => {
          jest.clearAllMocks();
          selectCurrentItem()(editorView.state, editorView.dispatch);

          expect(createAnalyticsEvent).toHaveBeenCalledWith(
            expect.objectContaining({
              action: expectedActionName,
              actionSubject: expectedActionSubject,
              eventType: 'ui',
              attributes: expect.objectContaining({
                packageName: '@atlaskit/editor-core',
                packageVersion: expect.any(String),
                duration: expect.any(Number),
                position: 0,
                keyboardKey: keyboardKey,
                queryLength: 4,
                spaceInQuery: false,
                accessLevel: 'CONTAINER',
                userType: 'SPECIAL',
                userId: 'here',
                memberCount: null,
                includesYou: null,
              }),
            }),
          );
          expect(event.fire).toHaveBeenCalledTimes(1);
          expect(event.fire).toHaveBeenCalledWith('fabric-elements');
        },
      ),
    );

    it.each([
      ['pressed', () => selectCurrentItem('enter'), 'enter'],
      ['clicked', () => selectCurrentItem(), undefined],
    ])(
      'should fire typeahead %s event for teams',
      withMentionQuery(
        'Team Alpha',
        (
          { editorView, event, createAnalyticsEvent },
          expectedActionName,
          selectCurrentItem,
          keyboardKey,
        ) => {
          jest.clearAllMocks();
          selectCurrentItem()(editorView.state, editorView.dispatch);

          expect(createAnalyticsEvent).toHaveBeenCalledWith(
            expect.objectContaining({
              action: expectedActionName,
              actionSubject: expectedActionSubject,
              eventType: 'ui',
              attributes: expect.objectContaining({
                packageName: '@atlaskit/editor-core',
                packageVersion: expect.any(String),
                duration: expect.any(Number),
                position: 0,
                keyboardKey: keyboardKey,
                queryLength: 10,
                spaceInQuery: true,
                accessLevel: 'CONTAINER',
                userType: 'TEAM',
                userId: 'team-1',
                memberCount: 5,
                includesYou: true,
              }),
            }),
          );
          expect(event.fire).toHaveBeenCalledTimes(1);
          expect(event.fire).toHaveBeenCalledWith('fabric-elements');
        },
      ),
    );

    it(
      'should fire typeahead rendered event on bootstrap',
      withMentionQuery('', ({ event, createAnalyticsEvent }) => {
        expect(createAnalyticsEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'rendered',
            actionSubject: expectedActionSubject,
            eventType: 'operational',
            attributes: expect.objectContaining({
              packageName: '@atlaskit/editor-core',
              packageVersion: expect.any(String),
              duration: expect.any(Number),
              queryLength: 0,
              spaceInQuery: false,
              userIds: expect.any(Array),
              sessionId: expect.stringMatching(sessionIdRegex),
            }),
          }),
        );
        expect(event.fire).toHaveBeenCalledTimes(1);
        expect(event.fire).toHaveBeenCalledWith('fabric-elements');
      }),
    );

    it(
      'should fire typeahead rendered event',
      withMentionQuery('all', ({ event, createAnalyticsEvent }) => {
        expect(createAnalyticsEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'rendered',
            actionSubject: expectedActionSubject,
            eventType: 'operational',
            attributes: expect.objectContaining({
              packageName: '@atlaskit/editor-core',
              packageVersion: expect.any(String),
              duration: expect.any(Number),
              queryLength: 3,
              spaceInQuery: false,
              userIds: expect.any(Array),
              sessionId: expect.stringMatching(sessionIdRegex),
            }),
          }),
        );
        expect(event.fire).toHaveBeenCalledTimes(4);
        expect(event.fire).toHaveBeenCalledWith('fabric-elements');
      }),
    );
  });

  describe('editor analytics', () => {
    let createAnalyticsEvent: any;
    let editorView: EditorView;
    let sel: number;

    beforeEach(async () => {
      jest.clearAllMocks();
      ({ createAnalyticsEvent } = analyticsMocks());
      ({ editorView, sel } = await editor({
        createAnalyticsEvent,
      }));
    });

    it('should trigger mention typeahead invoked event when invoked via quick insert', async () => {
      insertText(editorView, '/Mention', sel);
      sendKeyToPm(editorView, 'Enter');

      expect(createAnalyticsEvent).toHaveBeenCalledWith({
        action: 'invoked',
        actionSubject: 'typeAhead',
        actionSubjectId: 'mentionTypeAhead',
        attributes: { inputMethod: 'quickInsert' },
        eventType: 'ui',
      });
    });

    it('should trigger mention typeahead invoked event when user types "@" symbol', async () => {
      insertText(editorView, '@', sel);

      expect(createAnalyticsEvent).toHaveBeenCalledWith({
        action: 'invoked',
        actionSubject: 'typeAhead',
        actionSubjectId: 'mentionTypeAhead',
        attributes: { inputMethod: 'keyboard' },
        eventType: 'ui',
      });
    });

    it(
      'should trigger `mentionTypeahead` and `teamMentionTypeahead` analytics event',
      withMentionQuery('team', ({ event, createAnalyticsEvent }) => {
        const commonAttrsTypeAhead = {
          componentName: 'mention',
          packageName: '@atlaskit/editor-core',
          packageVersion: expect.any(String),
          queryLength: expect.any(Number),
          spaceInQuery: false,
          sessionId: expect.stringMatching(sessionIdRegex),
        };

        expect(createAnalyticsEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'rendered',
            actionSubject: 'teamMentionTypeahead',
            eventType: 'operational',
            attributes: expect.objectContaining({
              ...commonAttrsTypeAhead,
              duration: 200,
              userIds: null,
              teams: expect.any(Array),
            }),
          }),
        );

        expect(createAnalyticsEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'rendered',
            actionSubject: 'mentionTypeahead',
            eventType: 'operational',
            attributes: expect.objectContaining({
              ...commonAttrsTypeAhead,
              duration: 100,
              userIds: expect.any(Array),
              teams: null,
            }),
          }),
        );
      }),
    );
  });

  describe('mentionProvider', () => {
    describe('when entering a query', () => {
      it(
        'should filter results',
        withMentionQuery('', ({ mentionProvider, editorView, sel }) => {
          const filterSpy = jest.spyOn(mentionProvider, 'filter');

          insertText(editorView, 'all', sel);

          expect(filterSpy).toHaveBeenCalledTimes(3);
          expect(filterSpy).toHaveBeenCalledWith(
            'a',
            expect.objectContaining({
              sessionId: expect.stringMatching(sessionIdRegex),
              ...contextIdentifiers,
            }),
          );
          expect(filterSpy).toHaveBeenCalledWith(
            'al',
            expect.objectContaining({
              sessionId: expect.stringMatching(sessionIdRegex),
              ...contextIdentifiers,
            }),
          );
          expect(filterSpy).toHaveBeenLastCalledWith(
            'all',
            expect.objectContaining({
              sessionId: expect.stringMatching(sessionIdRegex),
              ...contextIdentifiers,
            }),
          );
        }),
      );
    });

    describe('when selecting a user', () => {
      it(
        'should record the selection',
        withMentionQuery('here', ({ editorView, mentionProvider }) => {
          const recordMentionSelectionSpy = jest.spyOn(
            mentionProvider,
            'recordMentionSelection',
          );

          selectCurrentItem()(editorView.state, editorView.dispatch);

          expect(recordMentionSelectionSpy).toHaveBeenCalledTimes(1);
          expect(recordMentionSelectionSpy).toHaveBeenCalledWith(
            expect.objectContaining({
              id: 'here',
            }),
            expect.objectContaining({
              sessionId: expect.stringMatching(sessionIdRegex),
              ...contextIdentifiers,
            }),
          );
        }),
      );
    });

    describe('when selecting a team', () => {
      it(
        'should expand members when selecting a team mention ',
        withMentionQuery('Team Beta', ({ mentionProvider, editorView }) => {
          // select Team Beta team
          selectCurrentItem()(editorView.state, editorView.dispatch);
          // should expand 2 members
          expect(editorView.state.doc).toEqualDocument(
            doc(
              p(
                '',
                a({ href: 'http://localhost/people/team/team-2' })('Team Beta'),
                ' (',
                mention({
                  id: 'member-1',
                  text: '@Tung Dang',
                  userType: 'DEFAULT',
                  accessLevel: 'CONTAINER',
                })(),
                ' ',
                mention({
                  id: 'member-2',
                  text: '@Ishan Somasiri',
                  userType: 'DEFAULT',
                  accessLevel: 'CONTAINER',
                })(),
                ')',
              ),
            ),
          );
        }),
      );
    });
  });
});
