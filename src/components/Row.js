import React, { PureComponent } from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class Row extends PureComponent {
  render() {
    const tableCols = [];
    const { data, ...muiProps } = this.props;

    for (const key in data) {
      tableCols.push(
        <TableRowColumn key={key} id={key}>
          {data[key]}
        </TableRowColumn>
      );
    }

    return (
      <TableRow>
        {muiProps.children[0]}
        {tableCols}
      </TableRow>
    );
  }
}
