import React from 'react';

import Delete from './Delete';
import Filter from './Filter';

const Masthead = props =>
  !props.itemsSelected.length ?
    <Filter itemsSelected={props.itemsSelected} filters={props.filters} /> :
    <Delete itemsSelected={props.itemsSelected} handleDelete={props.handleDelete} />;

export default Masthead;
