import React from 'react';
import Paper from 'material-ui/Paper';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';

const styles = {
  marginBottom: '15px',
};

// TODO: Debounce / throttle search
const Search = props =>
  <Paper zDepth={2} style={styles}>
    <SearchIcon />
    <TextField
      hintText={`Search All ${props.tableName}`}
      onChange={e => props.handleSearch(e.target.value)} />
  </Paper>;

export default Search;
