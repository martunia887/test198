# @atlaskit/mobile-header

## 2.1.2
- Updated dependencies [9c0b4744be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c0b4744be):
  - @atlaskit/docs@7.0.3
  - @atlaskit/button@12.0.3
  - @atlaskit/icon@16.0.9
  - @atlaskit/navigation@34.0.4
  - @atlaskit/theme@8.1.7

## 2.1.1
- Updated dependencies [1e826b2966](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e826b2966):
  - @atlaskit/docs@7.0.2
  - @atlaskit/icon@16.0.8
  - @atlaskit/navigation@34.0.3
  - @atlaskit/theme@8.1.6
  - @atlaskit/button@12.0.0

## 2.1.0
- [minor] [1b1adaea63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b1adaea63):

  - Support using a custom menu button via new customMenu prop

## 2.0.1
- Updated dependencies [9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):
  - @atlaskit/docs@7.0.1
  - @atlaskit/icon@16.0.5
  - @atlaskit/navigation@34.0.1
  - @atlaskit/theme@8.0.1
  - @atlaskit/button@11.0.0

## 2.0.0
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

## 1.1.6
- Updated dependencies [d7ef59d432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7ef59d432):
  - @atlaskit/docs@6.0.1
  - @atlaskit/button@10.1.2
  - @atlaskit/navigation@33.3.9
  - @atlaskit/icon@16.0.0

## 1.1.5
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/button@10.1.1
  - @atlaskit/icon@15.0.2
  - @atlaskit/navigation@33.3.8
  - @atlaskit/theme@7.0.1
  - @atlaskit/docs@6.0.0

## 1.1.4
- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/button@10.0.4
  - @atlaskit/icon@15.0.1
  - @atlaskit/navigation@33.3.7
  - @atlaskit/theme@7.0.0

## 1.1.3
- Updated dependencies [ab9b69c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab9b69c):
  - @atlaskit/docs@5.2.2
  - @atlaskit/button@10.0.1
  - @atlaskit/navigation@33.3.6
  - @atlaskit/icon@15.0.0

## 1.1.2
- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/icon@14.6.1
  - @atlaskit/navigation@33.3.5
  - @atlaskit/theme@6.2.1
  - @atlaskit/button@10.0.0

## 1.1.1
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)

## 1.1.0
- [minor] changing pageHeading type so can internationalize it easier [6e688a9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e688a9)

## 1.0.1
- [patch] Updated dependencies [65c6514](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65c6514)
  - @atlaskit/docs@5.0.8
  - @atlaskit/button@9.0.13
  - @atlaskit/navigation@33.1.11
  - @atlaskit/icon@14.0.0

## 1.0.0
- [patch] updated examples [edff5c9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/edff5c9)
- [major] Changed layout from position sticky to fixed and adjusted color contrast. [1648676](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1648676)
- [patch] Added dark theme and addressed PR comments/tasks. [de18390](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/de18390)
- [major] add mobile header component to atlaskit [93a318a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/93a318a)
