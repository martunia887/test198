// @flow
import { getMockProfileClient as getMockProfileClientUtil } from '../../mock-helpers';
import { AkProfileClient, modifyResponse } from '../../';
import type { ProfilecardProps } from '../..//types';

export const getMockProfileClient = (
  cacheSize: number,
  cacheMaxAge: number,
  extraProps: ProfilecardProps = {},
) => {
  const MockProfileClient = getMockProfileClientUtil(
    AkProfileClient,
    response => {
      return {
        ...modifyResponse(response),
        ...extraProps,
      };
    },
  );

  return new MockProfileClient({
    cacheSize,
    cacheMaxAge,
  });
};

export default null;
