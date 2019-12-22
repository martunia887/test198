import * as React from 'react';
import { mount } from 'enzyme';
import Tooltip from '@atlaskit/tooltip';

import EditorContext from '../../../ui/EditorContext';
import ToolbarHelp from '../../../ui/ToolbarHelp';

describe('@atlaskit/editor-core/ui/ToolbarHelp', () => {
  const mountWithEditorContext = (props = {}) => {
    return mount(
      <EditorContext>
        <ToolbarHelp {...props} />
      </EditorContext>,
    );
  };

  it('should use default values if no props passed in', () => {
    const toolbarHelpElem = mountWithEditorContext();

    const tooltip = toolbarHelpElem.find(Tooltip);
    expect(tooltip).toHaveLength(1);
    expect(tooltip.prop('position')).toEqual('left');
    expect(tooltip.html()).toContain('Open help dialog');
    toolbarHelpElem.unmount();
  });

  it('should use the title passed in from props', () => {
    const toolbarHelpElem = mountWithEditorContext({ title: 'Custom title' });

    expect(toolbarHelpElem.find(Tooltip).html()).toContain('Custom title');
    toolbarHelpElem.unmount();
  });

  it('should use the titlePosition passed in from props', () => {
    const toolbarHelpElem = mountWithEditorContext({ titlePosition: 'top' });

    expect(toolbarHelpElem.find(Tooltip).prop('position')).toEqual('top');
    toolbarHelpElem.unmount();
  });
});
