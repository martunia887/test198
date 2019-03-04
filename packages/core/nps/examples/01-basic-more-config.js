//@flow
import React from 'react';
import DefaultNPS from '../';
import { WithDataDisplay } from '../examples/helpers/helpers';

export default function BasicMoreConfig() {
  return (
    <WithDataDisplay>
      {(props: any) => {
        return (
          <DefaultNPS
            canOptOut
            product="Stride"
            onRatingSelect={props.onRatingSelect}
            onCommentChange={props.onCommentChange}
            onRoleSelect={props.onRoleSelect}
            onAllowContactChange={props.onAllowContactChange}
            onFeedbackSubmit={props.onFeedbackSubmit}
            onFollowupSubmit={props.onFollowupSubmit}
            onFinish={props.onFinish}
          />
        );
      }}
    </WithDataDisplay>
  );
}
