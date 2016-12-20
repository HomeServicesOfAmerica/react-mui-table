import React from 'react';

import Delete from './Delete';
import Filter from './Filter';

const Masthead = ({ itemSelectedCount, handleDeletePointer, filters, handleFilter }) => {
  if (itemSelectedCount) {
    return (
      <Delete
        itemSelectedCount={itemSelectedCount}
        handleDeletePointer={handleDeletePointer} />
    );
  }
  return (
    <Filter
      filters={filters}
      handleFilter={handleFilter} />
  );
};

export default Masthead;
