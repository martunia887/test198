# @atlaskit/checkbox

## 6.0.4
- Updated dependencies [9c0b4744be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c0b4744be):
  - @atlaskit/docs@7.0.3
  - @atlaskit/button@12.0.3
  - @atlaskit/form@5.2.7
  - @atlaskit/icon@16.0.9
  - @atlaskit/section-message@2.0.3
  - @atlaskit/theme@8.1.7

## 6.0.3
- Updated dependencies [1e826b2966](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e826b2966):
  - @atlaskit/docs@7.0.2
  - @atlaskit/analytics-next@4.0.3
  - @atlaskit/form@5.2.5
  - @atlaskit/icon@16.0.8
  - @atlaskit/section-message@2.0.2
  - @atlaskit/theme@8.1.6
  - @atlaskit/button@12.0.0

## 6.0.2
- [patch] [98e11001ff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/98e11001ff):

  - Removes duplicate babel-runtime dependency

## 6.0.1
- Updated dependencies [9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):
  - @atlaskit/docs@7.0.1
  - @atlaskit/analytics-next@4.0.1
  - @atlaskit/form@5.2.1
  - @atlaskit/icon@16.0.5
  - @atlaskit/section-message@2.0.1
  - @atlaskit/theme@8.0.1
  - @atlaskit/button@11.0.0

## 6.0.0
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

## 5.0.14
- [patch] [c0ad531a70](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c0ad531a70):

  - Added test to make use props are passed down to hidden input

## 5.0.13
- [patch] [3ae465b6f0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3ae465b6f0):

  - fix for checkbox logging error on mount

## 5.0.12
- [patch] [b0153ee6c9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b0153ee6c9):

  - Enabled the isRequired validation on checkbox and added the asterisk after the checkbox label to signify the required field

## 5.0.11
- Updated dependencies [d7ef59d432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7ef59d432):
  - @atlaskit/docs@6.0.1
  - @atlaskit/button@10.1.2
  - @atlaskit/section-message@1.0.16
  - @atlaskit/icon@16.0.0

## 5.0.10
- [patch] [fad28be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fad28be):

  - Fixing invalid type for checkbox id prop

## 5.0.9
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/analytics-next@3.1.2
  - @atlaskit/button@10.1.1
  - @atlaskit/icon@15.0.2
  - @atlaskit/section-message@1.0.14
  - @atlaskit/theme@7.0.1
  - @atlaskit/docs@6.0.0

## 5.0.8
- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/button@10.0.4
  - @atlaskit/icon@15.0.1
  - @atlaskit/section-message@1.0.13
  - @atlaskit/theme@7.0.0

## 5.0.7
- Updated dependencies [ab9b69c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab9b69c):
  - @atlaskit/docs@5.2.2
  - @atlaskit/button@10.0.1
  - @atlaskit/section-message@1.0.12
  - @atlaskit/icon@15.0.0

## 5.0.6
- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/analytics-next@3.1.1
  - @atlaskit/icon@14.6.1
  - @atlaskit/section-message@1.0.11
  - @atlaskit/theme@6.2.1
  - @atlaskit/button@10.0.0

## 5.0.5
- [patch] Upgrade guide & minor flow type fixes [0be287d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0be287d)

## 5.0.4
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)

## 5.0.3
- [patch] Fixed bug where checkbox would use state isChecked value when passing false to isChecked as props [eaf8d16](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eaf8d16)

## 5.0.2
- [patch] Updated dependencies [65c6514](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65c6514)
  - @atlaskit/docs@5.0.8
  - @atlaskit/button@9.0.13
  - @atlaskit/icon@14.0.0

## 5.0.1
- [patch] Checkbox now only fires onChange once [c78e59e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c78e59e)

## 5.0.0
- [major] Checkbox refactored to remove the need for CheckboxStateless  [80e1925](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80e1925)

## 4.0.6
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5d6d04)

## 4.0.4
- [patch] Updated dependencies [df22ad8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df22ad8)
  - @atlaskit/theme@6.0.0
  - @atlaskit/icon@13.2.5
  - @atlaskit/button@9.0.6
  - @atlaskit/docs@5.0.6

## 4.0.3
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/analytics-next@3.0.4
  - @atlaskit/button@9.0.5
  - @atlaskit/theme@5.1.3
  - @atlaskit/icon@13.2.4

## 4.0.2
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/icon@13.2.2
  - @atlaskit/button@9.0.4
  - @atlaskit/theme@5.1.2
  - @atlaskit/analytics-next@3.0.3
  - @atlaskit/docs@5.0.2

## 4.0.1
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
  - @atlaskit/analytics-next@3.0.2
  - @atlaskit/button@9.0.3
  - @atlaskit/theme@5.1.1
  - @atlaskit/icon@13.2.1

