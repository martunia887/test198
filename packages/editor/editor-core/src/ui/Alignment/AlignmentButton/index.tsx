import * as React from 'react';
import ToolbarButton from '../../ToolbarButton';

export interface Props {
  value: string;
  label: string;
  isSelected?: boolean;
  onClick: (value: string) => void;
  content: React.ReactElement<any>;
}

function onClick(e: Event, props: Props) {
  const { onClick, value } = props;
  e.preventDefault();
  onClick(value);
}

export default function AlignmentButton(props: Props) {
  const { label, isSelected, content } = props;
  return (
    <ToolbarButton
      disabled={false}
      selected={isSelected}
      title={label}
      onClick={e => onClick(e, props)}
      iconBefore={content}
    />
  );
}
