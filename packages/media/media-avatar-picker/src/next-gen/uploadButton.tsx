import * as React from 'react';
import { Component, MouseEvent, SyntheticEvent, createRef } from 'react';
import Button from '@atlaskit/button';
import { ACCEPTED_FILE_TYPES } from './common';
import { FileInput } from './styled';

const ACCEPT = ACCEPTED_FILE_TYPES.join(',');

export interface UploadButtonProps {
  onTriggerClick?: (onClick: () => void) => void;
  onFileSelected: (e: File) => void;
}

export class UploadButton extends Component<UploadButtonProps, {}> {
  fileInputElement = createRef<HTMLInputElement>();

  componentDidMount() {
    const { onTriggerClick } = this.props;
    if (onTriggerClick) {
      onTriggerClick(this.onClick);
    }
  }

  onClick = () => {
    const input = this.fileInputElement.current;
    if (input) {
      input.click();
    }
  };

  onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.currentTarget.files && e.currentTarget.files.length) {
      const file = e.currentTarget.files[0];
      this.props.onFileSelected(file);
    }
  };

  render() {
    return (
      <Button onClick={this.onClick}>
        {'Upload a photo' /* i18n */}
        <FileInput
          type="file"
          innerRef={this.fileInputElement}
          onChange={this.onChange}
          accept={ACCEPT}
        />
      </Button>
    );
  }
}
