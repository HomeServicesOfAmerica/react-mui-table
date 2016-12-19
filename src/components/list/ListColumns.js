import React from 'react';
// import { Row, Col as Column } from 'react-flexbox-grid';
import { ListItem } from 'material-ui/List';

import ListCheckbox from './ListCheckbox';

const styles = {
  color: 'rgb(158, 158, 158)',
  textTransform: 'uppercase',
  fontSize: '18px',
  fontWeight: 'normal',
  borderBottom: '1px solid rgb(224, 224, 224)',
};

const ListColumns = props =>
  <ListItem style={styles}>
    <div>
      <ListCheckbox />
      {props.columns.map(column =>
        <div key={column.key} xs>
          {column.label}
        </div>
      )}
    </div>
  </ListItem>;

export default ListColumns;
