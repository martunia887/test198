import UndoableWrapper from '../../utils/undoredo';
import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import browserData from '@atlaskit/editor-common/src/utils/browser';

describe('UndoRedoWrapper', () => {
  let wrapper: ReactWrapper;
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  function setupUndoable(initialValue: string, secondValue?: string) {
    const input = document.createElement('input');
    if (initialValue) {
      input.value = initialValue;
    }
    const onUndoRedoSpy = jest.fn();
    const undoableRef = React.createRef<UndoableWrapper>();

    wrapper = mount(
      <UndoableWrapper
        input={input}
        onUndoRedo={onUndoRedoSpy}
        ref={undoableRef}
      ></UndoableWrapper>,
    );
    const undoable = undoableRef.current as UndoableWrapper;

    if (secondValue) {
      input.value = secondValue;
      undoable.addToHistory(secondValue);
    }

    return { undoable, input, onUndoRedoSpy };
  }

  it('on ctrl+z and ctrl+y should undo and redo last change', () => {
    const { input } = setupUndoable('test', 'test2');
    expect(input.value).toBe('test2');
    wrapper.find('UndoableWrapper').simulate('keydown', {
      key: 'z',
      ctrlKey: true,
    });
    expect(input.value).toBe('test');
    wrapper.find('UndoableWrapper').simulate('keydown', {
      key: 'y',
      ctrlKey: true,
    });
    expect(input.value).toBe('test2');
  });

  it('should do nothing if initial value did not change', () => {
    const { input } = setupUndoable('test1');
    expect(input.value).toBe('test1');
  });

  it('should call onUndoRedo callback on undo and redo', () => {
    const { onUndoRedoSpy } = setupUndoable('test', 'test2');
    wrapper.find('UndoableWrapper').simulate('keydown', {
      key: 'z',
      shiftKey: false,
      ctrlKey: true,
    });
    expect(onUndoRedoSpy).toHaveBeenCalled();
  });

  it('should not add new value to undo history if previous value is the same', () => {
    const { undoable } = setupUndoable('test');
    undoable.addToHistory('test');
    expect(undoable.undoHistory.length).toBe(1);
  });

  describe('on mac platform', () => {
    beforeEach(() => {
      browserData.mac = true;
    });

    it('on cmd+z and cmd+shift+z should undo and redo last change', () => {
      const { input } = setupUndoable('test', 'test2');
      expect(input.value).toBe('test2');
      wrapper.find('UndoableWrapper').simulate('keydown', {
        key: 'z',
        metaKey: true,
      });
      expect(input.value).toBe('test');
      wrapper.find('UndoableWrapper').simulate('keydown', {
        key: 'z',
        metaKey: true,
        shiftKey: true,
      });
      expect(input.value).toBe('test2');
    });

    it('should not undo if cmd+z is pressed with shift', () => {
      const { input } = setupUndoable('test', 'test2');
      expect(input.value).toBe('test2');
      wrapper.find('UndoableWrapper').simulate('keydown', {
        key: 'z',
        shiftKey: true,
        metaKey: true,
      });
      expect(input.value).toBe('test2');
    });
  });
});
