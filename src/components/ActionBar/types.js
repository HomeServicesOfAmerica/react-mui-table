// @flow
import type { HandleFilter } from '../../../flow/common-types';

export type ActionBarProps = {
  itemSelectedCount: number,
  handleDelete: Function,
  filters: Array<Object>,
  handleFilter: Function,
}

export type DeleteProps = {
  itemSelectedCount: number,
  handleDelete: Function,
}

export type FilterState = {
  opsVisible: boolean,
}

export type FilterProps = {
  filters: Array<Object>,
  handleFilter: HandleFilter,
}

// Internal Filter Methods
export type GetCheckedOptions = (label: string) => Array<Object>;
export type UpdateFilter = (event: CustomSyntheticEvent) => void;
