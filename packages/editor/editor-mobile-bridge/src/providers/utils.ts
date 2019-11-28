import { createPromise } from '../cross-platform-promise';

const globalFetch = window.fetch;
const mockedUrls: string[] = [];

export const mockFetchFor = (urls: Array<string> = []) => {
  mockedUrls.push(...urls);

  if (globalFetch !== window.fetch) {
    return;
  }

  window.fetch = async (request, options) => {
    const url = typeof request === 'string' ? request : request.url;

    // Determine whether its a URL we want native to handle, otherwise continue as normal.
    if (!mockedUrls.some(u => url.startsWith(u))) {
      return globalFetch(url, options);
    }

    const { response, status, statusText } = await createPromise(
      'nativeFetch',
      { url, options },
    ).submit();

    if (status >= 400) {
      // eslint-disable-next-line no-console
      console.error(
        `Request for ${url} failed with ${status}: ${statusText}`,
        response,
      );
    }

    return new Response(response, { status, statusText });
  };
};
