import React from 'react';
import Button from '@atlaskit/button';
import EmptyState from '@atlaskit/empty-state';
// import securityImage from "../images/security.png";

export default function Login({ location }) {
  return (
    <EmptyState
      header="This page is restricted to Atlassian employees"
      description={`You are trying to access an internal Atlassian resource. To see this page, you must be an Atlassian employee and log in to this website in the bottom left corner with your Atlassian account.
If you are logged in and are still having trouble, contact the Atlassian Design System team.`}
      // imageUrl={securityImage}
      primaryAction={
        <Button
          appearance="primary"
          href={`/.netlify/functions/auth/google?redirect=${location.pathname}`}
        >
          Login
        </Button>
      }
      tertiaryAction={
        <Button
          appearance="subtle-link"
          href="https://ecosystem.atlassian.net/servicedesk/customer/portal/24/create/240"
          target="_blank"
        >
          Contact us
        </Button>
      }
    />
  );
}
