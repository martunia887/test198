import { Avatar } from '../src/avatar-list';

function generateAvatarIds(start: number, count: number): Array<number> {
  const result: Array<number> = [];
  for (let i = 0; i < count; ++i) {
    result[i] = start + i;
  }
  return result;
}

export function generateAvatars(count: number): Array<Avatar> {
  return generateAvatarIds(10200 /*18831*/, count).map(id => ({
    // dataURI: `https://jdog.jira-dev.com/secure/viewavatar?avatarId=${id}&avatarType=project`,
    dataURI: `https://product-fabric.atlassian.net/secure/projectavatar?avatarId=${id}&size=large`,
  }));
}
