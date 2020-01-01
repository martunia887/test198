import { useState, useEffect } from 'react';
// polyfilled abort controller so gatsby runtime doesn't shit the bed
// also IE
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
export function useData(url) {
  // TODO: tidy this up to deal with multiple requests and dynamic references

  // we use AbortController to clean up pending requests on unmount
  // so we don't have unresolved promises leaking everywhere.
  const abortController = new AbortController();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(url, {
      signal: abortController.signal,
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(err => {
        // if the promise isn't cancelled due to an abort,
        // assume its a real error and set it in state.
        if (!abortController.signal.aborted) {
          setError(err);
        }
      });
    // call abortController.abort() on unmount
    return () => abortController.abort();
  }, [url]);
  console.log('DATA NOW', data);
  return { data, error };
}
export function useAuth() {
  // TODO: this may need to be tidied up to deal with multiple requests and associated race conditions.

  // we use AbortController to clean up pending requests on unmount
  // so we don't have unresolved promises leaking everywhere.
  const abortController = new AbortController();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isValidating, setValidating] = useState(true);

  useEffect(() => {
    fetch('/.netlify/functions/auth/status', {
      signal: abortController.signal,
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        console.log('### SUCCESS SETTING DATA ###');
        setLoggedIn(true);
        setValidating(false);
      })
      .catch(err => {
        console.warn('### CAUGHT ERROR ###', err);
        if (!abortController.signal.aborted) {
          setLoggedIn(false);
        }
        setValidating(false);
      });
    return () => abortController.abort();
  }, []);

  return { isLoggedIn, isValidating };
}
