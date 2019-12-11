import React from 'react';
import { useInView } from './hooks';
import { ContextProps, Props } from './types';

const GLOBAL_IFRAME_PREFIX = 'ak-editor-common-global-iframe__';
const NO_ID = 'no_id';

function getId(id: string): string {
  return `${GLOBAL_IFRAME_PREFIX}__${id}`;
}
function createGlobalIframe(id: string): HTMLObjectElement {
  const object = document.createElement('object');
  object.setAttribute('type', 'text/html');
  object.setAttribute('aria-hidden', 'true');
  object.setAttribute('tab-index', '-1');
  object.setAttribute('id', getId(id));

  object.style.cssText = [`position: absolute;`, `width: 100%;`].join(' ');
  object.data = 'about:blank';

  return object;
}

function getIframe(
  id: string,
  target: HTMLDivElement,
): HTMLObjectElement | null {
  if (!document || !document.querySelector || !target) {
    return null;
  }

  const element = document.querySelector(`object#${getId(id)}`);

  if (element instanceof HTMLObjectElement) {
    return element;
  }

  const iframe = createGlobalIframe(id);

  target.style.cssText = [
    `position: relative;`,
    `height: 0;`,
    `width: 100%;`,
  ].join(' ');
  target.appendChild(iframe);

  return iframe;
}

type DestroyIframe = () => boolean;

function globalIframe(
  id: string,
  target: HTMLDivElement,
  onResize: () => void,
): DestroyIframe | null {
  const iframe = getIframe(id, target);

  if (!iframe) {
    return null;
  }

  if (!iframe.contentDocument || !iframe.contentDocument.defaultView) {
    return null;
  }

  const iframeWindow = iframe.contentDocument.defaultView;
  iframeWindow.addEventListener('resize', onResize);

  return () => {
    iframeWindow.removeEventListener('resize', onResize);
    return true;
  };
}

export function IframeWidthDetector({
  iframeGlobalSuffix,
  setWidth,
  children,
  iframeWidthDetectorFallback,
}: Props & ContextProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const onResize = () => {
      if (ref && ref.current) {
        const { current } = ref;
        const width = current.offsetWidth;
        setWidth(width);
      }
    };

    if (
      ref &&
      ref.current &&
      iframeWidthDetectorFallback &&
      iframeWidthDetectorFallback.current
    ) {
      const { current } = ref;
      const width = current.offsetWidth;
      setWidth(width);

      globalIframe(
        iframeGlobalSuffix || NO_ID,
        iframeWidthDetectorFallback.current,
        onResize,
      );
    }
  });

  return <div ref={ref}>{children}</div>;
}

export function IframeWidthDetectorWithUseInView({
  iframeGlobalSuffix,
  setWidth,
  children,
  iframeWidthDetectorFallback,
}: Props & ContextProps) {
  const [inViewRef, inView, entry] = useInView({
    /* Optional options */
    threshold: 0,
  });

  React.useEffect(() => {
    if (!inView || !entry || !(entry.target instanceof HTMLElement)) {
      return;
    }
    const { target } = entry;

    const onResize = () => {
      if (entry) {
        const width = target.offsetWidth;
        setWidth(width);
      }
    };

    if (
      target &&
      iframeWidthDetectorFallback &&
      iframeWidthDetectorFallback.current
    ) {
      const width = target.offsetWidth;
      setWidth(width);

      globalIframe(
        iframeGlobalSuffix || NO_ID,
        iframeWidthDetectorFallback.current,
        onResize,
      );
    }
  });

  return <div ref={inViewRef}>{children}</div>;
}
