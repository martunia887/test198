import { fetch } from 'window-or-global';

const loadOptions = cloudId => query => {
  if (query.length && query.length > 2) {
    return fetch(
      `/gateway/api/mentions/${cloudId}/search?productIdentifier=micros-group%2Fconfluence&query=${query}&limit=10`,
      {
        credentials: 'include',
      },
    )
      .then(response => response.json())
      .then(json =>
        (json.mentions || []).map(mention => ({
          ...mention,
          title: mention.name,
          username: mention.mentionName,
        })),
      );
  } else {
    return [];
  }
};

export default loadOptions;
