import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import prefixer from '../../helpers/prefixer';

const styles = prefixer.prefix({
  rowsPerPage: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0 10px',
  },
  dropDownMenu: {
    fontSize: 12,
    fontWeight: '400',
    height: 'auto',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  underlineStyle: {
    border: 'none',
  },
});

class RowsPerPage extends Component {
  state = {
    rowOptions: [
      15,
      25,
      50,
    ],
  };

  menuChangeHandler = (evt, key, value) => {
    this.props.changeRowsPerPage(value);
  }

  render() {
    return (
      <div style={styles.rowsPerPage}>
        <span style={styles.rowsText}>
          Rows per page:
        </span>
        <DropDownMenu
          value={this.props.rows}
          style={styles.dropDownMenu}
          labelStyle={styles.dropDownMenu}
          onChange={this.menuChangeHandler}
          underlineStyle={styles.underlineStyle}>
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
