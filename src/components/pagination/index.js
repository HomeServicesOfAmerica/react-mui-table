import React, { PureComponent } from 'react';
import { ListItem } from 'material-ui/List';
import { Row, Col as Column } from 'react-flexbox-grid';

import RowsPerPage from './RowsPerPage';

class Pagination extends PureComponent {
  render() {
    return (
      <ListItem>
        <Row>
          <Column
            xsOffset={9}
            xs={3}>
            <RowsPerPage
              changeNumRows={this.props.changeNumRows}
              numRows={this.props.numRows}/>
          </Column>
        </Row>
      </ListItem>
    );
  }
}

export default Pagination;
