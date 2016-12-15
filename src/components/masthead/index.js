import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import Delete from './Delete';
import Filter from './Filter';

const styles = StyleSheet.create({
  masthead: {
    borderBottom: '1px solid rgb(224, 224, 224)',
  },
});

const Masthead = props =>
  !props.itemsSelected.length ?
    <Filter itemsSelected={props.itemsSelected} /> :
    <Delete itemsSelected={props.itemsSelected} deleteRecords={props.deleteRecords} />;

export default Masthead;
