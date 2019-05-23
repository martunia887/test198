import React, { ReactElement } from 'react';
import { md } from '@atlaskit/docs';

function getLabel(children: ReactElement<any>) {
  let str: ReactElement<any> | string = '';

  if (Array.isArray(children)) {
    children.forEach((c: ReactElement<any>) => {
      if (Array.isArray(c)) {
        getLabel(c);
      } else if (c.props) {
        str = c.props.children;
      } else {
        str = c;
      }
    });
  } else if (children.props) {
    getLabel(children.props.children);
  } else {
    str = children;
  }

  return str;
}

function slugify(str: string): string {
  return str.replace(/\W/g, '-').toLowerCase();
}

const Heading = ({
  children,
  level,
}: {
  children: ReactElement<any>,
  level: number,
}) => {
  const Tag = `h${level}`;
  const label = getLabel(children) as string;
  const slug = slugify(label);
  return <Tag id={slug}> {children} </Tag>;
};

export default md.customize({ renderers: { Heading } });
