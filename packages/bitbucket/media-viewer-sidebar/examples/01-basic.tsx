import React from 'react';
import { MediaViewerSidebar } from '../src/index';
import * as styles from '../example-helpers/styled';

export default () => (
  <>
    <styles.Section>
      <styles.Header>Basic sidebar</styles.Header>
      <styles.Container>
        <MediaViewerSidebar>
          <p>Add anything here!</p>
        </MediaViewerSidebar>
      </styles.Container>
    </styles.Section>

    <styles.Section>
      <styles.Header>
        Basic sidebar (with overflow content)
        <small>If content is too large the container scrolls vertically</small>
      </styles.Header>

      <styles.Container>
        <MediaViewerSidebar>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit vitae
            ex voluptatem in officiis commodi ratione, unde repudiandae
            voluptatum necessitatibus sapiente quos! Placeat necessitatibus
            delectus, quibusdam tempora quaerat qui iste! Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Odit vitae ex voluptatem in
            officiis commodi ratione, unde repudiandae voluptatum necessitatibus
            sapiente quos! Placeat necessitatibus delectus, quibusdam tempora
            quaerat qui iste! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Odit vitae ex voluptatem in officiis commodi
            ratione, unde repudiandae voluptatum necessitatibus sapiente quos!
            Placeat necessitatibus delectus, quibusdam tempora quaerat qui iste!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit vitae
            ex voluptatem in officiis commodi ratione, unde repudiandae
            voluptatum necessitatibus sapiente quos! Placeat necessitatibus
            delectus, quibusdam tempora quaerat qui iste!
          </p>
        </MediaViewerSidebar>
      </styles.Container>
    </styles.Section>
  </>
);
