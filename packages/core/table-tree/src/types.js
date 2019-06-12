// @flow
import { type Element } from 'react';
import type { Row } from './components/Row';

export type RowData = Object;

export type ItemsDataType = Array<RowData>;

export type LoadableItems = ?Array<RowData> | null;

export type RenderFunction = Object => Element<Row>;

export type CSSWidth = string | number;
