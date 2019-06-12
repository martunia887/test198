const ToolbarMenuItem = {
  table: 'table',
  insertBlock: 'insertBlock',
  italic: 'italic',
  bold: 'bold',
  moreFormatting: 'moreFormatting',
  alignment: 'alignment',
  alignmentLeft: 'alignmentLeft',
  alignmentCenter: 'alignmentCenter',
  textColor: 'textColor',
  bulletList: 'bulletList',
  numberedList: 'numberedList',
  action: 'action',
  link: 'link',
  filesAndImages: 'filesAndImages',
  mention: 'mention',
  emoji: 'emoji',
  removeTable: 'removeTable',
};

const toolbarMenuItemsSelectors = {
  [ToolbarMenuItem.table]: `[aria-label="Table"]`,
  [ToolbarMenuItem.insertBlock]: `[aria-label="Insert"]`,
  [ToolbarMenuItem.italic]: `[aria-label="Italic"]`,
  [ToolbarMenuItem.bold]: `[aria-label="Bold"]`,
  [ToolbarMenuItem.moreFormatting]: `[aria-label="More formatting"]`,
  [ToolbarMenuItem.alignment]: `[aria-label="Text alignment"]`,
  [ToolbarMenuItem.alignmentLeft]: `[aria-label="Align left"]`,
  [ToolbarMenuItem.alignmentCenter]: `[aria-label="Align Center"]`,
  [ToolbarMenuItem.textColor]: `[aria-label="Text color"]`,
  [ToolbarMenuItem.bulletList]: `[aria-label="Bullet List"]`,
  [ToolbarMenuItem.numberedList]: `[aria-label="Numbered List"]`,
  [ToolbarMenuItem.action]: `[aria-label="Action item"]`,
  [ToolbarMenuItem.link]: `[aria-label="Link"]`,
  [ToolbarMenuItem.filesAndImages]: `[aria-label=""Files & images]`,
  [ToolbarMenuItem.mention]: `[aria-label="Mention"]`,
  [ToolbarMenuItem.emoji]: `[aria-label="Emoji"]`,
  [ToolbarMenuItem.removeTable]: `[aria-label="Remove"]`,
};

async function clickToolbarMenu(page, menu) {
  await page.waitForSelector(toolbarMenuItemsSelectors[menu]);
  await page.click(toolbarMenuItemsSelectors[menu]);
}

module.exports = {
  ToolbarMenuItem,
  clickToolbarMenu,
};
