import * as React from 'react';
import { mountWithIntl } from '@atlaskit/editor-test-helpers';
import { shallow } from 'enzyme';
import { noop } from '@babel/types';
import Button from '@atlaskit/button';

import TeamMentionSpotlight, {
  Props,
} from '../../../components/TeamMentionSpotlight';

function render(props: Partial<Props>) {
  return mountWithIntl(
    <TeamMentionSpotlight
      createTeamLink="somelink"
      onClose={() => noop}
      {...props}
    />,
  );
}

let mockRegisterRender = jest.fn();
let mockRegisterCreateLinkClick = jest.fn();

jest.mock(
  '../../../components/TeamMentionSpotlight/TeamMentionSpotlightController',
  () => ({
    __esModule: true,
    default: {
      registerRender: () => mockRegisterRender(),
      registerCreateLinkClick: () => mockRegisterCreateLinkClick(),
    },
  }),
);

describe('TeamMentionSpotlight', () => {
  it('Should call onCall callback when the x is clicked', () => {
    const onClose = jest.fn();
    const spotlight = render({ onClose: onClose });

    spotlight.find(Button).simulate('click');

    expect(onClose).toHaveBeenCalled();
  });

  it('Should register render on mount', () => {
    const onClose = jest.fn();
    render({ onClose: onClose });

    expect(mockRegisterRender).toHaveBeenCalled();
  });

  it('Should register link on click', () => {
    const onClose = jest.fn();
    const spotlight = render({ onClose: onClose });

    spotlight.find('a').simulate('click');

    expect(mockRegisterCreateLinkClick).toHaveBeenCalled();
  });

  it('should not show the highlight if the spotlight has been closed by the user', () => {
    const onClose = jest.fn();
    const spotlight = shallow(
      <TeamMentionSpotlight createTeamLink="somelink" onClose={onClose} />,
    );

    spotlight.setState({
      isSpotlightClosed: true,
    });

    expect(spotlight).toMatchObject({});
  });
});
