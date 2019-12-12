import * as React from 'react';
import { PureComponent } from 'react';
import { colors } from '@atlaskit/theme';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import TipIcon from '@atlaskit/icon/glyph/editor/hint';
import SuccessIcon from '@atlaskit/icon/glyph/editor/success';
import ErrorIcon from '@atlaskit/icon/glyph/editor/error';
import NoteIcon from '@atlaskit/icon/glyph/editor/note';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import { PanelType } from '@atlaskit/adf-schema';
import EmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import { getEmojiRepository } from '../../../../../elements/util-data-test/src/emoji/story-data';
import { Emoji } from '../../../../../elements/emoji/src';
import { getPanelTextColorForCustomBackground } from '../../../../editor-common/src/styles/shared/panel';

export interface Props {
  panelType: PanelType;
}

const { G50, G400, P50, P400, B400, Y50, B50, Y400, R50, R400 } = colors;

const config = {
  info: {
    icon: InfoIcon,
    background: B50,
    iconColor: B400,
  },
  note: {
    icon: NoteIcon,
    background: P50,
    iconColor: P400,
  },
  tip: {
    icon: TipIcon,
    background: G50,
    iconColor: G400,
  },
  success: {
    icon: SuccessIcon,
    background: G50,
    iconColor: G400,
  },
  warning: {
    icon: WarningIcon,
    background: Y50,
    iconColor: Y400,
  },
  error: {
    icon: ErrorIcon,
    background: R50,
    iconColor: R400,
  },
  emoji: {
    icon: EmojiIcon,
    background: G50,
    iconColor: G400,
  },
};

export default class Panel extends PureComponent<Props, {}> {
  render() {
    const { panelType, children, panelIcon, panelColor } = this.props;

    const bgColor = panelColor || config[panelType].background;

    let iconColor = config[panelType].iconColor;

    let icon;
    let styles: React.CSSProperties = { background: bgColor };
    if (panelIcon) {
      const emojiService = getEmojiRepository();
      const emojiShortName = emojiService.findByShortName(panelIcon);

      icon = (
        <span
          style={{
            top: '8px',
            position: 'absolute',
          }}
        >
          <Emoji
            fitToHeight={20}
            key={1}
            emoji={emojiShortName}
            showTooltip={true}
          />
        </span>
      );

      styles = {
        ...styles,
        alignItems: 'center',
        position: 'relative',
      };
    } else {
      icon = this.getIcon();
    }

    if (panelColor) {
      styles.color = getPanelTextColorForCustomBackground(panelColor);
    }

    return (
      <div
        style={styles}
        className="ak-editor-panel"
        data-panel-type={panelType}
      >
        <span style={{ color: iconColor }} className="ak-editor-panel__icon">
          {icon}
        </span>
        <div className="ak-editor-panel__content">{children}</div>
      </div>
    );
  }

  getIcon() {
    const { panelType } = this.props;

    const Icon = config[panelType].icon;
    return <Icon label={`Panel ${panelType}`} />;
  }
}
