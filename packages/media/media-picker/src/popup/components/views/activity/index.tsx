import {
  State,
  ServiceFile,
  ServiceName,
  FileReference,
} from '../../../domain';
import { fileClick } from '../../../actions';
import { editorShowImage } from '../../../actions/editorShowImage';
import { editRemoteImage } from '../../../actions/editRemoteImage';
import { removeFileFromRecents } from '../../../actions/removeFileFromRecents';
import { Dispatch, connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { StatelessActivityView } from './view';
import { MediaClient } from '@atlaskit/media-client';

export interface ActivityViewOwnProps {
  readonly mediaClient: MediaClient;
  readonly recentsCollection: string;
}

export type ActivityViewProps = ActivityViewOwnProps &
  ActivityViewStateProps &
  ActivityViewDispatchProps &
  InjectedIntlProps;

export interface ActivityViewStateProps {
  isLoading: boolean;
  recents: State['recents'];
  selectedItems: State['selectedItems'];
  activities: State['activities'];
}

export interface ActivityViewDispatchProps {
  readonly onFileClick: (
    serviceFile: ServiceFile,
    serviceName: ServiceName,
  ) => void;
  readonly onEditorShowImage: (file: FileReference, dataUri: string) => void;
  readonly onEditRemoteImage: (
    file: FileReference,
    collectionName: string,
  ) => void;
  readonly removeFileFromRecents: (id: string, occurrenceKey?: string) => void;
}

const mapStateToProps = (state: State): ActivityViewStateProps => ({
  isLoading: state.view.isLoading,
  recents: state.recents,
  selectedItems: state.selectedItems,
  activities: state.activities,
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>,
): ActivityViewDispatchProps => ({
  onFileClick: (serviceFile, serviceName) =>
    dispatch(fileClick(serviceFile, serviceName)),
  onEditorShowImage: (file, dataUri) =>
    dispatch(editorShowImage(dataUri, file)),
  onEditRemoteImage: (file, collectionName) =>
    dispatch(editRemoteImage(file, collectionName)),
  removeFileFromRecents: (id, occurrenceKey) =>
    dispatch(removeFileFromRecents(id, occurrenceKey)),
});

export default connect<
  ActivityViewStateProps,
  ActivityViewDispatchProps,
  ActivityViewOwnProps,
  State
>(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(StatelessActivityView));
