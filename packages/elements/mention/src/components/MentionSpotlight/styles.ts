import styled from 'styled-components';
import { colors, gridSize, typography } from '@atlaskit/theme';

export const Actions = styled.div`
  justify-content: flex-end;
  margin-top: ${gridSize() * -1}px;
`;

export const Title = styled.div`
  ${typography.h400};
  margin-top: 0px;
`;

export const Heading = styled.div`
  margin-left: ${gridSize() * 2}px;
  margin-bottom: ${gridSize() * 0.5}px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colors.P50};
  overflow: hidden;
  line-height: 21px;
  padding-top: ${gridSize() * 2}px;
  padding-bottom: ${gridSize() * 2}px;
  padding-left: ${gridSize() * 2}px;
  padding-right: 0px;
`;

export const Content = styled.div`
  max-width: 290px;
  display: flex;
`;
export const Section = styled.div``;

export const Aside = styled.div``;

export const Body = styled.div`
  margin-left: ${gridSize() * 2}px;
  ${typography.p500};
`;

export const iconUrl =
  'https://ptc-directory-sited-static.us-east-1.staging.public.atl-paas.net/teams/avatars/2.svg';
