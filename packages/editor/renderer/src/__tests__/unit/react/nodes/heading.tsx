import * as React from 'react';
import Heading from '../../../../react/nodes/heading';
import { mountWithIntl } from '@atlaskit/editor-test-helpers';
import { CopyTextContext } from '@atlaskit/editor-common';
import {
  HeadingLevels,
  HeadingAnchor,
  HeadingAnchorWrapperClassName,
} from '@atlaskit/editor-common';
import AnalyticsContext from '../../../../analytics/analyticsContext';

describe('<Heading />', () => {
  let heading: any;
  const copyTextToClipboard = jest.fn();
  const fireAnalyticsEvent = jest.fn();

  [1, 2, 3, 4, 5, 6].forEach(headingLevel => {
    it(`should wrap content with <h${headingLevel}>-tag`, () => {
      heading = mountWithIntl(
        <Heading
          level={headingLevel as HeadingLevels}
          headingId={`This-is-a-Heading-${headingLevel}`}
          showAnchorLink={true}
        >
          This is a Heading {headingLevel}
        </Heading>,
      );

      expect(heading.find(`h${headingLevel}`).exists()).toBe(true);
      expect(
        heading.find(`.${HeadingAnchorWrapperClassName}`).prop('id'),
      ).toEqual(`This-is-a-Heading-${headingLevel}`);
    });
  });

  describe('When showAnchorLink is set to false', () => {
    beforeEach(() => {
      heading = mountWithIntl(
        <Heading
          level={1}
          headingId={'This-is-a-Heading-1'}
          showAnchorLink={false}
        >
          This is a Heading 1
        </Heading>,
      );
    });

    it('does not render heading anchor', () => {
      expect(heading.find(HeadingAnchor).exists()).toBe(false);
    });
  });

  describe('When click on copy anchor link button', () => {
    beforeEach(() => {
      heading = mountWithIntl(
        <CopyTextContext.Provider
          value={{
            copyTextToClipboard: copyTextToClipboard,
          }}
        >
          <AnalyticsContext.Provider
            value={{
              fireAnalyticsEvent: fireAnalyticsEvent,
            }}
          >
            <Heading
              level={1}
              headingId="This-is-a-Heading-1"
              showAnchorLink={true}
            >
              This is a Heading 1
            </Heading>
          </AnalyticsContext.Provider>
          ,
        </CopyTextContext.Provider>,
      );
    });

    it('Should call "copyTextToClipboard" with correct param', () => {
      heading
        .find('#This-is-a-Heading-1')
        .find('button')
        .simulate('click');
      expect(copyTextToClipboard).toHaveBeenCalledWith(
        'http://localhost/#This-is-a-Heading-1',
      );
      expect(fireAnalyticsEvent).toHaveBeenCalledWith({
        action: 'clicked',
        actionSubject: 'button',
        actionSubjectId: 'headingAnchorLink',
        eventType: 'ui',
      });
    });
  });
});
