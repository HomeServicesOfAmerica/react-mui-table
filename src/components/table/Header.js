import React from 'react';
import {
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';

const Header = props =>
  <TableHeader>
    <TableRow>
      {props.map(data => <TableHeaderColumn key={data.title}>{data.title}</TableHeaderColumn>)}
    </TableRow>
  </TableHeader>;

export default Header;
