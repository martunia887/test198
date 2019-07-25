import * as React from 'react';
import { mountWithIntl } from '@atlaskit/editor-test-helpers';
import { shallow } from 'enzyme';
import { noop } from '@babel/types';
import Button from '@atlaskit/button';

import TeamMentionHighlight, {
  Props,
} from '../../../components/TeamMentionHighlight';

function render(props: Partial<Props>) {
  return mountWithIntl(
    <TeamMentionHighlight
      createTeamLink="somelink"
      onClose={() => noop}
      {...props}
    />,
  );
}

let mockRegisterRender = jest.fn();
let mockRegisterCreateLinkClick = jest.fn();

jest.mock(
  '../../../components/TeamMentionHighlight/TeamMentionHighlightController',
  () => ({
    __esModule: true,
    default: {
      registerRender: () => mockRegisterRender(),
      registerCreateLinkClick: () => mockRegisterCreateLinkClick(),
    },
  }),
);

describe('TeamMentionHighlight', () => {
  it('Should call onCall callback when the x is clicked', () => {
    const onClose = jest.fn();
    const highlight = render({ onClose: onClose });

    highlight.find(Button).simulate('click');

    expect(onClose).toHaveBeenCalled();
  });

  it('Should register render on mount', () => {
    const onClose = jest.fn();
    render({ onClose: onClose });

    expect(mockRegisterRender).toHaveBeenCalled();
  });

  it('Should register link on click', () => {
    const onClose = jest.fn();
    const highlight = render({ onClose: onClose });

    highlight.find('a').simulate('click');

    expect(mockRegisterCreateLinkClick).toHaveBeenCalled();
  });

  it('should not show the highlight if the highlight has been closed by the user', () => {
    const onClose = jest.fn();
    const highlight = shallow(
      <TeamMentionHighlight createTeamLink="somelink" onClose={onClose} />,
    );

    highlight.setState({
      isHighlightClosed: true,
    });

    expect(highlight).toMatchObject({});
  });
});
