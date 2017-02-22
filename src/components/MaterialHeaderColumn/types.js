// @flow
import type { HandleSort, CurrentSort, FormatFunction } from '../../../flow/common-types';

export type MaterialHeaderColumnProps = {
  handleSort: HandleSort,
  currentSort: CurrentSort,
  key: string,
  fieldKey: string,

  // spread column properties
  label: string,
  sortable: boolean,
  filterable: boolean,
  format?: FormatFunction,
  colSpan?: number,
  xs?: boolean,
  sm?: boolean,
  md?: boolean,
  lg?: boolean,
  xl?: boolean,
  tooltip?: string,
}

// Internal methods
export type ColumnStyle = (...args: Array<void>) => {}
export type GetSortIcon = (...args: Array<void>) => React$Element<*>|null
export type IsCurrentSort = (...args: Array<void>) => boolean
export type IsSortable = (...args: Array<void>) => boolean
