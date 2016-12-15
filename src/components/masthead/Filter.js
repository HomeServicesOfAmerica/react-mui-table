import React, { PureComponent } from 'react';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';

class Filter extends PureComponent {
  render() {
    return (
      <span>
        <FilterIcon />
        FILTER
      </span>
    );
  }
}

export default Filter;
