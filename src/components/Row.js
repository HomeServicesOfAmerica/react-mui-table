import React, { PureComponent } from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class Row extends PureComponent {
  render() {
    let tableCols = [],
     { data } = this.props;

    for(let key in data) {
      tableCols.push(
        <TableRowColumn key={key} id={key}>
          {data[key]}
        </TableRowColumn>
      );
    }

    return (
      <TableRow>
        {tableCols}
      </TableRow>
    );
  }
}
