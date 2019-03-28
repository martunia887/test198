import * as React from 'react';
import { mount } from 'enzyme';
// import InlineEdit from '../../InlineEdit';
import InlineEditableTextfield from '../../InlineEditableTextfield';

const noop = () => {};

describe('@atlaskit/inline-edit core', () => {
  it('should render a label when label prop is passed', () => {
    const wrapper = mount(
      <InlineEditableTextfield onConfirm={noop} defaultValue="" label="test" />,
    );
    expect(wrapper.find('label').length).toBe(1);
  });

  it('should not render a label when label prop is not passed', () => {
    const wrapper = mount(
      <InlineEditableTextfield onConfirm={noop} defaultValue="" />,
    );
    expect(wrapper.find('label').length).toBe(0);
  });

  // it('should keep edit view open on blur when keepEditViewOpenOnBlur prop is true', () => {
  //   const wrapper = mount(
  //     <InlineEditableTextfield
  //       onConfirm={noop}
  //       defaultValue=""
  //       startWithEditViewOpen
  //       // keepEditViewOpenOnBlur
  //     />
  //   );
  //   wrapper.simulate('blur');
  //   expect(wrapper.find('input').length).toBe(0);
  // });

  //   it('hideActionButtons');

  //   it('readViewFitContainerWidth');

  //   it('readView');

  //   it('editButton next to readview');

  //   it('editView + isEditing + defaultValue');

  //   it('onConfirm');

  //   it('startWithEditViewOpen');

  //   it('validate');

  //   it('click readview')

  //   it('enter in readview');

  //   it('click confirm button')

  //   it('click cancel button')

  //   it('enter in textfield')

  //   it('esc in textfield')

  //   it('confirm on blur')

  //   it('darken on hover')

  //   it('focus on edit button')

  //   it('stay in edit view on tab to confirm button and cancel button')

  //   it('should have aria-tags');

  //   it('not cause console errors')
});

// describe('@atlaskit/inline-editable-textfield', () => {
//   it('emptyValueText')

//   it('not cause console errors')

// })

// describe('@atlaskit/inline-edit', () => {
//   it('readView');

//   it('editView');
// });

// describe('uncontrolled?')

// const noop = () => {};
// const Input = props => <input {...props} onChange={noop} />;

// const defaultProps = {
//   isEditing: false,
//   onConfirm: noop,
//   readView: 'readView',
//   editView: <Input value="test" />,
// };

// describe('@atlaskit/inline-edit', () => {
//   it('should render read view with EditButton as a sibling', () => {
//     const readView = <span>read</span>;
//     const wrapper = mount(<InlineEdit {...defaultProps} readView={readView} />);
//     expect(wrapper.find(FieldBase).length).toBe(1);
//     const fieldBase = wrapper.find(FieldBase);
//     expect(fieldBase.contains(readView)).toBe(true);
//   });

//   it('should render edit view and not read view when in editing mode', () => {
//     const editView = <span>edit</span>;
//     const wrapper = mount(
//       <InlineEditUncontrolled
//         {...defaultProps}
//         isEditing
//         editView={editView}
//       />,
//     );
//     expect(wrapper.find(FieldBase).length).toBe(1);
//     const fieldBase = wrapper.find(FieldBase);
//     expect(fieldBase.contains(editView)).toBe(true);
//   });

//   describe('onEditRequested', () => {
//     it('should be called when the read view is clicked', () => {
//       const spy = jest.fn();
//       const wrapper = mount(
//         <InlineEditUncontrolled {...defaultProps} onEditRequested={spy} />,
//       );
//       wrapper.find(FieldBase).simulate('click');
//       expect(spy).toHaveBeenCalled();
//     });

//     it('should not be called when the edit view is clicked', () => {
//       const spy = jest.fn();
//       const wrapper = mount(
//         <InlineEditUncontrolled
//           {...defaultProps}
//           isEditing
//           onEditRequested={spy}
//         />,
//       );
//       wrapper.find(FieldBase).simulate('click');
//       expect(spy).not.toHaveBeenCalled();
//     });
//   });

//   describe('onConfirm', () =>
//     it('should be called when confirmation button is clicked', () => {
//       const spy = jest.fn();
//       const wrapper = mount(
//         <InlineEditUncontrolled {...defaultProps} isEditing onConfirm={spy} />,
//       );
//       wrapper
//         .find(Button)
//         .first()
//         .simulate('click');
//       expect(spy).toHaveBeenCalled();
//     }));

//   describe('onCancel', () =>
//     it('should be called when cancel button is clicked', () => {
//       const spy = jest.fn();
//       const wrapper = mount(
//         <InlineEditUncontrolled {...defaultProps} isEditing onCancel={spy} />,
//       );
//       wrapper
//         .find(Button)
//         .last()
//         .simulate('click');
//       expect(spy).toHaveBeenCalled();
//     }));

//   describe('label', () => {
//     it('should set parameter into FieldBase', () => {
//       expect(
//         shallow(<InlineEditUncontrolled {...defaultProps} label="test" />)
//           .find(Label)
//           .prop('label'),
//       ).toBe('test');
//     });

//     it('should set both isLabelHidden and label parameter into FieldBase', () => {
//       const wrapper = shallow(
//         <InlineEditUncontrolled {...defaultProps} label="test" isLabelHidden />,
//       );
//       const fieldBase = wrapper.find(Label);
//       expect(fieldBase.prop('label')).toBe('test');
//       expect(fieldBase.prop('isLabelHidden')).toBe(true);
//     });

