import React, { PureComponent } from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

const NOOP = () => {};

const styles = {
  color: 'rgb(158, 158, 158)',
  textTransform: 'uppercase',
  fontSize: '18px',
  fontWeight: 'normal',
  borderBottom: '1px solid rgb(224, 224, 224)',
};

export default class ListColumns extends PureComponent {
  constructor(props) {
    super(props);

    // TODO: Verify all input so that something can't be 'sortable' but not have sort options
    // Create a property in state for each sortOption
    this.state = {
      ...this.props.sortOptions.reduce((acc, opts) => {
        acc[opts.label] = opts.options;
        return acc;
      }, {}),
    };

    // TODO: Start using arrow function for methods (requires babel addition)
    this.cycleSortOption = this.cycleSortOption.bind(this);
    this.generateSortPrefix = this.generateSortPrefix.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Make sure sort configs are in state
    nextProps.sortOptions.forEach((opt) => {
      if (this.state[opt.label] === undefined) {
        this.setState({ [opt.label]: opt.options });
      }
    });
  }

  // Move front element to the end and call handleSort with new value
  // Current sort option is always in position 0
  cycleSortOption(label) {
    if (!Array.isArray(this.state[label])) return;

    const slicedArr = this.state[label].slice();
    slicedArr.push(slicedArr.shift());
    this.setState(
      { [label]: slicedArr },
      () => this.props.handleSort('label', this.state[label][0])
    );
  }

  // This can be refactored to embed an arrow later.
  generateSortPrefix(arrayOfPrefix) {
    if (!(Array.isArray(arrayOfPrefix) && typeof arrayOfPrefix[0] === 'string')) {
      return '';
    }
    return arrayOfPrefix[0];
  }

  // TODO: Refactor to take function creation out of render method
  render() {
    const { columns } = this.props;
    return (
      <ListItem style={styles}>
        <Checkbox checked={this.props.selectedAll} onCheck={this.props.handleSelectAll} />
        {columns.map(column => (
          <span
            key={column.key}
            onClick={column.sortable ? () => this.cycleSortOption(column.label) : NOOP}>
            {` ${this.generateSortPrefix(this.state[column.label])} ${column.label} `}
          </span>
        ))}
      </ListItem>
    );
  }
}
