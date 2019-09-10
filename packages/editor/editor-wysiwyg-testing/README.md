### WYSIWYG Visual Consistency Testing

### What is this?

**Compares VR snapshots of the editor & renderer to validate the [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) (_what you see is what you get_) result.**

> Showcasing them side by side allows us to see how consistent they are.
> Hopefully, this leads to reduced divergence as we're making changes to the code in either `editor`, `renderer`, or `editor-common` (which is used by both).

The purpose of this package is to allow developers to trust that their changes won't negatively impact the WYSIWYG consistency offered to our customers.



### How do we do this?

Testing of each content node is done in isolation. We render 3 instances of each node, since the styling of the node may differ for the first or last instance.

For the same reason, we also render each content node inside each container node, as the styling for the instance rules may reset per container.

The tests will run automatically in CI whenever a change to a dependent package occurs.

* `@atlaskit/editor`
* `@atlaskit/renderer`
* `@atlaskit/editor-common`.

You can also run the tests locally when making stylistic changes. 

```
yarn test:vr editor-wysiwyg-testing
```

### Implementation

**Unlike regular VR tests this package doesn't store visual snapshot images.**

Instead, it stores percentage values in a [Jest Snap file](https://jestjs.io/docs/en/snapshot-testing#whats-the-difference-between-snapshot-testing-and-visual-regression-testing) to measure and track the _visual consistency_ (or _divergence_) between the rendered results of the editor & renderer over time.

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`WYSIWYG Comparison: actions 1`] = `
Object {
  "consistency": "100%",
  "divergence": 0,
}
`;

exports[`WYSIWYG Comparison: actions inside columns 1`] = `
Object {
  "consistency": "92.05%",
  "divergence": 0.0794590856144438,
}
`;

... other content nodes ...
```

### Tracking Changes

**The tests will fail if there is _any change_ to the percentage of a content node (improvement or regression!).**

When _improved_ consistency occurs:

* The updated percentages should be committed. _Well done!_ 🥳

Increased _divergence_ should be treated with caution:

* Attempt to restore and standardise any visual changes across both editor & render based on changes within your branch.
* If the consistency of a node worsens after up-merging downstream changes, and if you're unable to remedy the regression, you can set the latest values as the new baseline.

You can update the snapshots by using the `--updateSnapshot` or `-u` flag.

```
yarn test:vr editor-wysiwyg-testing -u
```

_Analytics are dispatched whenever we update the snapshot file to track changes over time._


### Troubleshooting Changes

To aid in troubleshooting regressions you can view the generated composite diff image(s) to see what's happened.

> **Note that the generated image is the current state of affairs. You won't see how it looked previously, because we haven't commited any image snapshots.**

Files are prefixed with `wysiwyg-` and suffixed with `-erd`, which stands for _'editor-renderer-diff'_.
(e.g. `wysiwyg-actions-erd.png`, `wysiwyg-actions-inside-table-erd.png`)

When a failure occurs in CI:

* The diff images are available for download via the same `artifacts.tar.gz` file produced by normal VR test failures.
(e.g. inside a `imageSnapshotFailures` folder)

When running the tests locally:

* Diff images for failures can be found inside `editor-wysiwyg-testing/src/__tests__/visual-regression/__image_snapshots__/__diff_output__/`.
* Additionally, for debugging purposes, the diff images for all content node tests are available inside `editor-wysiwyg-testing/src/__tests__/visual-regression/__image_snapshots__/__diff_output__/__debug__`.
