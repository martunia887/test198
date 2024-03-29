# @atlaskit/react-experiment-framework

## 0.3.1
- [patch] [d5a1fbfdef](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d5a1fbfdef):

  - Fix to package.json to allow imports to work correctly

## 0.3.0
- [minor] [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):

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

## 0.2.1
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/section-message@1.0.14
  - @atlaskit/docs@6.0.0

## 0.2.0

- [minor] Resolver promises cache was extracted from state so it can be updated anytime during component's life cycle to remove react warnings [6ca88f5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6ca88f5)

## 0.1.0

- [minor] Initial Implementation [0092f03](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0092f03)
