import { traverse, ADFNode } from './traverse';

const ANONYMISED_TEXT = 'Content is anonymised';
const ANONYMISED_URL = 'https://anonymised.atlassian.com';
const ANONYMISED_ID = '123456789';
const ANONYMISED_OBJECT = {
  message: 'The content of this object is anonymised',
};

export function anonymise(adf: ADFNode): ADFNode {
  return traverse(adf, {
    any: node => {
      return {
        ...node,
        ...(node.text ? { text: ANONYMISED_TEXT } : {}),
        ...(node.attrs ? { attrs: commonAttributeAnonymiser(node.attrs) } : {}),
      };
    },
  }) as ADFNode;
}

function commonAttributeAnonymiser(attrs: { [name: string]: any }) {
  return {
    ...attrs,
    ...(attrs.id ? { id: ANONYMISED_ID } : {}),
    ...(attrs.text ? { text: ANONYMISED_TEXT } : {}),
    ...(attrs.url ? { url: ANONYMISED_URL } : {}),
    ...(attrs.parameters ? { parameters: ANONYMISED_OBJECT } : {}),
    ...(attrs.shortName ? { shortName: ANONYMISED_TEXT } : {}),
    ...(attrs.collection ? { collection: ANONYMISED_ID } : {}),
    ...(attrs.occurrenceKey ? { occurrenceKey: ANONYMISED_ID } : {}),
  };
}
