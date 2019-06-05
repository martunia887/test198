# Common Share Component

## Important notes

### Internal behavior

The share modal will **retains its form state** until the user either:
- triggers a share = share completed
- presses Esc = share cancelled

A click outside the modal will hide it, **but the form state will be retained** (share not cancelled).


### SSR

With SSR rendering, `window` is not available, hence some `window` checks here and there.

To test SSR in JIRA, see `services/jira-frontend-ssr/README.md`.


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
