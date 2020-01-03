import React from 'react';
import { MenuGroup, Section, ButtonItem, LinkItem, HeadingItem } from '../src';
import { colors } from '@atlaskit/theme';

import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search';
import EmojiCustomIcon from '@atlaskit/icon/glyph/emoji/custom';
import Blog24Icon from '@atlaskit/icon-object/glyph/blog/24';

export default () => {
  return (
    <div
      style={{
        width: '300px',
        border: '1px solid #EFEFEF',
        margin: '10px auto',
        borderRadius: '4px',
        boxShadow: `0 4px 8px -2px ${colors.N50A}, 0 0 1px ${colors.N60A}`,
      }}
    >
      <MenuGroup>
        <Section>
          <HeadingItem>Actions</HeadingItem>
          <LinkItem
            elemBefore={<EditorSearchIcon label="Search Icon" />}
            href="#"
          >
            Search your items
          </LinkItem>
        </Section>
        <Section>
          <HeadingItem>Favourites</HeadingItem>
          <ButtonItem elemBefore={<EmojiCustomIcon label="Quote icon" />}>
            Untitled
          </ButtonItem>
        </Section>
        <Section hasBottomSeparator>
          <HeadingItem>Quotes</HeadingItem>
          <ButtonItem elemBefore={<Blog24Icon label="Quote icon" />}>
            Untitled
          </ButtonItem>
        </Section>
        <Section hasBottomSeparator>
          <HeadingItem>Reasonings</HeadingItem>
          <ButtonItem elemBefore={<EmojiCustomIcon label="Quote icon" />}>
            Untitled
          </ButtonItem>
        </Section>
        <Section hasBottomSeparator>
          <HeadingItem>Biblical</HeadingItem>
          <ButtonItem elemBefore={<Blog24Icon label="Quote icon" />}>
            Untitled
          </ButtonItem>
        </Section>
        <Section>
          <HeadingItem>Quotes</HeadingItem>
          <ButtonItem elemBefore={<Blog24Icon label="Quote icon" />}>
            Untitled
          </ButtonItem>
        </Section>
      </MenuGroup>
    </div>
  );
};
