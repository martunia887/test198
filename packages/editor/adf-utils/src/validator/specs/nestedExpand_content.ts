export default {
  type: 'array',
  items: [
    [
      'paragraph_with_no_marks',
      'mediaSingle',
      'codeBlock_with_no_marks',
      'heading_with_no_marks',
      'rule',
      'mediaGroup',
      'decisionList',
      'taskList',
      'nestableTaskList',
      'extension',
      'blockCard',
    ],
  ],
  minItems: 1,
  allowUnsupportedBlock: true,
};
