# @atlaskit/comment

## 7.0.6
- Updated dependencies [9c0b4744be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c0b4744be):
  - @atlaskit/docs@7.0.3
  - @atlaskit/avatar@15.0.4
  - @atlaskit/button@12.0.3
  - @atlaskit/icon@16.0.9
  - @atlaskit/lozenge@7.0.2
  - @atlaskit/editor-core@107.13.4
  - @atlaskit/theme@8.1.7

## 7.0.5
- Updated dependencies [1e826b2966](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e826b2966):
  - @atlaskit/docs@7.0.2
  - @atlaskit/analytics-next@4.0.3
  - @atlaskit/avatar@15.0.3
  - @atlaskit/icon@16.0.8
  - @atlaskit/theme@8.1.6
  - @atlaskit/editor-core@107.12.5
  - @atlaskit/button@12.0.0

## 7.0.4
- Updated dependencies [c2c36de22b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c2c36de22b):
  - @atlaskit/editor-core@107.0.0

## 7.0.3
- Updated dependencies [9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):
  - @atlaskit/docs@7.0.1
  - @atlaskit/analytics-next@4.0.1
  - @atlaskit/avatar@15.0.1
  - @atlaskit/icon@16.0.5
  - @atlaskit/theme@8.0.1
  - @atlaskit/editor-core@106.0.0
  - @atlaskit/button@11.0.0

## 7.0.2
- Updated dependencies [7ab3e93996](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ab3e93996):
  - @atlaskit/editor-core@105.0.0

## 7.0.1
- Updated dependencies [4d17df92f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4d17df92f8):
  - @atlaskit/editor-core@104.0.0

## 7.0.0
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

## 6.0.45
- Updated dependencies [60f0ad9a7e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/60f0ad9a7e):
  - @atlaskit/editor-core@103.0.0

## 6.0.44
- Updated dependencies [4aee5f3cec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4aee5f3cec):
  - @atlaskit/editor-core@102.0.0

## 6.0.43
- Updated dependencies [4a84fc40e0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4a84fc40e0):
  - @atlaskit/editor-core@101.0.0

## 6.0.42
- Updated dependencies [4af5bd2a58](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4af5bd2a58):
  - @atlaskit/editor-core@100.0.0

## 6.0.41
- Updated dependencies [fc6164c8c2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc6164c8c2):
  - @atlaskit/editor-core@99.0.0

## 6.0.40
- Updated dependencies [69c8d0c19c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69c8d0c19c):
  - @atlaskit/editor-core@98.0.0

## 6.0.39
- Updated dependencies [d7ef59d432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7ef59d432):
  - @atlaskit/docs@6.0.1
  - @atlaskit/avatar@14.1.8
  - @atlaskit/button@10.1.2
  - @atlaskit/editor-core@97.0.1
  - @atlaskit/icon@16.0.0

## 6.0.38
- Updated dependencies [85d5d168fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/85d5d168fd):
  - @atlaskit/editor-core@97.0.0

## 6.0.37
- Updated dependencies [dadef80](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dadef80):
  - @atlaskit/editor-core@96.0.0

## 6.0.36
- [patch] [19783cb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/19783cb):

  - Fixed @atlaskit/visual-regression being incorrectly listed as a dependency.

## 6.0.35
- Updated dependencies [0c116d6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c116d6):
  - @atlaskit/editor-core@95.0.0

## 6.0.34
- Updated dependencies [cbb8cb5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cbb8cb5):
  - @atlaskit/editor-core@94.0.0

## 6.0.33
- Updated dependencies [72d37fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/72d37fb):
  - @atlaskit/editor-core@93.0.0

## 6.0.32
- Updated dependencies [b3738ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b3738ea):
  - @atlaskit/editor-core@92.0.0

## 6.0.31
- Updated dependencies [80f765b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80f765b):
  - @atlaskit/editor-core@91.0.0

