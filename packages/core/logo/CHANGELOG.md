# @atlaskit/logo

## 10.0.4
- Updated dependencies [9c0b4744be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c0b4744be):
  - @atlaskit/docs@7.0.3
  - @atlaskit/button@12.0.3
  - @atlaskit/code@9.0.1
  - @atlaskit/field-radio-group@5.0.3
  - @atlaskit/select@8.1.1
  - @atlaskit/theme@8.1.7

## 10.0.3
- Updated dependencies [1e826b2966](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e826b2966):
  - @atlaskit/docs@7.0.2
  - @atlaskit/field-radio-group@5.0.2
  - @atlaskit/select@8.0.5
  - @atlaskit/theme@8.1.6
  - @atlaskit/button@12.0.0

## 10.0.2
- [patch] [e04a402953](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e04a402953):

  - Internal changes only. Ids relevant to Logo gradients are now ssr-friendly.

## 10.0.1
- Updated dependencies [9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):
  - @atlaskit/docs@7.0.1
  - @atlaskit/field-radio-group@5.0.1
  - @atlaskit/select@8.0.3
  - @atlaskit/theme@8.0.1
  - @atlaskit/button@11.0.0

## 10.0.0
- [major] [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):

  - Drop ES5 from all the flow modules

  ### Dropping CJS support in all @atlaskit packages

  As a breaking change, all @atlaskit packages will be dropping cjs distributions and will only distribute esm. This means all distributed code will be transpiled, but will still contain `import` and
  `export` declarations.

  The major reason for doing this is to allow us to support multiple entry points in packages, e.g:

  ```js
  import colors from `@atlaskit/theme/colors`;
  ```

  Previously this was sort of possible for consumers by doing something like:

  ```js
  import colors from `@atlaskit/theme/dist/esm/colors`;
  ```

  This has a couple of issues. 1, it treats the file system as API making internal refactors harder, we have to worry about how consumers might be using things that aren't *actually* supposed to be used. 2. We are unable to do this *internally* in @atlaskit packages. This leads to lots of packages bundling all of theme, just to use a single color, especially in situations where tree shaking fails.

  To support being able to use multiple entrypoints internally, we unfortunately cannot have multiple distributions as they would need to have very different imports from of their own internal dependencies.

  ES Modules are widely supported by all modern bundlers and can be worked around in node environments.

  We may choose to revisit this solution in the future if we find any unintended condequences, but we see this as a pretty sane path forward which should lead to some major bundle size decreases, saner API's and simpler package architecture.

  Please reach out to #fabric-build (if in Atlassian) or create an issue in [Design System Support](https://ecosystem.atlassian.net/secure/CreateIssue.jspa?pid=24670) (for external) if you have any questions or queries about this.

## 9.2.7
- Updated dependencies [06713e0a0c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06713e0a0c):
  - @atlaskit/select@7.0.0

## 9.2.6
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/button@10.1.1
  - @atlaskit/code@8.2.2
  - @atlaskit/field-radio-group@4.0.14
  - @atlaskit/select@6.1.13
  - @atlaskit/theme@7.0.1
  - @atlaskit/docs@6.0.0

## 9.2.5
- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/button@10.0.4
  - @atlaskit/code@8.2.1
  - @atlaskit/field-radio-group@4.0.13
  - @atlaskit/select@6.1.10
  - @atlaskit/theme@7.0.0

## 9.2.4
- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/field-radio-group@4.0.11
  - @atlaskit/select@6.1.8
  - @atlaskit/theme@6.2.1
  - @atlaskit/button@10.0.0

## 9.2.3
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)

## 9.2.2
- [patch] Updated dependencies [4194aa4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4194aa4)
  - @atlaskit/select@6.0.0

## 9.2.1
- [patch] Pulling the shared styles from @atlaskit/theme and removed dependency on util-shraed-styles [7d51a09](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7d51a09)

## 9.2.0
- [patch] Moved all the shared logic into the wrapper, so refactoring is easier in future [7e83442](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e83442)
- [minor] Make label required, but provide sane defaults [12839d4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12839d4)

## 9.1.0
- [minor] Update product logos alignment issues [6bbf9a9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6bbf9a9)

## 9.0.4
- [patch] Updated dependencies [f9c0cdb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f9c0cdb)
  - @atlaskit/code@8.0.0
  - @atlaskit/docs@5.0.5

## 9.0.3
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/select@5.0.8
  - @atlaskit/button@9.0.5
  - @atlaskit/code@7.0.3
  - @atlaskit/field-radio-group@4.0.4

## 9.0.2
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/select@5.0.7
  - @atlaskit/field-radio-group@4.0.3
  - @atlaskit/button@9.0.4
  - @atlaskit/code@7.0.2
  - @atlaskit/docs@5.0.2

## 9.0.1
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
  - @atlaskit/select@5.0.6
  - @atlaskit/button@9.0.3
  - @atlaskit/code@7.0.1
  - @atlaskit/field-radio-group@4.0.2

## 9.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/select@5.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/code@7.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/field-radio-group@4.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/select@5.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/code@7.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/field-radio-group@4.0.0

## 8.1.3
- [patch] Updated dependencies [eee2d45](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eee2d45)
  - @atlaskit/code@6.0.0
  - @atlaskit/docs@4.2.1

## 8.1.2
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/button@8.1.2
  - @atlaskit/field-radio-group@3.0.4

