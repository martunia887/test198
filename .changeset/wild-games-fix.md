---
'@atlaskit/editor-core': minor
---

ED-8305: use different CSS for editor content area in full page

Previously used a calculated `margin-left`. This change sets a fixed width on the content area, and applies `margin: auto` instead.
