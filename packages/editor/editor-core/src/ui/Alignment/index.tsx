import * as React from 'react';
import AlignmentButton from './AlignmentButton';

import { AlignmentWrapper } from './styles';
import { iconMap } from '../../plugins/alignment/ui/ToolbarAlignment';

export interface Props {
  selectedAlignment?: string;
  onClick: (value: string) => void;
  className?: string;
}

const alignmentOptions = [
  { title: 'Align left', value: 'start' },
  { title: 'Align center', value: 'center' },
  { title: 'Align right', value: 'end' },
];

export default function Alignment(props: Props) {
  const { onClick, selectedAlignment, className } = props;

  return (
    <AlignmentWrapper className={className} style={{ maxWidth: 3 * 32 }}>
      {alignmentOptions.map(alignment => {
        const { value, title } = alignment;
        return (
          <AlignmentButton
            content={iconMap[value]}
            key={value}
            value={value}
            label={title}
            onClick={onClick}
            isSelected={value === selectedAlignment}
          />
        );
      })}
    </AlignmentWrapper>
  );
}
