import React from 'react';
import {
  MenuGroup,
  Section,
  ButtonItem,
  LinkItem,
  HeadingItem,
  SkeletonItem,
  SkeletonHeadingItem,
} from '../src';

import StarIcon from '@atlaskit/icon/glyph/star';
import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search';
import EmojiCustomIcon from '@atlaskit/icon/glyph/emoji/custom';
import Blog24Icon from '@atlaskit/icon-object/glyph/blog/24';

export default () => {
  return (
    <div
      style={{
        width: '600px',
        border: '1px solid #EFEFEF',
        margin: '10px auto',
        borderRadius: '4px',
      }}
    >
      <MenuGroup maxHeight={800}>
        <Section>
          <HeadingItem>Items with elemBefore and elemAfter</HeadingItem>
          <LinkItem
            elemBefore={<EditorSearchIcon label="Search Icon" />}
            href="#"
          >
            Item link
          </LinkItem>
          <LinkItem
            elemBefore={<EmojiCustomIcon label="Create Icon" />}
            href="#"
            isDisabled
          >
            Item disabled link
          </LinkItem>
          <LinkItem elemAfter={<StarIcon label="Star icon" />} href="#">
            Item link
          </LinkItem>
          <LinkItem
            elemAfter={<StarIcon label="Star icon" />}
            elemBefore={<Blog24Icon label="Quote icon" />}
            href="#"
          >
            Item link Item link Item link Item link Item link Item link Item
            link Item link Item link Item link Item link Item link Item link
            Item link Item link Item link Item link Item link Item link
          </LinkItem>
        </Section>
        <Section isScrollable hasSeparator>
          <HeadingItem>Scrollable section with separator</HeadingItem>
          <ButtonItem elemBefore="hi" elemAfter="bye">
            Item
          </ButtonItem>
          <ButtonItem elemBefore="hi" elemAfter="bye">
            Item
          </ButtonItem>
          <ButtonItem
            elemBefore="hi"
            elemAfter="bye"
            description="Some textual description"
          >
            Item
          </ButtonItem>
          <ButtonItem elemBefore="hi" elemAfter="bye">
            Item
          </ButtonItem>
          <ButtonItem elemBefore="hi" elemAfter="bye">
            Item
          </ButtonItem>
          <ButtonItem elemBefore="hi" elemAfter="bye">
            Item
          </ButtonItem>
          <ButtonItem elemBefore="hi" elemAfter="bye">
            Item
          </ButtonItem>
          <ButtonItem elemBefore="hi" elemAfter="bye">
            Item
          </ButtonItem>
        </Section>
        <Section hasSeparator>
          <SkeletonHeadingItem />
          <SkeletonItem hasAvatar />
          <SkeletonItem hasAvatar />
          <SkeletonItem hasIcon />
          <SkeletonItem hasIcon width="100%" />
          <SkeletonItem hasIcon width="100%" />
          <SkeletonItem hasIcon />
          <SkeletonItem hasIcon />
        </Section>
      </MenuGroup>
    </div>
  );
};
