import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Paper from 'material-ui/Paper';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';

const styles = StyleSheet.create({
  search: {
    marginBottom: '15px',
  },
});

const Search = props =>
  <Paper zDepth={2} className={css(styles.search)}>
    <SearchIcon />
    <TextField hintText={`Search All ${props.tableName}`} />
  </Paper>;

export default Search;
