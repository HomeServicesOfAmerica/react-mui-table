import React, { PureComponent } from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  borderBottom: '1px solid rgb(224, 224, 224)',
};

class Filter extends PureComponent {
  constructor(props) {
    super(props);

    // TODO: Verify all input so that something can't be 'filterable' but not have filter options
    // Create a property in state for each filter
    this.state = {
      ...this.props.filters.reduce((acc, filter) => {
        acc[filter.label] = [];
        return acc;
      }, {}),
    };
  }

  componentWillReceiveProps(nextProps) {
    // Make sure filter configs are in state
    nextProps.filters.forEach((filter) => {
      if (this.state[filter.label] === undefined) {
        this.setState({ [filter.label]: [] });
      }
    });
  }

  updateFilter(label, option, active) {
    const currentLabelFilter = this.state[label];
    let newLabelFilter;
    if (active) {
      newLabelFilter = [...currentLabelFilter, option];
    } else {
      newLabelFilter = currentLabelFilter.filter(cur => cur !== option);
    }

    if (newLabelFilter.length === 0) newLabelFilter = null;

    this.setState({ [label]: newLabelFilter || [] });
    this.props.handleFilter(label, newLabelFilter);
  }

  render() {
    return (
      <ListItem
        style={styles}
        primaryText='FILTER'
        nestedItems={[
          this.props.filters.length && (
            <ListItem key={1} style={styles}>
              {this.props.filters.map((filter, fKey) => (
                <div key={fKey}>
                  <h3> {filter.label} </h3>
                  {filter.options.map((option, oKey) => (
                    <Checkbox
                      key={oKey}
                      // checked={this.state[filter.label][option]}
                      onCheck={(evt, checked) => this.updateFilter(filter.label, option, checked)}
                      label={option} />
                    ))}
                </div>
                )
              )}
            </ListItem>
          ),
        ]} />
    );
  }
}

export default Filter;
