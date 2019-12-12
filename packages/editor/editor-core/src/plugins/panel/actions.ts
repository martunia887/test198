import { setParentNodeMarkup, removeParentNodeOfType } from 'prosemirror-utils';
import { PanelType } from '@atlaskit/adf-schema';
import { analyticsService } from '../../analytics';
import { Command } from '../../types';
import {
  AnalyticsEventPayload,
  ACTION,
  ACTION_SUBJECT,
  INPUT_METHOD,
  EVENT_TYPE,
  addAnalytics,
} from '../analytics';
import { pluginKey, PanelOptions } from './pm-plugins/main';
import { PANEL_TYPE } from '../analytics/types/node-events';

import { getPanelTypeBackground } from '../../../../editor-common/src/styles/shared/panel';

export type DomAtPos = (pos: number) => { node: HTMLElement; offset: number };

export const removePanel = (): Command => (state, dispatch) => {
  const {
    schema: { nodes },
    tr,
  } = state;
  const payload: AnalyticsEventPayload = {
    action: ACTION.DELETED,
    actionSubject: ACTION_SUBJECT.PANEL,
    attributes: { inputMethod: INPUT_METHOD.TOOLBAR },
    eventType: EVENT_TYPE.TRACK,
  };
  analyticsService.trackEvent(`atlassian.editor.format.panel.delete.button`);

  if (dispatch) {
    dispatch(
      addAnalytics(state, removeParentNodeOfType(nodes.panel)(tr), payload),
    );
  }
  return true;
};

export const changePanelType = (
  panelType?: PanelType,
  panelOptions?: PanelOptions,
): Command => (state, dispatch) => {
  const {
    schema: { nodes },
    tr,
  } = state;

  let previousType: PANEL_TYPE = pluginKey.getState(state).activePanelType;

  const payload: AnalyticsEventPayload = {
    action: ACTION.CHANGED_TYPE,
    actionSubject: ACTION_SUBJECT.PANEL,
    attributes: {
      newType: panelType as PANEL_TYPE,
      previousType: previousType,
    },
    eventType: EVENT_TYPE.TRACK,
  };

  analyticsService.trackEvent(
    `atlassian.editor.format.panel.${panelType}.button`,
  );

  let previousColor = pluginKey.getState(state).activePanelColor;
  let previousEmoji = pluginKey.getState(state).activePanelIcon;

  let panelIcon = '';
  let panelColor = '';

  if (panelOptions && panelOptions.emoji && panelType === 'emoji') {
    panelIcon = panelOptions.emoji.shortName;

    // if there was color previously set - use previous color
    if (previousColor) {
      panelColor = previousColor;
    } else {
      // if there was no previous color - use color of the previous panel
      panelColor = getPanelTypeBackground(previousType, {});
    }
  }

  if (panelOptions && panelOptions.color) {
    panelColor = panelOptions.color;

    // if panel type is not changed and there was active emoji - use previous emoji
    if (!panelType && previousEmoji) {
      panelIcon = previousEmoji;
      panelType = 'emoji';
    } else if (!panelType && previousType) {
      panelType = previousType;
    }
  }

  const changePanelTypeTr = addAnalytics(
    state,
    setParentNodeMarkup(nodes.panel, null, {
      panelType,
      panelIcon,
      panelColor,
    })(tr).setMeta(pluginKey, {
      activePanelType: panelType,
      panelIcon: panelIcon,
      panelColor: panelColor,
    }),
    payload,
  );
  changePanelTypeTr.setMeta('scrollIntoView', false);

  if (dispatch) {
    dispatch(changePanelTypeTr);
  }
  return true;
};
