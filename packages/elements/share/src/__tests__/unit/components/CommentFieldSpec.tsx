import { mount } from 'enzyme';
import FieldTextArea from '@atlaskit/field-text-area';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { CommentField } from '../../../components/CommentField';
import { messages } from '../../../i18n';

describe('CommentField', () => {
  it('should render TextField', () => {
    const component = mount(<CommentField />);
    const formattedMessage = component.find(FormattedMessage);
    expect(formattedMessage).toHaveLength(1);
    expect(formattedMessage.props()).toMatchObject(messages.commentPlaceholder);

    const fieldTextArea = component.find(FieldTextArea);
    expect(fieldTextArea).toHaveLength(1);
  });

  describe('onChange prop', () => {
    it('should be called when the the value of textarea is changed', () => {
      const spiedOnChange = jest.fn();
      const wrapper = mount(<CommentField onChange={spiedOnChange} />);
      wrapper.find('textarea').simulate('change');
      expect(spiedOnChange).toHaveBeenCalledTimes(1);
    });
  });
});
