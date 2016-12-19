import React from 'react';

import Delete from './Delete';
import Filter from './Filter';

const Masthead = props =>
  !props.itemsSelected.length ?
    <Filter itemsSelected={props.itemsSelected} /> :
    <Delete itemsSelected={props.itemsSelected} deleteRecords={props.deleteRecords} />;

export default Masthead;
