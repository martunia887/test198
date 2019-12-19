export const titleify = (str: string) => {
  return str
    .split('-')
    .map(chunk => {
      return chunk.charAt(0).toUpperCase() + chunk.slice(1);
    })
    .join(' ');
};
