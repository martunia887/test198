---
'@atlaskit/media-picker': major
---

Removed the following from the Media Picker public API:

1.`upload-status-update`  
 2.`onStatusUpdate`  
 3.`UploadStatusUploadEventPayload`  
 4.`MediaProgress`

This functionality is now achieved through `getFileState()`:

```
import {getMediaClient} from '@atlaskit/media-client'

const mediaClient = getMediaClient({
  mediaClientConfig: {
    authProvider: () => Promise.resolve()
  }
})

mediaClient.file.getFileState('file-id', {
  next(state) {
    console.log(state)
  }
})
```
