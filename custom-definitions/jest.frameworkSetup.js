// @flow

declare interface JestExpectType extends JestExpectType {
  toMatchProdImageSnapshot(
    options?: $Shape<{|
      failureThreshold: string,
      failureThresholdType: string,
    |}>,
  ): void;
}