//     it('it should not call onClick if is read only', () => {
//       const spy = jest.fn();
//       const wrapper = mount(
//         <InlineEditUncontrolled
//           {...defaultProps}
//           label="test"
//           onEditRequested={spy}
//           editView={undefined}
//         />,
//       );
//       const label = wrapper.find(Label);
//       /**
//        * We cannot use simulate here since the node that has the event handler is inside Label.
//        *
//        * Otherwise we will be exposing implementation details from FieldBase and also
//        * we would be coupling this test to the current structure of FieldBase.
//        *
//        * So instead, we find the first node inside Label that has `onClick` and that it's not
//        * the Label itself, and then we simulate the event on that node.
//        **/
//       const onClickNode = label
//         .findWhere(n => n.prop('onClick') && !n.find(Label).exists())
//         .at(0);
//       onClickNode.simulate('click');
//       expect(spy).not.toHaveBeenCalled();
//     });
//   });

//   describe('isWaiting', () => {
//     describe('when isEditing is false', () =>
//       it('FieldBase should not have isLoading prop', () => {
//         const wrapper = mount(
//           <InlineEditUncontrolled {...defaultProps} isWaiting />,
//         );
//         expect(wrapper.find(FieldBase).prop('isLoading')).toBe(false);
//       }));

//     describe('when isEditing is true', () => {
//       let wrapper;

//       beforeEach(() => {
//         wrapper = shallow(
//           <InlineEditUncontrolled {...defaultProps} isWaiting isEditing />,
//         );
//       });

//       it('FieldBase should have prop isLoading', () =>
//         expect(wrapper.find(FieldBase).prop('isLoading')).toBe(true));

//       it('should disable field base', () =>
//         expect(wrapper.find(FieldBase).prop('isDisabled', true)).not.toBe(
//           undefined,
//         ));
//     });
//   });

//   describe('disableEditViewFieldBase', () => {
//     it('should not wrap editView in a FieldBase when set to true', () => {
//       const wrapper = mount(
//         <InlineEditUncontrolled
//           {...defaultProps}
//           isEditing
//           disableEditViewFieldBase
//         />,
//       );

//       expect(wrapper.find(FieldBase).length).toBe(0);
//     });

//     it('should wrap editView in a FieldBase when set to false', () => {
//       const wrapper = mount(
//         <InlineEditUncontrolled
//           {...defaultProps}
//           isEditing
//           disableEditViewFieldBase={false}
//         />,
//       );

//       expect(wrapper.find(FieldBase).length).toBe(1);
//     });

//     it('should default to false', () => {
//       const wrapper = mount(
//         <InlineEditUncontrolled {...defaultProps} isEditing />,
//       );

//       expect(wrapper.prop('disableEditViewFieldBase')).toBe(false);
//     });
//   });

//   describe('invalidMessage prop', () => {
//     it('should be reflected to the FieldBase', () => {
//       expect(
//         shallow(
//           <InlineEditUncontrolled {...defaultProps} invalidMessage="test" />,
//         )
//           .find(FieldBase)
//           .props().invalidMessage,
//       ).toBe('test');
//     });
//   });

//   describe('isInvalid prop', () => {
//     it('should be reflected to the FieldBase', () => {
//       expect(
//         shallow(<InlineEditUncontrolled {...defaultProps} isInvalid />)
//           .find(FieldBase)
//           .props().isInvalid,
//       ).toBe(true);
//     });
//   });

//   /* This suite can be enabled when we move to styled components v2 (new repo?) and we
//    * can properly use jest-styled-components without disabling mount(...) calls
//    */
//   // eslint-disable-next-line jest/no-disabled-tests
//   describe('field width', () => {
//     it('should not stretch to container width in read mode by default', () => {
//       const wrapper = mount(<InlineEditUncontrolled {...defaultProps} />);

//       expect(wrapper.find(FieldBaseWrapper)).toHaveStyleRule(
//         'display',
//         'inline-block',
//       );
//     });

//     it('should stretch to container width in read mode when isFitContainerWidthReadView is set', () => {
//       const wrapper = mount(
//         <InlineEditUncontrolled
//           {...defaultProps}
//           isFitContainerWidthReadView
//         />,
//       );

//       expect(wrapper.find(FieldBaseWrapper)).toHaveStyleRule(
//         'display',
//         'block',
//       );
//     });

//     it('should stretch to container width when in edit mode', () => {
//       const wrapper = mount(
//         <InlineEditUncontrolled {...defaultProps} isEditing />,
//       );

//       expect(wrapper.find(FieldBaseWrapper)).toHaveStyleRule(
//         'display',
//         'block',
//       );
//     });

//     it('should have max-width so inline-block text overflow using ellipses', () => {
//       const wrapper = mount(<InlineEditUncontrolled {...defaultProps} />);

//       expect(wrapper.find(FieldBaseWrapper)).toHaveStyleRule(
//         'max-width',
//         '100%',
//       );
//     });
//   });
// });

// describe('InlineEditStatelessWithAnalytics', () => {
//   beforeEach(() => {
//     jest.spyOn(global.console, 'warn');
//     jest.spyOn(global.console, 'error');
//   });
//   afterEach(() => {
//     global.console.warn.mockRestore();
//     global.console.error.mockRestore();
//   });

//   it('should mount without errors', () => {
//     const readView = <span>read</span>;
//     mount(
//       <InlineEditStatelessWithAnalytics
//         {...defaultProps}
//         readView={readView}
//       />,
//     );
//     /* eslint-disable no-console */
//     expect(console.warn).not.toHaveBeenCalled();
//     expect(console.error).not.toHaveBeenCalled();
//     /* eslint-enable no-console */
//   });
// });
