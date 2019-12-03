/** @jsx jsx */
import { Fragment } from 'react';
import { jsx, ClassNames } from '@emotion/core';
import {
  linkItemCSS,
  customItemCSS,
  itemCSS,
  itemHeadingCSS,
  skeletonHeadingItemCSS,
  itemSkeletonCSS,
  elemBeforeCSS,
  elemAfterCSS,
  descriptionCSS,
  contentCSS,
  truncateCSS,
  contentCSSWrapper,
} from './styles';
import {
  ButtonItemProps,
  LinkItemProps,
  BaseItemProps,
  CustomItemProps,
  SkeletonItemProps,
  Width,
} from './types';

export const HeadingItem = ({ children }: { children: React.ReactNode }) => (
  <div css={itemHeadingCSS}>{children}</div>
);

export const SkeletonHeadingItem = ({ width }: { width?: Width }) => (
  <div css={skeletonHeadingItemCSS(width)} />
);
export const SkeletonItem = ({
  hasAvatar,
  hasIcon,
  width,
}: SkeletonItemProps) => (
  <div css={itemSkeletonCSS(hasAvatar, hasIcon, width)} />
);

const BaseItem = ({
  elemBefore,
  elemAfter,
  children,
  description,
}: BaseItemProps) => {
  return (
    <Fragment>
      <div css={contentCSSWrapper}>
        {elemBefore && <span css={elemBeforeCSS}>{elemBefore}</span>}
        {children && (
          <span css={contentCSS}>
            <span css={truncateCSS}>{children}</span>
            {description && <span css={descriptionCSS}>{description}</span>}
          </span>
        )}
        {elemAfter && <span css={elemAfterCSS}>{elemAfter}</span>}
      </div>
    </Fragment>
  );
};

export const ButtonItem = (props: ButtonItemProps) => {
  const {
    elemBefore,
    elemAfter,
    children,
    description,
    isDisabled = false,
    isSelected = false,
    ...others
  } = props;

  if (!children) {
    return null;
  }

  const Tag = isDisabled ? 'span' : 'button';

  return (
    <Tag
      type={isDisabled ? undefined : 'button'}
      css={itemCSS(isDisabled, isSelected)}
      {...others}
    >
      <BaseItem
        elemBefore={elemBefore}
        elemAfter={elemAfter}
        description={description}
      >
        {children}
      </BaseItem>
    </Tag>
  );
};

export const LinkItem = ({ href, ...rest }: LinkItemProps) => {
  const {
    elemBefore,
    elemAfter,
    children,
    description,
    isDisabled = false,
    isSelected = false,
    ...others
  } = rest;

  if (!children) {
    return null;
  }

  const Tag = isDisabled ? 'span' : 'a';

  return (
    <Tag
      css={linkItemCSS(isDisabled, isSelected)}
      href={isDisabled ? undefined : href}
      {...others}
    >
      <BaseItem
        elemBefore={elemBefore}
        elemAfter={elemAfter}
        description={description}
      >
        {children}
      </BaseItem>
    </Tag>
  );
};

export const CustomItem = ({
  component: Component,
  isDisabled,
  isSelected,
  ...rest
}: CustomItemProps) => {
  if (!Component) {
    return null;
  }

  return (
    <ClassNames>
      {({ css }) => (
        <Component wrapperClass={css(customItemCSS(isDisabled, isSelected))}>
          <BaseItem {...rest} />
        </Component>
      )}
    </ClassNames>
  );
};
