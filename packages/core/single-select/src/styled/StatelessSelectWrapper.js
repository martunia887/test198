// @flow
import styled from '@emotion/styled';

const StatelessSelectWrapper = styled.div`
  display: ${props => (props.shouldFitContainer ? 'block' : 'inline-block')};
`;

StatelessSelectWrapper.displayName = 'SingleSelectStatelessSelectWrapper';

export default StatelessSelectWrapper;
