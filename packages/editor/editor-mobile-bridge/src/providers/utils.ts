import { createPromise } from '../cross-platform-promise';

const globalFetch = window.fetch;
export const mockFetchFor = (urls: Array<string>) => {
  window.fetch = (url: string, options) => {
    // Determine whether its a URL we want native to handle, otherwise continue as normal.
    if (urls.indexOf(url) === -1) {
      return globalFetch(url, options);
    }

    return createPromise('nativeFetch', JSON.stringify({ url, options }))
      .submit()
      .then(({ response, status, statusText, headers }) =>
        Promise.resolve(
          new Response(response, { status, statusText, headers }),
        ),
      );
  };
};
