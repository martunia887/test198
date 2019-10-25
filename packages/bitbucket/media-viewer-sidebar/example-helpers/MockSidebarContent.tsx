import React from 'react';

type Props = {
  data?: any;
};

export default function MockSidebarContent({ data = {} }: Props) {
  return (
    <section>
      <b>ITEM DETAILS</b>
      {Object.keys(data).map(key => {
        return (
          <p key={key}>
            {key}: {data[key]}
          </p>
        );
      })}
    </section>
  );
}
