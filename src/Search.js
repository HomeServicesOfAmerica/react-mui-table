import React from 'react';
import Paper from 'material-ui/Paper';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';

const styles = {
  searchBar: {
    marginBottom: 15,
  },
  icon: {
    width: 21,
    color: 'rgba(0, 0, 0, 0.54)',
    padding: '0 5px 0 21px',
    position: 'relative',
    top: 7,
  },
  input: {
    color: 'rgba(0, 0, 0, .54)',
    fontWeight: '400',
    fontSize: 14,
    width: 'calc(100% - 50px)',
  },
};

// TODO: active state styles for search and cancel icons
// TODO: Debounce / throttle search
const Search = ({ tableName, handleSearch }) =>
  <Paper
    zDepth={2}
    style={styles.searchBar}>
    <SearchIcon
      style={styles.icon} />
    <TextField
      style={styles.input}
      underlineShow={false}
      hintText={`Search All ${tableName}`}
      onChange={e => handleSearch(e.target.value)} />
  </Paper>;

export default Search;