## 6.0.30
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/analytics-next@3.1.2
  - @atlaskit/avatar@14.1.7
  - @atlaskit/button@10.1.1
  - @atlaskit/icon@15.0.2
  - @atlaskit/lozenge@6.2.4
  - @atlaskit/theme@7.0.1
  - @atlaskit/editor-core@90.3.15
  - @atlaskit/docs@6.0.0

## 6.0.29
- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/button@10.0.4
  - @atlaskit/icon@15.0.1
  - @atlaskit/editor-core@90.2.1
  - @atlaskit/theme@7.0.0
  - @atlaskit/avatar@14.1.6
  - @atlaskit/lozenge@6.2.3

## 6.0.28
- Updated dependencies [3a7224a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3a7224a):
  - @atlaskit/editor-core@90.0.0

## 6.0.27
- Updated dependencies [ab9b69c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab9b69c):
  - @atlaskit/docs@5.2.2
  - @atlaskit/avatar@14.1.5
  - @atlaskit/button@10.0.1
  - @atlaskit/editor-core@89.0.6
  - @atlaskit/icon@15.0.0

## 6.0.26
- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/analytics-next@3.1.1
  - @atlaskit/avatar@14.1.4
  - @atlaskit/icon@14.6.1
  - @atlaskit/theme@6.2.1
  - @atlaskit/editor-core@89.0.4
  - @atlaskit/button@10.0.0

## 6.0.25
- Updated dependencies [7e8b4b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e8b4b9):
  - @atlaskit/editor-core@89.0.0

## 6.0.24
- Updated dependencies [2c21466](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2c21466):
  - @atlaskit/editor-core@88.0.0

## 6.0.23
- [patch] Updated dependencies [052ce89](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/052ce89)
  - @atlaskit/editor-core@87.0.0

## 6.0.22
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)

## 6.0.21
- [patch] Updated dependencies [b1ce691](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1ce691)
  - @atlaskit/editor-core@86.0.0

## 6.0.20
- [patch] Updated dependencies [2afa60d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2afa60d)
  - @atlaskit/editor-core@85.0.0

## 6.0.19
- [patch] Updated dependencies [8b2c4d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b2c4d3)
- [patch] Updated dependencies [3302d51](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3302d51)
  - @atlaskit/editor-core@84.0.0

## 6.0.18
- [patch] Updated dependencies [23c7eca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/23c7eca)
  - @atlaskit/editor-core@83.0.0

## 6.0.17
- [patch] Updated dependencies [65c6514](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65c6514)
  - @atlaskit/docs@5.0.8
  - @atlaskit/avatar@14.0.11
  - @atlaskit/button@9.0.13
  - @atlaskit/editor-core@82.3.1
  - @atlaskit/icon@14.0.0

## 6.0.16
- [patch] Updated dependencies [ef76f1f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef76f1f)
  - @atlaskit/editor-core@82.0.0

## 6.0.15
- [patch] Updated dependencies [927ae63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/927ae63)
  - @atlaskit/editor-core@81.0.0

## 6.0.14
- [patch] Updated dependencies [6e1d642](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e1d642)
  - @atlaskit/editor-core@80.0.0

## 6.0.13
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5d6d04)

## 6.0.12
- [patch] Updated dependencies [7545979](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7545979)
  - @atlaskit/editor-core@79.0.0

## 6.0.11
- [patch] Updated dependencies [911a570](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/911a570)
  - @atlaskit/editor-core@78.0.0

## 6.0.9
- [patch] Clean changelogs and exclude the editor example from the ssr test [ced154b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ced154b)

## 6.0.8
- [patch] Updated dependencies [b12f7e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b12f7e6)
  - @atlaskit/editor-core@77.1.4

## 6.0.7
- [patch] Updated dependencies [df22ad8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df22ad8)
  - @atlaskit/theme@6.0.0
  - @atlaskit/editor-core@77.0.14
  - @atlaskit/lozenge@6.1.5
  - @atlaskit/icon@13.2.5
  - @atlaskit/button@9.0.6
  - @atlaskit/avatar@14.0.8
  - @atlaskit/docs@5.0.6

