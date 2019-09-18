import React from 'react';
import { mount } from 'enzyme';
import {
  storyMediaProviderFactory,
  sleep,
} from '@atlaskit/editor-test-helpers';
import MobileEditor from '../../../src/editor/mobile-editor-element';

export async function mountEditor() {
  const elem = document.createElement('div');
  elem.setAttribute('id', 'editor');
  const place = document.body.appendChild(elem);
  const mediaProvider = storyMediaProviderFactory({});
  await mediaProvider;
  const wrapper = mount(<MobileEditor mediaProvider={mediaProvider} />, {
    attachTo: place,
  });

  const editor = wrapper.find('EditorWithState');
  await (editor.props() as any).media.provider;

  await sleep(100);
  return wrapper;
}
