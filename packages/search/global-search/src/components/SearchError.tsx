import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@atlaskit/button';
import { gridSize } from '@atlaskit/theme/constants';
import { multiply } from '@atlaskit/theme/math';
import styled from 'styled-components';
import { messages } from '../messages';
import ErrorImage from '../assets/ErrorImage';

const ErrorWrapper = styled.div`
  text-align: center;
  margin-top: ${multiply(gridSize, 4)}px;
`;

export interface Props {
  onRetryClick: (e?: React.SyntheticEvent<HTMLElement>) => void;
}

export default class SearchError extends React.Component<Props> {
  render() {
    const { onRetryClick } = this.props;

    return (
      <ErrorWrapper>
        <ErrorImage />
        <h3>
          <FormattedMessage {...messages.search_error_title} />
        </h3>
        <p>
          <span>
            <FormattedMessage
              {...messages.search_error_body}
              values={{
                link: (
                  <Button
                    appearance="link"
                    spacing="none"
                    onClick={onRetryClick}
                  >
                    <FormattedMessage {...messages.search_error_body_link} />
                  </Button>
                ),
              }}
            />
          </span>
        </p>
      </ErrorWrapper>
    );
  }
}