## 6.0.6
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/editor-core@77.0.2
  - @atlaskit/analytics-next@3.0.4
  - @atlaskit/button@9.0.5
  - @atlaskit/theme@5.1.3
  - @atlaskit/lozenge@6.1.4
  - @atlaskit/icon@13.2.4
  - @atlaskit/avatar@14.0.6

## 6.0.5
- [none] Updated dependencies [597e0bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/597e0bd)
  - @atlaskit/editor-core@77.0.0

## 6.0.4
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/editor-core@76.4.5
  - @atlaskit/icon@13.2.2
  - @atlaskit/button@9.0.4
  - @atlaskit/theme@5.1.2
  - @atlaskit/lozenge@6.1.3
  - @atlaskit/analytics-next@3.0.3
  - @atlaskit/docs@5.0.2
  - @atlaskit/avatar@14.0.5

## 6.0.3
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
  - @atlaskit/analytics-next@3.0.2
  - @atlaskit/button@9.0.3
  - @atlaskit/theme@5.1.1
  - @atlaskit/lozenge@6.1.2
  - @atlaskit/icon@13.2.1
  - @atlaskit/avatar@14.0.4

## 6.0.2
- [patch] Move analytics tests and replace elements to core [49d4ab4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49d4ab4)
- [none] Updated dependencies [49d4ab4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49d4ab4)
  - @atlaskit/analytics-next@3.0.1
  - @atlaskit/button@9.0.2
  - @atlaskit/lozenge@6.1.1
  - @atlaskit/docs@5.0.1
  - @atlaskit/avatar@14.0.2

## 6.0.1
- [none] Updated dependencies [25353c3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25353c3)
  - @atlaskit/editor-core@76.0.0
- [patch] Updated dependencies [38c0543](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/38c0543)
  - @atlaskit/editor-core@76.0.0

