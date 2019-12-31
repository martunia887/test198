---
'@atlaskit/media-card': major
'@atlaskit/media-filmstrip': major
---

Remove `onChangeSelected` and `onLoadingChange` from `media-card` and `media-filmstrip` as they are unused. The behavior is now achieved with `mediaClient.file.getFileState`:

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
