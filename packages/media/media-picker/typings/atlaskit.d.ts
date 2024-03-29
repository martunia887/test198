declare module '@atlaskit/webdriver-runner/utils/example' {
  function getExampleUrl(
    group: string,
    packageName: string,
    exampleName?: string,
  ): string;
}

declare module '@atlaskit/webdriver-runner/runner' {
  type Browser = 'Chrome' | 'chrome' | 'edge' | 'ie' | 'safari' | 'firefox';

  type BrowserTestCaseOptions = {
    readonly skip: Browser[];
  };

  type Tester = (client: any, testName: string) => void;

  function BrowserTestCase(
    testName: string,
    options: BrowserTestCaseOptions,
    tester: Tester,
  );
}
