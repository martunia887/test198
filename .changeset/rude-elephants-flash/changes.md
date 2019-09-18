FM-2220 Expose new method on editor bridge to inform native when user clicks on media in the editor

Method is available on both Android and iOS bridges as:

```
mediaBridge.onMediaClick(mediaId: string, collectionName: string, occurrenceKey?: string) => void
```
