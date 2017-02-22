// @flow
import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { rowsPerPageStyles } from './styles';
import type { RowsPerPageProps, RowsPerPageState, MenuChangeHandler } from './types';

class RowsPerPage extends Component {
  props: RowsPerPageProps
  state: RowsPerPageState = {
    rowOptions: [
      15,
      25,
      50,
    ],
  };

  menuChangeHandler: MenuChangeHandler = (evt, key, value) => {
    this.props.changeRowsPerPage(value);
  }

  render() {
    return (
      <div style={rowsPerPageStyles.rowsPerPage}>
        <span style={rowsPerPageStyles.rowsText}>
          Rows per page:
        </span>
        <DropDownMenu
          value={this.props.rows}
          style={rowsPerPageStyles.dropDownMenu}
          labelStyle={rowsPerPageStyles.dropDownMenu}
          onChange={this.menuChangeHandler}
          underlineStyle={rowsPerPageStyles.underlineStyle}>
          {this.state.rowOptions.map(opt =>
            <MenuItem
              key={opt}
              value={opt}
              primaryText={opt.toString()} />
          )}
        </DropDownMenu>
        {this.props.paginationText}
      </div>
    );
  }
}

export default RowsPerPage;
