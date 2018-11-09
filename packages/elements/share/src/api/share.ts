import { fetch } from 'window-or-global';

const share: any = (
  recipients: Array<{
    id?: string;
    email?: string;
  }>,
  content: {
    ari: string;
    link: string;
    title: string;
  },
  message?: string,
) => {
  return fetch('https://api-private.stg.atlassian.com/share', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      content,
      recipients,
      comment: message,
    }),
  });
};

export default share;