## 6.0.0
- [major] Provides analytics for common component interations. See the [Instrumented Components](https://atlaskit.atlassian.com/packages/core/analytics-next) section for more details. If you are using enzyme for testing you will have to use [our forked version of the library](https://atlaskit.atlassian.com/docs/guides/testing#we-use-a-forked-version-of-enzyme). [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/editor-core@75.0.0
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/lozenge@6.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/icon@13.0.0
  - @atlaskit/avatar@14.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/editor-core@75.0.0
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/lozenge@6.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/icon@13.0.0
  - @atlaskit/avatar@14.0.0

## 5.0.6
- [none] Updated dependencies [da63331](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da63331)
  - @atlaskit/button@8.2.5
  - @atlaskit/editor-core@74.0.8
  - @atlaskit/avatar@13.0.0
- [patch] Updated dependencies [7724115](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7724115)
  - @atlaskit/avatar@13.0.0
  - @atlaskit/editor-core@74.0.8
  - @atlaskit/button@8.2.5

## 5.0.5
- [patch] Updated dependencies [af0cde6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af0cde6)
  - @atlaskit/editor-core@74.0.0

## 5.0.4
- [patch] Updated dependencies [8a01bcd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a01bcd)
  - @atlaskit/avatar@12.0.0
  - @atlaskit/editor-core@73.9.19

## 5.0.3
- [patch] Updated dependencies [8d5053e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8d5053e)
  - @atlaskit/editor-core@73.9.5

## 5.0.2
- [patch] Updated dependencies [0cf2f52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0cf2f52)
  - @atlaskit/editor-core@73.9.2

## 5.0.1


- [patch] Updated dependencies [5b79a19](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5b79a19)
  - @atlaskit/editor-core@73.8.20
- [none] Updated dependencies [d708792](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d708792)
  - @atlaskit/editor-core@73.8.20

## 5.0.0
- [major] No longer add a "Restricted to " prefix to the value of the retrictedTo prop. The "restricted to" label will show whatever you set to the restrictedTo prop. [8efe0af](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8efe0af)

## 4.1.2
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/editor-core@73.7.5
  - @atlaskit/button@8.1.2
  - @atlaskit/theme@4.0.4
  - @atlaskit/lozenge@5.0.4
  - @atlaskit/icon@12.1.2

## 4.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/editor-core@73.7.1
  - @atlaskit/theme@4.0.3
  - @atlaskit/lozenge@5.0.3
  - @atlaskit/icon@12.1.1
  - @atlaskit/button@8.1.1
  - @atlaskit/avatar@11.1.1
  - @atlaskit/docs@4.1.1

## 4.1.0
- [none] Updated dependencies [7217164](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7217164)
  - @atlaskit/editor-core@73.5.0

## 4.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/editor-core@73.0.0
  - @atlaskit/icon@12.0.0
  - @atlaskit/button@8.0.0
  - @atlaskit/theme@4.0.0
  - @atlaskit/lozenge@5.0.0
  - @atlaskit/docs@4.0.0
  - @atlaskit/avatar@11.0.0

## 3.1.9
- [patch] Updated dependencies [1c87e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c87e5a)
  - @atlaskit/editor-core@72.2.2

## 3.1.8
- [none] Updated dependencies [febc44d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febc44d)
  - @atlaskit/editor-core@72.0.0

## 3.1.7
- [patch] Remove button for Edited and replace it by a span [ad3cd34](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ad3cd34)

## 3.1.6
- [none] Updated dependencies [8fd4dd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8fd4dd1)
  - @atlaskit/editor-core@71.4.0
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/editor-core@71.4.0
  - @atlaskit/icon@11.3.0
  - @atlaskit/button@7.2.5
  - @atlaskit/theme@3.2.2
  - @atlaskit/avatar@10.0.6
  - @atlaskit/docs@3.0.4
  - @atlaskit/lozenge@4.0.1
## 3.1.3
- [patch] Avatar margin should be 8px [d4945ae](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d4945ae)

## 3.1.0
- [minor] Adding permalink support [c79d549](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c79d549)

## 3.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 2.7.2
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ed0bba)

## 2.7.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 2.6.15
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 2.6.14
- [patch] Packages Flow types for elements components [3111e74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3111e74)

## 2.6.12
- [patch] Fix comment layout to prevent unmount on every change [fbf6db3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fbf6db3)

## 2.6.9
- [patch] Resolved low hanging flow errors in field-base field-text comment icon item and website, $ [007de27](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/007de27)

## 2.6.8
- [patch] migrated ak to mk-2 [c3d17da](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3d17da)

## 2.6.7 (2017-10-26)
* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

## 2.6.6 (2017-10-22)
* bug fix; update dependencies for react-16 ([077d1ad](https://bitbucket.org/atlassian/atlaskit/commits/077d1ad))

## 2.6.5 (2017-10-15)
* bug fix; update dependencies for react 16 compatibility ([fc47c94](https://bitbucket.org/atlassian/atlaskit/commits/fc47c94))

## 2.6.4 (2017-08-21)
* bug fix; fix PropTypes warning ([040d579](https://bitbucket.org/atlassian/atlaskit/commits/040d579))

## 2.6.3 (2017-08-11)
* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))

## 2.6.2 (2017-07-27)
* fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))

## 2.6.1 (2017-07-25)
* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 2.3.0 (2017-07-17)
* fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

## 2.3.0 (2017-07-17)
* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))

