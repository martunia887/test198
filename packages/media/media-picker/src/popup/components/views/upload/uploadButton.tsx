import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import Button from '@atlaskit/button';
import { messages } from '@atlaskit/media-ui';

import { BrowserBase } from '../../../../components/browser/browser';
import { startFileBrowser } from '../../../actions/startFileBrowser';
import { State } from '../../../domain';

export interface LocalBrowserButtonProps {
  readonly browserRef: React.RefObject<BrowserBase>;
}

export interface LocalBrowserButtonDispatchProps {
  onClick: () => void;
}

export type Props = LocalBrowserButtonProps & LocalBrowserButtonDispatchProps;

export class LocalBrowserButton extends React.Component<Props> {
  private onUploadClick = (): void => {
    const { browserRef, onClick } = this.props;
    onClick();
    if (browserRef && browserRef.current) {
      browserRef.current.browse();
    }
  };

  render() {
    return (
      <Button
        data-testid="media-picker-upload-button"
        appearance="default"
        onClick={this.onUploadClick}
      >
        <FormattedMessage {...messages.upload_file} />
      </Button>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<State>,
): LocalBrowserButtonDispatchProps => ({
  onClick: () => dispatch(startFileBrowser()),
});

export default connect<
  {},
  LocalBrowserButtonDispatchProps,
  LocalBrowserButtonProps
>(
  null,
  mapDispatchToProps,
)(LocalBrowserButton);
