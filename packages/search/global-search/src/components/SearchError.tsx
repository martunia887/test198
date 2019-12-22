import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import { gridSize, math } from '@atlaskit/theme';

import ErrorImage from '../assets/ErrorImage';
import { messages } from '../messages';

const ErrorWrapper = styled.div`
  text-align: center;
  margin-top: ${math.multiply(gridSize, 4)}px;
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
