import * as React from 'react';
import { mount } from 'enzyme';
import { ProviderFactory } from '@atlaskit/editor-common';
import { expect } from 'chai';

import Editor from '../../../../src/ui/Appearance/FullPage';

describe('@atlaskit/editor-core/editor/plugins/FullPage', () => {
  const providerFactory = new ProviderFactory();

  it('should have Editor component defined', () => {
    const editor = mount(
      <Editor editorDOMElement={<div />} providerFactory={providerFactory} />,
    );
    expect(editor).to.not.equal(undefined);
    editor.unmount();
    providerFactory.destroy();
  });
});
