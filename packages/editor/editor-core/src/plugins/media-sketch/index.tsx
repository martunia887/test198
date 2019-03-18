import * as React from 'react';
import { EditorPlugin } from '../../types';
import { mediaSingle } from '@atlaskit/adf-schema';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import MediaServicesAnnotateIcon from '@atlaskit/icon/glyph/media-services/annotate';

const mediaSketchPlugin: EditorPlugin = {
  nodes() {
    return [{ name: 'mediaSingle', node: mediaSingle }];
  },

  pmPlugins() {
    return [];
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.mediaSketch),
        keywords: ['sketch', 'draw', 'annotate', 'drawing'],
        priority: 1200,
        icon: () => (
          <MediaServicesAnnotateIcon
            label={formatMessage(messages.mediaSketch)}
          />
        ),
        action(insert, state) {
          return insert(state.schema.nodes.rule.createChecked());
        },
      },
    ],
  },
};

export default mediaSketchPlugin;
