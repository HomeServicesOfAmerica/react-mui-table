import React, { PureComponent } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { ListItem } from 'material-ui/List';

import RowsPerPage from './RowsPerPage';


const styles = StyleSheet.create({
  pagination: {
  },
});

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
      <ListItem className={css(styles.pagination)}>
        <RowsPerPage />
      </ListItem>
    );
  }
}

export default Pagination;
