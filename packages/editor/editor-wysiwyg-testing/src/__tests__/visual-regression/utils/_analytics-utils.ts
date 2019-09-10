import sendLogs from '@atlaskit/analytics-reporting';

function createAnalyticsEventPayload(
  test: string,
  consistencyRaw: number,
  consistency: string,
  percentageChange: string,
) {
  const payload = {
    name: 'atlaskit.qa.wysiwyg_vr_test.consistency',
    server: process.env.CI ? 'master' : 'test',
    product: 'atlaskit',
    properties: {
      test,
      // Percentage (0 - 1) as a number. e.g. 0.9842367
      consistencyRaw,
      // Percentage (0 - 100) as a string. e.g. 98.42%
      consistency,
      // Percentage (-100 - 100) as a string (negative for regression) e.g. 4.3% or -1.2%
      change: percentageChange,
    },
    user: process.env.CI ? '-' : process.env.USER, // On CI we send as an anonymous user
    serverTime: Date.now(),
  };
  return JSON.stringify({ events: [payload] });
}

export function dispatchAnalyticsEvent(
  test: string,
  consistencyRaw: number,
  consistency: string,
  percentageChange: string,
) {
  const updateSnapshot = process.env.UPDATE_SNAPSHOT === 'true';
  // For the purpose of tracking WYSIWYG consistency & divergence over time, we only care about when we
  // decide to commit to visual changes by updating the snapshot file.
  if (updateSnapshot) {
    const analytics = createAnalyticsEventPayload(
      test,
      consistencyRaw,
      consistency,
      percentageChange,
    );
    (sendLogs as ((body: string) => Promise<any>))(analytics).then(
      (res: any) => {
        // eslint-disable-next-line no-console
        console.log(
          `Sent WYSIWYG consistency change Event for '${test}'. Consistency: ${consistency}%, Change: ${percentageChange}`,
        );
      },
    );
  }
}
