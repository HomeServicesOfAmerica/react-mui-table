// @flow
import type {
  ActionConfig,
  ColumnConfig,
  FilterConfig,

  PreviousPage,
  NextPage,
  ChangeRowsPerPage,

  HandleFilter,
  HandleSort,
  CurrentSort,
} from '../../../flow/common-types';

export type MaterialTableState = {
  selections: Array<boolean>,
  countSelected: number,
  allSelected: boolean,
  viewSize: string | void,
};

export type MaterialTableProps = {
  items: Array<Object>,
  itemUniqueId: string,
  filters?: Array<FilterConfig>,
  avatar?: string,
  actions?: Array<ActionConfig>,
  columns: Array<ColumnConfig>,
  onItemClick?: (item: Object) => void,

  hasNextPage?: boolean,
  hasPreviousPage?: boolean,
  paginationText?: string,
  previousPage?: PreviousPage,
  nextPage?: NextPage,

  rows: number,
  rowOptions?: Array<number>,
  changeRowsPerPage?: ChangeRowsPerPage,
  currentSort?: CurrentSort,
  handleSort?: HandleSort,
  handleDelete?: (itemToDelete: Array<Object>) => void,
  handleFilter?: HandleFilter,
  handleSearch?: (query: string) => void,

  containerClass?: string,
  containerStyle?: InlineStyles,
  tableName?: string,
}


// Internal methods
export type HandleSelect = (event: CustomSyntheticEvent, checked: boolean) => void
export type HandleResize = (active: Array<string|void>) => void
export type HandleRowClick = (rowId: number, colId: number) => void|null
export type OnSearch = (event: CustomSyntheticEvent) => void
export type DisplayColumn = (column: ColumnConfig|Object) => boolean|void
export type DisplayAvatar = (...args: Array<void>) => boolean|void
export type ToggleAll = (allSelected: boolean) => void
