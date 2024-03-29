# @atlaskit/notification-indicator

## 6.0.0
- [major] [987ab01f30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/987ab01f30):

  - The appearance prop only accepts appearance types supported by the badge component, i.e. 'primary', 'added', 'default' etc.
- Updated dependencies [c95557e3ff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c95557e3ff):
  - @atlaskit/badge@11.0.0

## 5.1.1
- [patch] [1bcaa1b991](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bcaa1b991):

  - Add npmignore for index.ts to prevent some jest tests from resolving that instead of index.js

## 5.1.0
- [minor] [de0c7c3258](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/de0c7c3258):

  - Enable noImplicitAny for home/notification-indicator

## 5.0.0
- [major] [9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages

## 4.1.3
- Updated dependencies [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):
  - @atlaskit/notification-log-client@3.1.2
  - @atlaskit/docs@7.0.0
  - @atlaskit/analytics-next@4.0.0
  - @atlaskit/badge@10.0.0

## 4.1.2
- [patch] [4c9a6d2187](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4c9a6d2187):

  - Correcting attribute name in analytics event

## 4.1.1
- [patch] [a4b0717](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4b0717):

  - Updated analytics events triggered by the notification-indicator

## 4.1.0
- [minor] [9cfee26](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9cfee26):

  - Add data-test-selector to various components to help open and close the Notification Drawer programmatically. This would support test automation

## 4.0.6
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/badge@9.2.2
  - @atlaskit/notification-log-client@3.1.1
  - @atlaskit/docs@6.0.0

## 4.0.5
- [patch] Ensure onCountUpdated is not called when the old and new count is zero [1d43367](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1d43367)

## 4.0.4
- [patch] Adding currentCount query parameter to notification log calls [2fe6260](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2fe6260)

## 4.0.3
- [patch] Updated dependencies [b12f7e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b12f7e6)
  - @atlaskit/badge@9.1.1
  - @atlaskit/notification-log-client@3.0.2

## 4.0.2
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/badge@9.0.4

## 4.0.1
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/badge@9.0.3
  - @atlaskit/notification-log-client@3.0.1
  - @atlaskit/docs@5.0.2

## 4.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/badge@9.0.0
  - @atlaskit/notification-log-client@3.0.0
  - @atlaskit/docs@5.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/notification-log-client@3.0.0
  - @atlaskit/badge@9.0.0
  - @atlaskit/docs@5.0.0

## 3.2.0
- [minor] Update NotificationIndicator with new features that will be used to reduce backend calls [803ed1f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/803ed1f)
- [minor] Updated dependencies [803ed1f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/803ed1f)

## 3.0.5
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/notification-log-client@2.0.8

## 3.0.4
- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/notification-log-client@2.0.7
  - @atlaskit/badge@8.0.3
  - @atlaskit/docs@4.1.1

## 3.0.3
- [none] Updated dependencies [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/docs@4.1.0
  - @atlaskit/notification-log-client@2.0.6
  - @atlaskit/badge@8.0.2

## 3.0.2
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/badge@8.0.0
  - @atlaskit/notification-log-client@2.0.5
  - @atlaskit/docs@4.0.0

## 3.0.1
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/badge@7.1.2
  - @atlaskit/notification-log-client@2.0.4
  - @atlaskit/docs@3.0.4

## 3.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 2.0.2
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 2.0.1
- [patch] notification-indicator and notification-log-client now compile into es5 compliant code for both es5 and es2015 packages to maintain compatibility with old toolings [1783e37](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1783e37)

## 2.0.0
- [major] Added notification-log-client and notification-indicator into Atlaskit. Please refer to docs and examples for their usages. [ac98216](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ac98216)
