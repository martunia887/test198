# @atlaskit/editor-core

## 107.13.4
- Updated dependencies [9c0b4744be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c0b4744be):
  - @atlaskit/docs@7.0.3
  - @atlaskit/avatar@15.0.4
  - @atlaskit/avatar-group@3.0.4
  - @atlaskit/button@12.0.3
  - @atlaskit/calendar@7.0.22
  - @atlaskit/code@9.0.1
  - @atlaskit/dropdown-menu@7.0.6
  - @atlaskit/droplist@8.0.5
  - @atlaskit/icon@16.0.9
  - @atlaskit/item@9.0.1
  - @atlaskit/logo@10.0.4
  - @atlaskit/lozenge@7.0.2
  - @atlaskit/modal-dialog@8.0.7
  - @atlaskit/section-message@2.0.3
  - @atlaskit/select@8.1.1
  - @atlaskit/spinner@10.0.7
  - @atlaskit/textarea@0.4.4
  - @atlaskit/tooltip@13.0.4
  - @atlaskit/editor-common@36.1.12
  - @atlaskit/renderer@45.6.1
  - @atlaskit/date@0.6.4
  - @atlaskit/emoji@59.2.3
  - @atlaskit/mention@17.6.7
  - @atlaskit/pubsub@4.0.4
  - @atlaskit/status@0.8.3
  - @atlaskit/task-decision@14.0.5
  - @atlaskit/media-card@60.0.3
  - @atlaskit/media-editor@32.0.6
  - @atlaskit/media-filmstrip@31.0.4
  - @atlaskit/media-picker@38.1.6
  - @atlaskit/smart-card@10.2.4
  - @atlaskit/theme@8.1.7

## 107.13.3
- [patch] [3f28e6443c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f28e6443c):

  - @atlaskit/analytics-next-types is deprecated. Now you can use types for @atlaskit/analytics-next supplied from itself.

## 107.13.2
- [patch] [8e86c7c9d4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8e86c7c9d4):

  - Use isImagePreview util to know if file is an image or not

## 107.13.1
- [patch] [351e23aeb5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/351e23aeb5):

  - ED-6102: fixed inline node deletion on Android

## 107.13.0
- [minor] [a16ea57a8c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a16ea57a8c):

  - ED-6623 Add new layout options "Left Sidebar" and "Right Sidebar" in addition to current layouts "Two Columns" and "Three Columns"

  To get access to the new layouts, configure the `allowLayouts` prop eg. `allowLayouts={ allowBreakout: true, UNSAFE_addSidebarLayouts: true }`

## 107.12.7
- Updated dependencies [cf018d7630](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cf018d7630):
  - @atlaskit/textarea@0.4.2

## 107.12.6
- [patch] [6695367885](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6695367885):

  - Revert emoji refactor

## 107.12.5
- Updated dependencies [1e826b2966](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e826b2966):
  - @atlaskit/docs@7.0.2
  - @atlaskit/analytics-next@4.0.3
  - @atlaskit/avatar@15.0.3
  - @atlaskit/avatar-group@3.0.3
  - @atlaskit/calendar@7.0.21
  - @atlaskit/dropdown-menu@7.0.4
  - @atlaskit/droplist@8.0.3
  - @atlaskit/icon@16.0.8
  - @atlaskit/logo@10.0.3
  - @atlaskit/modal-dialog@8.0.6
  - @atlaskit/section-message@2.0.2
  - @atlaskit/select@8.0.5
  - @atlaskit/spinner@10.0.5
  - @atlaskit/textarea@0.4.1
  - @atlaskit/theme@8.1.6
  - @atlaskit/tooltip@13.0.3
  - @atlaskit/renderer@45.4.3
  - @atlaskit/analytics-listeners@5.0.3
  - @atlaskit/emoji@59.2.1
  - @atlaskit/pubsub@4.0.3
  - @atlaskit/task-decision@14.0.3
  - @atlaskit/media-card@60.0.1
  - @atlaskit/media-core@29.1.4
  - @atlaskit/media-editor@32.0.5
  - @atlaskit/media-filmstrip@31.0.3
  - @atlaskit/media-picker@38.1.4
  - @atlaskit/smart-card@10.2.2
  - @atlaskit/button@12.0.0

## 107.12.4
- [patch] [068ecc926f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/068ecc926f):

  - Reverting column resize fix from ED-6627

