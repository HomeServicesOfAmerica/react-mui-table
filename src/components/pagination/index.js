import React, { PureComponent } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { ListItem } from 'material-ui/List';

import RowsPerPage from './RowsPerPage';


const styles = StyleSheet.create({
  pagination: {
  },
});

// const initialState = {
//   currentPage: 1
// };

class Pagination extends PureComponent {
  constructor(props) {
    super(props);

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  nextPage() {

  }

  previousPage() {

  }

  render() {
    return (
      <ListItem className={css(styles.pagination)}>
        <RowsPerPage />
      </ListItem>
    );
  }
}

export default Pagination;
