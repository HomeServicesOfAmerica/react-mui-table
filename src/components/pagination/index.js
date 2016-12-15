import React, { PureComponent } from 'react';
import { Row, Col as Column } from 'react-flexbox-grid';
import { ListItem } from 'material-ui/List';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

import RowsPerPage from './RowsPerPage';

class Pagination extends PureComponent {
  render() {
    return (
      <ListItem>
        <Row>
          <Column
            xsOffset={8}
            xs={2}>
            <RowsPerPage
              changeNumRows={this.props.changeNumRows}
              numRows={this.props.numRows}/>
          </Column>

          <Column
            xs={2}>
            <ArrowLeft
              onClick={this.props.previousPage} />
            <ArrowRight
              onClick={this.props.nextPage} />
          </Column>
        </Row>
      </ListItem>
    );
  }
}

export default Pagination;
