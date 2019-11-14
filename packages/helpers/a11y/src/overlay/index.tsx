/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import axe from 'axe-core';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import { Popper } from '@atlaskit/popper';
import { colors, elevation } from '@atlaskit/theme';

function validateNode(node: any) {
  return new Promise((resolve, reject) => {
    axe.run(node, { reporter: 'v2' }, (error, results) => {
      if (error) reject(error);
      resolve(results.violations);
    });
  });
}

function segmentViolationsByNode(violations) {
  const nodes = violations.reduce((map, violation) => {
    violation.nodes.forEach(node => {
      if (!map[node.target]) {
        map[node.target] = [violation];
      } else {
        map[node.target] = map[node.target].push(violation);
      }
    });
    return map;
  }, {});
  return Object.entries(nodes);
}

function Violation(props: any) {
  const [isHovered, setIsHovered] = React.useState(false);

  const element = document.querySelector<HTMLElement>(props.target);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  React.useEffect(() => {
    const node = document.querySelector(props.target);
    if (node) {
      node.setAttribute('style', `box-shadow: 0px 0px 0 2px ${colors.R100}`);
      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (node) {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [props.target]);

  if (!element) return null;

  return (
    element && (
      <Popper referenceElement={element} placement="right">
        {({ ref, style }) => (
          <div
            ref={ref}
            style={style}
            css={css`
              background-color: ${colors.N0};
              ${elevation.e300()};
              max-width: 500px;
              z-index: ${isHovered ? 9999 : 1};
            `}
          >
            <span css={{ display: isHovered ? 'none' : 'static' }}>
              <div>
                {props.violations.map((violation, index) => (
                  <span key={index}>
                    <WarningIcon
                      label="Accessibility violation"
                      primaryColor={colors.R100}
                    />
                    {violation.help}
                    <br />
                  </span>
                ))}
              </div>
            </span>

            {isHovered && (
              <div css={{ margin: '8px' }}>
                <h1>{props.target}</h1>
                {props.violations.map((violation, index) => (
                  <span key={index}>
                    <p>{violation.description}</p>
                    <p>{violation.helpUrl}</p>
                  </span>
                ))}
                {element.getAttribute('data-srccode')}
              </div>
            )}
          </div>
        )}
      </Popper>
    )
  );
}

const Context = React.createContext(() => {});

function monkeyPatchReact(theirReact: typeof React) {
  const previousCreateElement = theirReact.createElement;

  const A11yWrap = React.forwardRef(({ tag, children, ...props }: any, ref) => {
    const update = React.useContext(Context);

    React.useEffect(() => {
      update();
    });

    return previousCreateElement(tag, { ...props, ref }, children);
  });

  const patchedCreateElement = (type: any, props: any, ...children: any[]) => {
    try {
      if (typeof type === 'string') {
        // We only want to grab the source for DOM elements.
        throw new Error();
      }
    } catch (e) {
      const componentSource = e.stack.split('\n')[1];
      if (componentSource.indexOf('A11yOverlayOnlyUseInDevelopment') === -1) {
        // Only patch elements that are consumer elements.
        return previousCreateElement(
          A11yWrap,
          {
            ...props,
            tag: type,
            'data-srccode': componentSource,
          },
          ...children,
        );
      }
    }

    return previousCreateElement(type, props, ...children);
  };

  theirReact.createElement = patchedCreateElement as any;
}

export default (theirReact: typeof React) => {
  monkeyPatchReact(theirReact);

  return function A11yOverlayOnlyUseInDevelopment(props: {
    children: React.ReactNode;
  }) {
    const [violations, setViolations] = React.useState([]);
    const [idleID, setIdleID] = React.useState(null);
    const child = React.useRef(null);

    React.useEffect(() => {
      if (child.current) {
        if (idleID) {
          cancelIdleCallback(idleID);
          setIdleID(null);
        }

        const id = requestIdleCallback(() => {
          validateNode(child.current).then(setViolations);
        });
        setIdleID(id);
      }
    }, [props.children]);

    const violationsByNode = segmentViolationsByNode(violations);

    console.log(violations);

    return (
      <Context.Provider
        value={() => {
          if (child.current) {
            if (idleID) {
              cancelIdleCallback(idleID);
              setIdleID(null);
            }

            const id = requestIdleCallback(() => {
              validateNode(child.current).then(setViolations);
            });
            setIdleID(id);
          }
        }}
      >
        <div>
          <span ref={child}>{props.children}</span>
          <div>
            {violationsByNode.map(([node, violations], index) => (
              <Violation target={node} violations={violations} key={index} />
            ))}
          </div>
        </div>
      </Context.Provider>
    );
  };
};
