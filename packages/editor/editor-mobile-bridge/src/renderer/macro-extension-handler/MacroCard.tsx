import * as React from 'react';
import { MacroCardType } from './types';
import { macroIcon } from './MacroIcon';
import {
  Card,
  Icon,
  Content,
  ContentWrapper,
  Error,
  ErrorMessage,
  CardBody,
  SecondaryAction,
  ErrorContent,
} from './styles';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { colors } from '@atlaskit/theme';

export const MacroCard = ({
  macroName,
  iconUrl,
  action,
  errorMessage,
  extensionKey,
  loading,
  secondaryAction,
}: MacroCardType) => (
  <Card>
    <Icon>{macroIcon(iconUrl, extensionKey, macroName)}</Icon>
    <CardBody>
      <ContentWrapper>
        <Content>{macroName}</Content>
        {action}
      </ContentWrapper>
      {errorMessage && !loading ? (
        <Error>
          <ErrorContent>
            <ErrorIcon
              primaryColor={colors.R300}
              size="medium"
              label={errorMessage}
            />
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </ErrorContent>
          <SecondaryAction>{secondaryAction}</SecondaryAction>
        </Error>
      ) : null}
    </CardBody>
  </Card>
);
