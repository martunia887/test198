FM-2220 Add new editor prop `eventHandlers`

This is based off the renderer prop of the same name, but currently we only have support for a click handler for media

Use prop like:

```
<Editor
  eventHandlers={{
    media={{
      onClick={(mediaId: string, collectionName: string, occurrenceKey?: string) => {
      }}
    }}
  }}
/>
```
