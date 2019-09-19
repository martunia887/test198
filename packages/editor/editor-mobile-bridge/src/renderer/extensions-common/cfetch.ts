export type Fetch = typeof fetch;

/**
 * A [Fetch API](https://fetch.spec.whatwg.org) implementation which wraps
 * `fetch` to throw well-known Confluence Cloud `Error` types such as
 * `NoNetworkError` and `BadStatusError`.
 */
export const cfetch = async (
  resource: Parameters<Fetch>[0],
  init?: Parameters<Fetch>[1],
) => {
  // XXX Default init's credentials to "include" but not always: if the caller
  // provided a Request as resource and no init, then us adding an init can
  // break the caller.
  console.log('====== stuff');
  if (!resource || typeof resource === 'string' || !resource.credentials) {
    console.log('====== inside');
    // init = { credentials: "include", ...init };
    init = { credentials: 'include' };
    //console.log(init.credentials,"======hola", JSON.stringify(init) )
  }

  console.log(resource.credentials, '======hola', init.credentials);
  let response: Response;

  try {
    // eslint-disable-next-line check-credentials-option/has-credentials-option, no-restricted-syntax
    response = await fetch(
      'https://product-fabric.atlassian.net/wiki/plugins/macrobrowser/browse-macros.action?detailed=false&t=1',
      {
        // response = await fetch("wiki/plugins/macrobrowser/browse-macros.action?detailed=false&t=1", {
        method: 'GET',
        credentials: 'include',
      },
    );
    console.log('==== mr 2', response, JSON.stringify(response));
  } catch (e) {
    // According to the fetch spec, a network failure results in a Promise
    // rejected with a TypeError. Any Response at all will resolve the Promise,
    // with the status property revealing the HTTP status code.
    // const error = new NoNetworkError(`Network failure: ${e}`);
    console.log('===== in the error');
    // emit(/* response */ undefined, error);
    // throw error;
  }

  console.log(response);
  console.log('==== further in');
  console.log(JSON.stringify(response));

  // If we don't get a 2xx Response, we'll consider that an error, and we'll
  // throw an exception. If we don't, we risk developers not checking the
  // Response status, running parsing logic such as parsing JSON, and failing
  // on non-2xx HTTP status code with weird errors like:
  // * Unexpected end of JSON input
  // * Unexpected token < in JSON at position 0
  // * JSON.parse: unexpected end of data at line 1 column 1 of the JSON data
  // * etc.
  //
  // By using our own Error subclass, we can prevent such unintended running of
  // parsing logic and we allow the product easily recognize the error and apply
  // product-wide processing.
  // if (!response.ok) {
  //   const error = new BadStatusError(
  //     `Received status ${response.status}`,
  //     response
  //   );
  //
  //   emit(response, error);
  //   throw error;
  // }
  //
  // emit(response, /* error */ undefined);
  return response;
};
