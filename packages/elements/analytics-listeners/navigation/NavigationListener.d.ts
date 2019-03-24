import * as React from 'react';
import { ListenerProps } from '../types';
import { UIAnalyticsEventHandlerSignature } from '@atlaskit/analytics-next-types';
export default class NavigationListener extends React.Component<ListenerProps> {
    listenerHandler: UIAnalyticsEventHandlerSignature;
    render(): JSX.Element;
}
