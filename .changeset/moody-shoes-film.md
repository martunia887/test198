---
'@atlaskit/editor-core': minor
---

ED-8253: add support for context panel in full page editor

Adds a new `contextPanel` prop, that accepts React components. You will likely want to pass it the `ContextPanel` React component and place your content inside that component instead of passing content directly.

The `packages/editor/editor-core/examples/5-full-page-template-context-panel.tsx` example provides a somewhat fleshed out example on how to integrate the context panel.
