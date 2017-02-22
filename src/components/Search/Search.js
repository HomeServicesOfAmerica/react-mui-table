// @flow
import React from 'react';
import Paper from 'material-ui/Paper';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';

import { searchStyles } from './styles';
import type { SearchProps } from './types';

const Search = ({ tableName, onSearch }: SearchProps) => (
  <Paper
    zDepth={2}
    style={searchStyles.searchBar}>
    <SearchIcon
      style={searchStyles.icon} />
    <TextField
      style={searchStyles.input}
      underlineShow={false}
      hintText={`Search All ${tableName}`}
      onChange={onSearch} />
  </Paper>
);

export default Search;
