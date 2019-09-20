**Features**

- Support "simple value" for _all_ select filters; the `value` is now array of strings representing the corresponding option's value. Use an alternate key by passing a `getOptionValue` to the filter config.
- Support "pinned" selected options for async variant
- Truncate button labels to 180px

**Fixes**

- Fixed various bugs in reference implementations
- Fixed lozenge select option formatting function to better handle the "clear option"

**Changes**

- Removed `defaultOptionsLabel` on SelectFilter; you should now just include the group/label in `defaultOptions`
