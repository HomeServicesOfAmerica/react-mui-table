import React from 'react';
import Paper from 'material-ui/Paper';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';

const styles = {
  marginBottom: '15px',
};

const Search = props =>
  <Paper zDepth={2} style={styles}>
    <SearchIcon />
    <TextField hintText={`Search All ${props.tableName}`} onChange={props.handleSearch} />
  </Paper>;

export default Search;
