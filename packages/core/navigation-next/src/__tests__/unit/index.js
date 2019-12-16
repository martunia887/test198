// @flow
import { Group } from '@atlaskit/navigation-next';

jest.mock('@atlaskit/navigation-next', () => {
  console.log('mock factory');

  const mod = jest.requireActual('@atlaskit/navigation-next');

  console.log('after requireActual');

  mod.Group;

  return mod;
});

it('passes witout blowing up', () => {
  expect(Group).toBeDefined();
});
