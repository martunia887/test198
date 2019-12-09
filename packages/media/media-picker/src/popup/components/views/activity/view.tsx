import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  CardEvent,
  CardEventHandler,
  CardAction,
  Card,
} from '@atlaskit/media-card';
import { FileDetails, FileItem } from '@atlaskit/media-client';
import { messages } from '@atlaskit/media-ui';
import AvatarGroup from '@atlaskit/avatar-group';

import { ActivityViewProps } from '.';
import {
  CardWrapper,
  CardsWrapper,
  RecentUploadsTitle,
} from '../upload/styled';
import { isWebGLAvailable } from '../../../tools/webgl';
import { createDeleteCardAction, createEditCardAction } from '../upload/upload';
import {
  ActivityWrapper,
  ActivityRow,
  ActivityObjectIcon,
  ActivityObjectName,
  ActivityObjectContainer,
  ActivityObjectDetail,
  WorkWrapper,
  ActivityExtra,
} from './styled';
import { ActivityContributorConnection } from '../../../domain/activities';
import activityMessages from './messages';

interface IterableCard {
  key: string;
  card: JSX.Element;
}

interface AkAvatarGroupProps {
  accountID: string;
  key: string;
  name?: string;
  src: string;
}

export class StatelessActivityView extends React.Component<ActivityViewProps> {
  private renderCards() {
    const recentFilesCards = this.recentFilesCards();
    return recentFilesCards.map(({ key, card }) => (
      <CardWrapper tabIndex={0} key={key}>
        {card}
      </CardWrapper>
    ));
  }

  private recentFilesCards(): IterableCard[] {
    const {
      mediaClient,
      recents,
      recentsCollection,
      selectedItems,
      onFileClick,
      onEditRemoteImage,
      intl: { formatMessage },
    } = this.props;
    const { items } = recents;
    const selectedRecentFiles = selectedItems
      .filter(item => item.serviceName === 'recent_files')
      .map(item => item.id);

    const onClick = ({ mediaItemDetails }: CardEvent) => {
      const fileDetails = mediaItemDetails as FileDetails;
      if (fileDetails) {
        const { id } = fileDetails;

        onFileClick(
          {
            id,
            date: 0,
            name: fileDetails.name || '',
            mimeType: fileDetails.mimeType || '',
            size: fileDetails.size || 0,
          },
          'recent_files',
        );
      }
    };

    const editHandler: CardEventHandler = (mediaItem?: FileItem) => {
      if (mediaItem && mediaItem.type === 'file') {
        const { id, name } = mediaItem.details;

        if (isWebGLAvailable()) {
          onEditRemoteImage(
            {
              id,
              name: name || '',
            },
            recentsCollection,
          );
        } else {
          // WebGL not available - show warning flag
        }
      }
    };

    return items.slice(0, 4).map(item => {
      const { id, occurrenceKey, details } = item;
      const selected = selectedRecentFiles.indexOf(id) > -1;
      const actions: CardAction[] = [
        createDeleteCardAction(() => {
          this.setState({ deletionCandidate: { id, occurrenceKey } });
        }),
      ];

      if ((details as FileDetails).mediaType === 'image') {
        actions.unshift(
          createEditCardAction(editHandler, formatMessage(messages.annotate)),
        );
      }

      return {
        key: `${occurrenceKey}-${id}`,
        card: (
          <Card
            mediaClientConfig={mediaClient.config}
            identifier={{
              id,
              mediaItemType: 'file',
              collectionName: recentsCollection,
            }}
            dimensions={{ width: 162, height: 108 }}
            selectable={true}
            selected={selected}
            onClick={onClick}
            actions={actions}
            testId="media-picker-recent-media-card"
          />
        ),
      };
    });
  }

  private renderWork() {
    const { activities } = this.props;
    return (
      activities &&
      activities.workedOn &&
      activities.workedOn.nodes &&
      activities.workedOn.nodes
        .slice(0, 9)
        .map(({ object, containers, contributors, eventType }) => {
          console.log({ containers });
          return (
            <ActivityRow href={object.url} onClick={this.onWorkClick}>
              <ActivityObjectIcon alt="" src={object.iconURL} />
              <ActivityObjectDetail>
                <ActivityObjectName data-test-id="objectName">
                  {object.name}
                </ActivityObjectName>
                <ActivityObjectContainer>
                  {containers && containers.length > 0
                    ? containers[containers.length - 1].name
                    : ''}
                </ActivityObjectContainer>
              </ActivityObjectDetail>
              <ActivityExtra>
                <FormattedMessage {...activityMessages[eventType]} />
              </ActivityExtra>
              <AvatarGroup
                maxCount={4}
                data={this.transformContributorData(contributors || [])}
              />
            </ActivityRow>
          );
        })
    );
  }

  private onWorkClick(evt: React.MouseEvent) {
    evt.preventDefault();
  }

  private transformContributorData(
    contributors: ActivityContributorConnection[],
  ): AkAvatarGroupProps[] {
    return contributors.map(({ profile }) => ({
      accountID: profile.accountId,
      key: profile.accountId,
      name: profile.name,
      src: profile.picture,
    }));
  }

  render() {
    console.log({ props: this.props });
    return (
      <ActivityWrapper>
        <RecentUploadsTitle style={{ paddingTop: '4px' }}>
          Recent Files
        </RecentUploadsTitle>
        <CardsWrapper>{this.renderCards()}</CardsWrapper>
        <RecentUploadsTitle>Your Work</RecentUploadsTitle>
        <WorkWrapper>{this.renderWork()}</WorkWrapper>
      </ActivityWrapper>
    );
  }
}
