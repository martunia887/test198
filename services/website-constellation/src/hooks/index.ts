import { useState, useEffect } from 'react';
export function useData(url) {
  const abortController = new AbortController();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(url, {
      signal: abortController.signal,
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
      .catch(err => {
        if (!abortController.signal.aborted) {
          setError(err);
        }
      });
    return abortController.abort();
  }, []);
  return { data, error };
}
export function useAuth() {
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
        setLoggedIn(true);
        setValidating(false);
      })
      .catch(err => {
        if (abortController.signal.aborted) {
          setValidating(false);
        }
      });
    return abortController.abort();
  }, []);

  return { isLoggedIn, isValidating };
}
