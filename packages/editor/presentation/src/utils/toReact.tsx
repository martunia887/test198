import * as React from 'react';
import { List, Appear, ListItem } from 'spectacle';
import { nodeToReact } from '@atlaskit/renderer';
import { Node } from 'prosemirror-model';

export const toReact = (node: Node): React.ComponentType<any> => {
  const nodes: { [key: string]: React.ComponentType<any> } = {
    ...nodeToReact,
    bulletList: List,
    // @ts-ignore
    orderedList: ({ children }) => <List ordered>{children}</List>,
    listItem: ({ children }) => (
      <Appear>
        <ListItem>{children}</ListItem>
      </Appear>
    ),
  };

  return nodes[node.type.name];
};
