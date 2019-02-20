import * as React from 'react';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import {
  mountWithIntlContext,
  fakeMediaClient,
  asMock,
} from '@atlaskit/media-test-helpers';
import {
  MediaClient,
  MediaItemType,
  MediaCollectionItem,
} from '@atlaskit/media-client';
import Spinner from '@atlaskit/spinner';
import ArrowRightCircleIcon from '@atlaskit/icon/glyph/chevron-right-circle';
import { Collection, Props, State } from '../../../newgen/collection';
import { ErrorMessage } from '../../../newgen/error';
import { Identifier } from '../../../newgen/domain';
import { List } from '../../../newgen/list';

const collectionName = 'my-collection';

const identifier = {
  id: 'some-id',
  occurrenceKey: 'some-custom-occurrence-key',
  type: 'file' as MediaItemType,
};

const identifier2 = {
  id: 'some-id-2',
  occurrenceKey: 'some-custom-occurrence-key-2',
  type: 'file' as MediaItemType,
};

const mediaCollectionItems: MediaCollectionItem[] = [
  {
    id: identifier.id,
    occurrenceKey: identifier.occurrenceKey,
    insertedAt: 1,
    type: 'file',
    details: {
      artifacts: {},
      mediaType: 'image',
      mimeType: '',
      name: '',
      processingStatus: 'succeeded',
      size: 1,
    },
  },
  {
    type: 'file',
    id: identifier2.id,
    occurrenceKey: identifier2.occurrenceKey,
    insertedAt: 1,
    details: {
      artifacts: {},
      mediaType: 'image',
      mimeType: '',
      name: '',
      processingStatus: 'succeeded',
      size: 1,
    },
  },
];

function createFixture(
  mediaClient: MediaClient,
  identifier: Identifier,
  onClose?: () => {},
) {
  const el = mountWithIntlContext<Props, State>(
    <Collection
      defaultSelectedItem={identifier}
      collectionName={collectionName}
      mediaClient={mediaClient}
      onClose={onClose}
      pageSize={999}
    />,
  );
  return el;
}

describe('<Collection />', () => {
  const setupMediaClient = () => {
    const subject = new Subject();
    const mediaClient = fakeMediaClient();
    asMock(mediaClient.collection.getItems).mockReturnValue(subject);
    return { mediaClient, subject };
  };

  it('should show a spinner while requesting items', () => {
    const mediaClient = fakeMediaClient();
    asMock(mediaClient.collection.getItems).mockReturnValue(Observable.empty());
    const el = createFixture(mediaClient, identifier);
    expect(el.find(Spinner)).toHaveLength(1);
  });

  it('should fetch collection items', () => {
    const mediaClient = fakeMediaClient();
    createFixture(mediaClient, identifier);
    expect(mediaClient.collection.getItems).toHaveBeenCalledTimes(1);
    expect(mediaClient.collection.getItems).toHaveBeenCalledWith(
      'my-collection',
      {
        limit: 999,
      },
    );
  });

  it('should show an error if items failed to be fetched', () => {
    const mediaClient = fakeMediaClient();
    asMock(mediaClient.collection.getItems).mockReturnValue(
      new Observable(observer => observer.error()),
    );
    const el = createFixture(mediaClient, identifier);
    el.update();
    const errorMessage = el.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toContain(
      'Something went wrong.It might just be a hiccup.',
    );
  });

  it('should reset the component when the collection prop changes', () => {
    const mediaClient = fakeMediaClient();
    const el = createFixture(mediaClient, identifier);
    expect(mediaClient.collection.getItems).toHaveBeenCalledTimes(1);
    el.setProps({ collectionName: 'other-collection' });
    expect(mediaClient.collection.getItems).toHaveBeenCalledTimes(2);
  });

  it('should reset the component when the mediaClient prop changes', () => {
    const mediaClient = fakeMediaClient();
    const el = createFixture(mediaClient, identifier);
    expect(mediaClient.collection.getItems).toHaveBeenCalledTimes(1);

    const mediaClient2 = fakeMediaClient();
    el.setProps({ mediaClient: mediaClient2 });

    expect(mediaClient.collection.getItems).toHaveBeenCalledTimes(1);
    expect(mediaClient2.collection.getItems).toHaveBeenCalledTimes(1);
  });

  it('should restore PENDING state when component resets', () => {
    const { mediaClient, subject } = setupMediaClient();
    const el = createFixture(mediaClient, identifier);
    expect(el.state().items.status).toEqual('PENDING');
    subject.next(mediaCollectionItems);
    expect(el.state().items.status).toEqual('SUCCESSFUL');

    el.setProps({ collectionName: 'other-collection' });
    expect(el.state().items.status).toEqual('PENDING');
  });

  it('MSW-720: adds the collectionName to all identifiers passed to the List component', () => {
    const { mediaClient, subject } = setupMediaClient();
    const el = createFixture(mediaClient, identifier);
    subject.next(mediaCollectionItems);
    el.update();
    const listProps = el.find(List).props();
    expect(listProps.defaultSelectedItem.collectionName).toEqual(
      collectionName,
    );
    listProps.items.forEach((item: Identifier) => {
      expect(item.collectionName).toEqual(collectionName);
    });
  });

  describe('Next page', () => {
    it('should load next page if we instantiate the component with the last item of the page as selectedItem', () => {
      const { mediaClient, subject } = setupMediaClient();
      createFixture(mediaClient, identifier2);
      subject.next(mediaCollectionItems);
      expect(mediaClient.collection.getItems).toHaveBeenCalledTimes(1);
      expect(mediaClient.collection.loadNextPage).toHaveBeenCalled();
    });

    it('should NOT load next page if we instantiate the component normally', () => {
      const mediaClient = fakeMediaClient();
      createFixture(mediaClient, identifier);
      expect(mediaClient.collection.getItems).toHaveBeenCalledTimes(1);
      expect(mediaClient.collection.loadNextPage).not.toHaveBeenCalled();
    });

    it('should load next page if we navigate to the last item of the list', () => {
      const { mediaClient, subject } = setupMediaClient();
      const el = createFixture(mediaClient, identifier);
      subject.next(mediaCollectionItems);
      el.update();

      expect(mediaClient.collection.loadNextPage).not.toHaveBeenCalled();
      el.find(ArrowRightCircleIcon).simulate('click');
      expect(mediaClient.collection.loadNextPage).toHaveBeenCalled();
    });
  });
});
