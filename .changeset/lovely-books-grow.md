---
'@atlaskit/editor-core': patch
---

ED-8242 Fix exception "NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node."

This is a race condition which occurs when ProseMirror removes the parent container of a ReactNodeView before React removes the child when unmounting