## 8.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/field-radio-group@3.0.3
  - @atlaskit/button@8.1.1
  - @atlaskit/docs@4.1.1

## 8.1.0
- [none] Updated dependencies [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/field-radio-group@3.0.2
  - @atlaskit/docs@4.1.0
  - @atlaskit/button@8.1.0

## 8.0.1
- [patch] Update readme's [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
  - @atlaskit/field-radio-group@3.0.1
  - @atlaskit/button@8.0.1
  - @atlaskit/docs@4.0.1

## 8.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/field-radio-group@3.0.0
  - @atlaskit/button@8.0.0
  - @atlaskit/docs@4.0.0

## 7.0.1
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/field-radio-group@2.0.3
  - @atlaskit/button@7.2.5
  - @atlaskit/docs@3.0.4

## 7.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 6.2.2
- [patch] Add "sideEffects: false" to AKM2 packages to allow consumer's to tree-shake [c3b018a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3b018a)

## 6.2.1
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ed0bba)

## 6.2.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 6.1.2
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 6.1.1
- [patch] Packages Flow types for elements components [3111e74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3111e74)

## 6.1.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 6.0.7
- [patch] Fix inherited color logo gradient changes not working in chrome [694c59f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/694c59f)

## 6.0.3
- [patch] Logo component gradients no work in Firefox and Safari [6d1f521](6d1f521)

## 6.0.0 (2017-11-09)
* breaking; Removed the collapseTo prop in favour of explicit named exports (see below).
* breaking; The default export has been removed in favour of named exports. The named exports are now: AtlassianLogo, AtlassianIcon, AtlassianWordmark, BitbucketLogo, BitbucketIcon, BitbucketWordmark, ConfluenceLogo, ConfluenceIcon, ConfluenceWordmark, HipchatLogo, HipchatIcon, HipchatWordmark, JiraCoreLogo, JiraCoreIcon, JiraCoreWordmark, JiraLogo, JiraIcon, JiraWordmark, StatuspageLogo, StatuspageIcon, StatuspageWordmark, StrideLogo, StrideIcon, StrideWordmark.

## 5.0.0 (2017-10-27)
* bug fix; fixed logo width issue in IE11. ([0ce8ab7](https://bitbucket.org/atlassian/atlaskit/commits/0ce8ab7))
* breaking; Logo sizes changed, children no longer accepted ([7173d81](https://bitbucket.org/atlassian/atlaskit/commits/7173d81))
* breaking; refactoring Logo component to fix numerous bugs ([7173d81](https://bitbucket.org/atlassian/atlaskit/commits/7173d81))

## 4.0.3 (2017-10-26)
* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

## 4.0.2 (2017-10-22)
* bug fix; update styled-components dep and react peerDep ([6a67bf8](https://bitbucket.org/atlassian/atlaskit/commits/6a67bf8))

## 4.0.1 (2017-09-14)
* bug fix; jSD and Statuspage logo icons have fixed gradients (issues closed: ak-3479) ([60d8aca](https://bitbucket.org/atlassian/atlaskit/commits/60d8aca))

## 4.0.0 (2017-09-11)
* breaking; All logos have been updated with new assets, please test these inside your application to make sure ([c4db7fc](https://bitbucket.org/atlassian/atlaskit/commits/c4db7fc))
* breaking; new and updated company and product logos ([c4db7fc](https://bitbucket.org/atlassian/atlaskit/commits/c4db7fc))

## 3.5.3 (2017-08-11)
* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))

## 3.5.2 (2017-07-27)
* fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))

## 3.5.1 (2017-07-25)
* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 3.2.0 (2017-07-17)
* fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

## 3.2.0 (2017-07-17)
* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))

## 3.1.0 (2017-06-08)
* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))
* feature; Convert logo to styled-components updated internal structure ([ec91404](https://bitbucket.org/atlassian/atlaskit/commits/ec91404))

## 3.0.6 (2017-04-27)
* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 3.0.5 (2017-04-26)
* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 3.0.4 (2017-04-18)
* fix; update logo readme to use new readme component ([491d789](https://bitbucket.org/atlassian/atlaskit/commits/491d789))

## 3.0.3 (2017-03-23)
* fix; Empty commit to release the component ([49c08ee](https://bitbucket.org/atlassian/atlaskit/commits/49c08ee))

## 3.0.1 (2017-03-21)
* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 3.0.0 (2017-03-06)
* feature; text-only logo mode without icon ([b989245](https://bitbucket.org/atlassian/atlaskit/commits/b989245))
* breaking; isCollapsed prop has been replaced with an optional collapseTo prop (accepts value of 'icon' or 'type')
* ISSUES CLOSED: AK-1408

## 2.0.1 (2017-02-09)
* fix; avoiding binding render to this ([40c9951](https://bitbucket.org/atlassian/atlaskit/commits/40c9951))

## 1.0.0 (2017-02-06)
* fix; fix logo to have public access ([5a41e37](https://bitbucket.org/atlassian/atlaskit/commits/5a41e37))

## 1.0.0 (2017-02-06)
* feature; Add more product logos ([e84ae80](https://bitbucket.org/atlassian/atlaskit/commits/e84ae80))
* feature; Adjust width of collapsed logo ([99fa4a5](https://bitbucket.org/atlassian/atlaskit/commits/99fa4a5))
