import { Plugin, Transaction } from 'prosemirror-state';
import { findChildrenByMark } from 'prosemirror-utils';
import { Node, Mark } from 'prosemirror-model';
import { normalizeUrl } from '../utils';
import { nodesBetweenChanged } from '../../../utils';

const isHrefAndTextEqual = (node: Node) => {
  const mark = node.type.schema.marks.link.isInSet(node.marks);
  return mark ? mark.attrs.href === normalizeUrl(node.text!) : false;
};

const isInsideLinkMark = (node?: Node | null) =>
  !!(node && node.type.schema.marks.link.isInSet(node.marks));

// Given the position of a link in an old document, apply the
// transactions to determine the new position of this link.
// If the link was deleted during any transactions, return null
const getLinkPosAfterTransactions = (pos: number, txns: Transaction[]) => {
  let trPos = pos;
  for (const tr of txns) {
    trPos = tr.mapping.map(trPos);
    const { nodeAfter, textOffset } = tr.doc.resolve(trPos);
    trPos = trPos - textOffset;

    if (!isInsideLinkMark(nodeAfter)) {
      return null;
    }
  }
  return trPos;
};

export default new Plugin({
  appendTransaction(txns, oldState, newState) {
    console.log('transactions', txns);

    const { link } = newState.schema.marks;

    const updateTr = newState.tr;
    txns.forEach(tr => {
      nodesBetweenChanged(tr, (node, pos) => {
        console.log('node', node);

        if (link.isInSet(node.marks)) {
          console.log(node.marks);
        }

        return true;
      });
    });

    return;
  },
});
