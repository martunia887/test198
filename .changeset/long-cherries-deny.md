---
'@atlaskit/media-picker': major
---

Removed `upload-status-update` and `onStatusUpdate` from the Media Picker public API as it is not used.

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
