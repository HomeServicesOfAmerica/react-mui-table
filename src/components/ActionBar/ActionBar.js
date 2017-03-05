// @flow
import React from 'react';

import Delete from './Delete';
import Filter from './Filter';
import type { ActionBarProps } from './types';

const ActionBar = ({
  itemSelectedCount,
  deleteEnabled,
  handleDelete,
  filterEnabled,
  filters,
  handleFilter,
}: ActionBarProps) => {
  if (itemSelectedCount && deleteEnabled) {
    return (
      <Delete
        itemSelectedCount={itemSelectedCount}
        handleDelete={handleDelete} />
    );
  }
  if (filterEnabled) {
    return (
      <Filter
        filters={filters}
        handleFilter={handleFilter} />
    );
  }
  return null;
};

export default ActionBar;