## 2.2.0 (2017-07-04)
* fix; remove timestamp prop from CommentTime. Create relative time usage example ([afb8fc0](https://bitbucket.org/atlassian/atlaskit/commits/afb8fc0))
* feature; add highlighted appearance state to comments ([683b905](https://bitbucket.org/atlassian/atlaskit/commits/683b905))

## 2.1.0 (2017-06-29)
* fix; update comment restricted icon to match design spec ([5f9a942](https://bitbucket.org/atlassian/atlaskit/commits/5f9a942))
* feature; commentTime accepts timestamp prop to display relative time. ([7711a22](https://bitbucket.org/atlassian/atlaskit/commits/7711a22))

## 2.0.1 (2017-06-22)
* fix; add usage pattern for comment with inline delete ([19426d4](https://bitbucket.org/atlassian/atlaskit/commits/19426d4))

## 2.0.0 (2017-06-14)
* refactor comment to styled-components ([204a35f](https://bitbucket.org/atlassian/atlaskit/commits/204a35f))
* breaking; Convert component to use styled-components instead of less
* ISSUES CLOSED: #AK-2383

## 1.5.2 (2017-06-01)
* fix; fS-1018 When no other actions present, reactions button does not left-align with com ([85a539f](https://bitbucket.org/atlassian/atlaskit/commits/85a539f))

## 1.5.1 (2017-05-30)
* fix; fS-957 Center comment actions into flexbox ([b6968d4](https://bitbucket.org/atlassian/atlaskit/commits/b6968d4))
* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))

## 1.5.0 (2017-05-02)
* feature; adds 'errorActions', 'isError' and 'errorIconLabel' props for showing error states ([4621fb3](https://bitbucket.org/atlassian/atlaskit/commits/4621fb3))
* feature; adds 'errorActions', 'isError' and 'errorIconLabel' props to ak-comment for showing ([de38d98](https://bitbucket.org/atlassian/atlaskit/commits/de38d98))

## 1.4.2 (2017-04-27)
* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 1.4.1 (2017-04-26)
* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 1.4.0 (2017-04-20)
* feature; removed explicit style! imports, set style-loader in webpack config ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))

## 1.3.0 (2017-04-18)
* feature; updated avatar dependency versions for comment, dropdown-menu, droplist, and page ([e4d2ae7](https://bitbucket.org/atlassian/atlaskit/commits/e4d2ae7))

## 1.2.2 (2017-04-11)
* fix; update comment stories to use new readme component ([7d25b2f](https://bitbucket.org/atlassian/atlaskit/commits/7d25b2f))

## 1.2.1 (2017-04-04)
* fix; fix broken storybooks that use the editor component ([5c50bc3](https://bitbucket.org/atlassian/atlaskit/commits/5c50bc3))

## 1.2.0 (2017-03-27)
* feature; adds the isSaving and savingText props ([12a1f14](https://bitbucket.org/atlassian/atlaskit/commits/12a1f14))

## 1.1.0 (2017-03-23)
* fix; Empty commit to release the component ([49c08ee](https://bitbucket.org/atlassian/atlaskit/commits/49c08ee))
* feature; adds restricted prop to Comments ([dd81d3b](https://bitbucket.org/atlassian/atlaskit/commits/dd81d3b))
* feature; renamed the restricted prop to "restrictedTo" for code clarity ([2f20eb6](https://bitbucket.org/atlassian/atlaskit/commits/2f20eb6))

## 1.0.5 (2017-03-21)
* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.0.4 (2017-03-16)
* fix; added flex-basis: 100% to fix ie11 ([c1e7e22](https://bitbucket.org/atlassian/atlaskit/commits/c1e7e22))
* fix; removes width: 100% from the comment content style, as this would allow the content ([eca5a31](https://bitbucket.org/atlassian/atlaskit/commits/eca5a31))

## 1.0.3 (2017-03-08)
* fix; fixes for alignment and spacing in the comment component ([cca7a03](https://bitbucket.org/atlassian/atlaskit/commits/cca7a03))

## 1.0.2 (2017-02-16)
* fix; Content no longer an array and instead a single node. ([6b6b2e1](https://bitbucket.org/atlassian/atlaskit/commits/6b6b2e1))

## 1.0.1 (2017-02-07)
* fix; Updates package to use ak scoped packages ([f80a01f](https://bitbucket.org/atlassian/atlaskit/commits/f80a01f))
