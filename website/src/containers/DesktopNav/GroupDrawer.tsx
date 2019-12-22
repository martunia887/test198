import React from 'react';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import { AkCustomDrawer } from '@atlaskit/navigation';

import { AtlaskitIcon } from '../../components/AtlaskitIcon';

import DefaultNav from './navigations/Default';

export type Props = {
  closeDrawer: (e: React.MouseEvent<HTMLElement>) => void;
  isOpen: boolean;
  pathname: string;
};

const GroupDrawer: React.StatelessComponent<Props> = ({
  closeDrawer,
  isOpen,
  pathname,
}: Props) => (
  <AkCustomDrawer
    backIcon={<ArrowLeftIcon label="go back" />}
    isOpen={isOpen}
    key="groups"
    onBackButton={closeDrawer}
    primaryIcon={<AtlaskitIcon monochrome />}
  >
    <DefaultNav onClick={closeDrawer} pathname={pathname} />
  </AkCustomDrawer>
);

export default GroupDrawer;
