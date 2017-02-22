// @flow
import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

import { filterStyles } from './styles';
import chunkArray from '../../util/chunkArray';
import type { NoArgsNoReturn } from '../../../flow/common-types';
import type { FilterState, FilterProps, GetCheckedOptions, UpdateFilter } from './types';

class Filter extends Component {
  props: FilterProps
  state: FilterState = {
    opsVisible: false,
  };

  getCheckedOptions: GetCheckedOptions = label =>
    Array.prototype.slice.call(
      document.querySelectorAll(`[data-label="${label}"]:checked`)
    );

  updateFilter: UpdateFilter = (event) => {
    const { label, key } = event.target.dataset;
    const options = this.getCheckedOptions(label).map(element => element.dataset.value);
    this.props.handleFilter(key, options);
  };

  toggleVisibility: NoArgsNoReturn = () => this.setState({ opsVisible: !this.state.opsVisible });

  render() {
    const { filters } = this.props;
    return (
      <div style={filterStyles.container}>
        <div
          style={filterStyles.filterBar}
          onClick={this.toggleVisibility}>
          <FlatButton
            label='filter'
            primary />
        </div>
        {this.state.opsVisible && (
          <div style={filterStyles.filterOptions}>
            {filters.map(col => (
              <div key={col.label} style={filterStyles.checkboxColumn}>
                <h4 style={filterStyles.header}>{col.label}</h4>
                {chunkArray(col.options).map((optionArray, index) => (
                  <div key={index} style={filterStyles.checkboxColumn}>
                    {optionArray.map(option => (
                      <Checkbox
                        style={filterStyles.checkbox}
                        key={option}
                        data-label={col.label}
                        data-key={col.key}
                        data-value={option}
                        label={option}
                        onCheck={this.updateFilter} />
                    ))}
                  </div>
                ))}
              </div>
            ))}
            <span style={filterStyles.floatClear} />
          </div>
        )}
      </div>
    );
  }
}

export default Filter;
