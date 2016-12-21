import React from 'react';

import Delete from './Delete';
import Filter from './Filter';

const Masthead = (props) => {
  if (props.itemsSelected.length) {
    return <Delete itemsSelected={props.itemsSelected} handleDelete={props.handleDelete} />;
  }
  return (
    <Filter
      itemsSelected={props.itemsSelected}
      filters={props.filters}
      handleFilter={props.handleFilter} />
  );
};

export default Masthead;
