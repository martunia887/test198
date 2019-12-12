/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';
import {
  IframeWidthDetector,
  GLOBAL_IFRAME_PREFIX,
} from '../../iframe-fallbacks';

describe('Iframe fallbacks', () => {
  const iframeGlobalSuffix = 'id';
  const setWidth = jest.fn();

  describe('IframeWidthDetector', () => {
    it('should call setWidth when the component is mounted', () => {
      const iframeWidthDetectorFallback = React.createRef<HTMLDivElement>();
      mount(
        <>
          <div ref={iframeWidthDetectorFallback}></div>
          <IframeWidthDetector
            iframeGlobalSuffix={iframeGlobalSuffix}
            iframeWidthDetectorFallback={iframeWidthDetectorFallback}
            setWidth={setWidth}
          >
            <span>Hello</span>
          </IframeWidthDetector>
        </>,
      );
      expect(setWidth).toHaveBeenCalledTimes(1);
    });

    it('should create an iframe element', () => {
      const iframeWidthDetectorFallback = React.createRef<HTMLDivElement>();
      const component = mount(
        <>
          <div id="not-root" ref={iframeWidthDetectorFallback}></div>
          <IframeWidthDetector
            iframeGlobalSuffix={iframeGlobalSuffix}
            iframeWidthDetectorFallback={iframeWidthDetectorFallback}
            setWidth={setWidth}
          >
            <span>Hello</span>
          </IframeWidthDetector>
        </>,
      );

      const divNotRoot = component.find('#not-root');
      expect(divNotRoot).toHaveLength(1);

      const iframe = divNotRoot
        .getDOMNode()
        .querySelector(`object#${GLOBAL_IFRAME_PREFIX}${iframeGlobalSuffix}`);

      expect(iframe).not.toBeNull();
      // @ts-ignore
      expect(iframe.style.cssText).toEqual(
        [`position: absolute;`, `width: 100%;`].join(' '),
      );
    });

    it('should garantee the iframe parent has the right styles', () => {
      const iframeWidthDetectorFallback = React.createRef<HTMLDivElement>();
      const component = mount(
        <>
          <div id="not-root" ref={iframeWidthDetectorFallback}></div>
          <IframeWidthDetector
            iframeGlobalSuffix={iframeGlobalSuffix}
            iframeWidthDetectorFallback={iframeWidthDetectorFallback}
            setWidth={setWidth}
          >
            <span>Hello</span>
          </IframeWidthDetector>
        </>,
      );

      const divNotRoot = component.find('#not-root');
      expect(divNotRoot).toHaveLength(1);
      // @ts-ignore
      expect(divNotRoot.getDOMNode().style.cssText).toEqual(
        [`position: relative;`, `height: 0px;`, `width: 100%;`].join(' '),
      );
    });

    it.only('should remove the listerners from when unmount', () => {
      const iframeWidthDetectorFallback = React.createRef<HTMLDivElement>();
      const component = mount(
        <div>
          <div id="not-root" ref={iframeWidthDetectorFallback}></div>
          <IframeWidthDetector
            iframeGlobalSuffix={iframeGlobalSuffix}
            iframeWidthDetectorFallback={iframeWidthDetectorFallback}
            setWidth={setWidth}
          >
            <span>Hello</span>
          </IframeWidthDetector>
        </div>,
      );

      component.unmount();
      expect(true).toBe(false);
    });
    it('should create only one iframe', () => {
      const iframeWidthDetectorFallback = React.createRef<HTMLDivElement>();
      const component = mount(
        <div>
          <div id="not-root" ref={iframeWidthDetectorFallback}></div>
          <IframeWidthDetector
            iframeGlobalSuffix={iframeGlobalSuffix}
            iframeWidthDetectorFallback={iframeWidthDetectorFallback}
            setWidth={setWidth}
          >
            <span>Hello</span>
          </IframeWidthDetector>
          <IframeWidthDetector
            iframeGlobalSuffix={iframeGlobalSuffix}
            iframeWidthDetectorFallback={iframeWidthDetectorFallback}
            setWidth={setWidth}
          >
            <span>Hello</span>
          </IframeWidthDetector>
        </div>,
      );

      component.unmount();
      expect(true).toBe(false);
      // const divNotRoot = component.find('#not-root');
      // expect(divNotRoot).toHaveLength(1);

      // const iframes = divNotRoot.getDOMNode().querySelectorAll('object') || [];
      // expect(iframes).toHaveLength(1);
    });
  });
});
