import React from 'react';
import axe from 'axe-core';
import { Popper } from '@atlaskit/popper';

function validateNode(node) {
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
      node.setAttribute('style', `border: solid 1px red`);
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
      <Popper referenceElement={element}>
        {({ ref, style }) => (
          <div ref={ref} style={style}>
            oh no
            {isHovered && (
              <div>
                <h1>{props.target}</h1>
                {props.violations.map((violation, index) => (
                  <p key={index}>{violation.description}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </Popper>
    )
  );
}

export default function A11y(props: { children: React.ReactNode }) {
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

  return (
    <>
      <span ref={child}>{props.children}</span>
      <div>
        {violationsByNode.map(([node, violations], index) => (
          <Violation target={node} violations={violations} key={index} />
        ))}
      </div>
    </>
  );
}