## 4.0.0
- [major] Provides analytics for common component interations. See the [Instrumented Components](https://atlaskit.atlassian.com/packages/core/analytics-next) section for more details. If you are using enzyme for testing you will have to use [our forked version of the library](https://atlaskit.atlassian.com/docs/guides/testing#we-use-a-forked-version-of-enzyme). [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/icon@13.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/icon@13.0.0

## 3.1.3
- [patch] Button should be a dev dependency [50ca31b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/50ca31b)
- [none] Updated dependencies [50ca31b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/50ca31b)

## 3.1.2
- [patch] Fix $FlowFixMe and release packages [25d0b2d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25d0b2d)
- [none] Updated dependencies [25d0b2d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25d0b2d)
  - @atlaskit/button@8.2.2
  - @atlaskit/icon@12.3.1

## 3.1.1
- [patch] update to active box color of checkbox to b50 to inline with ADG3 guideline [21073ca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/21073ca)
- [none] Updated dependencies [21073ca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/21073ca)

## 3.1.0
- [minor] Fixes types for Flow 0.74 [dc50cd2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc50cd2)
- [none] Updated dependencies [dc50cd2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc50cd2)
  - @atlaskit/button@8.2.0
  - @atlaskit/icon@12.2.0

## 3.0.6
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/button@8.1.2
  - @atlaskit/theme@4.0.4
  - @atlaskit/icon@12.1.2

## 3.0.5
- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/theme@4.0.3
  - @atlaskit/icon@12.1.1
  - @atlaskit/button@8.1.1
  - @atlaskit/docs@4.1.1

## 3.0.4
- [none] Updated dependencies [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/icon@12.1.0
  - @atlaskit/docs@4.1.0
  - @atlaskit/theme@4.0.2
  - @atlaskit/button@8.1.0


## 3.0.3
- [patch] ref prop on checkbox stateless component is now reference to class [05b4ffd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/05b4ffd)
- [none] Updated dependencies [05b4ffd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/05b4ffd)

## 3.0.2
- [patch] Fix for flow  [33f632f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/33f632f)
- [patch] Update onChange function to pass type for name and value [f3e768c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f3e768c)
- [none] Updated dependencies [33f632f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/33f632f)
- [none] Updated dependencies [f3e768c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f3e768c)

## 3.0.1
- [patch] Update readme's [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
  - @atlaskit/icon@12.0.1
  - @atlaskit/button@8.0.1
  - @atlaskit/theme@4.0.1
  - @atlaskit/docs@4.0.1

## 3.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/icon@12.0.0
  - @atlaskit/button@8.0.0
  - @atlaskit/theme@4.0.0
  - @atlaskit/docs@4.0.0

## 2.1.0
- [minor] Updated the appearance for checkbox and radio items [ece7426](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ece7426)
- [none] Updated dependencies [ece7426](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ece7426)

## 2.0.2
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/icon@11.3.0
  - @atlaskit/button@7.2.5
  - @atlaskit/theme@3.2.2
  - @atlaskit/docs@3.0.4

## 2.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 1.4.0
- [minor] Add indeterminate prop to stateless checkbox [3fc6c5e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3fc6c5e)

## 1.3.1
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ed0bba)

## 1.3.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 1.2.3
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 1.2.2
- [patch] Packages Flow types for elements components [3111e74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3111e74)

## 1.2.1
- [patch] Resolved low hanging flow errors in field-base field-text comment icon item and website, $ [007de27](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/007de27)

## 1.2.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 1.1.8
- [patch] update flow dep, fix flow errors  [722ad83](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/722ad83)

## 1.1.7
- [patch] Updates dependency on button to 6.0.0 [2b02ebc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2b02ebc)
- [patch] Moved to new repo & build system. Cleaned up docs & examples & added Flow   [9b55672](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9b55672)

## 1.1.6 (2017-11-24)
### Bug Fixes
* **component:** fixed typo in Checkbox defaultProps ([4388a11](https://bitbucket.org/atlassian/atlaskit/commits/4388a11))

## 1.1.5 (2017-11-22)
### Bug Fixes
* **component:** checkbox and radio should not highlight when parent element is focused ([5c900ff](https://bitbucket.org/atlassian/atlaskit/commits/5c900ff))
* **component:** removed focus styling from radio and checkbox svg as they will never be focused ([ec68128](https://bitbucket.org/atlassian/atlaskit/commits/ec68128))

## 1.1.4 (2017-11-15)
### Bug Fixes
* **component:** bumping internal dependencies to latest major version ([91833c3](https://bitbucket.org/atlassian/atlaskit/commits/91833c3))

## 1.1.3 (2017-10-27)
### Bug Fixes
* **stories:** rebuild stories ([7aa7337](https://bitbucket.org/atlassian/atlaskit/commits/7aa7337))

## 1.1.2 (2017-10-22)
### Bug Fixes
* **package:** update dependencies for react-16 ([077d1ad](https://bitbucket.org/atlassian/atlaskit/commits/077d1ad))

## 1.1.1 (2017-10-10)
### Bug Fixes
* **package:** removed internal label from keywords ([b76b4f2](https://bitbucket.org/atlassian/atlaskit/commits/b76b4f2))

# 1.1.0 (2017-09-27)
### Bug Fixes
* **component:** change margin of icon ([4459e96](https://bitbucket.org/atlassian/atlaskit/commits/4459e96))

### Features
* **component:** dark mode checkbox ([554c978](https://bitbucket.org/atlassian/atlaskit/commits/554c978))

# 1.0.0 (2017-09-13)
### Features

* **component:** create checkbox component ([5ce7055](https://bitbucket.org/atlassian/atlaskit/commits/5ce7055))
