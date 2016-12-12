import React from 'react';
import {
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const Header = (data) => {
  return (
    <TableHeader>
      <TableRow>
        {data.map(data => <TableHeaderColumn key={data.title}>{data.title}</TableHeaderColumn> )}
      </TableRow>
    </TableHeader>
  );
}

export default Header;
