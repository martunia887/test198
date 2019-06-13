// import { InlineCommentsState } from '../pm-plugins/main';
// import { Command } from '../../../types/command';
// import { EditorState, Transaction } from 'prosemirror-state';

// export const updateInlineComments = (panelType: PanelType): Command => (
//   state,
//   dispatch,
// ) => {
//   const {
//     schema: { nodes },
//     tr,
//   } = state;

//   if (dispatch) {
//     dispatch(
//       addAnalytics(
//         setParentNodeMarkup(nodes.panel, null, { panelType })(tr).setMeta(
//           pluginKey,
//           { activePanelType: panelType },
//         ),
//         payload,
//       ),
//     );
//   }
//   return true;
// };
