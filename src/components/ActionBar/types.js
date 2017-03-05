// @flow
import type { HandleFilter, FilterConfig } from '../../../flow/common-types';

export type ActionBarProps = {
  itemSelectedCount: number,
  deleteEnabled: boolean,
  handleDelete: Function,
  filters: Array<Object>,
  handleFilter: Function,
  filterEnabled: boolean,
}

export type DeleteProps = {
  itemSelectedCount: number,
  handleDelete: Function,
}

export type FilterState = {
  opsVisible: boolean,
}

export type FilterProps = {
  filters: Array<FilterConfig>,
  handleFilter: HandleFilter,
}

// Internal Filter Methods
export type GetCheckedOptions = (label: string) => Array<Object>;
export type UpdateFilter = (event: CustomSyntheticEvent) => void;
