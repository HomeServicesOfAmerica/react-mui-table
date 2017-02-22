// @flow
import React from 'react';

import Delete from './Delete';
import Filter from './Filter';
import type { ActionBarProps } from './types';

const ActionBar = ({ itemSelectedCount, handleDelete, filters, handleFilter }: ActionBarProps) => {
  if (itemSelectedCount) {
    return (
      <Delete
        itemSelectedCount={itemSelectedCount}
        handleDelete={handleDelete} />
    );
  }
  if (filters.length === 0) return null;

  return (
    <Filter
      filters={filters}
      handleFilter={handleFilter} />
  );
};

export default ActionBar;
