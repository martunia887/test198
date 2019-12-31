---
'@atlaskit/media-picker': patch
---

(MS-2865) Fix race condition which caused upload-preview-update event to be sent twice, when it was only meant to be sent once.
