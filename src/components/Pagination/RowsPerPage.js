// @flow
import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import isEqual from 'lodash.isequal';

import { rowsPerPageStyles } from './styles';
import type { RowsPerPageProps, RowsPerPageState, MenuChangeHandler } from './types';

class RowsPerPage extends Component {
  props: RowsPerPageProps
  state: RowsPerPageState = {
    rowOptions: this.props.rowOptions || [
      15,
      25,
      50,
    ],
  };

  componentWillReceiveProps(nextProps: RowsPerPageProps) {
    if (isEqual(this.state.rowOptions, nextProps.rowOptions)) {
      this.setState({ rowOptions: nextProps.rowOptions });
    }
  }

  menuChangeHandler: MenuChangeHandler = (evt, key, value) => {
    if (this.props.changeRowsPerPage) this.props.changeRowsPerPage(value);
  }

  render() {
    const { changeRowsPerPage, paginationText, rows } = this.props;
    return (
      <div style={rowsPerPageStyles.rowsPerPage}>
        {changeRowsPerPage && (
          <span style={rowsPerPageStyles.rowsText}>
            Rows per page:
          </span>
        )}
        {changeRowsPerPage && (
          <DropDownMenu
            value={rows}
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
        )}
        <span>{paginationText}</span>
      </div>
    );
  }
}

export default RowsPerPage;