## 107.12.3
- [patch] [247cc39577](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/247cc39577):

  - ED-2152 Remove any selection when pressing ` and completing inlinecode

## 107.12.2
- [patch] [24612aced0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/24612aced0):

  - [ED-6467] Fixes alignments (left and right) for images, making them keep on the half of lineLength

## 107.12.1
- [patch] [098e5197b6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/098e5197b6):

  - ED-6197 Provide fallback for image resizing snapTo. Set media resizing to be based on bounding box instead of chained parent offsets.

## 107.12.0
- [minor] [049ff62abf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/049ff62abf):

  - ED-6624: Add layout button to main toolbar

## 107.11.0
- [minor] [b81d427d5c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b81d427d5c):

  - ED-5373: Refactor emoji plugin to use new type ahead

## 107.10.2
- [patch] [55e47676aa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/55e47676aa):

  - revert update status code splits in Renderer/Editor which causes component dist to be broken

## 107.10.1
- [patch] [64dd2ab46f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/64dd2ab46f):

  - ED-6558 Fix clicking to set the cursor placement after an inline node that's at the end of a line. Set the default style attribute of Status nodes to be empty instead of 'null'.

## 107.10.0
- [minor] [969915d261](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/969915d261):

  - update status import entrypoints in Renderer/editor

## 107.9.6
- [patch] [0ff405bd0f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0ff405bd0f):

  - Removed CardView and CardViewLoader from public APIs and replaced it with light-weight and stateless CardLoading and CardError components. Handling of external images is now done by Card component itself using ExternalImageIdentifier interface.

  If you’ve been using CardView for loading:

  ```js
  <CardView
    status="loading"
    mediaItemType="file"
    dimensions={cardDimensions}
  />
  ```

  Now you can use new component:

  ```js
  <CardLoading dimensions={cardDimensions} />
  ```

  If you were using CardView to show an error

  ```js
  <CardView
    status="error"
    mediaItemType={type}
    dimensions={cardDimensions}
  />
  ```

  Now you can use new component:

  ```js
  <CardError dimensions={cardDimensions} />
  ```

  In case you were using CardView to show image with known external URI:

  ```js
  <CardView
    status="complete"
    dataURI={dataURI}
    metadata={metadata}
  />
  ```

  You will have to find a way to switch to using Card component using ExternalImageIdentifier interface:

  ```js
  <Card
    identifier={identifier}
    context={context}
  />
  ```

## 107.9.5
- [patch] [97e555c168](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/97e555c168):

  - Revert "[ED-5259 - ED-6200] adds defaultMarks on tableNode (pull request #5259)"

## 107.9.4
- [patch] [09a90e4af1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/09a90e4af1):

  - ED-6319 Supporting select media using gap cursor, fix behaviour of backspace key and gap cursor in media single with layout wrap-right.

## 107.9.3
- [patch] [a15643ba92](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a15643ba92):

  - Nodeviews now re-render without a view re-create

## 107.9.2
- [patch] [823d44ebb0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/823d44ebb0):

  - ED-6667 Enfoce consistent whitespace between renderer & editor

## 107.9.1
- [patch] [c976e9355c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c976e9355c):

  - ED-6320: support replacing smart links from Recent Items list via Cmd+K menu

## 107.9.0
- [minor] [2558e53738](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2558e53738):

  - ED-6665 Rename 'Panel' to 'Info Panel' (frontend text only)

## 107.8.3
- [patch] [b425ea772b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b425ea772b):

  - Revert "ED-5505 add strong as default mark to table header (pull request #5291)"

## 107.8.2
- [patch] [d13fad66df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13fad66df):

  - Enable esModuleInterop for typescript, this allows correct use of default exports

## 107.8.1
- [patch] [dfc4c5da7f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dfc4c5da7f):

  - Fix odd cursor selection going inside the inline smart links

## 107.8.0
- [minor] [02dd1f7287](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/02dd1f7287):

  - [ED-5505] Persists formatting to table cells and headers when toggling header row, column or applying any text formatting to empty cells.

## 107.7.12
- [patch] [44b14dba84](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44b14dba84):

  - ED-6651: fix cell borders when table has merged cells

## 107.7.11
- [patch] [2e5b1c9783](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e5b1c9783):

  - ED-6535: fix fallback for images without dimensions on upload

## 107.7.10
- [patch] [acfd88ba22](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acfd88ba22):

  - ED-6639 Align lists styles between editor & renderer

## 107.7.9
- [patch] [513fb8a1a9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/513fb8a1a9):

  - ED-6640: fix resizing not focused table

## 107.7.8
- [patch] [eaf2f72de1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eaf2f72de1):

  - ED-6650 Table doesn’t respond on inserting widget with min-width set

## 107.7.7
- [patch] [ce8caf29d5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ce8caf29d5):

  - ED-6463: fix contextual menu vertical position

## 107.7.6
- [patch] [eea996dac5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eea996dac5):

  - ED-6598: Toggling `fullWidthMode` now re-creates `EditorView` instead of only re-creating `EditorState`

  This enables us to call updates on contentComponents and nodeViews

## 107.7.5
- [patch] [29d10e3d60](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/29d10e3d60):

  - ED-6626 Table doesn’t respond on inserting widget with min-width set

  _Test steps:_

  - Insert a `table`
  - Insert an widget macro with an YouTube video url
  - The `table` should resize the column accordingly

## 107.7.4
- [patch] [e80a553a6e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e80a553a6e):

  - ED-6478: upskip VR tests for numbered column

## 107.7.3
- [patch] [71c1a888f7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/71c1a888f7):

  - ED-6479: upskip table floating toolbar VR tests

## 107.7.2
- [patch] [41b940325e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/41b940325e):

  - ED-5948: added mass alignment on a range of selected cells

## 107.7.1
- [patch] [c4aedc236e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c4aedc236e):

  - ED-6613 Clear Action & Decision lists instead of wrapping them around floated content. Corrects gap cursor position when adjacent to floated content.

## 107.7.0
- [minor] [9df8755c0b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9df8755c0b):

  - ED-6603: Disable dynamic text sizing in full width mode

## 107.6.5
- [patch] [e125d7d78a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e125d7d78a):

  - ED-6627: fix re-rendering table controls when table is nested inside Columns or bodied extensions

## 107.6.4
- [patch] [0f0c06f787](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0f0c06f787):

  - ED-5850 Visual tweak to ensure icons are tightly bound by their borders

## 107.6.3
- [patch] [1b0b718266](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b0b718266):

  - ED-6474: fix resizing last table column when table is nested inside Columns node

## 107.6.2
- [patch] [6110c666c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6110c666c6):

  - ED-6619: scale table when deleting or adding columns

## 107.6.1
- [patch] [e0d04f321c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e0d04f321c):

  - ED-6376: fix rendering row controls when table has nested Jira macro (rendered as a nested table)

## 107.6.0
- [minor] [13d53eb7c9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/13d53eb7c9):

  - ED-6604 Animate transition from default -> full-width mode and vice versa

## 107.5.1
- [patch] [d26570e3b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d26570e3b5):

  - Update i18n for team mention
  - Fix a bug in team mention: missing https protocol in team link

## 107.5.0
- [minor] [81491bbc4e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/81491bbc4e):

  - ED-5850 Add fallback icon and fix SVG ids

## 107.4.0
- [minor] [60a89f843f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/60a89f843f):

  - ED-6598: Add initial prop for 'Full Width Mode'

  You may now enable our new experimental feature 'Full Width Mode' by passing a new `fullWidthMode` prop.

  This prop only takes effect on full-width appearence and this initial implementation is extremely raw as most nodes don't reflect their desired behaviour.

  Example:
  ```
  <Editor appearence="full-width" fullWidthMode={true} />
  ```

## 107.3.3
- [patch] [92c8c14019](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92c8c14019):

  - ED-6492: Fixed media single without dimensions not rendering on mobile

## 107.3.2
- [patch] [3d0da81a4b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d0da81a4b):

  - ED-6583 Add analytics v3 for link inserts

## 107.3.1
- [patch] [9f08142085](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f08142085):

  - ED-6618: Fixes the exception thrown when trying to apply the delete decoration.

  Occurs on a position where a node was recently deleted. We now re-map the decorations position on state change to verify if it's still valid to draw or simply delete it.

## 107.3.0
- [minor] [936f12e761](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/936f12e761):

  - ED-5850 Add descriptions, richer icons and keyboard shortcuts to the quick insert menu

## 107.2.0
- [minor] [fb7a25ec0b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fb7a25ec0b):

  - ED-6221 Fire v3 analytics events when insert media

## 107.1.1
- [patch] [67e5bfeb72](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/67e5bfeb72):

  - ED-6181 Add analytics to paste event

## 107.1.0
- [minor] [e36f791fd6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e36f791fd6):

  - Improve types

## 107.0.0
- Updated dependencies [c2c36de22b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c2c36de22b):
  - @atlaskit/editor-common@36.0.0
  - @atlaskit/renderer@45.0.0
  - @atlaskit/emoji@59.0.0
  - @atlaskit/media-card@59.0.0
  - @atlaskit/media-editor@32.0.0
  - @atlaskit/media-filmstrip@31.0.0
  - @atlaskit/media-picker@38.0.0
  - @atlaskit/editor-bitbucket-transformer@5.0.2
  - @atlaskit/editor-json-transformer@5.0.2
  - @atlaskit/editor-markdown-transformer@3.0.2
  - @atlaskit/editor-test-helpers@8.0.3
  - @atlaskit/task-decision@14.0.1
  - @atlaskit/util-data-test@11.1.5
  - @atlaskit/media-test-helpers@21.1.0
  - @atlaskit/media-core@29.1.0

## 106.7.9
- [patch] [495738bcd8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/495738bcd8):

  - Enable UI for links inside headings

## 106.7.8
- [patch] [2d7ff51814](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2d7ff51814):

  - ED-6595 Remove layout marks when pasting images inside a list

## 106.7.7
- Updated dependencies [9c316bd8aa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c316bd8aa):
  - @atlaskit/editor-common@35.1.3
  - @atlaskit/renderer@44.4.3
  - @atlaskit/media-core@29.0.2
  - @atlaskit/media-editor@31.0.3
  - @atlaskit/media-filmstrip@30.0.2
  - @atlaskit/media-picker@37.0.3
  - @atlaskit/media-test-helpers@21.0.3
  - @atlaskit/media-card@58.0.0

## 106.7.6
- [patch] [acaf2abb57](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acaf2abb57):

  - ED-6146 Fix bug where gap cursor did not display to right of first node

## 106.7.5
- [patch] [298bfed4e1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/298bfed4e1):

  - ED-6580 Media in editor is sized incorrectly in firefox

## 106.7.4
- [patch] [5320e1bdb5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5320e1bdb5):

  - ED-6476 Columns should show border when inactive in the Editor.

## 106.7.3
- Updated dependencies [eb4323c388](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eb4323c388):
  - @atlaskit/renderer@44.4.2
  - @atlaskit/util-data-test@11.1.4
  - @atlaskit/task-decision@14.0.0

## 106.7.2
- Updated dependencies [97abf5e006](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/97abf5e006):
  - @atlaskit/renderer@44.4.1
  - @atlaskit/status@0.8.0

## 106.7.1
- [patch] [b3c60e3c9c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b3c60e3c9c):

  - Update media-editor dependency

## 106.7.0
- [minor] [b32008359a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b32008359a):

  - ED-5823 Add red styling for document elements when they are selected for removal

## 106.6.3
- [patch] [97eeac260b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/97eeac260b):

  - ED-6137 GAS v3 Analytics events for action subject Table

## 106.6.2
- [patch] [56766ce748](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/56766ce748):

  - ED-6407: improve table information density by reducing cells padding from 10px to 8px

## 106.6.1
- [patch] [92452e9323](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92452e9323):

  - ED-5734: render table column control buttons for each column regardless of merged cells

## 106.6.0
- [minor] [0781a7068c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0781a7068c):

  - ED-6222 Add insertMenu insert events for: emoji picker, image picker, link typeahead, mention typeahead

## 106.5.0
- [minor] [ea6b08700c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea6b08700c):

  - ED-6245: Ensure extensions scroll + overflow when they may break out of their parent container.

## 106.4.0
- [minor] [7e164b5a6b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e164b5a6b):

  - ED-6547 Add GAS v3 analytics for smartLink

## 106.3.3
- [patch] [aa117f5341](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/aa117f5341):

  - fix alignment and UI for inline Smart Links.

## 106.3.2
- [patch] [8187471d39](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8187471d39):

  - ED-4650 Allow inline code to render after a parentheses

## 106.3.1
- [patch] [2f4594a876](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2f4594a876):

  - ED-6526: Resize a table with breakout content

## 106.3.0
- [minor] [1affe17dc4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1affe17dc4):

  - add analytics events for team mention

## 106.2.3
- [patch] [08940b66c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/08940b66c1):

  - ED-6561 Ignore empty transactions from collab provider

## 106.2.2
- [patch] [2ac4f3bf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2ac4f3bf30):

  - fix deleting multiple rows in table

## 106.2.1
- [patch] [8ea5466017](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8ea5466017):

  - ED-6438 Fix bg in codeblock gutter

## 106.2.0
- [minor] [7bd786fd4d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7bd786fd4d):

  - TEAMS-323 : Send additional information for teams when a team is selected in a mention

## 106.1.2
- Updated dependencies [f504850fe2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f504850fe2):
  - @atlaskit/smart-card@10.1.1
  - @atlaskit/textarea@0.4.0

## 106.1.1
- [patch] [c604b1eb64](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c604b1eb64):

  - Fix ED-6522 & ED-6046. Remove z-index from images to ensure they doesn't overlap adjacent content. Ensure floated images remain clickable when adjacent a list.

## 106.1.0
- [minor] [0672369fc8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0672369fc8):

  - Integrate TeamMentionResource in editor-core

## 106.0.6
- [patch] [2f953a0738](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2f953a0738):

  - ED-6362: add analytics for media annotation button

## 106.0.5
- [patch] [1bcaa1b991](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bcaa1b991):

  - Add npmignore for index.ts to prevent some jest tests from resolving that instead of index.js

## 106.0.4
- [patch] [205b101e2b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/205b101e2b):

  - ED-6230: bump prosemirror-view to 1.8.3; workaround Chrome bug with copy paste multiple images

## 106.0.3
- Updated dependencies [b684722884](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b684722884):
  - @atlaskit/renderer@44.0.1
  - @atlaskit/date@0.6.0
  - @atlaskit/emoji@58.1.0
  - @atlaskit/mention@17.1.0
  - @atlaskit/status@0.7.0
  - @atlaskit/task-decision@13.1.0
  - @atlaskit/util-data-test@11.1.0

## 106.0.2
- [patch] [8f1f21dd3a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8f1f21dd3a):

  - ED-6275: drop size and alignment when pasting images into page columns or a table

## 106.0.1
- Updated dependencies [90a14be594](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/90a14be594):
  - @atlaskit/button@11.0.1
  - @atlaskit/textarea@0.3.1
  - @atlaskit/analytics-next-types@4.0.1

## 106.0.0
- [major] [9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages
- Updated dependencies [9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):
  - @atlaskit/docs@7.0.1
  - @atlaskit/analytics-next@4.0.1
  - @atlaskit/avatar@15.0.1
  - @atlaskit/avatar-group@3.0.1
  - @atlaskit/calendar@7.0.20
  - @atlaskit/dropdown-menu@7.0.1
  - @atlaskit/droplist@8.0.1
  - @atlaskit/icon@16.0.5
  - @atlaskit/logo@10.0.1
  - @atlaskit/modal-dialog@8.0.2
  - @atlaskit/section-message@2.0.1
  - @atlaskit/select@8.0.3
  - @atlaskit/spinner@10.0.1
  - @atlaskit/theme@8.0.1
  - @atlaskit/tooltip@13.0.1
  - @atlaskit/editor-common@35.0.0
  - @atlaskit/renderer@44.0.0
  - @atlaskit/emoji@58.0.0
  - @atlaskit/media-card@57.0.0
  - @atlaskit/media-editor@31.0.0
  - @atlaskit/media-filmstrip@30.0.0
  - @atlaskit/media-picker@37.0.0
  - @atlaskit/i18n-tools@0.5.0
  - @atlaskit/button@11.0.0
  - @atlaskit/textarea@0.3.0
  - @atlaskit/adf-schema@2.0.0
  - @atlaskit/adf-utils@6.0.0
  - @atlaskit/editor-bitbucket-transformer@5.0.0
  - @atlaskit/editor-json-transformer@5.0.0
  - @atlaskit/editor-markdown-transformer@3.0.0
  - @atlaskit/editor-test-helpers@8.0.0
  - @atlaskit/analytics-gas-types@4.0.0
  - @atlaskit/analytics-listeners@5.0.0
  - @atlaskit/analytics-namespaced-context@3.0.0
  - @atlaskit/analytics-next-types@4.0.0
  - @atlaskit/date@0.5.0
  - @atlaskit/mention@17.0.0
  - @atlaskit/pubsub@4.0.0
  - @atlaskit/status@0.6.0
  - @atlaskit/task-decision@13.0.0
  - @atlaskit/util-data-test@11.0.0
  - @atlaskit/util-service-support@4.0.0
  - @atlaskit/media-core@29.0.0
  - @atlaskit/media-test-helpers@21.0.0
  - @atlaskit/smart-card@10.0.0

## 105.4.2
- [patch] [57fdb39e20](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/57fdb39e20):

  - ED-6512 Fix subscript

## 105.4.1
- [patch] [fb679d390f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fb679d390f):

  - Add a new TeamMenioResource for @atlaskit/mention package. That allows to fetch teams data for mention from a team service (Legion service)

## 105.4.0
- [minor] [f6345bba88](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f6345bba88):

  - Ed-4131 Fix text decorations to respect the selected text colour

## 105.3.2
- [patch] [b849dcb1e7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b849dcb1e7):

  - bump smart cards version to include patches.

## 105.3.1
- [patch] [3f6501c569](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f6501c569):

  - ED-6518: Fixes mark overflowing to the left

## 105.3.0
- [minor] [5b226754b8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5b226754b8):

  - ED-5939: Replace SizeDetector with WidthDetector in all editor components

## 105.2.1
- Updated dependencies [1b952c437d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b952c437d):
  - @atlaskit/textarea@0.2.6

## 105.2.0
- [minor] [b2c1f96b0d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b2c1f96b0d):

  - Allow text formatting marks only on text nodes.

## 105.1.0
- [minor] [804597a281](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/804597a281):

  - ED-6482 Add GAS v3 analytics for panel

## 105.0.0
- Updated dependencies [7ab3e93996](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ab3e93996):
  - @atlaskit/editor-common@34.0.0
  - @atlaskit/editor-test-helpers@7.0.6
  - @atlaskit/renderer@43.0.0
  - @atlaskit/emoji@57.0.0
  - @atlaskit/media-card@56.0.0
  - @atlaskit/media-editor@30.0.0
  - @atlaskit/media-filmstrip@29.0.0
  - @atlaskit/media-picker@36.0.0
  - @atlaskit/media-test-helpers@20.1.8
  - @atlaskit/editor-bitbucket-transformer@4.2.5
  - @atlaskit/editor-json-transformer@4.3.5
  - @atlaskit/editor-markdown-transformer@2.2.5
  - @atlaskit/task-decision@12.0.1
  - @atlaskit/util-data-test@10.2.5
  - @atlaskit/media-core@28.0.0

## 104.1.1
- Updated dependencies [72c6f68226](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/72c6f68226):
  - @atlaskit/renderer@42.0.1
  - @atlaskit/util-data-test@10.2.4
  - @atlaskit/task-decision@12.0.0

## 104.1.0
- [minor] [55eb63afac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/55eb63afac):

  - ED-6239 Add Analytics GAS V3 to autosubstituted

## 104.0.0
- [major] [4d17df92f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4d17df92f8):

  - ED-6484: Remove the 'inline-comment' appearance from Editor.

## 103.4.4
- [patch] [65acb722e3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65acb722e3):

  - ED-6412: Prevent inserting links containing 'javascript:'

## 103.4.3
- [patch] [7641ec96cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7641ec96cd):

  - ED-5998: improve cell selection with merged cells, deleting columns and rows

## 103.4.2
- [patch] [6380484429](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6380484429):

  - ED-6485 Support breakout mark on layout-section. Retain breakout mark when toggling list nested within columns.

## 103.4.1
- [patch] [5e319bb725](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5e319bb725):

  - ED-6286: fix post-PR for media upload on mobile

## 103.4.0
- [minor] [6739aea208](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6739aea208):

  - Update editor-common and editor-core types

## 103.3.0
- [minor] [738f58ef9e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/738f58ef9e):

  - ED-5019 Panels are no longer cleared by clear-formatting

## 103.2.0
- [minor] [08a09ae767](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/08a09ae767):

  -  ED-6377 Add Analytics GAS V3 for numbered/bulleted list format

## 103.1.4
- [patch] [be479e2335](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/be479e2335):

  - fix link opening logic for view and edit mode.

## 103.1.3
- [patch] [ed6ef51cfe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ed6ef51cfe):

  - ED-6158: added a shortcut to contextual menu for insertRow and insertColumn

## 103.1.2
- [patch] [abb200b0b4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/abb200b0b4):

  - ED-6374: Switch to MutationObserver instead of rAF + nodeview update for handling breakout content inside a table cell.

## 103.1.1
- [patch] [109158320c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/109158320c):

  - Make more avatar colors available to the collab plugin

## 103.1.0
- [minor] [58932a27f4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58932a27f4):

  - ED-6220 Fire v3 analytics events when insert actions or decisions

## 103.0.3
- Updated dependencies [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):
  - @atlaskit/button@10.1.3
  - @atlaskit/calendar@7.0.18
  - @atlaskit/icon@16.0.4
  - @atlaskit/textarea@0.2.5
  - @atlaskit/adf-utils@5.7.2
  - @atlaskit/editor-bitbucket-transformer@4.2.3
  - @atlaskit/editor-json-transformer@4.3.3
  - @atlaskit/editor-markdown-transformer@2.2.3
  - @atlaskit/renderer@41.2.1
  - @atlaskit/analytics-gas-types@3.2.5
  - @atlaskit/analytics-listeners@4.2.1
  - @atlaskit/analytics-namespaced-context@2.2.1
  - @atlaskit/date@0.4.1
  - @atlaskit/emoji@56.2.1
  - @atlaskit/mention@16.2.2
  - @atlaskit/pubsub@3.0.8
  - @atlaskit/status@0.5.1
  - @atlaskit/task-decision@11.3.1
  - @atlaskit/util-data-test@10.2.3
  - @atlaskit/util-service-support@3.1.1
  - @atlaskit/media-card@55.0.2
  - @atlaskit/media-core@27.2.3
  - @atlaskit/media-editor@29.1.2
  - @atlaskit/media-filmstrip@28.0.1
  - @atlaskit/media-picker@35.0.1
  - @atlaskit/smart-card@9.11.3
  - @atlaskit/media-test-helpers@20.1.7
  - @atlaskit/editor-common@33.0.3
  - @atlaskit/docs@7.0.0
  - @atlaskit/analytics-next@4.0.0
  - @atlaskit/avatar-group@3.0.0
  - @atlaskit/avatar@15.0.0
  - @atlaskit/code@9.0.0
  - @atlaskit/dropdown-menu@7.0.0
  - @atlaskit/droplist@8.0.0
  - @atlaskit/item@9.0.0
  - @atlaskit/logo@10.0.0
  - @atlaskit/lozenge@7.0.0
  - @atlaskit/modal-dialog@8.0.0
  - @atlaskit/section-message@2.0.0
  - @atlaskit/select@8.0.0
  - @atlaskit/size-detector@7.0.0
  - @atlaskit/spinner@10.0.0
  - @atlaskit/theme@8.0.0
  - @atlaskit/tooltip@13.0.0

## 103.0.2
- [patch] [44f4d1293a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44f4d1293a):

  - ED-6219: Use TableMap to get column index over dom children index

## 103.0.1
- [patch] [b346b44c05](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b346b44c05):

  - ED-6411: Fix resizing the last column with dynamic text sizing enabled

## 103.0.0
- [major] [60f0ad9a7e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/60f0ad9a7e):

  - ED-6286: remove StateManager from media plugin and provider

## 102.2.2
- [patch] [06c4a70a2e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06c4a70a2e):

  - ED-6031: Dont reset selection if editor still has focus.

## 102.2.1
- [patch] [c427333c46](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c427333c46):

  - ED-6008 Dim telepointers that overlaps the cursor.

## 102.2.0
- [minor] [4a9a7487f1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4a9a7487f1):

  - ED-6240 Add Analytics GAS V3 for insert new line

## 102.1.10
- Updated dependencies [4072865c1c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4072865c1c):
  - @atlaskit/renderer@41.1.1
  - @atlaskit/date@0.4.0
  - @atlaskit/emoji@56.2.0
  - @atlaskit/status@0.5.0
  - @atlaskit/task-decision@11.3.0

## 102.1.9
- [patch] [9b0f6671ae](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9b0f6671ae):

  - ED-6244: Fix Resizable Media to allow images go smaller size than videos

## 102.1.8
- [patch] [97a9ca095b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/97a9ca095b):

  - ED-6452: Put collab document validation behind a flag

## 102.1.7
- [patch] [2e48ec26ba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e48ec26ba):

  - Changes to support new version of media-editor

## 102.1.6
- [patch] [59fcd0bbc9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/59fcd0bbc9):

  - FM-1618: fixed media upload on mobile

## 102.1.5
- [patch] [2b4b290610](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2b4b290610):

  - ED-6461: Fix placement start when scrolling for Popup

## 102.1.4
- [patch] [7a8d8ba656](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7a8d8ba656):

  - ED-6452: Validate documents on init through collab-editing

  * Add unsupportedInline and unsupportedBlock to test-helpers.

## 102.1.3
- [patch] [1c00bd6268](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c00bd6268):

  - ED-6409: set minWidth to 140px for all new columns in resized table

## 102.1.2
- [patch] [f86078d629](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f86078d629):

  - ED-6327: highlight smart cards when selecting backwards in document

## 102.1.1
- Updated dependencies [36bb743af0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/36bb743af0):
  - @atlaskit/renderer@41.0.1
  - @atlaskit/date@0.3.0
  - @atlaskit/emoji@56.1.0
  - @atlaskit/status@0.4.0

## 102.1.0
- [minor] [d18b085e2a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d18b085e2a):

  - Integrating truly upfront ID

## 102.0.2
- [patch] [4d0c196597](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4d0c196597):

  - ED-6232 Fix copy-pasting a table with numbered column drops one column

## 102.0.1
- [patch] [2787c79b6a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2787c79b6a):

  - ED-6296: Scale down table sizes when parent layout changes

## 102.0.0
- Updated dependencies [4aee5f3cec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4aee5f3cec):
  - @atlaskit/editor-common@33.0.0
  - @atlaskit/renderer@41.0.0
  - @atlaskit/emoji@56.0.0
  - @atlaskit/media-card@55.0.0
  - @atlaskit/media-filmstrip@28.0.0
  - @atlaskit/media-picker@35.0.0
  - @atlaskit/editor-bitbucket-transformer@4.2.1
  - @atlaskit/editor-json-transformer@4.3.1
  - @atlaskit/editor-markdown-transformer@2.2.1
  - @atlaskit/editor-test-helpers@7.0.2
  - @atlaskit/task-decision@11.2.3
  - @atlaskit/util-data-test@10.2.2
  - @atlaskit/media-test-helpers@20.1.6
  - @atlaskit/media-core@27.2.0

## 101.7.0
- [minor] [d4afa2713d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d4afa2713d):

  - ED-6212 Fire v3 analytics events when insert table or emojis

## 101.6.3
- Updated dependencies [0de1251ad1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0de1251ad1):
  - @atlaskit/editor-common@32.4.3
  - @atlaskit/renderer@40.1.1
  - @atlaskit/size-detector@6.0.0

## 101.6.2
- [patch] [4eb1af2892](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4eb1af2892):

  - ED-6265 fix external image call to media for dimensions

## 101.6.1
- [patch] [3f4a4e4f49](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f4a4e4f49):

  - [ED-6351] Fix table insert columns/row UI positions

## 101.6.0
- [minor] [8e407b5a24](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8e407b5a24):

  - ED-6289 Add analytics GAS V3 for color text formatting

## 101.5.3
- [patch] [37ca429b01](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/37ca429b01):

  - ED-6374: Fixes handling breakout content more efficiently.

## 101.5.2
- [patch] [1ede48ac5b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1ede48ac5b):

  - ED-6381: Gather max layout sizes based on dynamic text sizing

## 101.5.1
- [patch] [42b78a6133](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/42b78a6133):

  - ED-6278: a complete rewrite of mergeCells, deleteColumns and deleteRows

## 101.5.0
- [minor] [bab8f06b0a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bab8f06b0a):

  - ED-6285 When catch an invalid transaction, send the new & prev document structures

## 101.4.3
- [patch] [06f8fd872b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06f8fd872b):

  - [ED-6342] Fix remove bodied extension when it is selected

## 101.4.2
- [patch] [27189951b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/27189951b5):

  - ED-5967: added API to enable links on hybrid editor

## 101.4.1
- [patch] [c2360c53b2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c2360c53b2):

  - fixed status selection loss when dragging and drop

## 101.4.0
- [minor] [30b4e99377](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/30b4e99377):

  - ED-5888 Add editor dark mode

## 101.3.3
- [patch] [e08b35abef](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e08b35abef):

  - StatusPicker event listeners cleaned up

## 101.3.2
- [patch] [f5e8437365](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f5e8437365):

  - ED-6373: Fix position of breakout controls while scrolling

## 101.3.1
- [patch] [7308d1e0e9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7308d1e0e9):

  - ED-6061: support image annotations in editor

## 101.3.0
- [minor] [3672ec23ef](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3672ec23ef):

  - [ED-5788] Add new layout Breakout button for CodeBlock and Layout

## 101.2.0
- [minor] [d5856900a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d5856900a1):

  - ED-6338: Dont allow nested nodes to be inserted with a non default layout.

## 101.1.0
- [minor] [e142e966c2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e142e966c2):

  - ED-6238, ED-5684 Add Analytcs GAS v3 to clear formatting and fix clear formatting on heading elements

## 101.0.6
- [patch] [60ea09b0cc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/60ea09b0cc):

  - ED-6246 Add more metadata to Unsupported Node logging

## 101.0.5
- [patch] [c5683f8422](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c5683f8422):

  - ED-4998 Fix highlighting and disabling of meatball menu items in different contexts

## 101.0.4
- [patch] [bd0f7a69ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bd0f7a69ac):

  - ED-5964: Remove marks from inline nodes that are not text

## 101.0.3
- [patch] [7a7cd4c491](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7a7cd4c491):

  - make smart links open in same window.

## 101.0.2
- [patch] [6773e958ab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6773e958ab):

  - ED-5738: fix resize handles for merged cells

## 101.0.1
- [patch] [b832f0f57c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b832f0f57c):

  - ED-6320: inserting links via CMD+K can also insert smart links

## 101.0.0
- [major] [4a84fc40e0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4a84fc40e0):

  - ED-5766 Remove the deprecated 'message' appearance from Editor

## 100.2.0
- [minor] [af5572cf8e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af5572cf8e):

  - ED-6284 Filter out invalid transactions before they are applied and send an analytics event

## 100.1.0
- [minor] [5dc1e046b2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5dc1e046b2):

  - Apply stricture typings to elements related editor code

## 100.0.0
- [major] [4af5bd2a58](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4af5bd2a58):

  - Remove linkCreateContext from MediaProvider

## 99.0.1
- [patch] [7f93e282b8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7f93e282b8):

  - ED-6257: Handle applying header column with a rowspan

## 99.0.0
- [patch] [5b5ae91921](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5b5ae91921):

  - Require Identifier type from media-core instead of media-card
- Updated dependencies [fc6164c8c2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc6164c8c2):
- Updated dependencies [190c4b7bd3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/190c4b7bd3):
  - @atlaskit/editor-common@32.0.0
  - @atlaskit/renderer@39.0.0
  - @atlaskit/emoji@55.0.0
  - @atlaskit/media-card@54.0.0
  - @atlaskit/media-filmstrip@27.0.0
  - @atlaskit/media-picker@34.0.0
  - @atlaskit/editor-bitbucket-transformer@4.1.11
  - @atlaskit/editor-json-transformer@4.1.10
  - @atlaskit/editor-markdown-transformer@2.1.10
  - @atlaskit/editor-test-helpers@6.3.22
  - @atlaskit/task-decision@11.2.1
  - @atlaskit/util-data-test@10.2.1
  - @atlaskit/media-test-helpers@20.1.5
  - @atlaskit/media-core@27.1.0

## 98.13.6
- [patch] [f500b2c81e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f500b2c81e):

  - ED-6252 Change table floating toolbar to say 'Table options' instead of icon

## 98.13.5
- [patch] [bc340694d2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bc340694d2):

  - ED-6247: fix resizing with merged cells

## 98.13.4
- Updated dependencies [46dfcfbeca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/46dfcfbeca):
  - @atlaskit/editor-common@31.1.1
  - @atlaskit/renderer@38.0.7
  - @atlaskit/media-core@27.0.2
  - @atlaskit/media-filmstrip@26.1.2
  - @atlaskit/media-picker@33.0.4
  - @atlaskit/media-test-helpers@20.1.4
  - @atlaskit/media-card@53.0.0

## 98.13.3
- [patch] [0a13188647](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a13188647):

  - ED-6133: Fix scaling up going into overflow

## 98.13.2
- [patch] [cebfee91b3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cebfee91b3):

  - ED-6231 Fixes RangeError when deleting last column in full-width mode

## 98.13.1
- [patch] [7316e316bc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7316e316bc):

  - ED-6209: remove internal legacy event subscription model from media plugin

## 98.13.0
- [minor] [be86cbebc3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/be86cbebc3):

  - enable noImplicitAny for task-decision, and related changes

## 98.12.1
- [patch] [a3161a7927](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a3161a7927):

  - ED-6264 Fix examples page not been loaded when code is compiled

## 98.12.0
- [minor] [4d8d759bf9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4d8d759bf9):

  -  [ED-6255] Migrate ADFNode type to ADFEntity

## 98.11.1
- [patch] [ea423a619f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea423a619f):

  - Fixed the call to the /check endpoint

## 98.11.0
- [minor] [448b9946cc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/448b9946cc):

  - ED-6195 Add Analytics GAS V3 for identation

## 98.10.5
- [patch] [36986d383b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/36986d383b):

  - ED-6010 Rename "Block Quote" to "Quote", and "Code Block" to "Code snippet" in the insert menu
  - Update i18n translations

## 98.10.4
- [patch] [cf7fd7d3be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cf7fd7d3be):

  - Render external images in editor

## 98.10.3
- Updated dependencies [06713e0a0c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06713e0a0c):
  - @atlaskit/logo@9.2.7
  - @atlaskit/media-picker@33.0.3
  - @atlaskit/media-test-helpers@20.1.3
  - @atlaskit/modal-dialog@7.2.3
  - @atlaskit/select@7.0.0

## 98.10.2
- [patch] [45e3fffa9e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/45e3fffa9e):

  - suppress enter and tab keys events in the status node to prevent bugs

## 98.10.1
- [patch] [4cc0b47f6a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4cc0b47f6a):

  - ED-6233: Use minCellWith over wrapWidth to determine free space in a column

## 98.10.0
- [minor] [e6daf79012](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e6daf79012):

  - ED-6135 Fire analytics v3 events when insert panel, code block or horizontal rule

## 98.9.5
- [patch] [026d4424c2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/026d4424c2):

  - ED-6226 Fix row delete button displacement after many rows in a table

## 98.9.4
- [patch] [e04c61dc55](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e04c61dc55):

  - ED-6183 fix image wrapping, revert createDOMRef chang

## 98.9.3
- [patch] [8788a98286](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8788a98286):

  - [FS-3589] Fix re-rendering on status element after apply decoration

## 98.9.2
- [patch] [c81737b526](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c81737b526):

  - ED-6098: simplify internal state changes for completed media uploads

## 98.9.1
- [patch] [ebb0a98051](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ebb0a98051):

  - remove empty status before publishing document

## 98.9.0
- [minor] [59ae46e1cf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/59ae46e1cf):

  - ED-5061: migrate media toolbar to new internal architecture

## 98.8.2
- [patch] [19a823bf2a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/19a823bf2a):

  - delete empty status node when user selects another node

## 98.8.1
- [patch] [0a304a48f6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a304a48f6):

  - ED-6218: fix repair table logic

## 98.8.0
- [minor] [cde3ff657f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cde3ff657f):

  - ED-6134 Add analytics GAS V3 for text formatting, headers and blockQuotes

## 98.7.2
- [patch] [6981b6d25a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6981b6d25a):

  - ED-6214: Fix resizing when rowspan exists in non last column

## 98.7.1
- [patch] [a22478c227](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a22478c227):

  - ED-6133: Re-draw resized columns in collab, cater for overflow tables when resizing

## 98.7.0
- [minor] [44a42d5eb3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44a42d5eb3):

  - ED-5846: Refactoring new hyperlink toolbar and adding typeahead to the new floating toolbar

## 98.6.0
- [minor] [fa435d11f7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fa435d11f7):

  - ED-6155 Fire analytics v3 events for general editor UI events

## 98.5.1
- [patch] [4bead4dd64](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4bead4dd64):

  - Fix cursor bug between Panel and Status when moved with arrowkeys

## 98.5.0
- [minor] [5a6071d7f5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5a6071d7f5):

  - [ED-6159] Changes tooltip for the add contextual button on tables

## 98.4.6
- [patch] [09696170ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/09696170ec):

  - ED-6177 Deleting a range of rows/columns deletes only a subset of selected rows/columns

## 98.4.5
- [patch] [c61aaebd2d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c61aaebd2d):

  - ED-6172: Apply table layout based on total width for autoSize tables.

## 98.4.4
- [patch] [18dffaa5fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/18dffaa5fd):

  - ED-6192: Bail out of column resizing if the table has changed via other means (e.g. collab)

## 98.4.3
- [patch] [66a5bd2f70](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/66a5bd2f70):

  - ED-6027 update ADF when image dimensions are missing

## 98.4.2
- [patch] [2487368a7e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2487368a7e):

  - ED-6170: repair the table by removing invisible columns

## 98.4.1
- [patch] [47970c78b1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/47970c78b1):

  - ED-5976 Maintain text alignment when hit return

## 98.4.0
- [minor] [1bc4b69b08](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bc4b69b08):

  - ED-6171 Adding feature flag for Analytics GAS V3

## 98.3.0
- [minor] [0f3f9f0992](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0f3f9f0992):

  - Fix context identifiers not being passed to mention provider's calls. MentionProvider interface was updated to include the optional contextIdentifier parameter in filter and recordMentionSelection methods.

## 98.2.6
- [patch] [3305886b5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3305886b5a):

  - ED-6167: Handle extraneous column widths

## 98.2.5
- [patch] [b11848ebf8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b11848ebf8):

  - [ED-6165] Fix table cell options chevron overflow.

## 98.2.4
- [patch] [65b73cc466](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65b73cc466):

  - Code split media-picker: make MediaPicker factory async and make editor use it

## 98.2.3
- [patch] [14fe1381ba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/14fe1381ba):

  - ED-6118: ensure media dimensions are always integers, preventing invalid ADF

## 98.2.2
- [patch] [86dcb6f814](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/86dcb6f814):

  - updated native status icon in Fabric editor

## 98.2.1
- [patch] [17107bdfb0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/17107bdfb0):

  - ED-6141: remove broken tables if its not fixable

## 98.2.0
- [minor] [3fecea2975](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3fecea2975):

  - ED-5933 Add analytics plugin to facilitate working with @atlaskit/analytics-next package

## 98.1.13
- [patch] [7ce3cc56ff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ce3cc56ff):

  - FS-3500 Fix missing call to recordMentionSelection() when a selection is made in the mention typeahead

## 98.1.12
- [patch] [1c62bcce7d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c62bcce7d):

  - Fix a problem with smart cards not appearing sometimes when lazy rendered and lazy loaded after code-split.

## 98.1.11
- [patch] [be706e55f6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/be706e55f6):

  - Fixes tableRow validation failure

## 98.1.10
- [patch] [e7dcb7ef15](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7dcb7ef15):

  - Revert table resizing collab change

## 98.1.9
- [patch] [1ee84815dd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1ee84815dd):

  - ED-6133: Visually apply column resize changes in collab editing

## 98.1.8
- [patch] [e83a20575b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e83a20575b):

  - ED-6148: Prevent autoSize tables from being in an endless loop, integrate with new resizing

## 98.1.7
- [patch] [69e29bab6c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69e29bab6c):

  - ED-5860 Prevent invalid steps from being applied in the editor

## 98.1.6
- [patch] [406cbf0a4e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/406cbf0a4e):

  - ED-6092: allow passing undefined context to media filmstrip

## 98.1.5
- [patch] [b2b0a00d6a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b2b0a00d6a):

  - Fix table creation without rows

## 98.1.4
- [patch] [3b9236fb74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3b9236fb74):

  - MS-1455, MS-1456: Fix max width for the surrounding element for the inline smart cards so that they don't overflow and positioning within li elements

## 98.1.3
- [patch] [af3918bc89](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af3918bc89):

  - The url part of the unauthorized link is now grey

## 98.1.2
- [patch] [557a2b5734](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/557a2b5734):

  - ED-5788: bump prosemirror-view and prosemirror-model

## 98.1.1
- [patch] [2d14c5dae1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2d14c5dae1):

  - ED-5730 Allow attachment to be inserted after list

## 98.1.0
- [minor] [a26d644414](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a26d644414):

  - ED-5845, ED-6072: support resizing in multiple editors on page, fix snapping images in lists

## 98.0.3
- [patch] [5ae645d661](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ae645d661):

  - Fixing analytics in smart-cards

## 98.0.2
- [patch] [4437882a9a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4437882a9a):

  - ED-6107: don't act on destroyed EditorView during cleanup in media plugin

## 98.0.1
- [patch] [2035bef8fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2035bef8fb):

  - Fix inline extractor priority preventing @type arrays in some cases.

## 98.0.0
- [patch] [4e82fedc90](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e82fedc90):

  - Expose real id upfront for remote files in MediaPicker
- Updated dependencies [9d881f1eb8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d881f1eb8):
- Updated dependencies [69c8d0c19c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69c8d0c19c):
  - @atlaskit/media-test-helpers@20.1.0
  - @atlaskit/media-picker@32.0.0
  - @atlaskit/editor-common@31.0.0
  - @atlaskit/editor-test-helpers@6.3.17
  - @atlaskit/renderer@38.0.0
  - @atlaskit/emoji@54.0.0
  - @atlaskit/media-card@52.0.0
  - @atlaskit/media-filmstrip@26.0.0
  - @atlaskit/editor-bitbucket-transformer@4.1.8
  - @atlaskit/editor-json-transformer@4.1.8
  - @atlaskit/editor-markdown-transformer@2.1.8
  - @atlaskit/task-decision@11.1.8
  - @atlaskit/util-data-test@10.0.36
  - @atlaskit/media-core@27.0.0

## 97.1.9
- [patch] [4552e804d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4552e804d3):

  - dismiss StatusPicker if status node is not selected

## 97.1.8
- [patch] [adff2caed7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/adff2caed7):

  - Improve typings

## 97.1.7
- [patch] [7c497c2de6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c497c2de6):

  - ED-5810 Fix issue where numbered table rows flickered when hovering on the edge of row controls

## 97.1.6
- [patch] [cbc601aed3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cbc601aed3):

  - Added missing type of events for Confluence

## 97.1.5
- [patch] [bfe22480d0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bfe22480d0):

  - ED-6056: fix zero width columns in renderer for migration tables

## 97.1.4
- [patch] [f77cd3fb66](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f77cd3fb66):

  - fixed reactjs warning on FieldBase.onBlur and prevent breaking line when inserting Status via enter key

## 97.1.3
- Updated dependencies [07a187bb30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/07a187bb30):
  - @atlaskit/editor-test-helpers@6.3.14
  - @atlaskit/renderer@37.0.2
  - @atlaskit/media-card@51.0.2
  - @atlaskit/media-core@26.2.1
  - @atlaskit/media-filmstrip@25.0.2
  - @atlaskit/media-picker@31.0.2
  - @atlaskit/media-test-helpers@20.0.0

## 97.1.2
- [patch] [5132bc24a5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5132bc24a5):

  - Fix codeblock enter-press inside lists

## 97.1.1
- [patch] [478a86ae8a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/478a86ae8a):

  - avoid using the same localId when pasting status

## 97.1.0
- [minor] [2db7577588](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2db7577588):

  - ED-5924: Fixes handling of node deletion for composition events.

## 97.0.3
- [patch] [a5714ccc17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a5714ccc17):

  - Fixed table column not selectable (regression in prosemirror-view@1.6.8)

## 97.0.2
- [patch] [8dc4a35361](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8dc4a35361):

  - enable status and date components to be pasted into a task component

## 97.0.1
- Updated dependencies [d7ef59d432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7ef59d432):
  - @atlaskit/docs@6.0.1
  - @atlaskit/avatar@14.1.8
  - @atlaskit/avatar-group@2.1.10
  - @atlaskit/button@10.1.2
  - @atlaskit/calendar@7.0.17
  - @atlaskit/dropdown-menu@6.1.26
  - @atlaskit/droplist@7.0.18
  - @atlaskit/item@8.0.15
  - @atlaskit/modal-dialog@7.2.1
  - @atlaskit/section-message@1.0.16
  - @atlaskit/select@6.1.19
  - @atlaskit/tooltip@12.1.15
  - @atlaskit/editor-common@30.0.1
  - @atlaskit/editor-test-helpers@6.3.13
  - @atlaskit/renderer@37.0.1
  - @atlaskit/emoji@53.0.1
  - @atlaskit/mention@16.0.1
  - @atlaskit/status@0.3.2
  - @atlaskit/task-decision@11.1.7
  - @atlaskit/media-card@51.0.1
  - @atlaskit/media-filmstrip@25.0.1
  - @atlaskit/media-picker@31.0.1
  - @atlaskit/media-test-helpers@19.1.1
  - @atlaskit/smart-card@9.4.1
  - @atlaskit/icon@16.0.0

## 97.0.0
- [minor] [b1627a5837](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1627a5837):

  - Enable inline video player in Editor and Renderer
- Updated dependencies [85d5d168fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/85d5d168fd):
  - @atlaskit/editor-common@30.0.0
  - @atlaskit/renderer@37.0.0
  - @atlaskit/emoji@53.0.0
  - @atlaskit/media-card@51.0.0
  - @atlaskit/media-filmstrip@25.0.0
  - @atlaskit/media-picker@31.0.0
  - @atlaskit/editor-bitbucket-transformer@4.1.7
  - @atlaskit/editor-json-transformer@4.1.7
  - @atlaskit/editor-markdown-transformer@2.1.7
  - @atlaskit/editor-test-helpers@6.3.12
  - @atlaskit/task-decision@11.1.6
  - @atlaskit/util-data-test@10.0.34
  - @atlaskit/media-test-helpers@19.1.0
  - @atlaskit/media-core@26.2.0

## 96.0.2
- [patch] [4e764a26d4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e764a26d4):

  - ED-6070: Don't render proper mediaCard on mobile until we have a valid collection

## 96.0.1
- [patch] [af85018](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af85018):

  - ED-6064: always undo smart cards to links

## 96.0.0
- Updated dependencies [dadef80](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dadef80):
- Updated dependencies [3ad16f3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3ad16f3):
  - @atlaskit/editor-common@29.0.0
  - @atlaskit/renderer@36.0.0
  - @atlaskit/emoji@52.0.0
  - @atlaskit/media-card@50.0.0
  - @atlaskit/media-filmstrip@24.0.0
  - @atlaskit/media-picker@30.0.0
  - @atlaskit/editor-bitbucket-transformer@4.1.6
  - @atlaskit/editor-json-transformer@4.1.6
  - @atlaskit/editor-markdown-transformer@2.1.6
  - @atlaskit/editor-test-helpers@6.3.11
  - @atlaskit/task-decision@11.1.5
  - @atlaskit/util-data-test@10.0.33
  - @atlaskit/media-test-helpers@19.0.0
  - @atlaskit/media-core@26.1.0

## 95.1.0
- [minor] [2d6d5b6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2d6d5b6):

  - ED-5379: rework selecting media under the hood; maintain size and layout when copy-pasting

## 95.0.21
- [patch] [6c81bca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6c81bca):

  - ED-6041: fix converting encoded URLs (e.g. URLs with spaces as %20) to smart cards

## 95.0.20
- [patch] [9d3f48c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d3f48c):

  - ED-4501 Wrap placeholder text onto new line

## 95.0.19
- [patch] [967f631](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/967f631):

  -  ED-4732: Fixed preserving marks when pasting text into paragraph

## 95.0.18
- [patch] [8158fe0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8158fe0):

  - ED-6059: Extension and inlineExtension should read their content from attrs not the PMNode.

## 95.0.17
- [patch] [37b7edf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/37b7edf):

  - ED-6062: fix deleting last character inside a node with breakout mark

## 95.0.16
- [patch] [23d298e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/23d298e):

  - ED-5950: fix merging rows

## 95.0.15
- [patch] [a8d8855](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a8d8855):

  - fixed StatusPicker analytics firing when user clicks in two Status instances, one after another

## 95.0.14
- [patch] [be6313e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/be6313e):

  - ED-5477 Support rendering of inline code together with other marks

## 95.0.13
- [patch] [c5ee0c8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c5ee0c8):

  - Added Annotation mark to ADF, editor & renderer

## 95.0.12
- [patch] [888e563](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/888e563):

  - Fixes an issue with ClickAreaBlock that wouldn't allow focus textareas

## 95.0.11
- [patch] [ec9ed50](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ec9ed50):

  - ED-5814 Fix issue where numbered columns' styling was off on small screens

## 95.0.10
- [patch] [060f2da](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/060f2da):

  - ED-5991: bumped prosemirror-view to 1.6.8

## 95.0.9
- [patch] [6514dda](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6514dda):

  - ED-5415, ED-6020: don't create broken document after sequential media insertion; always try to insert an empty paragraph after images, even in tables

## 95.0.8
- [patch] [fc9a884](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc9a884):

  - ED-5543: fix backspacing after hardbreak node

## 95.0.7
- [patch] [5f8b151](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5f8b151):

  - Open date picker on enter when date node is selected

## 95.0.6
- [patch] [6855bec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6855bec):

  - Updated internal use of ModalDialog to use new composition API

## 95.0.5
- [patch] [844feea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/844feea):

  - ED-6039 Fixed extension toolbar remove action

## 95.0.4
- [patch] [e082366](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e082366):

  - ED-6045: fixed unable to select table row

## 95.0.3
- [patch] [61ce3c5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/61ce3c5):

  - ED-6015 Fix bug where cursor would jump to start of mention after hitting backspace after a mention

## 95.0.2
- [patch] [6866eba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6866eba):

  - ED-5638: insert a space after pasting links that turn into inline cards to help avoid refreshing them

## 95.0.1
- [patch] [df30c63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df30c63):

  - ED-5723: Enables typeahead support for mobile editor

  * Added a new bridge `typeAheadBridge`, which contains `typeAheadQuery()` and `dismissTypeAhead()`
    * `typeAheadQuery(query: string, trigger: string)` - This will notify integrators when a user is attempting to filter down a list.
    * `dismissTypeAhead` - Call this to dismiss any typeahead related content.
  * Added bridge function `insertTypeAheadItem()`, which currently only supports inserting mentions.
    * `insertTypeAheadItem(type: 'mention', payload: string)` - Payload is a stringified JSON blob containing the information to insert a mention in this scenario.
  * Added bridge function `setFocus()` to handle returning the focus to the editor after a native interaction.
  * Added new promise `getAccountId`, which is used to highlight the current user's mention.

## 95.0.0
- [major] [0c116d6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c116d6):

  - Removed client-side indexed cache of mention results. Also removed method 'getUsersInContext' from MentionResourceConfig, 'remoteSearch' from MentionStats and 'weight' from MentionDescription. If you used to use them, simply remove any references to them.

## 94.1.5
- [patch] [c0dc7e3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c0dc7e3):

  - FS-3360 - Support state analytics attribute with values new or existing. Implement for web, and mobile support via mobile-bridge.

## 94.1.4
- [patch] [7d9ccd7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7d9ccd7):

  - fixed copy/paste status from renderer to editor

## 94.1.3
- [patch] [323b457](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/323b457):

  - trimmed status text so now the placeholder appears correctly when user types spaces in the status picker

## 94.1.2
- [patch] [c8a5e65](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8a5e65):

  - ED-6023: fix scaling a table when deleting column

## 94.1.1
- [patch] [9b0341d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9b0341d):

  - ED-5871 Fix issue where user had to click twice to focus cursor in editor on full page editor in Firefox

## 94.1.0
- [minor] [58e30bb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58e30bb):

  - deduped i18n key fabric.editor.orderedList

## 94.0.0
- Updated dependencies [cbb8cb5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cbb8cb5):
  - @atlaskit/editor-common@28.0.0
  - @atlaskit/editor-test-helpers@6.3.7
  - @atlaskit/renderer@35.0.0
  - @atlaskit/emoji@51.0.0
  - @atlaskit/media-card@49.0.0
  - @atlaskit/media-filmstrip@23.0.0
  - @atlaskit/media-picker@29.0.0
  - @atlaskit/media-test-helpers@18.9.1
  - @atlaskit/editor-bitbucket-transformer@4.1.4
  - @atlaskit/editor-json-transformer@4.1.4
  - @atlaskit/editor-markdown-transformer@2.1.4
  - @atlaskit/task-decision@11.1.4
  - @atlaskit/util-data-test@10.0.31
  - @atlaskit/media-core@26.0.0

## 93.0.0
- Updated dependencies [72d37fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/72d37fb):
  - @atlaskit/editor-common@27.0.0
  - @atlaskit/editor-test-helpers@6.3.6
  - @atlaskit/renderer@34.0.0
  - @atlaskit/emoji@50.0.0
  - @atlaskit/media-card@48.0.0
  - @atlaskit/media-filmstrip@22.0.0
  - @atlaskit/media-picker@28.0.0
  - @atlaskit/editor-bitbucket-transformer@4.1.3
  - @atlaskit/editor-json-transformer@4.1.3
  - @atlaskit/editor-markdown-transformer@2.1.3
  - @atlaskit/task-decision@11.1.3
  - @atlaskit/util-data-test@10.0.30
  - @atlaskit/media-core@25.0.0
  - @atlaskit/media-test-helpers@18.9.0

## 92.0.21
- [patch] [e930505](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e930505):

  - Added plugin state factory: createPluginState

## 92.0.20
- [patch] [ababb4a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ababb4a):

  - ED-5999: fix padding between Columns in renderer

## 92.0.19
- [patch] [e858305](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e858305):

  - ED-5805: Popup to support being sticky with alignX=top

## 92.0.18
- [patch] [5d4527e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5d4527e):

  - Fix issue where date was not respecting user's local date for initial date selection in quick insert

## 92.0.17
- [patch] [561f6cb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/561f6cb):

  - ED-5336 Disallow nesting lists past 6 levels

## 92.0.16
- [patch] [e251065](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e251065):

  - ED-5894: fix table controls disappearing while dragging resize handle

## 92.0.15
- [patch] [4b1567c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4b1567c):

  - ED-5991: fixed Position NaN out of range when resizing tables

## 92.0.14
- [patch] [88a8605](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/88a8605):

  - ED-5958: fix "getBoundingClientRect" errors

## 92.0.13
- [patch] [e79f8b0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e79f8b0):

  - Disable alignment when editor is disabled

## 92.0.12
- [patch] [80cadc7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80cadc7):

  - ED-5861 - Fix panel style in order to render telepointers properly

## 92.0.11
- [patch] [53c513c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/53c513c):

  - ED-5947: fix preserving CellSelection  when clicking on context menu

## 92.0.10
- [patch] [6d435cf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6d435cf):

  - Fix issue where table contextual menu had incorrect styling when using a popups mount point outside of the editor

## 92.0.9
- Updated dependencies [00c648e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/00c648e):
- Updated dependencies [a17bb0e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a17bb0e):
- Updated dependencies [99f08a0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/99f08a0):
  - @atlaskit/renderer@33.0.3
  - @atlaskit/status@0.3.0

## 92.0.8
- [patch] [4611d97](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4611d97):

  - Remove hardcoded "unknown" value for mention's analytics 'source' attribute. In general the 'source' attribute is not meant to be set by components and are supposed to be populated by products.
- [patch] [551696e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/551696e):

  - FS-3398 Fix incorrect event type for mention's "rendered" analytics event, ui -> operational
- [patch] [77b3be7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/77b3be7):

  - FS-3398 Fix case typo in actionSubject of mention's "rendered" analytics event, mentionTypeAhead -> mentionTypeahead
- [patch] [f6a1b31](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f6a1b31):

  - Remove 'query' attribute from mention's "rendered" analytics event. This attribute basically contains UGC and should not have been captured in the first place. It seems like it was added by accident as it wasn't part of the original specs.
- [patch] [551696e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/551696e):

  - FS-3398 Fix incorrect event type for mention's "rendered" analytics event, ui -> operational

## 92.0.7
- [patch] [7c10292](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c10292):

  - ED-5923: don't grow page while using resize handles on images

## 92.0.6
- Updated dependencies [135ed00](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/135ed00):
  - @atlaskit/editor-common@25.0.3
  - @atlaskit/renderer@33.0.1
  - @atlaskit/media-core@24.7.2
  - @atlaskit/media-filmstrip@21.0.2
  - @atlaskit/media-picker@27.0.2
  - @atlaskit/media-test-helpers@18.7.2
  - @atlaskit/media-card@47.0.0

## 92.0.5
- [patch] [50d9b26](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/50d9b26):

  - ED-5806 Fix disappearing language in code block language picker

## 92.0.4
- [patch] [be12a8e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/be12a8e):

  - Fix popup picker dismiss on escape for Jira

## 92.0.3
- [patch] [88c8373](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/88c8373):

  - ED-5704: filtering out invalid marks from JSON output of editorActions.getValue()

## 92.0.2
- [patch] [dc39f5b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc39f5b):

  - ED-5956: don't close the typeaheads when calling getValue from EditorActions

## 92.0.1
- [patch] [a83bedb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a83bedb):

  - Fix codeblock input rules inside unsupported blocks

## 92.0.0
- Updated dependencies [b3738ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b3738ea):
- Updated dependencies [6cb6696](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6cb6696):
  - @atlaskit/editor-common@25.0.0
  - @atlaskit/renderer@33.0.0
  - @atlaskit/emoji@49.0.0
  - @atlaskit/media-card@46.0.0
  - @atlaskit/media-filmstrip@21.0.0
  - @atlaskit/media-picker@27.0.0
  - @atlaskit/editor-bitbucket-transformer@4.1.1
  - @atlaskit/editor-json-transformer@4.1.1
  - @atlaskit/editor-markdown-transformer@2.1.1
  - @atlaskit/editor-test-helpers@6.3.4
  - @atlaskit/task-decision@11.1.1
  - @atlaskit/util-data-test@10.0.28
  - @atlaskit/media-test-helpers@18.7.0
  - @atlaskit/media-core@24.7.0

## 91.2.2
- [patch] [af32972](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af32972):

  - ED-5880: disable media layout buttons

## 91.2.1
- [patch] [e714e7a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e714e7a):

  - ED-5667 Added hyperlink to quick insert

## 91.2.0
- [minor] [b9f8a8f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b9f8a8f):

  - Adding alignment options to media

## 91.1.4
- [patch] [3780be2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3780be2):

  - Fix extension delete when media is selected

## 91.1.3
- [patch] [462b70f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/462b70f):

  - ED-5819: Enables support for text color on mobile

## 91.1.2
- [patch] [8be04eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8be04eb):

  - Remove option to change appearance mode on Smart Cards.

## 91.1.1
- [patch] [9f444e9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f444e9):

  - ED-5882: fixed delayed scroll to top after page load

## 91.1.0
- [minor] [1205725](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1205725):

  - Move schema to its own package

## 91.0.0
- [patch] [8ae67fc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8ae67fc):

  - Use stretchy-fit resizeMode for media card components instead of full-fit or undefined values;
- Updated dependencies [80f765b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80f765b):
  - @atlaskit/editor-common@23.0.0
  - @atlaskit/renderer@32.0.0
  - @atlaskit/emoji@48.0.0
  - @atlaskit/media-card@45.0.0
  - @atlaskit/media-filmstrip@20.0.0
  - @atlaskit/media-picker@26.0.0
  - @atlaskit/adf-utils@5.3.4
  - @atlaskit/editor-bitbucket-transformer@4.0.23
  - @atlaskit/editor-json-transformer@4.0.25
  - @atlaskit/editor-markdown-transformer@2.0.23
  - @atlaskit/editor-test-helpers@6.3.2
  - @atlaskit/task-decision@11.0.9
  - @atlaskit/util-data-test@10.0.26
  - @atlaskit/media-test-helpers@18.6.2
  - @atlaskit/media-core@24.6.0

## 90.4.7
- [patch] [f621523](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f621523):

  - fix MediaMocker router

## 90.4.6
- [patch] [feb276c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/feb276c):

  - Don't scroll cursor into view on remote transactions

## 90.4.5
- [patch] [6beeada](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6beeada):

  - Don't hide media-picker on initialisation

## 90.4.4
- [patch] [f083737](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f083737):

  - Fix copy-paste of external images

## 90.4.3
- [patch] [4e483e7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e483e7):

  - ED-5900: store resize handle always as a number

## 90.4.2
- [patch] [ebd73f4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ebd73f4):

  - ED-5880: allow breakout mode only in full-page editor

## 90.4.1
- Updated dependencies [67d563a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/67d563a):
  - @atlaskit/date@0.2.0

## 90.4.0
- [minor] [e06b553](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e06b553):

  - ED-5702: default new table resizing

## 90.3.18
- [patch] [d3f3e19](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d3f3e19):

  - restored StatusContainer to editor-core, avoid re-rendering on event handlers, removed unused props in the renderer
- [patch] [44cc61d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44cc61d):

  - added native status analytics

## 90.3.17
- [patch] [b81da9b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b81da9b):

  - Fix typescript types to support strictFunctionTypes

## 90.3.16
- [patch] [43501db](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/43501db):

  - ED-5812: Fixes some regressions in the mobile editor

  Including:
   * Disables mediaGoup lazy loading.
   * Fixes unsupported emoji content.
   * Fixes missed call to Android bridge for block state.

## 90.3.15
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/analytics-next@3.1.2
  - @atlaskit/avatar@14.1.7
  - @atlaskit/avatar-group@2.1.9
  - @atlaskit/button@10.1.1
  - @atlaskit/calendar@7.0.16
  - @atlaskit/code@8.2.2
  - @atlaskit/dropdown-menu@6.1.25
  - @atlaskit/droplist@7.0.17
  - @atlaskit/icon@15.0.2
  - @atlaskit/item@8.0.14
  - @atlaskit/logo@9.2.6
  - @atlaskit/lozenge@6.2.4
  - @atlaskit/modal-dialog@7.1.1
  - @atlaskit/section-message@1.0.14
  - @atlaskit/select@6.1.13
  - @atlaskit/size-detector@5.0.9
  - @atlaskit/spinner@9.0.13
  - @atlaskit/theme@7.0.1
  - @atlaskit/tooltip@12.1.13
  - @atlaskit/adf-utils@5.3.2
  - @atlaskit/editor-bitbucket-transformer@4.0.21
  - @atlaskit/editor-json-transformer@4.0.24
  - @atlaskit/editor-markdown-transformer@2.0.22
  - @atlaskit/renderer@31.1.3
  - @atlaskit/analytics-gas-types@3.2.3
  - @atlaskit/analytics-namespaced-context@2.1.5
  - @atlaskit/date@0.1.9
  - @atlaskit/emoji@47.0.7
  - @atlaskit/mention@15.1.8
  - @atlaskit/pubsub@3.0.7
  - @atlaskit/status@0.2.10
  - @atlaskit/task-decision@11.0.8
  - @atlaskit/util-data-test@10.0.25
  - @atlaskit/util-service-support@3.0.5
  - @atlaskit/media-card@44.1.3
  - @atlaskit/media-core@24.5.2
  - @atlaskit/media-filmstrip@19.0.3
  - @atlaskit/media-picker@25.0.6
  - @atlaskit/smart-card@9.0.4
  - @atlaskit/docs@6.0.0

## 90.3.14
- [patch] [b22d7e9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b22d7e9):

  - FS-3309 - Include native status in insert menu when enabled

## 90.3.13
- [patch] [9a1dbaa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9a1dbaa):

  - Fixed toolbar being positioned over a panel at the bottom of the page

## 90.3.12
- [patch] [85b71a9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/85b71a9):

  - ED-5704: Fixed invalid ADF sent when saving and mention/quickInsert/emoji is active

## 90.3.11
- [patch] [e0c91b6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e0c91b6):

  - FS-3310 Fix handling of duplicate users in mention typeahead causing HOT-85672

## 90.3.10
- [patch] [fa596d9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fa596d9):

  - display videos as mediaGroup for now

## 90.3.9
- [patch] [7190767](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7190767):

  - Fixes empty collection name and API naming mismatches

## 90.3.8
- [patch] [7fdfac1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7fdfac1):

  - FS-3269 - Ensure status attributes are read even if in mark

## 90.3.7
- [patch] [f0398a5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f0398a5):

  - Display media singles with video inside as inline video player

## 90.3.6
- [patch] [a60d8cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a60d8cd):

  - FS-3278 - Prevent overflow of status in a table cell.

## 90.3.5
- [patch] [ef1df96](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef1df96):

  - Remove unused deps

## 90.3.4
- [patch] [3c2c367](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3c2c367):

  - FS-3261 - Fix status selection growing as font size increases

## 90.3.3
- [patch] [5390041](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5390041):

  - FS-3160 - Prevent editor crash in some deletion use cases for status

## 90.3.2
- [patch] [48640fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/48640fb):

  - FS-3227 - Prevent status popup focus from scrolling editor

## 90.3.1
- [patch] [dcd8f90](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dcd8f90):

  - Fix bug where gap cursor would remove previous node on backspace

## 90.3.0
- [minor] [a1b03d0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a1b03d0):

  - ED-3890 Adds Indentation support on paragraphs and headings

  **New Feature: Indentation**

  Use the new `allowIndentation` prop to enable this feature.

  ```
  // Enable indentation support for `heading` and `paragraph`
  allowIndentation?: boolean;
  ```

  **Minor bug fixes**

  - ED-5841 Alignment is getting removed inside Table on load
  - ED-5842 Alignment mark aligns empty placeholder
  - ED-5843 Remove block marks on backspace when document is empty
  - ED-5846 Fix React warning in renderer
  - ED-5863 Fix alignment copy-paste
  - ED-5865 Alignment shouldn't be disabled when Cmd + A

## 90.2.2
- [patch] [1668ce3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1668ce3):

  - Wrap kitchen sink in smart card provider.

## 90.2.1
- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/avatar-group@2.1.8
  - @atlaskit/button@10.0.4
  - @atlaskit/calendar@7.0.15
  - @atlaskit/code@8.2.1
  - @atlaskit/dropdown-menu@6.1.24
  - @atlaskit/droplist@7.0.16
  - @atlaskit/icon@15.0.1
  - @atlaskit/item@8.0.13
  - @atlaskit/logo@9.2.5
  - @atlaskit/modal-dialog@7.0.14
  - @atlaskit/section-message@1.0.13
  - @atlaskit/select@6.1.10
  - @atlaskit/spinner@9.0.12
  - @atlaskit/tooltip@12.1.12
  - @atlaskit/editor-common@22.2.3
  - @atlaskit/renderer@31.0.7
  - @atlaskit/date@0.1.8
  - @atlaskit/emoji@47.0.6
  - @atlaskit/mention@15.1.7
  - @atlaskit/pubsub@3.0.6
  - @atlaskit/status@0.2.8
  - @atlaskit/task-decision@11.0.7
  - @atlaskit/smart-card@9.0.2
  - @atlaskit/theme@7.0.0
  - @atlaskit/avatar@14.1.6
  - @atlaskit/lozenge@6.2.3

## 90.2.0
- [minor] [94094fe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/94094fe):

  - Adds support for links around images

## 90.1.0
- [minor] [fef6755](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fef6755):

  - Change the way we deal with transactions in collab edit

## 90.0.0
- [major] [3a7224a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3a7224a):

  - ED-5677: enabled quickInsert and gapCursor by default (quickInsert: except for mobile appearance)

## 89.1.3
- [patch] [0e72eb6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0e72eb6):

  - Revert box-sizing change for node views

## 89.1.2
- [patch] [cf4e304](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cf4e304):

  - Fixed toolbar being positioned over a panel at the bottom of the page

## 89.1.1
- [patch] [3061b52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3061b52):

  - AK-5723 - adjust files in package.json to ensure correct publishing of dist/package.json

## 89.1.0
- [minor] [7c9dcba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c9dcba):

  - Responsive wide breakout mode

## 89.0.8
- [patch] [6c90bb9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6c90bb9):

  - Fix mention plugin state in plugin

## 89.0.7
- Updated dependencies [df32968](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df32968):
  - @atlaskit/editor-test-helpers@6.2.22
  - @atlaskit/renderer@31.0.4
  - @atlaskit/smart-card@9.0.0

## 89.0.6
- Updated dependencies [ab9b69c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab9b69c):
  - @atlaskit/smart-card@8.8.5
  - @atlaskit/docs@5.2.2
  - @atlaskit/avatar@14.1.5
  - @atlaskit/avatar-group@2.1.7
  - @atlaskit/button@10.0.1
  - @atlaskit/calendar@7.0.14
  - @atlaskit/dropdown-menu@6.1.23
  - @atlaskit/droplist@7.0.14
  - @atlaskit/item@8.0.12
  - @atlaskit/modal-dialog@7.0.13
  - @atlaskit/section-message@1.0.12
  - @atlaskit/select@6.1.9
  - @atlaskit/tooltip@12.1.11
  - @atlaskit/editor-common@22.0.2
  - @atlaskit/editor-test-helpers@6.2.21
  - @atlaskit/renderer@31.0.3
  - @atlaskit/emoji@47.0.2
  - @atlaskit/mention@15.1.3
  - @atlaskit/status@0.2.6
  - @atlaskit/task-decision@11.0.6
  - @atlaskit/media-card@44.0.2
  - @atlaskit/media-filmstrip@19.0.2
  - @atlaskit/media-picker@25.0.3
  - @atlaskit/media-test-helpers@18.3.1
  - @atlaskit/icon@15.0.0

## 89.0.5
- [patch] [2db96d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2db96d3):

  - Adjust min-width nodes to support table resizing

## 89.0.4
- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/analytics-next@3.1.1
  - @atlaskit/avatar@14.1.4
  - @atlaskit/avatar-group@2.1.6
  - @atlaskit/calendar@7.0.13
  - @atlaskit/dropdown-menu@6.1.22
  - @atlaskit/droplist@7.0.13
  - @atlaskit/icon@14.6.1
  - @atlaskit/logo@9.2.4
  - @atlaskit/modal-dialog@7.0.12
  - @atlaskit/section-message@1.0.11
  - @atlaskit/select@6.1.8
  - @atlaskit/spinner@9.0.11
  - @atlaskit/theme@6.2.1
  - @atlaskit/tooltip@12.1.10
  - @atlaskit/renderer@31.0.2
  - @atlaskit/emoji@47.0.1
  - @atlaskit/pubsub@3.0.5
  - @atlaskit/task-decision@11.0.5
  - @atlaskit/media-card@44.0.1
  - @atlaskit/media-core@24.5.1
  - @atlaskit/media-filmstrip@19.0.1
  - @atlaskit/media-picker@25.0.2
  - @atlaskit/smart-card@8.8.4
  - @atlaskit/button@10.0.0
  - @atlaskit/analytics-next-types@3.1.2

## 89.0.3
- [patch] [1e8d316](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e8d316):

  - ED-5819: Fixes emitting text color plugin state on every key stroke, without the state changing.

## 89.0.2
- [patch] [a2cae0c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2cae0c):

  - Fix conversion of pasted urls via macroPlugin with html in clipboard (ED-5786)

## 89.0.1
- [patch] [086f816](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/086f816):

  - FS-3150 - Support status in the editor-mobile-bridge

## 89.0.0
- Updated dependencies [7e8b4b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e8b4b9):
  - @atlaskit/editor-common@22.0.0
  - @atlaskit/renderer@31.0.0
  - @atlaskit/emoji@47.0.0
  - @atlaskit/media-card@44.0.0
  - @atlaskit/media-filmstrip@19.0.0
  - @atlaskit/media-picker@25.0.0
  - @atlaskit/adf-utils@5.1.9
  - @atlaskit/editor-bitbucket-transformer@4.0.19
  - @atlaskit/editor-json-transformer@4.0.22
  - @atlaskit/editor-markdown-transformer@2.0.20
  - @atlaskit/editor-test-helpers@6.2.19
  - @atlaskit/task-decision@11.0.4
  - @atlaskit/util-data-test@10.0.21
  - @atlaskit/media-test-helpers@18.3.0
  - @atlaskit/media-core@24.5.0

## 88.5.3
- [patch] [dfcb816](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dfcb816):

  - ED-5818: Add support for inserting block nodes

  Bridge API now supports inserting:
  * Tables
  * Panels
  * Codeblocks
  * Block Quotes
  * Actions
  * Decisions

## 88.5.2
- [patch] [b73607f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b73607f):

  - ED-5770: fix resizer for media @ 0 and non-dynamic text sizes

- [patch] [7a9f647](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7a9f647):

  - ensure toolbar always appears even if media re-renders (e.g. resizer)

## 88.5.1
- [patch] [ab6d96b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab6d96b):

  - ED-5710: Fixes calling media upfront.

  We now only call for the media auth, when rendering / loading a media item.

## 88.5.0
- [minor] [cfba914](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cfba914):

  - ED-5771: fix wide and full-width images in renderer

## 88.4.4
- [patch] [416fbb3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/416fbb3):

  - ED-3298: codeBlocks inside lists

## 88.4.3
- [patch] [96c125b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/96c125b):

  - Fixes an issue where using arrow keys to navigate between mention nodes would put the cursor in unexpected locations.

## 88.4.2
- [patch] [6e4570d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e4570d):

  - Add height check when rendering images

## 88.4.1
- [patch] [8974838](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8974838):

  - Do not wrap in breakout a paragraph inserted after code block

## 88.4.0
- [minor] [6d6522b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6d6522b):

  - Refactor mentions to use TypeAhead plugin

## 88.3.0
- [patch] [43f178a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/43f178a):

  - ED-5813: Added type safety to width plugin.
- [minor] [1e5cd32](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e5cd32):

  - Make layouts stack on small screens

## 88.2.14
- [patch] [1ac6286](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1ac6286):

  - Fixes width plugin continuing without valid transaction state

## 88.2.13
- [patch] [37313f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/37313f8):

  - Remove preprocessDoc because it was removing empty tasks & decisionItems

## 88.2.12
- [patch] [1358f62](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1358f62):

  - ED-5717: deduped quick insert provided items

## 88.2.11
- [patch] [a706ffd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a706ffd):

  ED-4427 Editor disabled state applies to floating toolbars and task decision checkboxes

## 88.2.10
- [patch] [368e858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/368e858):

  - ED-5570 Fixed long URLs wrapping in editor panel

## 88.2.9
- [patch] [70a104dc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/70a104dc):

  - ED-5802: fix merging rows when rowspan > 1 in neighbour columns

## 88.2.8
- [patch] [04abea3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/04abea3):

  - ED-5186: Always show scroll bar, to avoid page shift.

## 88.2.7
- [patch] [4e2a3b1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e2a3b1):

  - ED-5809 Fixes code mark getting removed from document

## 88.2.6
- [patch] [899b377](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/899b377):

  - ED-5750: fix selection for merged cells when its created by dragging mouse across table cells

## 88.2.5
- [patch] [4ad840a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4ad840a):

  - Adds resize property to fix media without dimensions

## 88.2.4
- [patch] [a458d03](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a458d03):

  - ED-5713: Quick insert aliases

## 88.2.3
- [patch] [8d30d62](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8d30d62):

  - ED-5774: add breakout for Columns

## 88.2.2
- [patch] [9a66a9b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9a66a9b):

  - Add Confluence cards in Editor example.

## 88.2.1
- [patch] [16ff8d2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/16ff8d2):

  - Add jira card editor example.

## 88.2.0
- [minor] [14477fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/14477fa):

  - Adding text alignment to editor and renderer

## 88.1.14
- [patch] [380928b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/380928b):

  - ED-5293: fix merging cells

## 88.1.13
- [patch] [f9d1245](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f9d1245):

  - Fixes pasting from Microsoft & Apple office products (ED-5694, ED-5575)

## 88.1.12
- [patch] [cc78d09](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc78d09):

  - ED-5196: For a block as first node in a document, up and left arrow should show a gap cursor

## 88.1.11
- [patch] [4897ebf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4897ebf):

  - ED-4777 Toggling list no longer selects previous text

## 88.1.10
- [patch] [ac02f46](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ac02f46):

  - ED-5499 ToolbarFeedback now accepts metadata that appears in feedback ticket

## 88.1.9
- [patch] [6cb44c4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6cb44c4):

  - ED-5162: fix table selection for merged cells

## 88.1.8
- [patch] [e151c1a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e151c1a):

  - Removes dependency on @atlaskit/layer-manager

  As of component versions:

  - \`@atlaskit/modal-dialog@7.0.0\`
  - \`@atlaskit/tooltip@12.0.2\`
  - \`@atlaskit/flag@9.0.6\`
  - \`@atlaskit/onboarding@6.0.0\`

  No component requires \`LayerManager\` to layer correctly.

  You can safely remove this dependency and stop rendering \`LayerManager\` in your apps.

## 88.1.7
- [patch] [8262781](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8262781):

  - Fix floating toolbars overlaping with main editor toolbar

## 88.1.6
- [patch] [50aa9d2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/50aa9d2):

  - Refactor transform-to-code command

## 88.1.5
- [patch] [60087ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/60087ec):

  - Remove decorators

## 88.1.4
- [patch] [5c148c8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5c148c8):

  - ED-5739: fix updating cells DOM attributes when deleting rows/columns

## 88.1.3
- [patch] [68f3e01](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/68f3e01):

  - ED-5687: add full-width grid lines and other resizing fixes

## 88.1.2
- [patch] [93e576a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/93e576a):

  - ED-5651: Typing // causes editor to disregard text

## 88.1.1
- [patch] [9072682](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9072682):

  - Fix emoticons alignment

## 88.1.0
- [minor] [b440439](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b440439):

  - Add breakout mark to editor, renderer and adf-utils

## 88.0.11
- [patch] [6ef824b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6ef824b):

  - Fix import of re-resizable

## 88.0.10
- [patch] [d518ce0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d518ce0):

  - FS-3118 - Only focus status input field on initial insertion. FS-3158 - Fix focus flicker in status input field.

## 88.0.9
- [patch] [6efc73e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6efc73e):

  - allow Fabric status plugin to be enabled but be hidden in the editor menu

## 88.0.8
- [patch] [9390a7e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9390a7e):

  - ED-5685: add grid ruler marks

## 88.0.7
- [patch] [c64c174](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c64c174):

  - Fix multiple papercuts in quick insert

## 88.0.6
- [patch] [82ad72d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/82ad72d):

  - Timestamp on date node must always be a string

## 88.0.5
- [patch] [beefae2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/beefae2):

  - Updated type definitions for prosemirror packages

## 88.0.4
- [patch] [2e1b194](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e1b194):

  - Revert collab changes

## 88.0.3
- [patch] [222082a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/222082a):

  - Fix incorrect import of PanelType

## 88.0.2
- [patch] [ffcaedd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ffcaedd):

  - FS-2964 Implement status node placeholder support. Handle removing if no content in node

## 88.0.1
- [patch] [8059325](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8059325):

  - Fix delete doing nothing

## 88.0.0
- Updated dependencies [2c21466](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2c21466):
  - @atlaskit/editor-common@21.0.0
  - @atlaskit/renderer@30.0.0
  - @atlaskit/emoji@46.0.0
  - @atlaskit/media-card@43.0.0
  - @atlaskit/media-filmstrip@18.0.0
  - @atlaskit/media-picker@24.0.0
  - @atlaskit/adf-utils@5.0.1
  - @atlaskit/editor-bitbucket-transformer@4.0.18
  - @atlaskit/editor-json-transformer@4.0.21
  - @atlaskit/editor-markdown-transformer@2.0.19
  - @atlaskit/editor-test-helpers@6.2.16
  - @atlaskit/task-decision@11.0.2
  - @atlaskit/util-data-test@10.0.20
  - @atlaskit/media-test-helpers@18.2.12
  - @atlaskit/media-core@24.4.0

## 87.9.5
- [patch] [e1db106](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e1db106):

  * ED-5696 Allow private properties in adf-validator

  `table` with `__autoSize`, `link` with `__confluenceMetadata` will render properly.

## 87.9.4
- [patch] [bce23bc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bce23bc):

  - Change style of status selection

## 87.9.3
- [patch] [e6c4231](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e6c4231):

  - ED-5639: fix deleting columns in Safari

## 87.9.2
- Updated dependencies [04c7192](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/04c7192):
  - @atlaskit/editor-common@20.3.7
  - @atlaskit/renderer@29.5.1
  - @atlaskit/media-core@24.3.1
  - @atlaskit/media-filmstrip@17.0.2
  - @atlaskit/media-picker@23.2.2
  - @atlaskit/media-test-helpers@18.2.11
  - @atlaskit/media-card@42.0.0

## 87.9.1
- [patch] [676a586](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/676a586):

  - ED-5024 Quick insert improvements

## 87.9.0
- [minor] [2cc9764](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2cc9764):

  - Change the way we deal with transactions in collab edit

## 87.8.2
- [patch] [a9eb99f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a9eb99f):

  - ED-5510: fix deleting last character in a cell in Safari

## 87.8.1
- [patch] [1764e1c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1764e1c):

  - ED-5215: don't insert paragraph when inserting rule if another follows

## 87.8.0
- [minor] [f17f0a6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f17f0a6):

  - ED-5448: support macro autoconversion in actions

## 87.7.5
- [patch] [fb6b89b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fb6b89b):

  - Revert "Add buffer to the bottom of fullpage editor"

## 87.7.4
- [patch] [8f1073c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8f1073c):

  * ED-5572 Fixes copying 2+ lines from vs-code pastes as inline code

## 87.7.3
- [patch] [825d4e9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/825d4e9):

  Fix copying codeblock from renderer
- [patch] [9489ed2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9489ed2):

  ED-4544 Added integration tests for panel

## 87.7.2
- [patch] [c032914](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c032914):

  - ED-2043: Added table keyboard shortcut

## 87.7.1
- [patch] [e8afbf1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e8afbf1):

  - ED-5310: fix inline code background appearing when wrapping

## 87.7.0
- [minor] [abef80b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/abef80b):

  - ED-5527: apply max-width: 100% and pass container size to Card as dimension

## 87.6.18
- [patch] [9f26f82](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f26f82):

  - Removing extra padding inside the comment editor

## 87.6.17
- [patch] [aef4235](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/aef4235):

  - Fix range selection

## 87.6.16
- [patch] [7bc4461](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7bc4461):

  - ED-5565: support connecting external React.Context to nodeviews

## 87.6.15
- [patch] [e8052e1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e8052e1):

  - Add main field to adf-utils package.json

## 87.6.14
- [patch] [7787595](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7787595):

  - ED-4359: don't change selection when deleting filmstrip item

## 87.6.13
- [patch] [71b59ae](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/71b59ae):

  - Fixed Datepicker showing rendering outside viewport

## 87.6.12
- [patch] [12855b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12855b9):

  - ED-5511: tweaked quickInsert so that query can match space-separated items

## 87.6.11
- [patch] [0e0a126](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0e0a126):

  - Fixed cursor when adding hyperlink on existing piece of text using Cmd-K

## 87.6.10
- [patch] [941a687](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/941a687):

  Bump i18n-tools and refactor to support babel-plugin-transform-typescript

## 87.6.9
- [patch] [31653d9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/31653d9):

  - Fixed clicking between date pickers doesn't show correct date

## 87.6.8
- [patch] [8b084d0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b084d0):

  - Fix unsupported node event name

## 87.6.7
- [patch] [6a0a6f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6a0a6f8):

  - ED-5448, ED-5613, ED-5582: smart card UX improvements; allow blockCard in tableCell

## 87.6.6
- [patch] [c39507e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c39507e):

  - ED-5561 Single media honors scale factor from media-picker

## 87.6.5
- [patch] [f713993](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f713993):

  - ED-5537: table ux improvements

## 87.6.4
- [patch] [2dd9ae3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2dd9ae3):

  - ED-4979 When in the an unindentable list item, tab should do nothing

## 87.6.3
- [patch] [563c4da](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563c4da):

  - ED-5149 Fixed DatePicker calendar shadow in table

## 87.6.2
- [patch] [7459970](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7459970):

  - ED-5263: handle rows and columns shift selection

## 87.6.1
- [patch] [bdc9961"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bdc9961"
d):

  - Fixes the codeblock insert rules

## 87.6.0
- [minor] [bb3336a"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bb3336a"
d):

  - Make text formatting toolbar account for different item titles legnths

## 87.5.0
- [minor] [d182ad9"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d182ad9"
d):

  - Add <-> to ↔︎ convertion rule

## 87.4.3
- [patch] [8fb4b1e"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8fb4b1e"
d):

  * ED-5274 Fixes tables have excessive margin above

## 87.4.2
- [patch] [4cc767e"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4cc767e"
d):

  - ED-5030: Fixed gap-cursor on nodeviews in breakout mode.

## 87.4.1
- [patch] [abd19cd"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/abd19cd"
d):

  - ED-5616: fix inline cursor navigation

## 87.4.0
- [minor] [5981cec"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5981cec"
d):

  - TypeAhead to preserve marks

## 87.3.2
- [patch] [14d581b"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/14d581b"
d):

  - Disable clear formatting menu when there is no formatting

## 87.3.1
- [patch] [52f5b51"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/52f5b51"
d):

  - ED-4366: fix text selection inside table cell on triple click

## 87.3.0
- [minor] [b911028"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b911028"
d):

  - Show selected color in a table contextual menu

## 87.2.0
- [minor] [746c927"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/746c927"
d):

  - Add buffer to the bottom fullpage editor

## 87.1.13
- [patch] [f3d067d"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f3d067d"
d):

  - Fix font size for numbered column in tables with dynamic text sizing

## 87.1.12
- [patch] [534f6ab"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/534f6ab"
d):

  - ED-5615: Fix block element padding inside table cells.

## 87.1.11
- [patch] [cb4168f"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cb4168f"
d):

  - ED-5307: make text white for selected heading menu item

## 87.1.10
- [patch] [db65837"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/db65837"
d):

  - ED-3762: fix setting text cursor when clicking on editor gutter

## 87.1.9
- [patch] [25cdb93](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25cdb93):

  Fix copying codeblock from renderer

## 87.1.8
- [patch] [3c505aa"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3c505aa"
d):

  * Adds Danish and Romanian translations

## 87.1.7
- [patch] [fc20259](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc20259):

  ED-4544 Added integration tests for panel

## 87.1.6
- [patch] [6201223"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6201223"
d):

  - Add examples.

## 87.1.5
- [patch] [1662ae0"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1662ae0"
d):

  - ED-5440 convert sections to use percentages

## 87.1.4
- [patch] [d00326b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d00326b):

  Prevent delete-button from disappearing when the mouse is moved

## 87.1.3
- [patch] [f271431](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f271431):

  ED-5179: fix context menu when table has scroll

## 87.1.2
- [patch] Fix floating number validation [ea027b8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea027b8)

## 87.1.1
- [patch] ED-5439: add block smart cards, toolbar switcher [5f8bdfe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5f8bdfe)

## 87.1.0
- [minor] Wrap invalid node with unsupported node [fb60e39](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fb60e39)

## 87.0.6
- [patch] ED-5564 Fix wrong ADF for code block when language is selected [5db3cfe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5db3cfe)

## 87.0.5
- [patch] Fixes cursor position between mention nodes [2748f31](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2748f31)

## 87.0.4
- [patch] ED-5521: permit undo when pasting macro [c429e3c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c429e3c)

## 87.0.3
- [patch] ED-5375 Improved typing to reduce noImplictAny errors (not yet enabled) [62da999](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/62da999)

## 87.0.2
- [patch] Async load datepicker [c38e5a5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c38e5a5)

## 87.0.1
- [patch] Updated dependencies [9add3a4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9add3a4)
  - @atlaskit/media-picker@23.0.0

## 87.0.0
- [major] Media refactor and fileID upfront [052ce89](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/052ce89)
- [patch] Updated dependencies [2f9d14d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2f9d14d)
  - @atlaskit/media-card@41.1.0
  - @atlaskit/media-picker@22.0.0
  - @atlaskit/media-filmstrip@17.0.1
  - @atlaskit/media-test-helpers@18.2.9

## 86.0.10
- [patch] Show color and initial of collab-participants in overflow menu [900ccb8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/900ccb8)

## 86.0.9
- [patch] Lock typeahead to cursor position [81e28c8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/81e28c8)

## 86.0.8
- [patch] New translations (Task & Decisions) [03addbd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/03addbd)

## 86.0.7
- [patch] ED-5410: handle rows/columns cutting [b792d04](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b792d04)

## 86.0.6
- [patch] Scroll selection into view when navigating with arrows [01edbc7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/01edbc7)

## 86.0.5
- [patch] Fix race condition in size detector that sometimes leads to width being always 0 [ce97910](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ce97910)

## 86.0.4
- [patch] Change breakpoints for dynamic text sizing [f660016](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f660016)

## 86.0.3
- [patch] Async load the help dialog. The help dialog shouldn't be on the critical path to rendering as it's infrequently used. It's also the only consumer of ak/modal-dialog(9kb gzipped) [5d6333d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5d6333d)

## 86.0.2
- [patch] ED-5533: fix insert line decorations on merged cells [d421f39](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d421f39)

## 86.0.1
- [patch] Async load the floating toolbar. This remove @atlaskit/select & react-select from the critical path of rendering the editor [e55dcde](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e55dcde)

## 86.0.0
- [major] Updated dependencies [b1ce691](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1ce691)
  - @atlaskit/editor-common@20.0.0
  - @atlaskit/renderer@29.0.0
  - @atlaskit/emoji@45.0.0
  - @atlaskit/media-card@41.0.0
  - @atlaskit/media-filmstrip@17.0.0
  - @atlaskit/media-picker@21.0.0
  - @atlaskit/editor-bitbucket-transformer@4.0.16
  - @atlaskit/editor-json-transformer@4.0.18
  - @atlaskit/editor-markdown-transformer@2.0.17
  - @atlaskit/editor-test-helpers@6.2.7
  - @atlaskit/task-decision@11.0.1
  - @atlaskit/util-data-test@10.0.16
  - @atlaskit/media-core@24.3.0
  - @atlaskit/media-test-helpers@18.2.8

## 85.6.0
- [minor] FS-1311 - i18n support for task-decsions. task-decisions now require the placeholder text to be passed in. [8a1ccf2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a1ccf2)

## 85.5.3
- [patch] ED-5524: fix insert column button when numbered column is on [555079c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/555079c)

## 85.5.2
- [patch] ED-5366: fix scrolling when media is pasted inside table cell [eef51cf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eef51cf)

## 85.5.1
- [patch] Updated dependencies [6e510d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e510d8)
  - @atlaskit/task-decision@10.0.3
  - @atlaskit/editor-common@19.3.2
  - @atlaskit/media-core@24.2.2
  - @atlaskit/media-filmstrip@16.0.1
  - @atlaskit/media-picker@20.0.1
  - @atlaskit/media-test-helpers@18.2.7
  - @atlaskit/renderer@28.0.0
  - @atlaskit/media-card@40.0.0

## 85.5.0
- [minor] Deprecate quickInsert prop [c595e8d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c595e8d)

## 85.4.2
- [patch] ED-5494: fix nested breakout nodes [1eaf1f1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1eaf1f1)

## 85.4.1
- [patch] ED-5289 add toolbar for inline smart card [25d7af7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25d7af7)

## 85.4.0
- [minor] FS-2901 - Move action toolbar icon to insert group [57502ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/57502ac)

## 85.3.1
- [patch] Updated dependencies [17afe04](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/17afe04)
  - @atlaskit/media-picker@20.0.0

## 85.3.0
- [minor] Replaces util-shared-styles with theme. ED-5351 [55a4f00](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/55a4f00)

## 85.2.3
- [patch] ED-2644 Fixes panels merging incorrectly when deleting empty paragraph [967edcc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/967edcc)

## 85.2.2
- [patch] ED-5468: simplify floating toolbar config resolution [1c795f2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c795f2)

## 85.2.1
- [patch] Fix popups are placed incorrectly in modals [2dde31d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2dde31d)

## 85.2.0
- [minor] Summary: Deprecate props, add support for new API. ED-5201 [00e4bb3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/00e4bb3)

## 85.1.0
- [minor] ED-5370 refactor legacy image-upload plugin [fb10ad4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fb10ad4)

## 85.0.1
- [patch] ED-5453: implement table scroll shadow in CSS [4f21dac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4f21dac)

## 85.0.0
- [major] Updated dependencies [2afa60d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2afa60d)
  - @atlaskit/editor-common@19.0.0
  - @atlaskit/renderer@27.0.0
  - @atlaskit/emoji@44.0.0
  - @atlaskit/media-card@39.0.0
  - @atlaskit/media-filmstrip@16.0.0
  - @atlaskit/media-picker@19.0.0
  - @atlaskit/editor-bitbucket-transformer@4.0.15
  - @atlaskit/editor-json-transformer@4.0.17
  - @atlaskit/editor-markdown-transformer@2.0.16
  - @atlaskit/editor-test-helpers@6.2.6
  - @atlaskit/task-decision@10.0.2
  - @atlaskit/util-data-test@10.0.14
  - @atlaskit/media-test-helpers@18.2.5
  - @atlaskit/media-core@24.2.0

## 84.1.0
- [minor] ED-3889 use color and error-reporter from @atlaskit/editor-core [f924735](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f924735)

## 84.0.1
- [patch] Upgrade markdown-it to reduce duplicate dependencies [a27ace1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a27ace1)

## 84.0.0
- [major] Updated dependencies [8b2c4d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b2c4d3)
- [major] Updated dependencies [3302d51](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3302d51)
  - @atlaskit/editor-common@18.0.0
  - @atlaskit/renderer@26.0.0
  - @atlaskit/emoji@43.0.0
  - @atlaskit/media-card@38.0.0
  - @atlaskit/media-filmstrip@15.0.0
  - @atlaskit/media-picker@18.0.0
  - @atlaskit/editor-bitbucket-transformer@4.0.14
  - @atlaskit/editor-json-transformer@4.0.16
  - @atlaskit/editor-markdown-transformer@2.0.14
  - @atlaskit/editor-test-helpers@6.2.5
  - @atlaskit/task-decision@10.0.1
  - @atlaskit/util-data-test@10.0.12
  - @atlaskit/media-core@24.1.0
  - @atlaskit/media-test-helpers@18.2.3

## 83.0.0
- [major] Upgrade task and decisions and editor to use @atlaskit/analytics-next. Remove usage of @atlaskit/analytics. [23c7eca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/23c7eca)

## 82.5.6
- [patch] ED-5291 Quick insert search now only matches from the start of words [ea8237d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea8237d)

## 82.5.5
- [patch] ED-5454: only render insert row/column buttons when needed [16d17e3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/16d17e3)

## 82.5.4
- [patch] change grey to gray to keep consistent across editor pkgs [1b2a0b3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b2a0b3)

## 82.5.3
- [patch] Support custom rendering for typeahead items [8e0925d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8e0925d)

## 82.5.2
- [patch] center media toolbar; be more selective when resize is enabled [98ca1de](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/98ca1de)

## 82.5.1
- [patch] ED-5471 Fix show media single without height or width [a352169](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a352169)

## 82.5.0
- [minor] Allow empty content under doc [47d50ad](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/47d50ad)

## 82.4.2
- [patch] ED-5457: moving table css classnames to a const [2e1f627](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e1f627)

## 82.4.1
- [patch] ED-5452: Dynamically add/remove decorations in tables [04b0fde](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/04b0fde)

## 82.4.0
- [minor] ED-5246 support image resizing [111d02f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/111d02f)

## 82.3.1
- [patch] Updated dependencies [65c6514](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65c6514)
  - @atlaskit/docs@5.0.8
  - @atlaskit/avatar@14.0.11
  - @atlaskit/avatar-group@2.1.3
  - @atlaskit/button@9.0.13
  - @atlaskit/calendar@7.0.9
  - @atlaskit/dropdown-menu@6.1.17
  - @atlaskit/droplist@7.0.10
  - @atlaskit/item@8.0.8
  - @atlaskit/layer-manager@5.0.13
  - @atlaskit/modal-dialog@7.0.2
  - @atlaskit/select@6.0.2
  - @atlaskit/tooltip@12.1.1
  - @atlaskit/editor-common@17.0.7
  - @atlaskit/renderer@24.2.1
  - @atlaskit/emoji@42.0.1
  - @atlaskit/mention@15.0.10
  - @atlaskit/status@0.2.1
  - @atlaskit/task-decision@9.0.1
  - @atlaskit/media-card@37.0.1
  - @atlaskit/media-filmstrip@14.0.3
  - @atlaskit/media-picker@17.0.2
  - @atlaskit/media-test-helpers@18.2.1
  - @atlaskit/icon@14.0.0

## 82.3.0
- [minor] ED-5060 Code blocks now use new floating toolbar [756184e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/756184e)

## 82.2.12
- [patch] ED-5331 Fixed code-block gap cursor bug and editor crashing after several quick blurs [203eb2c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/203eb2c)

## 82.2.11
- [patch] Update i18n example to not load all locales [0c66f75](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c66f75)

## 82.2.10
- [patch] ED-5424: fix telepointers in collab editing [643a860](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/643a860)

## 82.2.9
- [patch] Better positioning of hyperlink edit popups [f247b16](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f247b16)

## 82.2.8
- [patch] New translations [e4730b0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e4730b0)

## 82.2.7
- [patch] Updated copy in Butbucket feedback prompt [533e624](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/533e624)

## 82.2.6
- [patch] Updated dependencies [dae7792](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dae7792)
  - @atlaskit/editor-common@17.0.5
  - @atlaskit/renderer@24.1.1
  - @atlaskit/media-core@24.0.2
  - @atlaskit/media-filmstrip@14.0.2
  - @atlaskit/media-picker@17.0.1
  - @atlaskit/smart-card@8.2.2
  - @atlaskit/media-card@37.0.0
  - @atlaskit/media-test-helpers@18.2.0

## 82.2.5
- [patch] Fix image markdown tip in help dialog [79465ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/79465ec)

## 82.2.4
- [patch] Add translations for help-dialog and colors [42a2916](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/42a2916)

## 82.2.3
- [patch] Add translation for quick insert [d6c438c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d6c438c)

## 82.2.2
- [patch] ED-5421: avoid adding PM history record for simple table interactions [c6cb409](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c6cb409)

## 82.2.1
- [patch] ED-5357: getting rid of ak components in table controls [83ca3e9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/83ca3e9)

## 82.2.0
- [minor] FS-2963 When inserting a status, I can pick a colour from a predefined colour picker [a633d77](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a633d77)
- [minor] FS-2963 Change status color [547b3d9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/547b3d9)

## 82.1.2
- [patch] Numbered column in table should be able to fit number > 100 [7a43676](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7a43676)

## 82.1.1
- [patch] ED-5151 Editor i18n: Floating toolbars [403b547](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/403b547)

## 82.1.0
- [minor] FS-2893 - Creation use cases for full page actions and decisions [c8aa5f5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8aa5f5)

## 82.0.3
- [patch] ED-5243 add grid plugin [4e5ef5c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e5ef5c)

## 82.0.2
- [patch] ED-5356: getting rid of styled-components in tables [5bc39da](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5bc39da)

## 82.0.1
- [patch] updated 'actionSubject' of mention typeahead's analytics events to be 'mentionTypeahead' [3147456](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3147456)

## 82.0.0
- [major] ED-5150 Editor i18n: Main toolbar [ef76f1f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef76f1f)

## 81.0.0
- [major] Updated dependencies [927ae63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/927ae63)
  - @atlaskit/editor-common@17.0.0
  - @atlaskit/util-data-test@10.0.10
  - @atlaskit/editor-test-helpers@6.1.2
  - @atlaskit/renderer@24.0.0
  - @atlaskit/emoji@42.0.0
  - @atlaskit/media-card@36.0.0
  - @atlaskit/media-filmstrip@14.0.0
  - @atlaskit/media-picker@17.0.0
  - @atlaskit/editor-bitbucket-transformer@4.0.11
  - @atlaskit/editor-json-transformer@4.0.12
  - @atlaskit/editor-markdown-transformer@2.0.10
  - @atlaskit/media-core@24.0.0
  - @atlaskit/media-test-helpers@18.0.0
  - @atlaskit/task-decision@9.0.0

## 80.5.3
- [patch] ED-5346: prosemirror upgrade [5bd4432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5bd4432)

## 80.5.2
- [patch] Fix floating toolbar position in a table with scroll [8da7574](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8da7574)

## 80.5.1
- [patch] Updated dependencies [1be4bb8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1be4bb8)
  - @atlaskit/editor-common@16.2.1
  - @atlaskit/renderer@23.0.1
  - @atlaskit/media-core@23.2.1
  - @atlaskit/media-filmstrip@13.0.2
  - @atlaskit/media-picker@16.0.6
  - @atlaskit/media-card@35.0.0

## 80.5.0
- [minor] Add dynamic text sizing support to renderer and editor [2a6410f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2a6410f)

## 80.4.14
- [patch] Fixing floating toolbar always showing top left in comments editor. ED-5348 [f36ae3c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f36ae3c)

## 80.4.13
- [patch] fix styles for nested tables [11267a8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/11267a8)

## 80.4.12
- [patch] reverting table style change [b829ab9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b829ab9)

## 80.4.11
- [patch] ED-5335: fix table when it has nested extension that renders another table [21f315b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/21f315b)

## 80.4.10
- [patch] Fixes text selection that ends at the start of the next cell. ED-5050 [f5c365d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f5c365d)

## 80.4.9
- [patch] Removing underline active in code mark selection [e54422a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e54422a)

## 80.4.8
- [patch] Updated dependencies [4194aa4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4194aa4)
  - @atlaskit/logo@9.2.2
  - @atlaskit/smart-card@8.1.2
  - @atlaskit/select@6.0.0

## 80.4.7
- [patch] Fixing the mobile appearance height  [b0f6402](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b0f6402)

## 80.4.6
- [patch] Adding renderer to the mobile bridge [3b4c276](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3b4c276)

## 80.4.5
- [patch] ED-5017 Toolbar buttons no longer steal focus when tabbing into editor [e656038](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e656038)

## 80.4.4
- [patch] bump media-picker [9411569](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9411569)

## 80.4.3
- [patch] Fix the empty progress bar inside tables [1beaf5b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1beaf5b)

## 80.4.2
- [patch] Show mediaSingle with default width when no width is defined in ADF [03af1bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/03af1bd)

## 80.4.1
- [patch] Fixing the scroll after setting content on Mobile [0a03e2d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a03e2d)

## 80.4.0
- [minor] Add new experimental table resizing, behind flag. ED-4679 [b66227e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b66227e)
- [none] Updated dependencies [b66227e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b66227e)

## 80.3.1
- [patch] Fixes remapping a table cell pos on collab modes changes and ensure its an element node. ED-5305 [dacbc18](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dacbc18)

## 80.3.0
- [minor] Adds ability to load document snapshot from collab service [3708304](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3708304)

## 80.2.1
- [patch] Fix popup positioning when inside overflow:auto containers [affe5df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/affe5df)

## 80.2.0
- [minor] FS-2961 Introduce status component and status node in editor [7fe2b0a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7fe2b0a)

## 80.1.0
- [minor] Add analytics events for pasting from different sources [486963b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/486963b)

## 80.0.1
- [patch]  Handle the fact that remoteUploadId may not exist and not break cloud uploads [c2317af](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c2317af)

## 80.0.0
- [major] Updated dependencies [6e1d642](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e1d642)
  - @atlaskit/editor-common@16.0.0
  - @atlaskit/renderer@22.0.0
  - @atlaskit/emoji@41.0.0
  - @atlaskit/media-card@34.0.0
  - @atlaskit/media-filmstrip@13.0.0
  - @atlaskit/media-picker@16.0.0
  - @atlaskit/editor-bitbucket-transformer@4.0.10
  - @atlaskit/editor-json-transformer@4.0.11
  - @atlaskit/editor-markdown-transformer@2.0.9
  - @atlaskit/editor-test-helpers@6.0.9
  - @atlaskit/task-decision@8.1.9
  - @atlaskit/util-data-test@10.0.9
  - @atlaskit/media-core@23.2.0
  - @atlaskit/media-test-helpers@17.1.0

## 79.0.14
- [patch] Show cell background menu on the left if no available space remains. ED-5155 [ef1c98d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef1c98d)

## 79.0.13
- [patch] ED-5165, fixing issue with inline code autoformatting removing other formattings in line. [9a7f8b2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9a7f8b2)

## 79.0.12
- [patch] Update TS to 3.0 [f68d367](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f68d367)
- [none] Updated dependencies [f68d367](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f68d367)
  - @atlaskit/media-test-helpers@17.0.2
  - @atlaskit/media-picker@15.1.2
  - @atlaskit/media-filmstrip@12.0.1
  - @atlaskit/media-core@23.1.1
  - @atlaskit/emoji@40.0.2
  - @atlaskit/mention@15.0.9
  - @atlaskit/editor-json-transformer@4.0.10
  - @atlaskit/editor-common@15.0.7
  - @atlaskit/media-card@33.0.2
  - @atlaskit/renderer@21.0.7
  - @atlaskit/editor-test-helpers@6.0.8

## 79.0.11
- [patch] Renamed labelling of horizontal rule to divider [ef248cc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef248cc)

## 79.0.10
- [patch] Fixes changing a tables position in collab mode which throws an error as it loses its dom reference. ED-5305 [b64e86e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b64e86e)

## 79.0.9
- [patch] Fixes toolbar config resolution when node is an atom or a leaf. ED-5301 [e937aa0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e937aa0)

## 79.0.8
- [patch] Save async loaded modules on static field to save a rerender [5b3f37f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5b3f37f)

## 79.0.7
- [patch] Updated dependencies [d5a043a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d5a043a)
  - @atlaskit/icon@13.8.1
  - @atlaskit/layer-manager@5.0.12
  - @atlaskit/select@5.0.17
  - @atlaskit/media-picker@15.0.2
  - @atlaskit/tooltip@12.0.14
  - @atlaskit/modal-dialog@7.0.0

## 79.0.6
- [patch] Updated dependencies [9c66d4d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c66d4d)
  - @atlaskit/layer-manager@5.0.10
  - @atlaskit/select@5.0.16
  - @atlaskit/editor-common@15.0.5
  - @atlaskit/media-picker@15.0.1
  - @atlaskit/webdriver-runner@0.1.0

## 79.0.5
- [patch] "userAuthProvider" property removed from all the media-picker configs; Optional "shouldCopyFileToRecents" property added to all media-picker configs; "tenantUploadParams" is removed since "uploadParams" is already a tenant one; "copyFileToRecents" is removed from UploadParams; [048f488](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/048f488)

## 79.0.4
- [patch] ED-4680 add smart card plugin, enable for inline smart cards [b9529e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b9529e6)

## 79.0.3
- [patch] propagate sessionId to the mentionTypeahead rendered event and service endpoints [0c37666](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c37666)

## 79.0.2
- [patch] ED-3919: Fix typography and other styles, align styles between editor and renderer [d0f9293](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d0f9293)

## 79.0.1
- [patch] Append timestamp in image files for Clipboard component [da65dec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da65dec)
- [patch] Updated dependencies [da65dec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da65dec)
  - @atlaskit/media-picker@14.0.1
  - @atlaskit/renderer@21.0.1
  - @atlaskit/editor-common@15.0.1

## 79.0.0
- [major] Updated dependencies [7545979](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7545979)
  - @atlaskit/editor-common@15.0.0
  - @atlaskit/renderer@21.0.0
  - @atlaskit/emoji@40.0.0
  - @atlaskit/media-card@33.0.0
  - @atlaskit/media-filmstrip@12.0.0
  - @atlaskit/media-picker@14.0.0
  - @atlaskit/editor-bitbucket-transformer@4.0.9
  - @atlaskit/editor-json-transformer@4.0.8
  - @atlaskit/editor-markdown-transformer@2.0.8
  - @atlaskit/editor-test-helpers@6.0.6
  - @atlaskit/task-decision@8.1.7
  - @atlaskit/util-data-test@10.0.8
  - @atlaskit/media-core@23.1.0

## 78.0.8
- [patch] Fix broken import blocking confluence [5545403](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5545403)

## 78.0.7
- [patch] ED-5280: Revert 68a0978 due to issues with Confluence. The IntlProviders were clashing and preventing Confluence from internationalising the elements inside the editor. [ab71cd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab71cd1)

## 78.0.6
- [patch] ED-5101, align z-index of all floating things inside editor. [52ad431](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/52ad431)
- [none] Updated dependencies [52ad431](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/52ad431)
  - @atlaskit/editor-common@14.0.14

## 78.0.5
- [patch] move tests under src [fd063e3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fd063e3)

## 78.0.4
- [patch] Stop Grammarly from attempting to hook into the editor [e9db931](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e9db931)

## 78.0.3
- [patch] Update Page Layout sizing to be more compact, fix quick-insert icon, fix issue with Popup not centering toolbar in certain situations [1effb83](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1effb83)

## 78.0.2
- [patch] ED-5172 pressing enter after media single in list no longer deletes list [74824f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/74824f8)

## 78.0.1
- [patch] "update dependencies" [9ab9471](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ab9471)

## 78.0.0
- [major] Remove new upload service feature flag (useNewUploadService). Now new upload service will be used by default. [911a570](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/911a570)
- [patch] Updated dependencies [911a570](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/911a570)
  - @atlaskit/media-test-helpers@17.0.0
  - @atlaskit/media-picker@13.0.0
  - @atlaskit/media-filmstrip@11.0.2
  - @atlaskit/media-core@23.0.2
  - @atlaskit/editor-json-transformer@4.0.7
  - @atlaskit/editor-bitbucket-transformer@4.0.8
  - @atlaskit/editor-markdown-transformer@2.0.7
  - @atlaskit/media-card@32.0.6
  - @atlaskit/renderer@20.1.1
  - @atlaskit/editor-test-helpers@6.0.5

## 77.2.3
- [patch] Adding support for telepointers in new collab provider [cc35c67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc35c67)
- [none] Updated dependencies [cc35c67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc35c67)

## 77.2.2
- [patch] ED-5153, add react-intl to editor and expose locale support. [68a0978](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/68a0978)
- [patch] Updated dependencies [68a0978](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/68a0978)

## 77.2.1
- [patch] Check current selected nodes before change node selection when interacting with extensions. ED-5199 [bb15908](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bb15908)

## 77.2.0
- [minor] Disable table context menu if advanced table features aren't enabled. ED-5252 [5ad6057](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ad6057)
- [none] Updated dependencies [5ad6057](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ad6057)

## 77.1.5
- [patch] New floating toolbar for extensions [23437c0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/23437c0)
- [none] Updated dependencies [23437c0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/23437c0)

## 77.1.4
- [patch] Updated dependencies [b12f7e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b12f7e6)
  - @atlaskit/renderer@20.0.11
  - @atlaskit/task-decision@8.1.6
  - @atlaskit/util-data-test@10.0.7
  - @atlaskit/editor-common@14.0.11
  - @atlaskit/editor-test-helpers@6.0.3
  - @atlaskit/editor-markdown-transformer@2.0.6
  - @atlaskit/mention@15.0.6
  - @atlaskit/emoji@39.1.1
  - @atlaskit/editor-json-transformer@4.0.6
  - @atlaskit/editor-bitbucket-transformer@4.0.7
  - @atlaskit/media-card@32.0.5
  - @atlaskit/media-picker@12.1.2
  - @atlaskit/media-filmstrip@11.0.1

## 77.1.3
- [patch] Updated dependencies [dd91bcf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dd91bcf)
  - @atlaskit/emoji@39.1.0
  - @atlaskit/renderer@20.0.10
  - @atlaskit/editor-common@14.0.10

## 77.1.2
- [patch] Minor changes to collab plugin [02cef16](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/02cef16)
- [none] Updated dependencies [02cef16](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/02cef16)

## 77.1.1
- [patch] Fixes renderer tables for Mobile [7f1ef74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7f1ef74)
- [none] Updated dependencies [7f1ef74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7f1ef74)
  - @atlaskit/editor-common@14.0.9

## 77.1.0
- [minor] Rename UNSAFE_allowLayouts to allowLayouts. ED-4198 [b0e9bcb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b0e9bcb)
- [none] Updated dependencies [b0e9bcb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b0e9bcb)

## 77.0.17
- [patch] Allow simple text elements in the block type insert menu. ED-5225 [3836740](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3836740)
- [none] Updated dependencies [3836740](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3836740)

## 77.0.16
- [patch] Fixed input-rule em and strong markdown regex matching to correctly match words with a prefix before a later pair found [5350da0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5350da0)
- [none] Updated dependencies [5350da0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5350da0)

## 77.0.15
- [patch] ED-4411, fix for smartinsert of single quotes. [c452857](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c452857)
- [patch] Updated dependencies [c452857](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c452857)

## 77.0.14
- [patch] Updated dependencies [df22ad8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df22ad8)
  - @atlaskit/theme@6.0.0
  - @atlaskit/task-decision@8.1.5
  - @atlaskit/emoji@39.0.4
  - @atlaskit/date@0.1.2
  - @atlaskit/renderer@20.0.7
  - @atlaskit/tooltip@12.0.9
  - @atlaskit/spinner@9.0.6
  - @atlaskit/select@5.0.9
  - @atlaskit/modal-dialog@6.0.9
  - @atlaskit/lozenge@6.1.5
  - @atlaskit/layer-manager@5.0.6
  - @atlaskit/item@8.0.5
  - @atlaskit/icon@13.2.5
  - @atlaskit/droplist@7.0.7
  - @atlaskit/code@8.0.1
  - @atlaskit/calendar@7.0.5
  - @atlaskit/button@9.0.6
  - @atlaskit/avatar-group@2.1.1
  - @atlaskit/avatar@14.0.8
  - @atlaskit/docs@5.0.6

## 77.0.13
- [patch] ED-5178: added card node to default schema [51e7446](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/51e7446)
- [none] Updated dependencies [51e7446](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/51e7446)
  - @atlaskit/editor-test-helpers@6.0.2
  - @atlaskit/editor-common@14.0.8

## 77.0.12
- [patch] Updated dependencies [f9c0cdb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f9c0cdb)
  - @atlaskit/code@8.0.0
  - @atlaskit/renderer@20.0.6
  - @atlaskit/logo@9.0.4
  - @atlaskit/avatar-group@2.0.8
  - @atlaskit/docs@5.0.5

## 77.0.11
- [patch] ED-5190: fixed mediaSingle styles in renderer [4f09dea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4f09dea)
- [none] Updated dependencies [4f09dea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4f09dea)
  - @atlaskit/renderer@20.0.5
  - @atlaskit/editor-common@14.0.6

## 77.0.10
- [patch] When removing a media group with a code block below it, prevent the editor from crashing when it references an invalid pos. ED-5207 [4b11a78](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4b11a78)
- [none] Updated dependencies [4b11a78](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4b11a78)

## 77.0.9
- [patch] Fix bug in CodeBlocks where indenting with a selection at the start of the document would change your cursor-selection, to a range-selection for the purpose of indenting [4cd8ae6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4cd8ae6)
- [none] Updated dependencies [4cd8ae6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4cd8ae6)

## 77.0.8
- [patch] If datepicker is open, close on enter. ED-5210 [1b16711](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b16711)
- [none] Updated dependencies [1b16711](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b16711)

## 77.0.7
- [patch] Updated dependencies [79f780a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/79f780a)
  - @atlaskit/media-picker@12.1.1
  - @atlaskit/editor-common@14.0.2

## 77.0.6
- [patch] FS-2819 use aria-label as selector rather than closest [84a7235](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/84a7235)
- [none] Updated dependencies [84a7235](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/84a7235)
  - @atlaskit/emoji@39.0.3

## 77.0.5
- [patch] Fixing editor blowing up when code mark is disabled [968da74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/968da74)
- [none] Updated dependencies [968da74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/968da74)

## 77.0.4
- [patch] FS-2815 - Only close emoji picker when disabled (in case pending open state changes) [4f5d786](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4f5d786)
- [patch] Ensure emoji picker doesn't reopen after toolbar reenabled, if previously open. [5d2c0c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5d2c0c6)
- [none] Updated dependencies [4f5d786](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4f5d786)
- [none] Updated dependencies [5d2c0c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5d2c0c6)

## 77.0.3
- [patch] Remove items from toolbar if the prop is disabled [7c46965](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c46965)
- [none] Updated dependencies [7c46965](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c46965)

## 77.0.2
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [patch] Updated dependencies [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/media-card@32.0.1
  - @atlaskit/media-picker@12.0.1
  - @atlaskit/task-decision@8.1.4
  - @atlaskit/util-data-test@10.0.4
  - @atlaskit/mention@15.0.5
  - @atlaskit/emoji@39.0.1
  - @atlaskit/editor-common@14.0.1
  - @atlaskit/date@0.1.1
  - @atlaskit/analytics-next-types@3.0.1
  - @atlaskit/tooltip@12.0.5
  - @atlaskit/select@5.0.8
  - @atlaskit/logo@9.0.3
  - @atlaskit/modal-dialog@6.0.6
  - @atlaskit/analytics-next@3.0.4
  - @atlaskit/calendar@7.0.4
  - @atlaskit/button@9.0.5
  - @atlaskit/theme@5.1.3
  - @atlaskit/lozenge@6.1.4
  - @atlaskit/code@7.0.3
  - @atlaskit/spinner@9.0.5
  - @atlaskit/size-detector@5.0.4
  - @atlaskit/layer@5.0.4
  - @atlaskit/analytics@4.0.4
  - @atlaskit/layer-manager@5.0.5
  - @atlaskit/item@8.0.4
  - @atlaskit/icon@13.2.4
  - @atlaskit/droplist@7.0.5
  - @atlaskit/avatar-group@2.0.7
  - @atlaskit/avatar@14.0.6

## 77.0.1
- [patch] Stop editor from blowing up inside dispatchTransaction if editorView is undefined [49b0733](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49b0733)
- [none] Updated dependencies [49b0733](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49b0733)

## 77.0.0





- [none] Updated dependencies [597e0bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/597e0bd)
  - @atlaskit/renderer@20.0.0
  - @atlaskit/task-decision@8.1.3
  - @atlaskit/util-data-test@10.0.3
  - @atlaskit/emoji@39.0.0
  - @atlaskit/editor-json-transformer@4.0.4
  - @atlaskit/editor-bitbucket-transformer@4.0.6
  - @atlaskit/editor-test-helpers@6.0.0
  - @atlaskit/editor-markdown-transformer@2.0.5
  - @atlaskit/editor-common@14.0.0
- [none] Updated dependencies [61df453](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/61df453)
  - @atlaskit/util-data-test@10.0.3
  - @atlaskit/editor-common@14.0.0
  - @atlaskit/editor-test-helpers@6.0.0
  - @atlaskit/editor-markdown-transformer@2.0.5
  - @atlaskit/task-decision@8.1.3
  - @atlaskit/emoji@39.0.0
  - @atlaskit/renderer@20.0.0
  - @atlaskit/editor-json-transformer@4.0.4
  - @atlaskit/editor-bitbucket-transformer@4.0.6
- [none] Updated dependencies [812a39c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/812a39c)
  - @atlaskit/renderer@20.0.0
  - @atlaskit/task-decision@8.1.3
  - @atlaskit/util-data-test@10.0.3
  - @atlaskit/emoji@39.0.0
  - @atlaskit/editor-json-transformer@4.0.4
  - @atlaskit/editor-bitbucket-transformer@4.0.6
  - @atlaskit/editor-test-helpers@6.0.0
  - @atlaskit/editor-markdown-transformer@2.0.5
  - @atlaskit/editor-common@14.0.0
- [none] Updated dependencies [c8eb097](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8eb097)
  - @atlaskit/renderer@20.0.0
  - @atlaskit/task-decision@8.1.3
  - @atlaskit/util-data-test@10.0.3
  - @atlaskit/editor-common@14.0.0
  - @atlaskit/editor-test-helpers@6.0.0
  - @atlaskit/editor-markdown-transformer@2.0.5
  - @atlaskit/emoji@39.0.0
  - @atlaskit/editor-json-transformer@4.0.4
  - @atlaskit/editor-bitbucket-transformer@4.0.6
- [major] Updated dependencies [d02746f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d02746f)
  - @atlaskit/media-test-helpers@16.0.0
  - @atlaskit/media-picker@12.0.0
  - @atlaskit/media-filmstrip@11.0.0
  - @atlaskit/media-core@23.0.0
  - @atlaskit/emoji@39.0.0
  - @atlaskit/util-data-test@10.0.3
  - @atlaskit/task-decision@8.1.3
  - @atlaskit/editor-json-transformer@4.0.4
  - @atlaskit/editor-bitbucket-transformer@4.0.6
  - @atlaskit/editor-common@14.0.0
  - @atlaskit/editor-markdown-transformer@2.0.5
  - @atlaskit/media-card@32.0.0
  - @atlaskit/renderer@20.0.0
  - @atlaskit/editor-test-helpers@6.0.0

## 76.4.11
- [patch] ED-5023 Quick insert now appears in help dialog when it is enabled [93c9b37](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/93c9b37)
- [none] Updated dependencies [93c9b37](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/93c9b37)

## 76.4.10

- [patch] fixed broken tests and added test for util/analytics [57b9d1e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/57b9d1e)


- [none] Updated dependencies [8eced90](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8eced90)
  - @atlaskit/mention@15.0.3
- [none] Updated dependencies [57b9d1e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/57b9d1e)
  - @atlaskit/mention@15.0.3
- [none] Updated dependencies [0bc5732](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0bc5732)
  - @atlaskit/mention@15.0.3
- [none] Updated dependencies [c536e60](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c536e60)
  - @atlaskit/mention@15.0.3

## 76.4.9
- [patch] Updated dependencies [59ccb09](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/59ccb09)
  - @atlaskit/media-card@31.3.0
  - @atlaskit/media-picker@11.2.2
  - @atlaskit/media-filmstrip@10.2.2
  - @atlaskit/renderer@19.2.7
  - @atlaskit/editor-common@13.2.8

## 76.4.8
- [patch] Prevents editor from crashing when hitting backspace on selected date node. ED-5168 [c360f18](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c360f18)
- [none] Updated dependencies [c360f18](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c360f18)

## 76.4.7
- [patch] Adding conditional controls render [0ed8bcf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0ed8bcf)
- [none] Updated dependencies [0ed8bcf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0ed8bcf)

## 76.4.6
- [patch] isOpen never renders the menu, check if we have an appropriate selection before rendering [f72ad6c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f72ad6c)
- [none] Updated dependencies [f72ad6c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f72ad6c)

## 76.4.5
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/select@5.0.7
  - @atlaskit/media-card@31.2.1
  - @atlaskit/media-picker@11.2.1
  - @atlaskit/media-filmstrip@10.2.1
  - @atlaskit/renderer@19.2.6
  - @atlaskit/task-decision@8.1.2
  - @atlaskit/util-data-test@10.0.2
  - @atlaskit/mention@15.0.2
  - @atlaskit/emoji@38.0.5
  - @atlaskit/editor-json-transformer@4.0.3
  - @atlaskit/editor-bitbucket-transformer@4.0.5
  - @atlaskit/editor-common@13.2.7
  - @atlaskit/editor-test-helpers@5.1.2
  - @atlaskit/editor-markdown-transformer@2.0.3
  - @atlaskit/logo@9.0.2
  - @atlaskit/tooltip@12.0.4
  - @atlaskit/layer-manager@5.0.4
  - @atlaskit/item@8.0.3
  - @atlaskit/icon@13.2.2
  - @atlaskit/calendar@7.0.3
  - @atlaskit/button@9.0.4
  - @atlaskit/media-core@22.2.1
  - @atlaskit/media-test-helpers@15.2.1
  - @atlaskit/theme@5.1.2
  - @atlaskit/lozenge@6.1.3
  - @atlaskit/code@7.0.2
  - @atlaskit/spinner@9.0.4
  - @atlaskit/analytics-next@3.0.3
  - @atlaskit/docs@5.0.2
  - @atlaskit/analytics-gas-types@3.1.2
  - @atlaskit/size-detector@5.0.3
  - @atlaskit/layer@5.0.3
  - @atlaskit/analytics@4.0.3
  - @atlaskit/droplist@7.0.4
  - @atlaskit/avatar-group@2.0.4
  - @atlaskit/avatar@14.0.5
  - @atlaskit/modal-dialog@6.0.5

## 76.4.4
- [patch] FS-2131 add date element [b026429](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b026429)
- [patch] Updated dependencies [b026429](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b026429)
  - @atlaskit/date@0.1.0

## 76.4.3
- [patch] ED-4825, copying single line of code should create inline code mark. [c99642b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c99642b)
- [patch] Updated dependencies [c99642b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c99642b)

## 76.4.2
- [patch] Bump prosemirror-model to 1.6 in order to use toDebugString on Text node spec [fdd5c5d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fdd5c5d)
- [none] Updated dependencies [fdd5c5d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fdd5c5d)
  - @atlaskit/renderer@19.2.5
  - @atlaskit/editor-common@13.2.6
  - @atlaskit/editor-test-helpers@5.1.1
  - @atlaskit/editor-markdown-transformer@2.0.2
  - @atlaskit/editor-json-transformer@4.0.2
  - @atlaskit/editor-bitbucket-transformer@4.0.4

## 76.4.1
- [patch] Make typeahead keymap work in a list [a7d7421](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a7d7421)
- [none] Updated dependencies [a7d7421](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a7d7421)

## 76.4.0
- [minor] MediaPicker Popup now supports passing of optional parent react context as a parameter [25ef2e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25ef2e4)
- [minor] Updated dependencies [25ef2e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25ef2e4)
  - @atlaskit/media-picker@11.2.0
  - @atlaskit/editor-test-helpers@5.1.0

## 76.3.6
- [patch] When you select Date from the quick insert menu, we now auto open the date picker. ED-5016 [f85d035](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f85d035)
- [none] Updated dependencies [f85d035](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f85d035)

## 76.3.5
- [patch] ED-5147: do not render context menu if its closed [633f27a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/633f27a)
- [none] Updated dependencies [633f27a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/633f27a)

## 76.3.4
- [patch] Fixed ToolbarButton to respond to spacing prop [ec1595e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ec1595e)
- [none] Updated dependencies [ec1595e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ec1595e)

## 76.3.3
- [patch] Clone previous rows colspan and cell attrs if any. ED-4991 [a5f1c5b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a5f1c5b)
- [none] Updated dependencies [a5f1c5b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a5f1c5b)

## 76.3.2
- [patch] When copying a table respect the table layout and cell attributes. ED-4947 [d25b42c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d25b42c)
- [none] Updated dependencies [d25b42c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d25b42c)
  - @atlaskit/editor-common@13.2.5

## 76.3.1
- [patch] Updated dependencies [7fa84a2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7fa84a2)
  - @atlaskit/media-filmstrip@10.2.0
  - @atlaskit/renderer@19.2.4
  - @atlaskit/media-card@31.2.0

## 76.3.0
- [minor] Add priority for quick search menu items and improve search [eaa974b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eaa974b)
- [none] Updated dependencies [eaa974b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eaa974b)

## 76.2.13
- [patch] Cleaning up plugin ranks [ce2a71b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ce2a71b)
- [none] Updated dependencies [ce2a71b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ce2a71b)

## 76.2.12
- [patch] ED-5147: set targetCellRef to undefined when table looses focus [d805071](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d805071)
- [none] Updated dependencies [d805071](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d805071)

## 76.2.11
- [patch] ED-4995: added support for the rest of the page layout types in the renderer [9d9acfa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d9acfa)
- [none] Updated dependencies [9d9acfa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d9acfa)
  - @atlaskit/renderer@19.2.3
  - @atlaskit/editor-common@13.2.4

## 76.2.10
- [patch] Updated dependencies [3485c00](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3485c00)
  - @atlaskit/media-picker@11.1.2
  - @atlaskit/editor-common@13.2.3
  - @atlaskit/media-core@22.2.0
  - @atlaskit/media-card@31.1.1

## 76.2.9
- [patch] ED-5126: fix codeblock language picker is loosing focus on click [6a3ca70](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6a3ca70)
- [none] Updated dependencies [6a3ca70](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6a3ca70)

## 76.2.8
- [patch] Internal refactor of hyperlink plugin to not contain direct references to the view in plugin state. ED-4962 [dda4cab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dda4cab)
- [none] Updated dependencies [dda4cab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dda4cab)

## 76.2.7
- [patch] FS-2020 add session id to typeahead plugin inside editor [5ae463f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ae463f)
- [none] Updated dependencies [5ae463f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ae463f)
  - @atlaskit/mention@15.0.1
  - @atlaskit/analytics-gas-types@3.1.1

## 76.2.6
- [patch] ED-4977 Fixed extra newline after blockquote in Firefox [ac47c1c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ac47c1c)
- [none] Updated dependencies [ac47c1c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ac47c1c)

## 76.2.5
- [patch] ED-5090: added contextual menu [2cb70d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2cb70d8)
- [none] Updated dependencies [2cb70d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2cb70d8)

## 76.2.4
- [patch] ED-5033, fixes for multiple date related issues. [c9911e0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c9911e0)
- [patch] Updated dependencies [c9911e0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c9911e0)
  - @atlaskit/renderer@19.2.2
  - @atlaskit/editor-common@13.2.2

## 76.2.3
- [patch] Updated dependencies [fad25ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fad25ec)
  - @atlaskit/media-test-helpers@15.2.0
  - @atlaskit/media-picker@11.1.1
  - @atlaskit/media-core@22.1.0
  - @atlaskit/editor-common@13.2.1
  - @atlaskit/media-card@31.1.0
  - @atlaskit/renderer@19.2.1
  - @atlaskit/editor-test-helpers@5.0.3

## 76.2.2
- [patch] Change tab-size to 4 spaces wide inside a code-block. [d089d0f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d089d0f)
- [patch] Support backspacing an entire intent level inside code-block. ED-4864 [86998f3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/86998f3)
- [patch] Fix issue where bracket-autocompletion would work for any closing bracket even when it didn't match the opening bracket. [952eab1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/952eab1)
- [none] Updated dependencies [d089d0f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d089d0f)
- [none] Updated dependencies [86998f3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/86998f3)
- [none] Updated dependencies [952eab1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/952eab1)

## 76.2.1
- [patch] ED-5043: only disable dropzone for popup picker [9878d57](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9878d57)
- [none] Updated dependencies [9878d57](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9878d57)

## 76.2.0




- [patch] Updated dependencies [fa6f865](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fa6f865)
  - @atlaskit/media-card@31.0.0
  - @atlaskit/media-picker@11.1.0
  - @atlaskit/media-filmstrip@10.1.0
  - @atlaskit/renderer@19.2.0
  - @atlaskit/editor-common@13.2.0
  - @atlaskit/media-test-helpers@15.1.0
- [none] Updated dependencies [fdd03d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fdd03d8)
  - @atlaskit/media-card@31.0.0
  - @atlaskit/media-picker@11.1.0
  - @atlaskit/media-filmstrip@10.1.0
  - @atlaskit/renderer@19.2.0
  - @atlaskit/editor-common@13.2.0
  - @atlaskit/media-test-helpers@15.1.0
- [patch] Updated dependencies [49c8425](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49c8425)
  - @atlaskit/media-card@31.0.0
  - @atlaskit/media-picker@11.1.0
  - @atlaskit/media-filmstrip@10.1.0
  - @atlaskit/renderer@19.2.0
  - @atlaskit/editor-common@13.2.0
  - @atlaskit/media-test-helpers@15.1.0
- [minor] Updated dependencies [3476e01](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3476e01)
  - @atlaskit/media-card@31.0.0
  - @atlaskit/media-picker@11.1.0
  - @atlaskit/media-filmstrip@10.1.0
  - @atlaskit/renderer@19.2.0
  - @atlaskit/editor-common@13.2.0

## 76.1.0
- [minor] Updated dependencies [f6bf6c8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f6bf6c8)
  - @atlaskit/mention@15.0.0
  - @atlaskit/util-data-test@10.0.1
  - @atlaskit/renderer@19.1.0
  - @atlaskit/editor-common@13.1.0

## 76.0.25
- [patch] Corrected gap size between more and italic icons in editor toolbar [92cf9d4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92cf9d4)
- [none] Updated dependencies [92cf9d4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92cf9d4)

## 76.0.24
- [patch] Fixing the Mobile appearance height [a79b962](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a79b962)
- [none] Updated dependencies [a79b962](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a79b962)

## 76.0.23
- [patch] ED-4961 refactor block-type plugin [b88ca64](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b88ca64)
- [none] Updated dependencies [b88ca64](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b88ca64)

## 76.0.22
- [patch] ED-5022, quick insert should not be triggered for key combination (/. [5588225](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5588225)
- [patch] Updated dependencies [5588225](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5588225)

## 76.0.21
- [patch] Allow empty alt tags, add better support for titles. ED-4751 [37fc5af](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/37fc5af)
- [none] Updated dependencies [37fc5af](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/37fc5af)

## 76.0.20
- [patch] ED-5089, fixing styling of items in block-type dropdown menu. [65683ed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65683ed)
- [patch] Updated dependencies [65683ed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65683ed)

## 76.0.19
- [patch] ED-4954 Fixed toolbar button hight to be consistant with icons [8f1d665](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8f1d665)
- [none] Updated dependencies [8f1d665](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8f1d665)

## 76.0.18
- [patch] Update icons for Layouts to reflect new design [fc59e6b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc59e6b)
- [none] Updated dependencies [fc59e6b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc59e6b)

## 76.0.17
- [patch] Refactor text-color plugin to new architecture. ED-4965 [f21bea7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f21bea7)
- [none] Updated dependencies [f21bea7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f21bea7)

## 76.0.16
- [patch]  ED-4960, refactoring text formatting plugin. [f4a0996](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f4a0996)
- [none] Updated dependencies [f4a0996](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f4a0996)

## 76.0.15
- [patch] Add support for switching between different layout styles via the toolbar. ED-4196 [ab7dcd4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab7dcd4)
- [none] Updated dependencies [ab7dcd4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab7dcd4)

## 76.0.14
- [patch] Make sure we linkify slice when pasting into task and decision. ED-4728 [e37b5ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e37b5ea)
- [none] Updated dependencies [e37b5ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e37b5ea)

## 76.0.13
- [patch] FS-2816 - Prevent clicks in pop ups from triggering focus of the message editor [247855f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/247855f)
- [none] Updated dependencies [247855f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/247855f)
  - @atlaskit/editor-common@13.0.8

## 76.0.12
- [patch] Fix floating toolbar dropdown poisitoning [9f8dd6a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f8dd6a)
- [none] Updated dependencies [9f8dd6a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f8dd6a)

## 76.0.11
- [patch] Fix issue where we would not show code block toolbar when inserting code block via insert-menu. ED-4982 [8260943](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8260943)
- [none] Updated dependencies [8260943](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8260943)

## 76.0.10
- [patch] Updated dependencies [b1e8a47](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1e8a47)
  - @atlaskit/layer@5.0.1
  - @atlaskit/renderer@19.0.5
  - @atlaskit/editor-common@13.0.7

## 76.0.9
- [patch] Fix some decisionItem, taskItem, and panel nodeViews [af33ec7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af33ec7)
- [none] Updated dependencies [af33ec7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af33ec7)

## 76.0.8
- [patch] Choose to re-render entire task item when empty or if TODO/DONE state has changed [10cb299](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/10cb299)
- [none] Updated dependencies [10cb299](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/10cb299)

## 76.0.7
- [patch] FS-2800 - Fix selection when changing between actions and decisions [685abd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/685abd1)
- [none] Updated dependencies [685abd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/685abd1)

## 76.0.6
- [patch] Obfuscate internal editor class-name "content-area" to prevent clashes with product css [7ddf1eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ddf1eb)
- [none] Updated dependencies [7ddf1eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ddf1eb)

## 76.0.5
- [patch] New floating toolbar for Panel [4d528ab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4d528ab)
- [none] Updated dependencies [4d528ab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4d528ab)
  - @atlaskit/renderer@19.0.3
  - @atlaskit/editor-common@13.0.5

## 76.0.4
- [patch] Fallback to use containerId from MentionResourceConfig if ContextIdentifier promise fails [5ecb9a7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ecb9a7)
- [patch] add support for childObjectId in ContextIdentifiers and pass it to the mention service endpoints [6e31eb6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e31eb6)
- [none] Updated dependencies [5ecb9a7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ecb9a7)
  - @atlaskit/mention@14.0.2
  - @atlaskit/editor-test-helpers@5.0.2
  - @atlaskit/editor-common@13.0.4
- [patch] Updated dependencies [6e31eb6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e31eb6)
  - @atlaskit/mention@14.0.2
  - @atlaskit/editor-test-helpers@5.0.2
  - @atlaskit/editor-common@13.0.4

## 76.0.3
- [patch] Improves type coverage by removing casts to any [8928280](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8928280)
- [none] Updated dependencies [8928280](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8928280)
  - @atlaskit/editor-common@13.0.3

## 76.0.2
- [patch] ED-4956, moving decision menu item to insert menu drop-down. [4e11c66](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e11c66)
- [none] Updated dependencies [4e11c66](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e11c66)

## 76.0.1
- [patch] Updated dependencies [e6b1985](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e6b1985)
  - @atlaskit/tooltip@12.0.0
  - @atlaskit/media-card@30.0.1
  - @atlaskit/mention@14.0.1
  - @atlaskit/emoji@38.0.1
  - @atlaskit/select@5.0.1
  - @atlaskit/layer-manager@5.0.1
  - @atlaskit/item@8.0.1
  - @atlaskit/icon@13.1.1
  - @atlaskit/droplist@7.0.1
  - @atlaskit/avatar-group@2.0.1
  - @atlaskit/avatar@14.0.1

## 76.0.0
- [minor] Add styles for all different page-layout options. Add appendTransaction handler to ensure that only validate page-layouts ever get added to the document. ED-4197 [25353c3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25353c3)
- [major] ED-3701: editor exports cleanup [38c0543](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/38c0543)
- [none] Updated dependencies [25353c3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25353c3)
  - @atlaskit/editor-test-helpers@5.0.1
  - @atlaskit/editor-markdown-transformer@2.0.1
  - @atlaskit/editor-json-transformer@4.0.1
  - @atlaskit/editor-bitbucket-transformer@4.0.1
- [none] Updated dependencies [38c0543](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/38c0543)
  - @atlaskit/editor-test-helpers@5.0.1
  - @atlaskit/editor-markdown-transformer@2.0.1
  - @atlaskit/editor-json-transformer@4.0.1
  - @atlaskit/editor-bitbucket-transformer@4.0.1

## 75.0.3
- [patch] ED-5004: unwrap content from table on paste [0ab457a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0ab457a)
- [none] Updated dependencies [0ab457a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0ab457a)

## 75.0.2
- [patch] ED-5064: disable layout options when table is nested [efda6f5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/efda6f5)
- [none] Updated dependencies [efda6f5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/efda6f5)

## 75.0.1
- [patch] ED-4665: fix rows/cols selection in IE 11 [2e37e7a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e37e7a)
- [none] Updated dependencies [2e37e7a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e37e7a)

## 75.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/tooltip@11.0.0
  - @atlaskit/media-card@30.0.0
  - @atlaskit/media-picker@11.0.0
  - @atlaskit/media-filmstrip@10.0.0
  - @atlaskit/renderer@19.0.0
  - @atlaskit/task-decision@8.0.0
  - @atlaskit/util-data-test@10.0.0
  - @atlaskit/editor-json-transformer@4.0.0
  - @atlaskit/editor-bitbucket-transformer@4.0.0
  - @atlaskit/editor-common@13.0.0
  - @atlaskit/editor-test-helpers@5.0.0
  - @atlaskit/editor-markdown-transformer@2.0.0
  - @atlaskit/mention@14.0.0
  - @atlaskit/emoji@38.0.0
  - @atlaskit/select@5.0.0
  - @atlaskit/logo@9.0.0
  - @atlaskit/modal-dialog@6.0.0
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/calendar@7.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/media-core@22.0.0
  - @atlaskit/media-test-helpers@15.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/lozenge@6.0.0
  - @atlaskit/code@7.0.0
  - @atlaskit/spinner@9.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/analytics-gas-types@3.0.0
  - @atlaskit/size-detector@5.0.0
  - @atlaskit/layer@5.0.0
  - @atlaskit/analytics@4.0.0
  - @atlaskit/layer-manager@5.0.0
  - @atlaskit/item@8.0.0
  - @atlaskit/icon@13.0.0
  - @atlaskit/droplist@7.0.0
  - @atlaskit/avatar-group@2.0.0
  - @atlaskit/avatar@14.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/media-card@30.0.0
  - @atlaskit/media-picker@11.0.0
  - @atlaskit/media-filmstrip@10.0.0
  - @atlaskit/renderer@19.0.0
  - @atlaskit/task-decision@8.0.0
  - @atlaskit/util-data-test@10.0.0
  - @atlaskit/mention@14.0.0
  - @atlaskit/emoji@38.0.0
  - @atlaskit/editor-json-transformer@4.0.0
  - @atlaskit/editor-bitbucket-transformer@4.0.0
  - @atlaskit/editor-test-helpers@5.0.0
  - @atlaskit/editor-markdown-transformer@2.0.0
  - @atlaskit/editor-common@13.0.0
  - @atlaskit/media-test-helpers@15.0.0
  - @atlaskit/media-core@22.0.0
  - @atlaskit/tooltip@11.0.0
  - @atlaskit/select@5.0.0
  - @atlaskit/logo@9.0.0
  - @atlaskit/modal-dialog@6.0.0
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/calendar@7.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/lozenge@6.0.0
  - @atlaskit/code@7.0.0
  - @atlaskit/spinner@9.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/analytics-gas-types@3.0.0
  - @atlaskit/size-detector@5.0.0
  - @atlaskit/layer@5.0.0
  - @atlaskit/analytics@4.0.0
  - @atlaskit/layer-manager@5.0.0
  - @atlaskit/item@8.0.0
  - @atlaskit/icon@13.0.0
  - @atlaskit/droplist@7.0.0
  - @atlaskit/avatar-group@2.0.0
  - @atlaskit/avatar@14.0.0

## 74.0.18
- [patch] Updated dependencies [daf6227](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/daf6227)
  - @atlaskit/media-picker@10.0.0

## 74.0.17

- [patch] Refactor existing 'paste' slice handling code, to use common utilities. Remove unused linkifySlice export from editor-common. [5958588](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5958588)
- [none] Updated dependencies [5f6ec84](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5f6ec84)
  - @atlaskit/editor-test-helpers@4.2.4
  - @atlaskit/renderer@18.2.18
  - @atlaskit/task-decision@7.1.14
  - @atlaskit/editor-common@12.0.0
  - @atlaskit/editor-markdown-transformer@1.2.8
  - @atlaskit/editor-json-transformer@3.1.8
  - @atlaskit/editor-bitbucket-transformer@3.2.9
- [patch] Updated dependencies [5958588](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5958588)
  - @atlaskit/editor-test-helpers@4.2.4
  - @atlaskit/renderer@18.2.18
  - @atlaskit/task-decision@7.1.14
  - @atlaskit/editor-common@12.0.0
  - @atlaskit/editor-markdown-transformer@1.2.8
  - @atlaskit/editor-json-transformer@3.1.8
  - @atlaskit/editor-bitbucket-transformer@3.2.9

## 74.0.16

- [patch] code improvements and MentionContextIdentifier attributes made mandatory to sync with editor-common ContextIdentifier [8a125a7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a125a7)

- [patch] Updated dependencies [c98857e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c98857e)
  - @atlaskit/mention@13.1.10
  - @atlaskit/util-data-test@9.1.19
  - @atlaskit/renderer@18.2.17
  - @atlaskit/editor-test-helpers@4.2.3
  - @atlaskit/editor-common@11.4.6
- [patch] Updated dependencies [8a125a7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a125a7)
  - @atlaskit/mention@13.1.10
  - @atlaskit/util-data-test@9.1.19
  - @atlaskit/renderer@18.2.17
  - @atlaskit/editor-test-helpers@4.2.3
  - @atlaskit/editor-common@11.4.6
- [none] Updated dependencies [cacfb53](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cacfb53)
  - @atlaskit/mention@13.1.10
  - @atlaskit/util-data-test@9.1.19
  - @atlaskit/renderer@18.2.17
  - @atlaskit/editor-test-helpers@4.2.3
  - @atlaskit/editor-common@11.4.6

## 74.0.15
- [patch] Rename deindent to outdent, reword analytic event to be consistent ED-4865 [33ab33b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/33ab33b)
- [none] Updated dependencies [33ab33b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/33ab33b)

## 74.0.14
- [patch] Split out non-core style and minor refactors in anticipation of hyperlink refactor [d1c7461](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d1c7461)
- [none] Updated dependencies [d1c7461](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d1c7461)

## 74.0.13
- [patch] ED-4914: extracted flash to a separate component [ea16bf8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea16bf8)
- [none] Updated dependencies [ea16bf8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea16bf8)

## 74.0.12
- [patch] ED-5029, fix padding in comment editor. [a38f1e9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a38f1e9)
- [patch] Updated dependencies [a38f1e9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a38f1e9)

## 74.0.11
- [patch] FS-2093 add mention insert analytics event [30bbe5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/30bbe5a)
- [none] Updated dependencies [30bbe5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/30bbe5a)
  - @atlaskit/mention@13.1.8

## 74.0.10
- [patch] Updated dependencies [6f51fdb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6f51fdb)
  - @atlaskit/media-picker@9.0.1
  - @atlaskit/renderer@18.2.16
  - @atlaskit/editor-common@11.4.5

## 74.0.9


- [patch] Updated dependencies [f897c79](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f897c79)
  - @atlaskit/util-data-test@9.1.17
  - @atlaskit/editor-common@11.4.4
  - @atlaskit/emoji@37.0.0
- [none] Updated dependencies [cacf096](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cacf096)
  - @atlaskit/emoji@37.0.0
  - @atlaskit/util-data-test@9.1.17
  - @atlaskit/editor-common@11.4.4

## 74.0.8


- [none] Updated dependencies [da63331](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da63331)
  - @atlaskit/button@8.2.5
  - @atlaskit/media-card@29.1.10
  - @atlaskit/task-decision@7.1.12
  - @atlaskit/mention@13.1.7
  - @atlaskit/item@7.0.8
  - @atlaskit/modal-dialog@5.2.8
  - @atlaskit/avatar-group@1.0.2
  - @atlaskit/avatar@13.0.0
- [patch] Updated dependencies [7724115](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7724115)
  - @atlaskit/avatar@13.0.0
  - @atlaskit/media-card@29.1.10
  - @atlaskit/task-decision@7.1.12
  - @atlaskit/mention@13.1.7
  - @atlaskit/button@8.2.5
  - @atlaskit/modal-dialog@5.2.8
  - @atlaskit/item@7.0.8
  - @atlaskit/avatar-group@1.0.2

## 74.0.7
- [patch] FS-2092  add mention typeahead cancel analytics event [40bd3fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/40bd3fb)
- [none] Updated dependencies [40bd3fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/40bd3fb)
  - @atlaskit/mention@13.1.6

## 74.0.6
- [patch] Updated dependencies [9a1b6a2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9a1b6a2)
  - @atlaskit/media-card@29.1.9
  - @atlaskit/editor-common@11.4.2

## 74.0.5
- [patch] Refactor Panel Plugin [0bdfa19](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0bdfa19)
- [none] Updated dependencies [0bdfa19](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0bdfa19)

## 74.0.4
- [patch] ED-1718: improve lists styles [570c4fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/570c4fb)
- [none] Updated dependencies [570c4fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/570c4fb)

## 74.0.3
- [patch] ED-4851: merge hover selection with main plugin [7eb5bdf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7eb5bdf)
- [none] Updated dependencies [7eb5bdf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7eb5bdf)

## 74.0.2
- [patch] Fix analytics wrapper [dc40093](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc40093)
- [none] Updated dependencies [dc40093](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc40093)

## 74.0.1
- [patch] ED-4964: refactor lists state [81f1a95](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/81f1a95)
- [none] Updated dependencies [81f1a95](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/81f1a95)

## 74.0.0
- [major] Remove deprecated APIs [af0cde6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af0cde6)
- [none] Updated dependencies [af0cde6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af0cde6)
  - @atlaskit/editor-test-helpers@4.2.2
  - @atlaskit/editor-markdown-transformer@1.2.7
  - @atlaskit/editor-json-transformer@3.1.7
  - @atlaskit/editor-bitbucket-transformer@3.2.8

## 73.10.0
- [minor] New floating toolbar plugin [d3cedbd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d3cedbd)
- [none] Updated dependencies [d3cedbd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d3cedbd)

## 73.9.29

- [patch] Revert usage of createPortal in favour of unstable_renderSubtreeIntoContainer to improve perf [d520a6f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d520a6f)
- [none] Updated dependencies [40095d6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/40095d6)
- [none] Updated dependencies [d520a6f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d520a6f)

## 73.9.28
- [patch] Updated dependencies [17b638b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/17b638b)
  - @atlaskit/editor-common@11.3.14
  - @atlaskit/renderer@18.2.13

## 73.9.27
- [patch] ED-4420: added unsupported nodes [f33ac3c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f33ac3c)
- [none] Updated dependencies [f33ac3c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f33ac3c)
  - @atlaskit/editor-common@11.3.13

## 73.9.26


- [patch] Updated dependencies [8c711bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c711bd)
  - @atlaskit/media-picker@9.0.0
  - @atlaskit/editor-test-helpers@4.2.1
  - @atlaskit/renderer@18.2.12
  - @atlaskit/emoji@36.0.2
  - @atlaskit/editor-common@11.3.12
- [patch] Updated dependencies [42ee1ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/42ee1ea)
  - @atlaskit/media-test-helpers@14.0.6
  - @atlaskit/media-picker@9.0.0
  - @atlaskit/media-filmstrip@9.0.7
  - @atlaskit/media-core@21.0.0
  - @atlaskit/emoji@36.0.2
  - @atlaskit/editor-common@11.3.12
  - @atlaskit/media-card@29.1.8
  - @atlaskit/renderer@18.2.12
  - @atlaskit/editor-test-helpers@4.2.1

## 73.9.25
- [patch] remove all the empty lines after last valid doc [a877895](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a877895)
- [none] Updated dependencies [a877895](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a877895)
  - @atlaskit/editor-bitbucket-transformer@3.2.7

## 73.9.24
- [patch] Ensure mention state changes are notified on changes via applyTr [13d423c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/13d423c)
- [none] Updated dependencies [13d423c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/13d423c)

## 73.9.23
- [patch] Fixing the cursor disappear issue for Mobile [8c0ee26](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c0ee26)
- [none] Updated dependencies [8c0ee26](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c0ee26)

## 73.9.22
- [patch] Fixing the empty list copy [0955a27](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0955a27)
- [none] Updated dependencies [0955a27](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0955a27)

## 73.9.21
- [patch] Export QuickInsert types [912c8ae](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/912c8ae)
- [none] Updated dependencies [912c8ae](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/912c8ae)

## 73.9.20
- [patch] ED-4912: move styles to plugins [623b406](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/623b406)
- [none] Updated dependencies [623b406](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/623b406)

## 73.9.19
- [patch] Updated dependencies [8a01bcd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a01bcd)
  - @atlaskit/avatar@12.0.0
  - @atlaskit/media-card@29.1.7
  - @atlaskit/task-decision@7.1.10
  - @atlaskit/mention@13.1.5
  - @atlaskit/modal-dialog@5.2.7
  - @atlaskit/item@7.0.7
  - @atlaskit/avatar-group@1.0.0

## 73.9.18
- [patch] ED-5005: fix editing nested inlineExtensions inside bodiedExtensions [6fd79a8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6fd79a8)
- [none] Updated dependencies [6fd79a8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6fd79a8)

## 73.9.17
- [patch] 5012 fix quick insert char duplication [6b7f320](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6b7f320)
- [none] Updated dependencies [6b7f320](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6b7f320)

## 73.9.16
- [patch] ED-4956, add toolbar option for decision item. [c353a5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c353a5a)
- [patch] Updated dependencies [c353a5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c353a5a)

## 73.9.15
- [patch] Support markdown style horizontal rules. ED-4820 [3d33ed4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d33ed4)
- [none] Updated dependencies [3d33ed4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d33ed4)

## 73.9.14
- [patch] Track indent, deindent and language selection to gauge what is being used. ED-4865 [d511301](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d511301)
- [none] Updated dependencies [d511301](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d511301)

## 73.9.13
- [patch] Codeblocks were capturing preceeding content when started in the middle/end of a paragraph. ED-4677 [78a9e6e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/78a9e6e)
- [none] Updated dependencies [78a9e6e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/78a9e6e)

## 73.9.12
- [patch] Set overflow to auto so we're not showing scrollbars by default in code blocks. ED-4992 [19aec32](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/19aec32)
- [none] Updated dependencies [19aec32](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/19aec32)

## 73.9.11
- [patch] ED-4462, in comment editor clicking below content should create a new paragraph at bottom. [e196df9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e196df9)
- [patch] Updated dependencies [e196df9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e196df9)

## 73.9.10
- [patch] Updated dependencies [d7dca64](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7dca64)
  - @atlaskit/mention@13.1.4
  - @atlaskit/util-data-test@9.1.16
  - @atlaskit/renderer@18.2.10
  - @atlaskit/editor-common@11.3.10

## 73.9.9
- [patch] Set initial collab selection to the start of the document. ED-4759 [db5345a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/db5345a)
- [none] Updated dependencies [db5345a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/db5345a)

## 73.9.8

- [patch] [refactor] Updated paste plugin to remove old/buggy handling of specific node types. No longer have complex logic around code-block detection on paste. If PM parses it as a code-block, we respect that. [e3c6479](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e3c6479)
- [patch] [refactor] Use ParseRule->context to prevent pasting layoutColumn/layoutSections inside each other. [541341e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/541341e)
- [patch] [refactor] Use ParseRule->context to prevent nesting bodiedExtensions on paste. [fe383b4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fe383b4)
- [none] Updated dependencies [2625ade](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2625ade)
  - @atlaskit/editor-test-helpers@4.2.0
  - @atlaskit/editor-common@11.3.9
- [none] Updated dependencies [e3c6479](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e3c6479)
  - @atlaskit/editor-test-helpers@4.2.0
  - @atlaskit/editor-common@11.3.9
- [none] Updated dependencies [541341e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/541341e)
  - @atlaskit/editor-test-helpers@4.2.0
  - @atlaskit/editor-common@11.3.9
- [none] Updated dependencies [fe383b4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fe383b4)
  - @atlaskit/editor-test-helpers@4.2.0
  - @atlaskit/editor-common@11.3.9

## 73.9.7
- [patch] Fixing extension breakout on edit [91c015e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/91c015e)
- [none] Updated dependencies [91c015e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/91c015e)

## 73.9.6
- [patch] ED-4927: disable gap cursor for lists [1bdae46](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bdae46)
- [none] Updated dependencies [1bdae46](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bdae46)

## 73.9.5
- [patch] Updated dependencies [8d5053e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8d5053e)
  - @atlaskit/media-picker@8.1.6
  - @atlaskit/emoji@36.0.1
  - @atlaskit/util-data-test@9.1.15
  - @atlaskit/task-decision@7.1.8
  - @atlaskit/mention@13.1.3
  - @atlaskit/renderer@18.2.9
  - @atlaskit/editor-json-transformer@3.1.5
  - @atlaskit/editor-bitbucket-transformer@3.2.6
  - @atlaskit/editor-common@11.3.8
  - @atlaskit/editor-test-helpers@4.1.9
  - @atlaskit/editor-markdown-transformer@1.2.6

## 73.9.4
- [patch] Updated dependencies [eee2d45](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eee2d45)
  - @atlaskit/code@6.0.0
  - @atlaskit/renderer@18.2.8
  - @atlaskit/logo@8.1.3
  - @atlaskit/docs@4.2.1

## 73.9.3
- [patch] Dismiss quick insert type ahead if query starts with a space [ffee2ef](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ffee2ef)
- [none] Updated dependencies [ffee2ef](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ffee2ef)

## 73.9.2
- [patch] Updated dependencies [0cf2f52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0cf2f52)
  - @atlaskit/emoji@36.0.0
  - @atlaskit/util-data-test@9.1.14
  - @atlaskit/task-decision@7.1.7
  - @atlaskit/mention@13.1.2
  - @atlaskit/renderer@18.2.7
  - @atlaskit/editor-json-transformer@3.1.4
  - @atlaskit/editor-bitbucket-transformer@3.2.5
  - @atlaskit/editor-test-helpers@4.1.8
  - @atlaskit/editor-markdown-transformer@1.2.5
  - @atlaskit/editor-common@11.3.7

## 73.9.1

- [patch] ED-3801: fix table typing performance [e70bf05](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e70bf05)
- [none] Updated dependencies [216b20d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/216b20d)
  - @atlaskit/icon@12.5.1
- [none] Updated dependencies [e70bf05](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e70bf05)

## 73.9.0
- [minor] Add QuickInsert provider [948e6e1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/948e6e1)
- [none] Updated dependencies [948e6e1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/948e6e1)

## 73.8.22
- [patch] ED-4971, ED-4852: fix gap cursor and number column styles [10cc9e1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/10cc9e1)
- [none] Updated dependencies [10cc9e1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/10cc9e1)

## 73.8.21
- [patch] ED-4974: fix updating tableNode in table plugin state [ca61638](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ca61638)
- [none] Updated dependencies [ca61638](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ca61638)

## 73.8.20
- [patch] Make code blocks and actions have opaque backgrounds [5b79a19](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5b79a19)
- [patch] ED-4641, fix issue in splitting merged cell when cursor is inside cell but cell is not selected. [d708792](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d708792)
- [patch] Updated dependencies [5b79a19](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5b79a19)
  - @atlaskit/task-decision@7.1.6
- [patch] Updated dependencies [d708792](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d708792)
  - @atlaskit/task-decision@7.1.6

## 73.8.19
- [patch] Updated dependencies [c57e9c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c57e9c1)
  - @atlaskit/media-test-helpers@14.0.4
  - @atlaskit/media-filmstrip@9.0.5
  - @atlaskit/media-card@29.1.5
  - @atlaskit/editor-common@11.3.5
  - @atlaskit/emoji@35.1.4
  - @atlaskit/renderer@18.2.6
  - @atlaskit/editor-test-helpers@4.1.7
  - @atlaskit/media-picker@8.1.4
  - @atlaskit/media-core@20.0.0

## 73.8.18
- [patch] Fix test [0973ab5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0973ab5)
- [patch] Remove parenthesis from action tooltips [1b1eea7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b1eea7)
- [none] Updated dependencies [0973ab5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0973ab5)
- [patch] Updated dependencies [1b1eea7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b1eea7)

## 73.8.17
- [patch] ED-4923: stop table columns and selection resetting on toolbar actions [56fa89e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/56fa89e)
- [none] Updated dependencies [56fa89e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/56fa89e)

## 73.8.16
- [patch] Fixing the cursor navigation between inline nodes [b9e3213](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b9e3213)
- [none] Updated dependencies [b9e3213](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b9e3213)
  - @atlaskit/editor-common@11.3.3

## 73.8.15
- [patch] Fix issue where clicking on table controls inside an editor in a form, would submit the form (ED-4744) [5cd03c5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5cd03c5)
- [none] Updated dependencies [5cd03c5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5cd03c5)

## 73.8.14
- [patch] ED-4909: fix overflow shadow rendering + visual resize performance on tables [69a8c78](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69a8c78)
- [none] Updated dependencies [69a8c78](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69a8c78)

## 73.8.13
- [patch] ED-4736, fix size of font in inline code mark in editor core. [9b80e35](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9b80e35)
- [patch] Updated dependencies [9b80e35](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9b80e35)

## 73.8.12
- [patch] Added support for blocks and lists [b5a920b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5a920b)
- [none] Updated dependencies [b5a920b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5a920b)

## 73.8.11
- [patch] Introduce regression tests for pasting content from 3rd-party vendors into the editor. `dispatchPasteEvent` now returns the event that was fired when successful, to allow consumers to tell whether it was modified by ProseMirror. (ED-3726) [e358e9f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e358e9f)
- [none] Updated dependencies [e358e9f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e358e9f)
  - @atlaskit/editor-test-helpers@4.1.6

## 73.8.10
- [patch] ED-4520, date renderer should render UTC value of date. [28e3c31](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/28e3c31)
- [patch] Updated dependencies [28e3c31](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/28e3c31)
  - @atlaskit/editor-common@11.3.2

## 73.8.9
- [patch] ED-4750, adding information to help dialog. [a3f696c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a3f696c)
- [patch] Updated dependencies [a3f696c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a3f696c)

## 73.8.8
- [patch] Updated dependencies [cdba8b3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cdba8b3)
  - @atlaskit/spinner@8.0.0
  - @atlaskit/media-picker@8.1.3
  - @atlaskit/media-card@29.1.4
  - @atlaskit/task-decision@7.1.3
  - @atlaskit/emoji@35.1.2
  - @atlaskit/droplist@6.2.1
  - @atlaskit/button@8.2.3

## 73.8.7
- [patch] ED-4924: fix table control styles [377ebeb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/377ebeb)
- [none] Updated dependencies [377ebeb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/377ebeb)
  - @atlaskit/editor-common@11.3.1

## 73.8.6
- [patch] Remove pinned prosemirror-model@1.4.0 and move back to caret ranges for prosemirror-model@^1.5.0 [4faccc0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4faccc0)
- [patch] Updated dependencies [4faccc0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4faccc0)
  - @atlaskit/renderer@18.2.5
  - @atlaskit/task-decision@7.1.2
  - @atlaskit/editor-common@11.3.0
  - @atlaskit/editor-test-helpers@4.1.5
  - @atlaskit/editor-markdown-transformer@1.2.4
  - @atlaskit/editor-json-transformer@3.1.3
  - @atlaskit/editor-bitbucket-transformer@3.2.4

## 73.8.5
- [patch] Bump prosemirror-markdown to 1.1.0 and treat new lines when pasting as <br> [5c28782](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5c28782)
- [none] Updated dependencies [5c28782](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5c28782)
  - @atlaskit/editor-markdown-transformer@1.2.3
  - @atlaskit/editor-bitbucket-transformer@3.2.3

## 73.8.4
- [patch] ED-4803, it should be possible to create nested rule. [9b25a8e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9b25a8e)
- [patch] Updated dependencies [9b25a8e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9b25a8e)

## 73.8.3
- [patch] Bump prosemirror-view to 1.3.3 to fix issue where newlines in code-blocks would vanish in IE11. (ED-4830) [fc5a082](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc5a082)
- [none] Updated dependencies [fc5a082](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc5a082)
  - @atlaskit/editor-test-helpers@4.1.4
  - @atlaskit/editor-common@11.2.10

## 73.8.2



- [patch] Updated dependencies [74a0d46](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/74a0d46)
  - @atlaskit/media-card@29.1.3
  - @atlaskit/media-filmstrip@9.0.4
  - @atlaskit/renderer@18.2.3
  - @atlaskit/editor-common@11.2.8
- [patch] Updated dependencies [6c6f078](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6c6f078)
  - @atlaskit/media-card@29.1.3
  - @atlaskit/media-filmstrip@9.0.4
  - @atlaskit/renderer@18.2.3
  - @atlaskit/editor-common@11.2.8
- [patch] Updated dependencies [5bb26b4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5bb26b4)
  - @atlaskit/media-card@29.1.3
  - @atlaskit/media-filmstrip@9.0.4
  - @atlaskit/renderer@18.2.3
  - @atlaskit/editor-common@11.2.8

## 73.8.1
- [patch] ED-4744, ED-4749: autoinserts break other inline marks. [34b660c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/34b660c)
- [none] Updated dependencies [34b660c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/34b660c)

## 73.8.0
- [minor] Design updates for /QuickInsert™️ menu [4e4825e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e4825e)
- [none] Updated dependencies [4e4825e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e4825e)
  - @atlaskit/editor-common@11.2.6

## 73.7.12
- [patch] ED-4899 fix finding parent node for popups (specifically hyperlink) in IE11 [b801e42](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b801e42)
- [none] Updated dependencies [b801e42](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b801e42)

## 73.7.11
- [patch] Add Table breakout mode in renderer [0d3b375](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0d3b375)
- [none] Updated dependencies [0d3b375](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0d3b375)
  - @atlaskit/renderer@18.2.1
  - @atlaskit/editor-common@11.2.5

## 73.7.10
- [patch] ED-4846,ED-4816: refactor tables [269abf0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/269abf0)
- [none] Updated dependencies [269abf0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/269abf0)

## 73.7.9
- [patch] Do not call render inside a constructor of a ReactNodeView [7e60aa8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e60aa8)
- [none] Updated dependencies [7e60aa8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e60aa8)

## 73.7.8
- [patch] ED-4489 Fix can't submit with enter using Korean and Japanese IME [0274524](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0274524)
- [none] Updated dependencies [0274524](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0274524)
  - @atlaskit/editor-test-helpers@4.1.3
  - @atlaskit/editor-common@11.2.3

## 73.7.7
- [patch] Fixing extension select and refactor [eca44eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eca44eb)
- [none] Updated dependencies [eca44eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eca44eb)
  - @atlaskit/editor-common@11.2.2

## 73.7.6
- [patch] Add name field to make getInitial happy [e267dc7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e267dc7)
- [patch] Update telepointer test cases [2644031](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2644031)
- [patch] Ghost telepointer fix by checking participants [eee943d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eee943d)
- [none] Updated dependencies [e267dc7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e267dc7)
- [none] Updated dependencies [2644031](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2644031)
- [none] Updated dependencies [eee943d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eee943d)

## 73.7.5
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/media-card@29.1.2
  - @atlaskit/media-picker@8.1.2
  - @atlaskit/emoji@35.1.1
  - @atlaskit/util-data-test@9.1.13
  - @atlaskit/task-decision@7.1.1
  - @atlaskit/mention@13.1.1
  - @atlaskit/editor-json-transformer@3.1.2
  - @atlaskit/editor-bitbucket-transformer@3.2.2
  - @atlaskit/media-filmstrip@9.0.3
  - @atlaskit/renderer@18.1.2
  - @atlaskit/editor-test-helpers@4.1.2
  - @atlaskit/editor-markdown-transformer@1.2.2
  - @atlaskit/editor-common@11.2.1
  - @atlaskit/media-test-helpers@14.0.3
  - @atlaskit/media-core@19.1.3
  - @atlaskit/tooltip@10.2.1
  - @atlaskit/select@4.2.3
  - @atlaskit/modal-dialog@5.2.2
  - @atlaskit/button@8.1.2
  - @atlaskit/theme@4.0.4
  - @atlaskit/lozenge@5.0.4
  - @atlaskit/code@5.0.4
  - @atlaskit/size-detector@4.1.2
  - @atlaskit/layer@4.0.3
  - @atlaskit/spinner@7.0.2
  - @atlaskit/logo@8.1.2
  - @atlaskit/calendar@6.1.2
  - @atlaskit/layer-manager@4.2.1
  - @atlaskit/item@7.0.5
  - @atlaskit/icon@12.1.2
  - @atlaskit/droplist@6.1.2

## 73.7.4
- [patch] ED-4654 add minimum 128px column width to tables [6ee43d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6ee43d8)
- [none] Updated dependencies [6ee43d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6ee43d8)
  - @atlaskit/editor-common@11.2.0

## 73.7.3
- [patch] ED-4840: bump pm-utils to 0.5.1 [37992bf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/37992bf)
- [none] Updated dependencies [37992bf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/37992bf)

## 73.7.2
- [patch] ED-4438, text from google docs should not be pasted as inline code. [2a0fd85](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2a0fd85)
- [patch] Updated dependencies [2a0fd85](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2a0fd85)

## 73.7.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/media-card@29.1.1
  - @atlaskit/media-picker@8.1.1
  - @atlaskit/util-data-test@9.1.12
  - @atlaskit/editor-json-transformer@3.1.1
  - @atlaskit/editor-bitbucket-transformer@3.2.1
  - @atlaskit/media-filmstrip@9.0.2
  - @atlaskit/renderer@18.1.1
  - @atlaskit/editor-test-helpers@4.1.1
  - @atlaskit/editor-markdown-transformer@1.2.1
  - @atlaskit/editor-common@11.1.2
  - @atlaskit/media-test-helpers@14.0.2
  - @atlaskit/media-core@19.1.2
  - @atlaskit/theme@4.0.3
  - @atlaskit/layer-manager@4.1.1
  - @atlaskit/spinner@7.0.1
  - @atlaskit/select@4.2.1
  - @atlaskit/modal-dialog@5.1.1
  - @atlaskit/lozenge@5.0.3
  - @atlaskit/item@7.0.4
  - @atlaskit/icon@12.1.1
  - @atlaskit/logo@8.1.1
  - @atlaskit/droplist@6.1.1
  - @atlaskit/code@5.0.3
  - @atlaskit/calendar@6.1.1
  - @atlaskit/button@8.1.1
  - @atlaskit/avatar@11.1.1
  - @atlaskit/docs@4.1.1
  - @atlaskit/size-detector@4.1.1
  - @atlaskit/layer@4.0.2
  - @atlaskit/analytics@3.0.5

## 73.7.0
- [minor] Introduce support for Tab / Shift-Tab to indent / unindent text in a code block (ED-4638) [e6df77b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e6df77b)
- [none] Updated dependencies [e6df77b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e6df77b)

## 73.6.2
- [patch] ED-4856: fix resize border in Firefox [b8577e7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b8577e7)
- [none] Updated dependencies [b8577e7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b8577e7)

## 73.6.1
- [patch] Fix issue where mentions were not selectable in IE11 [2126e1e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2126e1e)
- [none] Updated dependencies [2126e1e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2126e1e)

## 73.6.0
- [minor] ED-3474 add redesigned table numbering column, fix table styling regressions [1bef41a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bef41a)
- [none] Updated dependencies [1bef41a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bef41a)
  - @atlaskit/editor-common@11.1.1

## 73.5.2
- [patch] WIP [57d5f4a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/57d5f4a)
- [none] Updated dependencies [57d5f4a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/57d5f4a)

## 73.5.1
- [patch] ED-4816: fix removing columns/rows when outside of the content area [789e640](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/789e640)
- [none] Updated dependencies [789e640](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/789e640)

## 73.5.0
- [patch] Set selection at the start of the document when editing a document in the full-page appearance. (ED-4759) [7217164](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7217164)
- [none] Updated dependencies [7217164](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7217164)
  - @atlaskit/editor-test-helpers@4.1.0
  - @atlaskit/renderer@18.1.0
  - @atlaskit/task-decision@7.1.0
  - @atlaskit/util-data-test@9.1.11
  - @atlaskit/mention@13.1.0
  - @atlaskit/emoji@35.1.0
  - @atlaskit/editor-common@11.1.0
  - @atlaskit/editor-markdown-transformer@1.2.0
  - @atlaskit/editor-json-transformer@3.1.0
  - @atlaskit/editor-bitbucket-transformer@3.2.0

## 73.4.7
- [patch] Updated dependencies [2de7ce7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2de7ce7)
  - @atlaskit/media-card@29.0.3
  - @atlaskit/renderer@18.0.4
  - @atlaskit/editor-common@11.0.7

## 73.4.6
- [patch] Fix a regression in task-decision in editor after NodeView's PR [b7a4fd5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b7a4fd5)
- [none] Updated dependencies [b7a4fd5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b7a4fd5)

## 73.4.5
- [patch] Fixes the image toolbar [05f69d1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/05f69d1)
- [none] Updated dependencies [05f69d1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/05f69d1)

## 73.4.4
- [patch] Update and lock prosemirror-model version to 1.4.0 [febf753](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febf753)
- [none] Updated dependencies [febf753](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febf753)
  - @atlaskit/renderer@18.0.3
  - @atlaskit/editor-common@11.0.6
  - @atlaskit/editor-test-helpers@4.0.7
  - @atlaskit/editor-markdown-transformer@1.1.1
  - @atlaskit/editor-json-transformer@3.0.11
  - @atlaskit/editor-bitbucket-transformer@3.1.7

## 73.4.3
- [patch] Adding breakout to extensions [3d1b0ab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d1b0ab)
- [none] Updated dependencies [3d1b0ab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d1b0ab)
  - @atlaskit/editor-test-helpers@4.0.6
  - @atlaskit/editor-common@11.0.5

## 73.4.2
- [patch] Fix issue where clicking over empty space in a code-block would not select the end of the line. ED-4637 [8120815](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8120815)
- [patch] Code-block toolbar refactored to rely less on view state. This also fixes issues with the code-block in IE11. [9249525](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9249525)
- [none] Updated dependencies [8120815](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8120815)
- [none] Updated dependencies [9249525](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9249525)

## 73.4.1
- [patch] Fix issue where mention-picker when two users would have a mention picker open at the same time in collaborative editing. [5974137](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5974137)
- [none] Updated dependencies [5974137](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5974137)

## 73.4.0
- [minor] ED-4657: unbreak table copy-paste [38b5ce7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/38b5ce7)
- [none] Updated dependencies [38b5ce7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/38b5ce7)

## 73.3.10
- [patch] ED-4823: added card provider [583ae09](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/583ae09)
- [none] Updated dependencies [583ae09](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/583ae09)
  - @atlaskit/editor-test-helpers@4.0.5

## 73.3.9
- [patch] Adds support for auto-closing brackets inside code-blocks [9d69d58](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d69d58)
- [none] Updated dependencies [9d69d58](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d69d58)

## 73.3.8
- [patch] Fix onComponentUpdate sometimes being undefined in tables node views [57225fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/57225fd)
- [none] Updated dependencies [57225fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/57225fd)

## 73.3.7
- [patch] ED-4818: add inlineCard to schema [a303cbd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a303cbd)
- [none] Updated dependencies [a303cbd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a303cbd)
  - @atlaskit/editor-test-helpers@4.0.4
  - @atlaskit/editor-common@11.0.4

## 73.3.6
- [patch] Fix PortalProvider performance [a157f3b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a157f3b)
- [none] Updated dependencies [a157f3b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a157f3b)

## 73.3.5
- [patch] ED-4722, fix for mention and emoji floating toolbar hidden behind table floating toolbar. [a13c9f5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a13c9f5)
- [patch] Updated dependencies [a13c9f5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a13c9f5)

## 73.3.4
- [patch] SDK-5812 Fix unsupported content after editing media only doc [25baf0a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25baf0a)
- [none] Updated dependencies [25baf0a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25baf0a)

## 73.3.3
- [patch] ED-4758, fix for confluence issue media single toolbar not visible for saved media. [730b047](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/730b047)
- [patch] Updated dependencies [730b047](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/730b047)

## 73.3.2
- [patch] Updated dependencies [823caef](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/823caef)
  - @atlaskit/media-card@29.0.2
  - @atlaskit/renderer@18.0.2
  - @atlaskit/editor-common@11.0.3

## 73.3.1
- [patch] Convert special/smart subtitution characters back to the plain-text ascii counterparts when formatted in inline-code (ED-4635) [76fdbf3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76fdbf3)
- [none] Updated dependencies [76fdbf3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76fdbf3)

## 73.3.0
- [minor] Pass context to node views [e3d2802](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e3d2802)
- [none] Updated dependencies [e3d2802](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e3d2802)

## 73.2.0
- [minor] Updated dependencies [cad95fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cad95fa)
  - @atlaskit/editor-markdown-transformer@1.1.0

## 73.1.4
- [patch] Updated dependencies [732d2f5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/732d2f5)
  - @atlaskit/media-card@29.0.1
  - @atlaskit/renderer@18.0.1
  - @atlaskit/editor-common@11.0.2

## 73.1.3
- [patch] ED-4799, fixing vertical alignment of separators in toolbar. [4146e4f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4146e4f)
- [patch] Updated dependencies [4146e4f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4146e4f)

## 73.1.2
- [patch] ED-4190, fix for scroll of editor to top when adding date or clicking date. [90ece93](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/90ece93)
- [patch] Updated dependencies [90ece93](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/90ece93)

## 73.1.1
- [patch] ED-4742: fix removing rows inside bodied ext [4ad8738](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4ad8738)
- [none] Updated dependencies [4ad8738](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4ad8738)

## 73.1.0
- [minor] Add support for indent/outdenting text inside a code-block via the `Mod-[` / `Mod-]` shortcuts. `Enter` will now persist the indentation of the previous line, and `Tab` will insert the appropriate indentation. This can be enabled via the `enableKeybindingsForIDE` option that can now be passed through to `allowCodeBlocks` option. This is hidden behind an option only until we are confident with the implementation, at which point it will likely become default behaviour. [ED-4638] [c02281b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c02281b)
- [none] Updated dependencies [c02281b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c02281b)

## 73.0.1
- [patch] ED-4716, smart replacements should not work inside mention query. [a5c5a5e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a5c5a5e)
- [patch] Updated dependencies [a5c5a5e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a5c5a5e)

## 73.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/media-card@29.0.0
  - @atlaskit/media-picker@8.0.0
  - @atlaskit/emoji@35.0.7
  - @atlaskit/util-data-test@9.1.10
  - @atlaskit/task-decision@7.0.0
  - @atlaskit/mention@13.0.0
  - @atlaskit/editor-json-transformer@3.0.9
  - @atlaskit/editor-bitbucket-transformer@3.1.4
  - @atlaskit/media-filmstrip@9.0.0
  - @atlaskit/renderer@18.0.0
  - @atlaskit/editor-test-helpers@4.0.3
  - @atlaskit/editor-markdown-transformer@1.0.0
  - @atlaskit/editor-common@11.0.0
  - @atlaskit/media-test-helpers@14.0.0
  - @atlaskit/media-core@19.0.0
  - @atlaskit/tooltip@10.0.0
  - @atlaskit/layer-manager@4.0.0
  - @atlaskit/modal-dialog@5.0.0
  - @atlaskit/item@7.0.0
  - @atlaskit/icon@12.0.0
  - @atlaskit/single-select@5.0.0
  - @atlaskit/logo@8.0.0
  - @atlaskit/calendar@6.0.0
  - @atlaskit/button@8.0.0
  - @atlaskit/theme@4.0.0
  - @atlaskit/lozenge@5.0.0
  - @atlaskit/code@5.0.0
  - @atlaskit/spinner@6.0.0
  - @atlaskit/docs@4.0.0
  - @atlaskit/size-detector@4.0.0
  - @atlaskit/layer@4.0.0
  - @atlaskit/analytics@3.0.2
  - @atlaskit/droplist@6.0.0
  - @atlaskit/avatar@11.0.0

## 72.2.5
- [patch] SPS-426 Fix editing action, decision and media in FF [ab783c5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab783c5)
- [none] Updated dependencies [ab783c5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab783c5)

## 72.2.4
- [patch] ED-4714: fix table jumping on hover over resize handles [b52a82e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b52a82e)
- [none] Updated dependencies [b52a82e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b52a82e)

## 72.2.3
- [patch] Fix Code Block appearance showing gray border in IE (ED-4766) [5e1313c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5e1313c)
- [none] Updated dependencies [5e1313c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5e1313c)

## 72.2.2
- [patch] Updated dependencies [1c87e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c87e5a)
  - @atlaskit/media-card@28.0.6
  - @atlaskit/media-picker@7.0.6
  - @atlaskit/emoji@35.0.6
  - @atlaskit/util-data-test@9.1.9
  - @atlaskit/task-decision@6.0.9
  - @atlaskit/mention@12.0.3
  - @atlaskit/editor-json-transformer@3.0.8
  - @atlaskit/editor-bitbucket-transformer@3.1.3
  - @atlaskit/media-filmstrip@8.0.9
  - @atlaskit/renderer@17.0.9
  - @atlaskit/editor-test-helpers@4.0.2
  - @atlaskit/editor-markdown-transformer@0.2.23
  - @atlaskit/editor-common@10.1.9

## 72.2.1
- [patch] Updated dependencies [5ee48c4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ee48c4)
  - @atlaskit/media-picker@7.0.5
  - @atlaskit/emoji@35.0.5
  - @atlaskit/editor-common@10.1.8
  - @atlaskit/media-core@18.1.2

## 72.2.0
- [minor] Quick Insert menu for internal editor things [370344f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/370344f)
- [none] Updated dependencies [370344f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/370344f)
  - @atlaskit/editor-common@10.1.7

## 72.1.17
- [patch] ED-4765 fix bad import with @atlastkit/theme, restores divider styling [5c7f741](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5c7f741)
- [none] Updated dependencies [5c7f741](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5c7f741)

## 72.1.16
- [patch] ED-4727, selection not set correctly when creating task item from toolbar. [c5d64df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c5d64df)
- [patch] Updated dependencies [c5d64df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c5d64df)

## 72.1.15
- [patch] ED-4582, fix for hyperlink floating toolbar not closing in bitbucket even after content is saved. [899b395](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/899b395)
- [patch] Updated dependencies [899b395](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/899b395)

## 72.1.14
- [patch] ED-4768 handle null ref callback on full-page scroll container [73bff15](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/73bff15)
- [none] Updated dependencies [73bff15](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/73bff15)

## 72.1.13
- [patch] Fix issue where Code Block numbering would be mis-aligned in Firefox [6436efd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6436efd)
- [none] Updated dependencies [6436efd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6436efd)

## 72.1.12
- [patch] ED-4715, fix for weird borders around toolbar in full page editor. [942b5f1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/942b5f1)
- [patch] Updated dependencies [942b5f1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/942b5f1)

## 72.1.11
- [patch] Fixes the unncessary copy of private attributes to media node [154535b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/154535b)
- [none] Updated dependencies [154535b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/154535b)

## 72.1.10
- [patch] Fixing the extension title [04b010d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/04b010d)
- [none] Updated dependencies [04b010d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/04b010d)

## 72.1.9
- [patch] Updated dependencies [35d547f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d547f)
  - @atlaskit/media-card@28.0.5
  - @atlaskit/renderer@17.0.8
  - @atlaskit/editor-common@10.1.4

## 72.1.8
- [patch] Updated dependencies [639ae5e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/639ae5e)
  - @atlaskit/mention@12.0.2
  - @atlaskit/util-data-test@9.1.7
  - @atlaskit/renderer@17.0.4
  - @atlaskit/editor-common@10.1.1

## 72.1.7
- [patch] ED-3180 unify scroll styles with Atlaskit style [49b2c12](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49b2c12)
- [none] Updated dependencies [49b2c12](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49b2c12)

## 72.1.6
- [patch]  [f87724e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f87724e)
- [none] Updated dependencies [f87724e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f87724e)
  - @atlaskit/media-test-helpers@13.0.2
  - @atlaskit/task-decision@6.0.8
  - @atlaskit/mention@12.0.1
  - @atlaskit/media-picker@7.0.3
  - @atlaskit/media-filmstrip@8.0.8
  - @atlaskit/media-card@28.0.4

## 72.1.5
- [patch] Fix toolbar alignment being incorrectly offset due to the change in the Code Block UI [ED-4637] [6db7a9f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6db7a9f)
- [none] Updated dependencies [6db7a9f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6db7a9f)

## 72.1.4
- [patch] Fixing the toolbar for extensions [ef9ccca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef9ccca)
- [none] Updated dependencies [ef9ccca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef9ccca)
  - @atlaskit/editor-test-helpers@4.0.1

## 72.1.3
- [patch] Fixing up the paste of images  [3ab13a5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3ab13a5)
- [none] Updated dependencies [3ab13a5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3ab13a5)

## 72.1.2
- [patch] FS-1206 remove AtlassianEmojiMigrationResource [0edc6c8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0edc6c8)
- [none] Updated dependencies [0edc6c8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0edc6c8)
  - @atlaskit/emoji@35.0.3
  - @atlaskit/renderer@17.0.3

## 72.1.1
- [patch] ED-4696, fixing adding multiple task items from toolbar button. [9b54e67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9b54e67)
- [patch] Updated dependencies [9b54e67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9b54e67)

## 72.1.0
- [minor] The code block UI component has been updated to the latest design. It now has line numbers and corrected padding. 🎉 [6945723](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6945723)
- [none] Updated dependencies [6945723](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6945723)

## 72.0.7
- [patch] Updated dependencies [758b342](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/758b342)
  - @atlaskit/task-decision@6.0.7
  - @atlaskit/renderer@17.0.2

## 72.0.6
- [none] Updated dependencies [ba702bc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ba702bc)
  - @atlaskit/mention@12.0.0
  - @atlaskit/util-data-test@9.1.6
  - @atlaskit/renderer@17.0.1
  - @atlaskit/editor-common@10.0.3

## 72.0.5
- [patch] ED-4221 Fix toolbar style inconsistencies [f3fb6b8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f3fb6b8)
- [none] Updated dependencies [f3fb6b8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f3fb6b8)
  - @atlaskit/editor-common@10.0.2

## 72.0.4
- [patch] FS-1904 add support for emoji with ascii starting with ( [c83d567](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c83d567)
- [none] Updated dependencies [c83d567](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c83d567)
  - @atlaskit/util-data-test@9.1.5
  - @atlaskit/emoji@35.0.2

## 72.0.3
- [patch] Addding the file swap in processing state [ed40161](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ed40161)
- [none] Updated dependencies [ed40161](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ed40161)

## 72.0.2
- [patch] ED-4652, fixing issue with input of multiple * in editor. [b026738](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b026738)
- [patch] Updated dependencies [b026738](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b026738)

## 72.0.1
- [patch] Updated dependencies [bd26d3c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bd26d3c)
  - @atlaskit/media-picker@7.0.1
  - @atlaskit/emoji@35.0.1
  - @atlaskit/editor-common@10.0.1
  - @atlaskit/media-core@18.1.1
  - @atlaskit/media-test-helpers@13.0.1
  - @atlaskit/media-card@28.0.1

## 72.0.0
- [patch] ED-4087: fix table controls in IE11 [febc44d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febc44d)

- [major] media-picker: <All but popup picker>.emitUploadEnd second argument shape has changed from MediaFileData to FileDetails; `upload-end` event payload body shape changed from MediaFileData to FileDetails; All the media pickers config now have new property `useNewUploadService: boolean` (false by default); popup media-picker .cancel can't be called with no argument, though types does allow for it; `File` is removed; --- media-store: MediaStore.createFile now has a required argument of type MediaStoreCreateFileParams; MediaStore.copyFileWithToken new method; uploadFile method result type has changed from just a promise to a UploadFileResult type; --- media-test-helpers: mediaPickerAuthProvider argument has changed from a component instance to just a boolean authEnvironment; [84f6f91](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/84f6f91)

- [none] Updated dependencies [febc44d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febc44d)
  - @atlaskit/editor-test-helpers@4.0.0
  - @atlaskit/renderer@17.0.0
  - @atlaskit/task-decision@6.0.6
  - @atlaskit/util-data-test@9.1.4
  - @atlaskit/emoji@35.0.0
  - @atlaskit/editor-common@10.0.0
  - @atlaskit/editor-markdown-transformer@0.2.22
  - @atlaskit/editor-json-transformer@3.0.7
  - @atlaskit/editor-bitbucket-transformer@3.1.1

## 71.4.7
- [patch] ED-2400: only show fullpage toolbar border on scroll [a01cad0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a01cad0)
- [patch] Updated dependencies [a01cad0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a01cad0)

## 71.4.6
- [patch] ED-4647, table should be highlighted in red when hovering over delete icon. [7814224](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7814224)
- [patch] Updated dependencies [7814224](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7814224)

## 71.4.5
- [patch] ED-4520, Date lozenge should save UTC timestamp value. [ee98470](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ee98470)
- [patch] Updated dependencies [ee98470](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ee98470)

## 71.4.4
- [patch] SPS-1155: enable action mark with allowInlineAction flag [db6e13a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/db6e13a)
- [none] Updated dependencies [db6e13a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/db6e13a)

## 71.4.3
- [patch] ED-4643: added support for "wide" layout for tables [8c146ee](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c146ee)
- [none] Updated dependencies [8c146ee](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c146ee)
  - @atlaskit/editor-common@9.3.10

## 71.4.2
- [patch] Allow disabling smart-autocompletion (capitalising of Atlassian products, em-dash insert, smart-quotes) via prop `textFormatting={{ disableSmartAutoCompletion: true }}` [cee7a4a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cee7a4a)
- [none] Updated dependencies [cee7a4a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cee7a4a)
  - @atlaskit/editor-test-helpers@3.1.9

## 71.4.1
- [patch] Fix broken custom dropzone example [c49c76b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c49c76b)
- [none] Updated dependencies [c49c76b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c49c76b)

## 71.4.0
- [minor] Support external media in bitbucket transformer and image uploader [8fd4dd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8fd4dd1)

- [patch] Prevent breakout-mode inside of page layouts [92cdf83](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92cdf83)
- [patch] Allow removing an empty heading at the start of a document by backspacing [4151cc5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4151cc5)
- [none] Updated dependencies [8fd4dd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8fd4dd1)
  - @atlaskit/editor-test-helpers@3.1.8
  - @atlaskit/renderer@16.2.6
  - @atlaskit/task-decision@6.0.5
  - @atlaskit/util-data-test@9.1.3
  - @atlaskit/mention@11.1.4
  - @atlaskit/emoji@34.2.0
  - @atlaskit/editor-json-transformer@3.0.6
  - @atlaskit/editor-markdown-transformer@0.2.21
  - @atlaskit/editor-common@9.3.9
  - @atlaskit/editor-bitbucket-transformer@3.1.0

## 71.3.34
- [patch] ED-4087: fix table interaction in IE11 [8c5f6f9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c5f6f9)
- [none] Updated dependencies [8c5f6f9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c5f6f9)

## 71.3.33
- [patch] ED-4498: enable gap cursor for comment editor, fixed and refactored table styles [26fd3ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/26fd3ac)
- [none] Updated dependencies [26fd3ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/26fd3ac)

## 71.3.32
- [patch] ED-4591: fix paragraph alignment in comment editor [c420ef0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c420ef0)
- [none] Updated dependencies [c420ef0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c420ef0)

## 71.3.31
- [patch] ED-4629: fix replacing inline extensions [ed1eb59](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ed1eb59)
- [none] Updated dependencies [62bacf6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/62bacf6)
  - @atlaskit/theme@3.2.1
- [none] Updated dependencies [ed1eb59](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ed1eb59)

## 71.3.30
- [patch] ED-4567 add help dialog tip and undo/redo shortcuts to help dialog [a82ead4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a82ead4)
- [patch] Updated dependencies [a82ead4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a82ead4)

## 71.3.29
- [patch] ED-4606 Fix table floating toolbar [118785e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/118785e)
- [none] Updated dependencies [118785e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/118785e)

## 71.3.28
- [patch] ED-4614: fix weird toolbar buttons highlighting when page is disabled [0cd49f4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0cd49f4)
- [none] Updated dependencies [0cd49f4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0cd49f4)

## 71.3.27
- [patch] ED-4604 make headings always set, not toggle [8c88cd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c88cd1)
- [patch] Updated dependencies [8c88cd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c88cd1)

## 71.3.26
- [patch] Fix bug where code-block lines would be soft-wrapped [0d08e1a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0d08e1a)
- [none] Updated dependencies [0d08e1a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0d08e1a)

## 71.3.25
- [patch] Pasting a link will now generate a new undo step, allowing you to undo only the pasted content. Previously, if you were typing rapidly typing and then pasted content, undo would remove the pasted content AND the text you had typed before it. [c6252d2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c6252d2)

- [none] Updated dependencies [c6252d2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c6252d2)
- [none] Updated dependencies [2363d14](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2363d14)
  - @atlaskit/button@7.2.3

## 71.3.24
- [patch] Fixing the media group scroll [14c17ba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/14c17ba)
- [none] Updated dependencies [14c17ba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/14c17ba)

## 71.3.23
- [patch] Updated dependencies [82bd4c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/82bd4c6)
  - @atlaskit/editor-markdown-transformer@0.2.20

## 71.3.22
- [patch] ED-4603: fix emptyCell on Backspace [06a52c9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06a52c9)
- [none] Updated dependencies [06a52c9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06a52c9)

## 71.3.21
- [patch] Escape now closes the link toolbar when activity provider is disabled [b060a5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b060a5a)
- [none] Updated dependencies [b060a5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b060a5a)

## 71.3.20
- [patch] Fixing the hyperlink height [da3e35f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da3e35f)
- [none] Updated dependencies [da3e35f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da3e35f)

## 71.3.19
- [patch] Adding borders for colors in color picker [dc842ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc842ac)
- [none] Updated dependencies [dc842ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc842ac)
  - @atlaskit/editor-common@9.3.7

## 71.3.18
- [patch] Align font sizes for inline code, mentions and dates [d2ef1af](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d2ef1af)
- [none] Updated dependencies [d2ef1af](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d2ef1af)
  - @atlaskit/mention@11.1.2
  - @atlaskit/code@4.0.3

## 71.3.17
- [patch] Updated Tooltip format for toolbar buttons. [82ba018](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/82ba018)
- [none] Updated dependencies [82ba018](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/82ba018)

## 71.3.16
- [patch] Remove horizontal scroll in an empty table [44caac1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44caac1)
- [none] Updated dependencies [44caac1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44caac1)

## 71.3.15
- [patch] internal changes to ContentNodeView to support mocking around contentDOM in tests [d6f88f1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d6f88f1)
- [patch] Updated dependencies [d6f88f1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d6f88f1)

## 71.3.14
- [patch] ED-4628: fixed list button group styles [ca01876](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ca01876)
- [none] Updated dependencies [ca01876](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ca01876)

## 71.3.13
- [patch] ED-4152: added clear formatting to help dialog [9cc835a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9cc835a)
- [none] Updated dependencies [9cc835a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9cc835a)

## 71.3.12
- [patch] ED-4591: fix responsive toolbar alignment to match content area left padding [1ccb6e9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1ccb6e9)
- [none] Updated dependencies [1ccb6e9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1ccb6e9)

## 71.3.11
- [patch] ED-4633: updated placeholder text [498e7a2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/498e7a2)
- [none] Updated dependencies [498e7a2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/498e7a2)

## 71.3.10
- [patch] Adding nested ul support [ce87690](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ce87690)
- [none] Updated dependencies [ce87690](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ce87690)
  - @atlaskit/renderer@16.2.4

## 71.3.9
- [patch] Fixing the link dialog url heights [7268bef](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7268bef)
- [none] Updated dependencies [7268bef](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7268bef)

## 71.3.8
- [patch] Don't wrap date [759c194](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/759c194)
- [none] Updated dependencies [759c194](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/759c194)

## 71.3.7
- [patch] Fix size of delete button for code block [92b0e26](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92b0e26)
- [none] Updated dependencies [92b0e26](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92b0e26)

## 71.3.6
- [patch] Prevent link-edit dialog from jumping [5ea20fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ea20fa)
- [none] Updated dependencies [5ea20fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ea20fa)

## 71.3.5
- [patch] ED-4631: fix list padding [16ef82c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/16ef82c)
- [none] Updated dependencies [16ef82c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/16ef82c)

## 71.3.4
- [patch] FeedbackToolbar item now renders correctly in IE11. Additionally, components rendered via `primaryToolbarComponents` will now be vertically-centered in the toolbar. [02ad242](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/02ad242)
- [none] Updated dependencies [02ad242](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/02ad242)

## 71.3.3
- [patch] Disable overlay for mediaSingle [147bc84](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/147bc84)
- [none] Updated dependencies [147bc84](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/147bc84)
  - @atlaskit/renderer@16.2.3
  - @atlaskit/editor-common@9.3.6

## 71.3.2
- [patch] ED-4523 implement contexual delete [9591127](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9591127)
- [none] Updated dependencies [3ef21cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3ef21cd)
  - @atlaskit/editor-common@9.3.4
  - @atlaskit/renderer@16.2.1

## 71.3.1
- [patch] Proper cursor type for lists [2d6deaa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2d6deaa)
- [none] Updated dependencies [2d6deaa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2d6deaa)

## 71.3.0
- [minor] Set line-height based on appearance [b21cd55](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b21cd55)
- [none] Updated dependencies [b21cd55](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b21cd55)
  - @atlaskit/renderer@16.2.0

## 71.2.7
- [patch] ED-4299, fix selection after code block and code mark pasting. [72c8ecf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/72c8ecf)

## 71.2.6
- [patch] Fix issue with tables in IE with the Comment appearance where it would show a gray resize box that would interfere with the plugin causing unexpected behaviour [1a280e5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1a280e5)

## 71.2.5
- [patch] ED-4564, Replacing invite team member icon in collab editor. [bfe8ffc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bfe8ffc)

## 71.2.3
- [patch] Fix issue with Filmstrip cutting Cards [c5b18db](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c5b18db)

## 71.2.2
- [patch] Showing up title in place of macro name [296c3e3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/296c3e3)

## 71.2.1

## 71.2.0
- [minor] Adding support for external images [9935105](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9935105)

## 71.1.7
- [patch] ED-4542 Fix replacing media at the end of the doc [a3c6c3b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a3c6c3b)

## 71.1.6
- [patch] Fix issue where autoformatting of links that ended in punctuation like '?' would incorrectly include the punctuation in the link itself (and omit the first character). ED-4288 [352f5c4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/352f5c4)

## 71.1.5
- [patch] Adding progress loader for cloud pickers [e22266c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e22266c)
- [patch] Adding cloud picker support for full-page [2a2269e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2a2269e)

## 71.1.4
- [patch] ED-4529: fix insertRow/insertColumn setting selection [784b529](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/784b529)

## 71.1.2
- [patch] Fixing the bodiless extension cursor issue [224281e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/224281e)

## 71.1.1
- [patch] Fix for cursor possition in tables in collab editor [3f155e8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f155e8)

## 71.1.0
- [patch] Support clicking in and out of an inline code mark. [767a8b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/767a8b5)
- [minor] Support exiting inline-code via clicking to the right of the marked text [7ff302b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ff302b)
- [patch] Bump to prosemirror-view@1.3.0 [faea319](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/faea319)

## 71.0.25
- [patch] Fix hover-control spacing gap in Comment appearance [1119be5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1119be5)

## 71.0.24
- [patch] fix: bump pm-utils to 0.2.19 [b77cb78](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b77cb78)

## 71.0.23
- [patch] ED-4336 support loading dynamic/"auto" tables from confluence to fixed-width tables [0c2f72a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c2f72a)

## 71.0.22
- [patch] ED-4315, Image layout should be disabled inside bodied extension. [a0ed280](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a0ed280)

## 71.0.21
- [patch] Fixes adding the task/decision below the selected extension inside tables [6dc92f9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6dc92f9)

## 71.0.20
- [patch] ED-4451: added click handler for gap cursor [d89f397](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d89f397)

## 71.0.18
- [patch] Fix cursor on collapsed editor [ca12d9f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ca12d9f)

## 71.0.17
- [patch] ED-4428: fix insertiong of task and decisions [ff1b023](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ff1b023)

## 71.0.16
- [patch] ED-4022 new list backspace behaviour [e6f2d97](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e6f2d97)

## 71.0.15
- [patch] ED-4235 Fix node selection inside node view on load [4be5c46](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4be5c46)

## 71.0.14
- [patch] Fix toolbar's shouldComponentUpdate was ignoring changes in popupsMountPoint [6a820dd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6a820dd)

## 71.0.13
- [patch] Update `editorActions.focus()` to scroll the page to the user's current selection when called [821249b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/821249b)

## 71.0.12
- [patch] Expose table plugin config interface [584c085](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/584c085)

## 71.0.11
- [patch] ED-4296, fix for scrollbars always visible in recent search for hyperlink in windows. [5b39e02](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5b39e02)

## 71.0.10
- [patch] ED-4270, changing font of inline code according to ADG3 guidelines. [805d02a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/805d02a)

## 71.0.9
- [patch] Outdent list item on enter if it doesn't have any visible content [4deb043](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4deb043)

## 71.0.8
- [patch] [fix] Support action/decision '[]' and '<>' autocompletion inside of bodiedExtensions and column layouts [ad7169c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ad7169c)

## 71.0.7
- [patch] ED-4363, replacing peperclip icon with image icon in top toolbar in editor. [e5cb9b8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e5cb9b8)

## 71.0.6
- [patch] ED-4235 Fix node selection inside node view on load [468bb65](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/468bb65)

## 71.0.5
- [patch] ED-4078 Fix single image layout around headings and lists [3f230a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f230a1)

## 71.0.4
- [patch] Fix WithEditorActions depends on where it's renderer.  [9de70c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9de70c6)

## 71.0.3
- [patch] ED-4324 clear selection after doing text replacement [d4a3f3c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d4a3f3c)

## 71.0.2
- [patch] ED-4082, fixing position for hyperlink floating toolbar. [c5bfedd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c5bfedd)

## 71.0.1
- [patch] added gap cursor [5d81c8b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5d81c8b)

## 71.0.0
- [major] For media-picker: fetchMetadata and autoFinalize options are removed from UploadParams and replaced with always "true" in the code. For editor-core: "unfinalized" status is removed from MediaStateStatus and finalizeCb from MediaState. [a41759a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a41759a)

## 70.5.2
- [patch] Fix inserting media inside blocks that don't support media [d2458b8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d2458b8)

## 70.5.1
- [patch] Fixing the expand macro copy [ef01bbd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef01bbd)

## 70.5.0
- [minor] The editor now only allows ordered list creation via autoformatting that starts with `1`. e.g. `1) Content` or `1. Content`. Using a number other than `1` will no longer trigger the input rules (ED-4344) [9c543c8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c543c8)

## 70.4.3
- [patch] ED-4228 adding icons for table floating toolbar advance options. [b466410](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b466410)

## 70.4.2
- [patch] Prevent 'Enter' from splitting a code-block that ends in a new-line, when the cursor is not at the end of the code-block. [140c76c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/140c76c)

## 70.4.1
- [patch] Fix vertical positioning of table floating toolbar. [3c96ad5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3c96ad5)

## 70.4.0
- [minor] Handle pasting of page-layouts to prevent unpredictable node-splitting behaviour. Will now 'unwrap' the contents of a layout if the slice is a partial range across page layouts, or if we are attempting to paste a layout inside a layout. We now always handle dispatching the transaction to handle paste ourselves (instead of falling back to PM). [f4ca7ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f4ca7ac)

## 70.3.1
- [patch] Adding tooltips for header icons [555a750](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/555a750)

## 70.3.0
- [minor] Media APIs exposed to mobile clients and can be used by native media components [31c66f4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/31c66f4)

## 70.2.18
- [patch] ED-4407: bumping pm-utils [7b76b7c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7b76b7c)

## 70.2.17
- [patch] ED-4348 unbreak table rendering [ee4c378](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ee4c378)

## 70.2.16
- [patch] ED-4381 add space guards around product and endash autoformat rules [729a77c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/729a77c)

## 70.2.15
- [patch] ED-4220 Shift + Enter on selected media card in editor clears out the collection/id properties from the media node [e002c18](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e002c18)

## 70.2.14
- [patch] ED-4348 fix tables built from transformers [0c2a88a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c2a88a)

## 70.2.13
- [patch] ED-4293, click on left and right of editor in confluence should not scroll editor to bottom. [0476a78](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0476a78)

## 70.2.12
- [patch] ED-4183: added invite to edit button [c0ccb58](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c0ccb58)

## 70.2.11
- [patch] Fix issue where attempting to edit copied link on editor would throw error [12146b2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12146b2)

## 70.2.9
- [patch] ED-4341 fix compositions in autoformatting [fdacc32](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fdacc32)

## 70.2.7
- [patch] ED-4249, Table icon should not be highlighted if current selection is inside table. [a7b5597](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a7b5597)

## 70.2.6
- [patch] FS-1693 added integration tests for task-decision [85867ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/85867ea)

## 70.2.5
- [patch] ED-4333 fix handleSave callback [9071629](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9071629)

## 70.2.4
- [patch] Fix MediaCard loading state inside editor [5262ad6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5262ad6)

## 70.2.3
- [patch] ED-4287: fix scroll to the bottom of the page when checking a task item [0905309](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0905309)

## 70.2.2
- [patch] Fix Markdown-it dependency to be the same version that prosemirror-markdown uses internally to prevent unnecessary bundle size increase [9abf097](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9abf097)

## 70.2.1
- [patch] Fixing the selection of table just after an image [20a90cb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/20a90cb)

## 70.2.0
- [patch] Rename allowLayouts props to UNSAFE_allowLayouts to prevent accidental use by consumers [f4098d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f4098d8)
- [minor] Add initial Page Layouts supports for Confluence. Doesn't currently support different layout types / enforcing column constraints in the editor. [ec8f6d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ec8f6d8)

## 70.1.0
- [minor] Add a generic type ahead plugin [445c66b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/445c66b)

## 70.0.4
- [patch] ED-4063 fix placeholder not diappearing on Android Chrome [27debe2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/27debe2)

## 70.0.3
- [patch] work around short document content not saving in Android Chrome [11cf48c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/11cf48c)

## 70.0.2
- [patch] ED-4294: fix editing bodiedExtension nodes [35d2648](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d2648)

## 70.0.1
- [patch] fix deletion of lists and other elements placed after tables; bump prosemirror-commands to 1.0.7 [162960f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/162960f)

## 69.0.0
- [major] CHANGESET: Revert "CFE-1004  macroProvider to extensionProvider (pull request #1308)" [33cb5fe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/33cb5fe)

## 68.1.3
- [patch] ED-4283 Fix broken scroll behavior in full-page appearance [8110aa0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8110aa0)

## 68.1.2
- [patch] Use media-core context in MediaPicker constructor [6cc9f55](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6cc9f55)

## 68.1.0
- [patch] Added missing dependencies and added lint rule to catch them all [0672503](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0672503)

## 68.0.3
- [patch] Upgrading PM transform [d3ec47d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d3ec47d)

## 68.0.2
- [patch] Fixing the popup height for recent activity [760d798](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/760d798)

## 68.0.1
- [patch] ED-4175, table toolbar should always be centally aligned. [5d98a75](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5d98a75)

## 68.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 67.0.2
- [patch] enable rule toolbar button if rule is enabled [c3be6b2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3be6b2)

## 67.0.1
- [patch] change table node builder constructor for tests, remove tableWithAttrs [cf43535](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cf43535)

## 67.0.0
- [major] CFE-1004: Rename anything "macro" to "extension" (i.e: MacroProvider to ExtensionProvider) [453aa52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/453aa52)

## 66.1.7
- [patch] refactor tables plugin [47b4e3a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/47b4e3a)

## 66.1.6
- [patch] tidy up padding and font-size around collapsed editor [260e744](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/260e744)

## 66.1.5
- [patch] Adding Media inside lists [07d3dff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/07d3dff)

## 66.1.3
- [patch] ED-3476 add table breakout mode [7cd4dfa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7cd4dfa)

## 66.1.1
- [patch] Update TaskItem NodeView to fix issue in Collab Editing where task-check would not replicate across sessions [9e331a6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9e331a6)

## 66.0.0
- [major] use local preview in MediaCard when available [b33788b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b33788b)

## 65.1.31
- [patch] ED-4184. fixing date picker in full page editor. [efa907c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/efa907c)

## 65.1.29
- [patch] ED-4139, fix selection when empty paragraph is inserted terminally in the node. [8c93c6e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c93c6e)

## 65.1.28
- [patch] Move types/interfaces for ExtensionHandlers to editor-common [3d26cab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d26cab)

## 65.1.27
- [patch] Show upload button during recents load in media picker. + Inprove caching for auth provider used in examples [929731a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/929731a)

## 65.1.26
- [patch] Upgrading ProseMirror Libs [35d14d5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d14d5)

## 65.1.25
- [patch] ED-4119: Add draft async CollapsedEditor support to the Labs for feedback [eb2f891](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eb2f891)

## 65.1.23
- [patch] FEF-730 Fix initial media rendering. [4aa9745](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4aa9745)

## 65.1.22
- [patch] FEF-730 Update NodeViews DOM attributes on initial render. [0b8a0f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0b8a0f8)

## 65.1.21
- [patch] Add "sideEffects: false" to AKM2 packages to allow consumer's to tree-shake [c3b018a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3b018a)

## 65.1.20
- [patch] ED-4170, in full page editor paragraph should not be created when clicked inside editor. [125d1dc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/125d1dc)
- [patch] ED-4126, Fixing scroll of full page editor. [8ef459d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8ef459d)

## 65.1.18
- [patch] change double hyphen to replace with endash not emdash [2e94bed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e94bed)

## 65.1.17
- [patch] table cell/header attributes in the Confluence transformer [9415aaa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9415aaa)

## 65.1.16
- [patch] ED-4088 fixing selection of mention in macros bug in IE11. [10a016b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/10a016b)

## 65.1.15
- [patch] ED-4092: disabling smart code detection on paste [1e8e8da](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e8e8da)

## 65.1.14
- [patch] ED-4030 Don't reload Image cards again after upload is done [9aff937](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9aff937)

## 65.1.13
- [patch] ED-4084 fixing layout of recent search select. [423da3e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/423da3e)

## 65.1.12
- [patch] Fix extension edit after introducing createParagraphAtEnd [6a1749a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6a1749a)

## 65.1.11
- [patch] Should save as localId not as taskId [d997fc7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d997fc7)

## 65.1.9
- [patch] Don't lose taskId when task is marked completed [fefee23](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fefee23)

## 65.1.7
- [patch] ED-4064,ED-4065, refactor extensions, codeblock, panel [eb09dcd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eb09dcd)

## 65.1.6
- [patch] Making UX nice for user by adding an empty paragraph terminally in the editor. [3cc4930](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3cc4930)

## 65.1.5
- [patch] Add device and browser informatio to jira collector in feedback component. [6f5d172](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6f5d172)

## 65.1.4
- [patch] fix(editor-core): add media mock controls [31e0a7a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/31e0a7a)

## 65.1.1
- [patch] fix mention query regression [ed015a3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ed015a3)

## 65.1.0
- [minor] Add full width and wide layout support for single image [ae72acf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ae72acf)

## 65.0.5
- [patch] CFE-846: Add support to extension handlers (lite version) [4ea9ffe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4ea9ffe)

## 65.0.4
- [patch] Update appearance to show the buttons on the outside of the Editor [d59ad61](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d59ad61)

## 65.0.3
- [patch] restrict nested bodiedExtensions [2583534](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2583534)

## 65.0.2
- [patch] feature(media-test-helpers): http mocks for media-picker [982085f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/982085f)

## 65.0.1
- [patch] remove mention mark when @ prefix disappears [d62ca26](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d62ca26)

## 65.0.0
- [patch] Fix autoformating in editor after hardbreak. [21712d6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/21712d6)
- [major] icons are now assignable to card actions, which will cause media cards to render upto 2 icon buttons, or a dropdown menu if more than 2 actions are set [649871c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/649871c)

## 64.1.2
- [patch] Merge old plugins with new plugins [cd02d6b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cd02d6b)

## 64.1.1
- [patch] ED-3914: fix table errors when table looses focus [711e733](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/711e733)

## 64.1.0
- [minor] editor-mobile-bridge module introduced [4a338f6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4a338f6)

## 64.0.0
- [major] Use media-core as peerDependency [c644812](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c644812)

## 63.1.0
- [minor] Makes WithPluginState work inside EditorContext [f572201](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f572201)

## 63.0.0
- [major] Re-introduce code-splitting in editor-core [028efda](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/028efda)

## 62.8.0
- [minor] Add width plugin [66128a0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/66128a0)

## 62.7.16
- [patch] add horizontal rule toolbar item [48c36f4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/48c36f4)

## 62.7.15
- [patch] fix button spacing on toolbars and panel edit toolbar [23ca4d0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/23ca4d0)

## 62.7.13
- [patch] Fix lifecycle issue where we wouldn't call EditorView.destroy on a lifecycle change (i.e. switching from one appearance to another) potentially causing a memory leak. Also fixes an error where Prosemirror would append itself into the child of the <div /> container, rather than using the node as the root of the Editor. [9d0da7a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d0da7a)

## 62.7.12
- [patch] Fix the media group when there is a mix of images and non images [d7f4f67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7f4f67)

## 62.7.11
- [patch] Fix the backspace in table cells in IE11 [4e58321](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e58321)

## 62.7.10
- [patch] Table columns should not resize when typing [59728cc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/59728cc)

## 62.7.8
- [patch] Adding link in blockquote should not split it. [13dd62e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/13dd62e)

## 62.7.5
- [patch] Fix for styled-components types to support v1.4.x [75a2375](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/75a2375)

## 62.7.4
- [patch] fix: prevent autoformatting for formatted-text across hard-breaks [84da82e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/84da82e)

## 62.7.2
- [patch] Fix the cursor inside a tablecell with Media group [1f97e8e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1f97e8e)

## 62.7.1
- [patch] JSON encoding results in invalid ADF for table nodes [8a8d663](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a8d663)

## 62.7.0
- [minor] Support dynamically changing the Editor's appearance prop to enable switching between different appearances. Changing props that affect features, e.g. `allowTables` is not supported and won't cause the supported nodes/marks of the editor to change. This support is currently experimental and subject to change. The prop `contentComponents` is no longer rendered inside the ProseMirror contenteditable, instead it is rendered directly before the ProseMirror component. [4497ea8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4497ea8)

## 62.6.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 62.5.3
- [patch] fix nodeViews with multiline content [af4d057](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af4d057)

## 62.5.2
- [patch] ED-3873 fix horizontal rule and codeblock in help [6a3161e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6a3161e)

## 62.5.1
- [patch] Remove keymap for link from help dialog in message editor. [0a47f8e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a47f8e)

## 62.5.0
- [minor] Make textFormatting and hyperlink plugins default [689aa8d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/689aa8d)

## 62.4.3
- [patch] Add autoformatting of atlassian product [2173e92](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2173e92)

## 62.4.2
- [patch] Expose more types for confluence [f95ce9f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f95ce9f)

## 62.4.1
- [patch] Fix: arrow down in nested list which is last item in editor should create a paragraph at depth 0. [9670417](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9670417)

## 62.4.0
- [minor] Disable save button until media finishes upload [aeb54bf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/aeb54bf)

## 62.3.2
- [patch] Fix issue where removing placeholder-text on typing wouldn't trigger a collab transaction. Also fixed local collaborative editing storybook to not dispatch transactions to the same editor that fired them. [4567ab2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4567ab2)

## 62.3.0
- [minor] Multiline behaviour for Message editor [3f61a6a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f61a6a)

## 62.2.2
- [patch] Fix image disappears after set to left-aligned [0c79fc3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c79fc3)

## 62.2.1
- [patch] Enforce minimum version of w3c-keyname to be >= 1.1.8 [dc120b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc120b9)

## 62.2.0
- [minor] replaceSelection with empty string removes selection [a764af6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a764af6)

## 62.1.2
- [patch] fixes RangeError bug when shouldFocus=true [adbd055](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/adbd055)

## 62.1.1
- [patch] fix prosemirror-view when collab editing tables [111cc6a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/111cc6a)

## 62.1.0
- [minor] advanced features for tables [e0bac20](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e0bac20)

## 62.0.23
- [patch] Fix Insert Toolbar throws error about context if not placed inside EditorContext [dca4821](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dca4821)

## 62.0.22
- [patch] [SMRT-156] Start tracking the containerId, objectId & mentioned user when a Mention is inserted into the Editor [36c1b22](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/36c1b22)

## 62.0.21
- [patch] FS-1461 objectAri and containerAri are optional in RendererContext [1b20296](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b20296)

## 62.0.19
- [patch] Adding opt out instructions for bitbucket users. [14cc50f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/14cc50f)
- [patch] Changes in inline autoformatting rules to make then more well defined. [e6a5a14](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e6a5a14)

## 62.0.18
- [patch] Fix the Floating toolbar styling - Bradleys wishlist [fe45969](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fe45969)

## 62.0.17
- [patch] Hide the 'Insert Placeholder Text' menu item by default [1274a31](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1274a31)

## 62.0.14
- [patch] Fix toolbar style in editor [ebe7265](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ebe7265)

## 62.0.13
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 62.0.12
- [patch] Don't block getValue untill media is ready [2440642](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2440642)

## 62.0.11
- [patch] Fix issue with having multiple Dropzone elements listening at the same time with Editor and MediaPicker [d37de20](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d37de20)

## 62.0.10
- [patch] fix setting selection inside of the content nodeView [5beb385](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5beb385)

## 62.0.9
- [patch] Show fake cursor when inserting a placeholder text element [ca557d0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ca557d0)

## 62.0.7
- [patch] Allow width/height for placeholder and polish rendering [6d9f809](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6d9f809)

## 62.0.6
- [patch] fix date when inserting from + menu [8f6bd7c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8f6bd7c)

## 62.0.5
- [patch] ED-3270: Allow arbitrary items to be added to the plus menu [a88b921](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a88b921)

## 62.0.4
- [patch] Fix an issue where Shift-Enter shortcuts would not be properly handled by the Editor. Refactored the BlockType and Tables shortcut handlers to better support the updated editor architecture. [a78626e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a78626e)
- [patch] Minor fixes for the placeholder node to improve experience. We now highlight the node when selected, and fixed a bug where clicking on the span in a list would not trigger a selection change [a9576d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a9576d8)
- [patch] Add support for inserting custom placeholder-text via the Insert Block menu [dfc41ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dfc41ea)

## 62.0.2
- [patch] Fix editor getValue action is giving old doc while using with waitForMediaUpload [14010c3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/14010c3)

## 62.0.0
- [major] Move media provider and state manager to editor-core [0601da7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0601da7)

## 61.9.0
- [minor] Add replaceSelection method to EditorActions [e0da0dd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e0da0dd)

## 61.8.2
- [patch] Removes @atlaskit/profilecard dependency from editor-core [5a0555e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5a0555e)

## 61.8.0
- [patch] Refactor PlaceholderText to use a NodeView to improve selection behaviour across browsers [47e4b88](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/47e4b88)
- [minor] Support the `allowTemplatePlaceholders` prop to enable placeholder text elements. [70dbde2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/70dbde2)

## 61.7.16
- [patch] Autoformatting should work for single character. [70e44af](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/70e44af)

## 61.7.15
- [patch] Handle Media.getDomElement when node has no child nodes [618b0c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/618b0c1)

## 61.7.13
- [patch] Allow macro provider to handle auto conversion during paste [b2c83f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b2c83f8)

## 61.7.12
- [patch] When adding blockquote from toolbar cursor is not visible. [c7c4780](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c7c4780)

## 61.7.11
- [patch] fix space after mention [b47f480](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b47f480)

## 61.7.9
- [patch] bump mention to 9.1.1 to fix mention autocomplete bug [c7708c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c7708c6)

## 61.7.8
- [patch] Adding product detail to JIRA collector feedback form. [81a9fd3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/81a9fd3)

## 61.7.6
- [patch] fix table controls on crazy fast resize [ad93c0b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ad93c0b)

## 61.7.5
- [patch] Add ToolbarFeedback export back [8525bb2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8525bb2)

## 61.7.4
- [patch] fix cursor pos on table controls hover [76bfa3f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76bfa3f)

## 61.7.3
- [patch] cket-transformer/__tests__/_schema-builder.ts [a6e77ff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a6e77ff)
- [patch] move MediaItem to renderer, bump icons [5e71725](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5e71725)

## 61.7.2
- [patch] Clear formatting advance option should remove panel, blockquote and code block node types. [966a444](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/966a444)

## 61.7.1
- [patch] added ContentNodeView class to fix nodeViews that has contentDOM ref [53f2a38](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/53f2a38)

## 61.7.0
- [minor] The allowPlaceholderCursor prop has been removed in favour of always showing the (now renamed) fake text-cursor. [c5da217](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c5da217)

## 61.6.4
- [patch] Removes components, examples, and tests, for old arch editor [9fd0649](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9fd0649)

## 61.6.3
- [patch] Reducing min-width of comment editor to 272px. [c71ff58](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c71ff58)

## 61.6.2
- [patch] Fix uploading a big image causes many duplicated uploading [27b6510](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/27b6510)

## 61.6.0
- [minor] added table column resizing plugin [c61e092](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c61e092)

## 61.5.2
- [patch] Adding support for heading6. [147cd8e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/147cd8e)

## 61.5.0
- [minor] FS-1624 Add new popupsScrollableElement props to editor to handle case when mountPoint is different than the scrollable element. [7d669bc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7d669bc)

## 61.4.12
- [patch] Code block in JIRA has no formatting and not distinguishable from normal text. [5bdb48f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5bdb48f)

## 61.4.11
- [patch] Insert media group instead of single image inside table [5b4aaa0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5b4aaa0)

## 61.4.9
- [patch] Backtick should be removed at paste if its followed by code. [d74188d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d74188d)

## 61.4.8
- [patch] Add timestamp with filename on paste [18b1108](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/18b1108)

## 61.4.7
- [patch] Fixes hyperlink popup positioning when popupMountPount is provided [ff2c8c9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ff2c8c9)

## 61.4.6
- [patch] use new MediaPicker package [c652ed4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c652ed4)

## 61.4.5
- [patch] Add image upload icon back [768c601](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/768c601)

## 61.4.4
- [patch] fix extension replacement with empty content [e151446](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e151446)

## 61.4.3
- [patch] fixed extension node content field [41c7958](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/41c7958)
- [patch] Add analytics for hyperlink autocomplete [345b082](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/345b082)

## 61.4.2
- [patch] fixed typescript error [19630c5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/19630c5)
- [patch] added mention picker space analytics [05fa937](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/05fa937)

## 61.4.1
- [patch] fixed typescript validation error in the EmojiTypeAhread test [c56d564](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c56d564)
- [patch] added analytics for EmojiTypeAhead component [021d6f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/021d6f8)

## 61.4.0
- [minor] added new panelType [9f693b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f693b9)

## 61.3.12
- [patch] Fix list shortcuts [c25601a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c25601a)

## 61.3.11
- [patch] Fixes nodeviews becoming empty after some transactions [c8ba47c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8ba47c)

## 61.3.10
- [patch] Change line length in Full Screen editor from 600px to 680px [6dacbbe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6dacbbe)

## 61.3.8
- [patch] Keymaps not supported on windows should not be visible in help dialog on windows. [6872f52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6872f52)

## 61.3.7
- [patch] Improvements in code block. [da0fee1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da0fee1)

## 61.3.6
- [patch] Fix link dialog styling issues with recent items search [667aaa7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/667aaa7)

## 61.3.4
- [patch] Remove placeholderBaseUrl config option from the Confluence Macro Provider [1583960](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1583960)
- [patch] Fix Extension Header img height to 24px, center elements vertically [49f48bb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49f48bb)

## 61.3.3
- [patch] Addes in editor-markdown-transformer package [10042be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/10042be)

## 61.3.2
- [patch] Fix cursor position after mention and emoji [330b8d2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/330b8d2)

## 61.3.1
- [patch] Fix spacing and toolbar alignment for message editor [98b961e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/98b961e)

## 61.3.0
- [minor] added date plugin [f7b8a33](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f7b8a33)
- [patch] fixed insertion of a table when selection has a mark [3d8226e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d8226e)

## 61.2.1
- [patch] Fix accessing clipboardData.types in Edge (fixes paste) [91b921b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/91b921b)
- [patch] Updates in responsive editor [353c5d6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/353c5d6)

## 61.2.0
- [minor] Grid layout for Single Image [59a8e22](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/59a8e22)

## 61.1.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 61.0.3
- [patch] Fix update single image toolbar state on selection change [bea78aa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bea78aa)

## 61.0.1
- [patch] Fix analytics event name for strikethrough button. [ac96c66](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ac96c66)

## 61.0.0
- [patch] cleanup tables [372ac9b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/372ac9b)
- [major] FS-1461 added TaskDecisionProvider and ContextIdentifierProvider to editor props [62fca1e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/62fca1e)

## 60.20.2
- [patch] added createStep to collab provider [139e70d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/139e70d)
- [patch] Revert change os enter keypress in stride. [4eac0d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4eac0d8)

## 60.20.1
- [patch] Autoformatting for task and decision items should work inside tables. [13c90ff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/13c90ff)

## 60.20.0
- [minor] Add horizontal rule support in full-page editor [9cefb57](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9cefb57)

## 60.19.0
- [patch] Remove duplicate implementation of ProviderFactory from @atlaskit/editor-core, in favour of only one implementation in @atlaskit/editor-common [535cb8c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/535cb8c)
- [minor] bump prosemirror-tables to 0.5.2 [32b6bbe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/32b6bbe)
- [minor] added tasks/actions to full-page editor [49d3343](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49d3343)
- [patch] Horizontal rule autoformatting should work after shift+enter. [f600f0e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f600f0e)

## 60.18.1
- [patch] Fix insert single image from 3rd party integration [a337df1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a337df1)

## 60.18.0
- [minor] add version to editor.start analytics [3b4c21b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3b4c21b)
- [minor] add name and version to editor.start analytics [d8d2388](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d8d2388)

## 60.17.6
- [patch] Improve emoji and mention providers in editor's examples [bd68138](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bd68138)

## 60.17.5
- [patch] Fixing text padding in message editor. [a4af16c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4af16c)
- [patch] In message editor pasting content more in size than max allowed limit should show warning and insert toolbar options should be disabled once max size is reached.  [7078916](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7078916)

## 60.17.4
- [patch] Fix issue with some of autoformatting using markdown syntax failing for links. [6e5ed2b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e5ed2b)

## 60.17.3
- [patch] Mod-Enter should submit editor content for all products. [65ede03](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65ede03)
- [patch] Fix for issue that panel toolbar is not visible when cursor is inside a list in panel. [dce5d66](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dce5d66)

## 60.17.1
- [patch] validate incoming ADF node inserted from macro browser [e9d0af2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e9d0af2)

## 60.17.0
- [minor] Added floating toolbar to media single [46fdd15](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/46fdd15)

## 60.16.1
- [patch] Add support for single image wrap left/right layout [59d9a74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/59d9a74)

## 60.16.0
- [minor] Enter keypress should always submit in stride. [51020fe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/51020fe)

## 60.15.8
- [patch] Update dependencies [623f8ca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/623f8ca)

## 60.15.7
- [patch] Support old plugins in WithPluginState helper [194bc9c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/194bc9c)

## 60.15.6
- [patch] Fixed stand alone file and link card rendering [d851bfc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d851bfc)

## 60.15.5
- [patch] Collaborative editing telepointers 2.0 [297afbf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/297afbf)

## 60.15.4
- [patch] Fixes Firefox rendering bug, missing attrs in transformer, new selection [f59e8c4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f59e8c4)

## 60.15.3
- [patch] Fix hyperlink edit to close on esc keypress [8245c10](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8245c10)

## 60.15.2
- [patch] Duplicate imageUploadPlugin paste/drop tests into editor-core. Add ProviderFactory.create({ name: provider }) helper function to reduce boilerplate. [a5a36cc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a5a36cc)
- [patch] Setting new mediaProvider will close any existing media picker window [cf4785d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cf4785d)
- [patch] Support breakout mode for block nodes [538fa77](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/538fa77)
- [patch] Fixing language picker in full-page editor. [9720b28](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9720b28)

## 60.15.1
- [patch] replaced inlineMacro node with inlineExtension node [a43f891](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a43f891)

## 60.15.0
- [patch] Bumped emoji to v31 [c4365e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c4365e4)
- [patch] Fix editor scrolling and initial telepointer issue in collab mode [efba71b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/efba71b)
- [patch] Bumped emoji to v31 [207e0fc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/207e0fc)
- [patch] Added new AppCardView v1.5 designs behind a feature flag. [92bc6c8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92bc6c8)
- [minor]  FS-1461 taskDecisionProvider and contextIdentifierProvider added to task props [eaa9bfc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eaa9bfc)

## 60.14.16
- [patch] Add Serializer for Single image [03405bf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/03405bf)

## 60.14.15
- [patch] Auto-formatting for blocks should work after shift-enter. [12c93ca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12c93ca)

## 60.14.14
- [patch] Fix Single Image margin [54d4681](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/54d4681)

## 60.14.13
- [patch] Temporarily hiding tooltips for headings. [ac7d6bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ac7d6bd)

## 60.14.12
- [patch] Fixes issues where an incorrect object comparison would cause cascading telepointer events to fire on each transaction. [c3263c9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3263c9)

## 60.14.11
- [patch] Fix single image temporary placeholder alignment [0a891be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a891be)

## 60.14.10
- [patch] Add default center layout support for single image [6113e02](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6113e02)

## 60.14.6
- [patch] Fix issue where focusing in the editor would not work as expected in Safari when the editor has a placeholder [ac96315](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ac96315)

## 60.14.5
- [patch] Display telepointer of existing users when joining a collaboration session [a6441ff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a6441ff)

## 60.14.4
- [patch] Bumped task decision version [1180bbe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1180bbe)

## 60.14.2
- [patch] Fix issue where disabled state was not being set correctly for the new-arch editors [79095b1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/79095b1)
- [patch] Fix comments editor paddings [c8a57cf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8a57cf)
- [patch] Rename singleImage to mediaSingle. Replaced alignment and display attributes with layout. [0b97f0a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0b97f0a)
- [patch] Updated map of ac:emoticons to new emojis [f7f214e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f7f214e)

## 60.14.1
- [patch] Unskipping jest tests [54d88f7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/54d88f7)

## 60.13.0
- [minor] Remove marks on change to empty document [b5eec07](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5eec07)

## 60.12.0
- [minor] replaced deprecated mention toolbar analytic with new one [cf2dd95](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cf2dd95)
- [patch] replaced deprecated mention analytics with the new ones [8a9070c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a9070c)
- [patch] fixed typescript build errors [0d5baaa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0d5baaa)
- [minor] code improvements for mention analytics and tests added [35bd176](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35bd176)
- [minor] added analytic events for mentions [1f7019a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1f7019a)

## 60.11.0
- [minor] Add rule plugin [caf2ac0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/caf2ac0)

## 60.10.0
- [minor] Remove support for images with data URI's for Bitbucket's image node in the editor [e055dee](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e055dee)
- [patch] Fixed an issue with drag-and-dropping images in Firefox where dropping an image on the padding of the parent container of Prosemirror's contenteditable would cause the image to be added to the editor via an InputEvent rather than trigger a DragEvent. [9b69d97](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9b69d97)

## 60.9.3
- [patch] fix inline comments marker name in schema [966f9c2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/966f9c2)

## 60.9.2
- [patch] split extension node [4303d49](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4303d49)

## 60.9.1
- [patch] Provide an option to disable subscript/superscript in new arch [264db1f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/264db1f)

## 60.9.0
- [patch] Fixes table controls styles for firefox and chrome [3f0a783](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f0a783)

## 60.8.4
- [patch] Add default inline code styles [d5d8e5f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d5d8e5f)

## 60.8.3
- [patch] Fix getValue() action resolving too early with media in-flight. [d31fafe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d31fafe)

## 60.8.2
- [patch] added extension node [ec73cb8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ec73cb8)

## 60.8.0
- [patch] Fix dependencies [9f9de42](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f9de42)
- [patch] Fix dependencies [5a4d799](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5a4d799)
- [minor] ED-2864, adding fake cursor to links. [4655eac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4655eac)

## 60.7.1
- [patch] Adding more unit test coverage for responsive editor changes. [0b35f50](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0b35f50)

## 60.7.0
- [patch] Move docs to be a dev dependency for editor-core [65ada60](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65ada60)
- [minor] Adding separate transformer packages. [f734c01](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f734c01)

## 60.6.0
- [minor] Change in collapse order of responsive editor toolbar. [14448bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/14448bd)

## 60.5.3
- [patch] FS-1366 fix selection in action/decision [854c137](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/854c137)

## 60.5.2
- [patch] moved table plugins methods to utils [90e6b2b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/90e6b2b)

## 60.5.1
- [patch] fixed pasting links [847d51b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/847d51b)

## 60.5.0
- [minor] Added single image to schema; insertFile renamed to insertFiles. [1c6b005](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c6b005)

## 60.4.6
- [patch] Make tables 100% width in full page editor [a28ac19](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a28ac19)

## 60.4.5
- [patch] @atlaskit/emoji bumped to ^30.3.3 for big emoji scrolling bugfix [095d6ba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/095d6ba)

## 60.4.4
- [patch] Pasting multiple markdown links should create multiple links in the editor. [829b312](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/829b312)

## 60.4.3
- [patch] bump icon dependency [da14956](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da14956)

## 60.4.2
- [patch] Add documentation to editor core; introduce code formatting method to docs [a1c7e56](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a1c7e56)

## 60.4.1
- [patch] Fixing height of message editor to 32px height and 2px border. [251b2f5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/251b2f5)

## 60.4.0
- [minor] Rename monospace to code in toolbar. [6600999](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6600999)

## 60.3.3
- [patch] Fixing textColor toolbar component for IE11. [d095fc2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d095fc2)

## 60.3.1
- [patch] Collaborative editing telepointers 2.0 [297afbf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/297afbf)

## 60.3.0
- [minor] Fix panel node view and floating toolbars of full page editor in new architecture. [7db53e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7db53e6)

## 60.2.5
- [patch] Fixed stand alone file and link card rendering [d851bfc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d851bfc)

## 60.2.3
- [patch] Upgrade mention to ^8.1.0 in editor and renderer [48b5af4](48b5af4)

## 60.2.1
- [patch] Restore accessLevel attribute for mention node [a83619f](a83619f)

## 60.2.0
- [minor] allow consumers of BB Transformer to disable BB link stripping [96424fa](96424fa)

## 60.1.0
- [minor] ED-2146, when pasting link inline style marks should be cleared from position after link. [bfdcb66](bfdcb66)

## 60.0.0
- [major] Use correct dependencies  [7b178b1](7b178b1)
- [major] Adding responsive behavior to the editor. [e0d9867](e0d9867)

## 59.6.0
- [minor] Added big emoji render logic to editor-core [5bf750f](5bf750f)

## 59.5.0
- [minor] Upgrade Media Editor packages [193c8a0](193c8a0)
