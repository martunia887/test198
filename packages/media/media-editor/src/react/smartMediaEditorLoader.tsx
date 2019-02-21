import * as React from 'react';

import { ModalSpinner } from '@atlaskit/media-ui';
import { colors } from '@atlaskit/theme';
import SmartMediaEditorType, {
  SmartMediaEditorOwnProps,
} from './smartMediaEditor';

interface AsyncSmartMediaEditorState {
  SmartMediaEditor?: typeof SmartMediaEditorType;
}

export default class SmartMediaEditorLoader extends React.PureComponent<
  SmartMediaEditorOwnProps & AsyncSmartMediaEditorState,
  AsyncSmartMediaEditorState
> {
  static displayName = 'AsyncSmartMediaEditor';
  static SmartMediaEditor?: typeof SmartMediaEditorType;

  state = {
    // Set state value to equal to current static value of this class.
    SmartMediaEditor: SmartMediaEditorLoader.SmartMediaEditor,
  };

  async componentWillMount() {
    if (!this.state.SmartMediaEditor) {
      const module = await import(/* webpackChunkName:"@atlaskit-internal_smart-media-editor" */
      './smartMediaEditor');
      SmartMediaEditorLoader.SmartMediaEditor = module.default;
      this.setState({ SmartMediaEditor: module.default });
    }
  }

  render() {
    if (!this.state.SmartMediaEditor) {
      return (
        <ModalSpinner blankedColor={colors.N700A} invertSpinnerColor={true} />
      );
    }

    return <this.state.SmartMediaEditor {...this.props} />;
  }
}
