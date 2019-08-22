import * as React from 'react';
import HyperlinkAddToolbar, { LinkInputType } from './HyperlinkAddToolbar';
import { ProviderFactory, WithProviders } from '@atlaskit/editor-common';
import { DispatchAnalyticsEvent } from '../../../analytics';

export interface Props {
  providerFactory: ProviderFactory;
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
  onBlur?: (
    type: string,
    url: string,
    text: string,
    isTabPressed?: boolean,
  ) => void;
  onSubmit: (href: string, text: string, type?: LinkInputType) => void;
  displayText: string;
  displayUrl?: string;
}

export default class Toolbar extends React.PureComponent<Props, {}> {
  render() {
    const {
      onSubmit,
      onBlur,
      displayText,
      displayUrl,
      dispatchAnalyticsEvent,
      providerFactory,
    } = this.props;
    return (
      <WithProviders
        providers={['activityProvider']}
        providerFactory={providerFactory}
        renderNode={({ activityProvider }) => (
          <HyperlinkAddToolbar
            provider={activityProvider}
            onSubmit={onSubmit}
            onBlur={onBlur}
            dispatchAnalyticsEvent={dispatchAnalyticsEvent}
            displayText={displayText || ''}
            displayUrl={displayUrl}
          />
        )}
      />
    );
  }
}
