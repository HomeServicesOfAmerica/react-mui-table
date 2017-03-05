// @flow
import type { MaterialTableProps } from '../components/MaterialTable/types';

type FeatureToggle = (props: MaterialTableProps) => boolean

export const isSearchEnabled: FeatureToggle = props =>
  typeof props.handleSearch === 'function';

export const isDeleteEnabled: FeatureToggle = props =>
  typeof props.handleDelete === 'function';

export const isSortEnabled: FeatureToggle = props =>
  typeof props.handleSort === 'function'
  && props.columns.some(col => col.sortable);

export const isFilterEnabled: FeatureToggle = props =>
  typeof props.handleFilter === 'function'
  && Array.isArray(props.filters)
  && props.filters.length > 0
  && props.columns.some(col => col.filterable);

export const areActionsEnabled: FeatureToggle = props =>
  Array.isArray(props.actions)
  && props.actions.length > 0
  && !props.actions.some(({ handler }) => typeof handler !== 'function');

export const isPaginationEnabled: FeatureToggle = props =>
  props.hasNextPage !== undefined
  && props.hasPreviousPage !== undefined
  && typeof props.paginationText === 'string'
  && typeof props.previousPage === 'function'
  && typeof props.nextPage === 'function';
