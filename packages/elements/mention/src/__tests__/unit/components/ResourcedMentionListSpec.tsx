import * as React from 'react';
import { shallow } from 'enzyme';
import { MockMentionResource } from '../../../../../util-data-test/src/mention/MockMentionResource';
import MentionList from '../../..//components/MentionList';
import ResourcedMentionList, {
  Props,
} from '../../../components/ResourcedMentionList';

let mockRegisterClosed = jest.fn();
let mockIsHighlightEnabled = jest.fn();

jest.mock(
  '../../../components/TeamMentionHighlight/TeamMentionHighlightController',
  () => ({
    __esModule: true,
    default: {
      registerClosed: () => mockRegisterClosed(),
      isHighlightEnabled: () => mockIsHighlightEnabled(),
    },
  }),
);

describe('ResourcedMentionList', () => {
  const mockResourceProvider = new MockMentionResource({
    minWait: 0,
    maxWait: 0,
  });

  const defaultProps: Props = {
    resourceProvider: mockResourceProvider,
  };

  function render(props?: Partial<Props>) {
    return shallow(<ResourcedMentionList {...defaultProps} {...props} />);
  }

  it('should show the highlight if conditions are just right', () => {
    mockIsHighlightEnabled.mockReturnValue(true);
    const element = render({ isTeamMentionHighlightEnabled: true });
    element.setState({ mentions: [{ id: 'someUser' }] });

    const spotlight = element.find(MentionList).props().initialHighlightElement;
    expect(spotlight).toBeDefined();
  });

  it('should not show the highlight if there are no users', () => {
    mockIsHighlightEnabled.mockReturnValue(true);
    const element = render({ isTeamMentionHighlightEnabled: true });
    element.setState({ mentions: [] });

    const spotlight = element.find(MentionList).props().initialHighlightElement;
    expect(spotlight).toBeNull();
  });

  it('should not show the highlight if the spotlight flag is disabled', () => {
    mockIsHighlightEnabled.mockReturnValue(true);
    const element = render({ isTeamMentionHighlightEnabled: false });
    element.setState({ mentions: [{ id: 'someUser' }] });

    const spotlight = element.find(MentionList).props().initialHighlightElement;
    expect(spotlight).toBeNull();
  });

  it('should not show the highlight if the user has opted out', () => {
    mockIsHighlightEnabled.mockReturnValue(false);
    const element = render({ isTeamMentionHighlightEnabled: true });
    element.setState({ mentions: [{ id: 'someUser' }] });

    const spotlight = element.find(MentionList).props().initialHighlightElement;
    expect(spotlight).toBeNull();
  });

  it('should register a closed event when users closes', () => {
    mockIsHighlightEnabled.mockReturnValue(true);
    const element = render({ isTeamMentionHighlightEnabled: true });
    element.setState({ mentions: [{ id: 'someUser' }] });

    const spotlight = element.find(MentionList).props().initialHighlightElement;
    spotlight && spotlight.props.onClose();

    expect(mockRegisterClosed).toHaveBeenCalled();
  });
});
