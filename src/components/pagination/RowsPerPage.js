import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  rowsPerPage: {
    float: 'left',
    position: 'relative',
    top: -22,
    right: -14,
  },
  dropDownMenu: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  underlineStyle: {
    border: 'none',
  },
  rowsText: {
    position: 'relative',
    right: -2,
  },
};

class RowsPerPage extends Component {
  state = {
    rowOptions: [
      15,
      25,
      50,
    ],
  };

  render() {
    return (
      <div style={styles.rowsPerPage}>
        <span style={styles.rowsText}>
          Rows per page:
        </span>
        <DropDownMenu
          value={this.props.numRows}
          labelStyle={styles.dropDownMenu}
          underlineStyle={styles.underlineStyle}>
          {this.state.rowOptions.map(opt =>
            <MenuItem
              onClick={this.props.changeRowsPerPage.bind(null, opt)}
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
