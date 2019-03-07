import * as React from 'react';

import { ModalSpinner } from '@atlaskit/media-ui';
import { colors } from '@atlaskit/theme';
import {
  SmartMediaEditorOwnProps,
  SmartMediaEditorProps,
} from './smartMediaEditor';
import {
  withMediaClient,
  WithOptionalMediaClientProps,
} from '@atlaskit/media-client';

interface State {
  SmartMediaEditor?: React.ComponentType<SmartMediaEditorProps>;
}

export type Props = SmartMediaEditorOwnProps & WithOptionalMediaClientProps;

export class SmartMediaEditorLoader extends React.PureComponent<
  Props,
  State & { isErrored: boolean }
> {
  static displayName = 'AsyncSmartMediaEditor';
  static SmartMediaEditor?: React.ComponentType<SmartMediaEditorProps>;

  state = {
    // Set state value to equal to current static value of this class.
    SmartMediaEditor: SmartMediaEditorLoader.SmartMediaEditor,
    isErrored: false,
  };

  async componentWillMount() {
    if (!this.state.SmartMediaEditor) {
      try {
        const module = await import(/* webpackChunkName:"@atlaskit-internal_smart-media-editor" */
        './smartMediaEditor');
        SmartMediaEditorLoader.SmartMediaEditor =
          module.SmartMediaEditorWithIntl;
        this.setState({ SmartMediaEditor: module.SmartMediaEditorWithIntl });
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(e);
        this.setState({ isErrored: true });
      }
    }
  }

  render() {
    const { isErrored } = this.state;
    const { mediaClient } = this.props;

    if (isErrored) {
      return null;
    }
    if (!this.state.SmartMediaEditor || !mediaClient) {
      return (
        <ModalSpinner blankedColor={colors.N700A} invertSpinnerColor={true} />
      );
    }

    return (
      <this.state.SmartMediaEditor {...this.props} mediaClient={mediaClient} />
    );
  }
}

export default withMediaClient(SmartMediaEditorLoader);
