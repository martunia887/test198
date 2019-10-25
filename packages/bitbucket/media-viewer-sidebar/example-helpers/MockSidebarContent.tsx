import React from 'react';

type Props = {
  data?: any;
  children?: any;
};

export default function MockSidebarContent({
  data = {},
  children = {},
}: Props) {
  return (
    <section>
      <b>ITEM DETAILS</b>
      {data &&
        Object.keys(data).map(key => {
          return (
            <p key={key}>
              {key}: {data[key]}
            </p>
          );
        })}
      {...children}
    </section>
  );
}
