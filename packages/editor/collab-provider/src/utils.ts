import { AllSelection, NodeSelection, Selection } from 'prosemirror-state';

import { SendableSelection } from './types';

function isAllSelection(selection: Selection) {
  return selection instanceof AllSelection;
}

function isNodeSelection(selection: Selection) {
  return selection instanceof NodeSelection;
}

export const getSendableSelection = (
  selection: Selection,
): SendableSelection => {
  /**
   * <kbd>CMD + A</kbd> triggers a AllSelection
   * <kbd>escape</kbd> triggers a NodeSelection
   */
  return {
    type: 'textSelection',
    anchor: selection.anchor,
    head:
      isAllSelection(selection) || isNodeSelection(selection)
        ? selection.head - 1
        : selection.head,
  };
};

const participants = [
  'Awilda Mcentire',
  'Katie Iddings',
  'Serafina Mcdowell',
  'Eun Knopp',
  'Walker Reighard',
  'Keely Muth',
  'Allie April',
  'Rosamond Paton',
  'Lashawnda Peppard',
  'Hubert Feingold',
  'Idalia Mcquaig',
  'Wyatt Byer',
  'Genevieve Reeder',
  'Dona Elton',
  'Jerilyn Holte',
  'Salina Erhardt',
  'Velda Latour',
  'Regina Richer',
  'Natisha Tiger',
  'Glynda Stuckey',
  'Wilson Woodberry',
  'Elvie Furtado',
  'Lasandra Palmatier',
  'Louise Mijares',
  'Herma Vanleer',
  'Titus Plante',
  'James Fiscus',
  'Ina Ramero',
  'Jeanene Bernabe',
  'Lida Lepine',
  'Rosalina Palka',
  'Dayle Grossi',
  'Zack Leister',
  'Isobel Fay',
  'Elouise Kluge',
  'Twyla Machin',
  'Diane Herrington',
  'Fumiko Elders',
  'Kennith Howe',
  'Doloris Mccollom',
  'Daryl Wherry',
  'Sade Albury',
  'Roy Cork',
  'Hunter Hultgren',
  'Mi Miley',
  'Isabelle Halperin',
  'Kayla Starke',
  'Allyson Woomer',
  'Sirena Politte',
  'Patricia Scovil',
];

function hashCode(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;

  return Math.abs(h);
}

export const getParticipant = (userId: string) => {
  // const id = +userId.split('/')[1];
  // console.log({userId});
  const id = hashCode(userId);
  // eslint-disable-next-line no-bitwise
  const name = participants[(id | 0) % participants.length];
  return {
    userId,
    name,
    avatar: `https://api.adorable.io/avatars/80/${name.replace(/\s/g, '')}.png`,
    email: `${name.replace(/\s/g, '').toLocaleLowerCase()}@atlassian.com`,
  };
};

export const createLogger = (prefix: string, color: string = 'blue') => (
  msg: string,
  data: any = null,
) => {
  // eslint-disable-next-line no-console
  console.log(`%c${prefix}: ${msg}`, `color: ${color}; font-weight: bold`);
  if (data) {
    // eslint-disable-next-line no-console
    console.log(data);
  }
};
