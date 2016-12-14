import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class RowsPerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowOptions: [
        15,
        30,
        80,
      ],
    };
  }

  render() {
    return (
      <div>
        Rows per page: {this.props.numRows}
        <DropDownMenu>
          {this.state.rowOptions.map(opt =>
            <MenuItem
              onClick={this.props.changeNumRows.bind(null, opt)}
              key={opt}
              value={opt}
              primaryText={opt.toString()} />
          )}
        </DropDownMenu>
      </div>
    );
  }
}

export default RowsPerPage;
