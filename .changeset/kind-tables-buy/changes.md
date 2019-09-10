ED-7674: support nested actions in stage-0 schema; change DOM representation of actions

This changeset only updates action support in the schema. The editor and renderer currently do nothing special to work with nested actions. Currently, they appear as as flat list.

Also changes the DOM representation of actions away from a `ol > li` structure, to a `div > div` one. That is, both the `taskList` and `taskItem` are wrapped in `div` elements.