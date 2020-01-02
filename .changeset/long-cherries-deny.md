---
'@atlaskit/media-picker': major
---

1. Removed `upload-status-update` and `onStatusUpdate` from the Media Picker public API as it is not used. You should now use `getFileState()`:

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

2. Removed `MediaProgress` class
3. Removed unused `progress` property from `local-upload`
