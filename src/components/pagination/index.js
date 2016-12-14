import React, { PureComponent } from 'react';
// import { StyleSheet, css } from 'aphrodite';
import { ListItem } from 'material-ui/List';
import { Row, Col as Column } from 'react-flexbox-grid';

import RowsPerPage from './RowsPerPage';


// const styles = StyleSheet.create({
//   pagination: {
//   },
// });

class Pagination extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  nextPage(pageNum) {
    if (pageNum !== this.state.currentPage) {
      // this.setState ({
      //   currentPage: this.state.currentPage++
      // });
    }
  }

  previousPage(pageNum) {
    if (pageNum !== this.state.currentPage) {
      // this.setState ({
      //   currentPage: this.state.currentPage--
      // });
    }
  }

  render() {
    return (
      <ListItem>
        <Row>
          <Column
            xsOffset={9}
            xs={3}>
            <RowsPerPage />
          </Column>

        </Row>
      </ListItem>
    );
  }
}

export default Pagination;
