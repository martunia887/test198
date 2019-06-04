# Common Share Component

## Notable internal behavior

The share modal will **retains its state** until the user either:
- triggers a share = share completed
- presses Esc = share cancelled

A click outside the modal will hide it, **but state will be retained** (share not cancelled).


## Decisions

### Should origin Id be regenerated on each click on "copy"?

Clicking the “copy” button is not really a share action, the share happens when the url is pasted somewhere…
Since we have no control over the actual share action, it shouldn’t be needed to re-generate on each “copy” click.


## Quick dev commands

```bash
bolt lint
bolt typecheck:typescript
bolt run test ./packages/elements/share/src/__tests__/*
bolt run test ./packages/elements/share/src/__tests__/unit/components/ShareDialogWithTriggerSpec.tsx
```
