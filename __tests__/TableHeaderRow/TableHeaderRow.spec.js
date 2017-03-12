import React from 'react';
import expect from 'expect';

import mount from '../testUtil/mountwithMUIContext';
import TableHeaderRow from '../../src/components/TableHeaderRow';

const mockedProps = {
  item: {
    validated: false,
    uniqueString: 1,
    pets: ['dog', 'cat'],
    phone: 'cell',
    pathToAvatar: `http://www.notarealthing.com/u/randomAvatar`,
  },
  avatar: 'pathToAvatar',
  columns: [
    {
      label: 'Pets',
      sortable: false,
      format: item => item.join(', ').toUpperCase(),
      key: 'pets',
    },
    {
      label: 'Phone',
      sortable: true,
      key: 'phone',
    },
  ],
  currentSort: {
    label: 'Pets',
    direction: 'ASC',
  },
  displayColumn: expect.createSpy().andReturn(false),
  displayAvatar: expect.createSpy().andReturn(false),
  handleSelectAll: expect.createSpy(),
  handleSort: expect.createSpy(),
  allSelected: true,
  actionsEnabled: false,
  sortEnabled: false,
};

describe('TableHeaderRow component', () => {
  let MountedTableHeaderRow;

  it('mounts successfully', () => {
    MountedTableHeaderRow = mount(<TableHeaderRow {...mockedProps} />);
    expect(MountedTableHeaderRow).toExist();
    expect(MountedTableHeaderRow.length).toBe(1);
  });

  it('always renders a checkbox that correctly handles checked state', () => {
    expect(MountedTableHeaderRow.children().length).toBe(1);
    const TableRowColumn = MountedTableHeaderRow.children();
    expect(TableRowColumn.at(0).name()).toBe('TableHeaderColumn');
    expect(TableRowColumn.at(0).length).toBe(1);
    expect(TableRowColumn.at(0).childAt(0).name()).toBe('Checkbox');
    expect(TableRowColumn.at(0).childAt(0).props().checked)
      .toBe(MountedTableHeaderRow.props().allSelected);
    MountedTableHeaderRow.setProps({ allSelected: !MountedTableHeaderRow.props().allSelected });
    expect(TableRowColumn.childAt(0).props().checked)
      .toBe(MountedTableHeaderRow.props().allSelected);
  });

  it('renders an empty TableHeaderColumn if actionsEnabled is true', () => {
    MountedTableHeaderRow.setProps({ actionsEnabled: true });
    const TableRowColumns = MountedTableHeaderRow.children();
    expect(TableRowColumns.length).toBe(2);
    expect(TableRowColumns.at(1).name()).toBe('TableHeaderColumn');
    expect(TableRowColumns.at(1).children().length).toBe(0);
  });

  it('renders an empty TableHeaderColumn if avatar exists and displayAvatar returns true', () => {
    mockedProps.displayAvatar.andReturn(true);
    MountedTableHeaderRow.setProps({ actionsEnabled: false });
    const TableRowColumns = MountedTableHeaderRow.children();
    expect(TableRowColumns.length).toBe(2);
    expect(TableRowColumns.at(1).name()).toBe('TableHeaderColumn');
    expect(TableRowColumns.at(1).children().length).toBe(0);
  });

  it('renders a SortableTableHeaderColumn for each of the item\'s columns', () => {
    mockedProps.displayAvatar.andReturn(false);
    mockedProps.displayColumn.andReturn(true);
    MountedTableHeaderRow.update();
    const TableRowColumns = MountedTableHeaderRow.children();
    expect(TableRowColumns.length).toBe(3);
    const currentProps = MountedTableHeaderRow.props();

    // first
    const firstExpectedProps = {
      fieldKey: currentProps.columns[0].key,
      sortEnabled: currentProps.sortEnabled,
      handleSort: currentProps.handleSort,
      currentSort: currentProps.currentSort,
      ...currentProps.columns[0],
    };
    delete firstExpectedProps.key;
    expect(TableRowColumns.at(1).props()).toInclude(firstExpectedProps);

    // second
    const secondExpectedProps = {
      fieldKey: currentProps.columns[1].key,
      sortEnabled: currentProps.sortEnabled,
      handleSort: currentProps.handleSort,
      currentSort: currentProps.currentSort,
      ...currentProps.columns[1],
    };
    delete secondExpectedProps.key;
    expect(TableRowColumns.at(2).props()).toInclude(secondExpectedProps);
  });
});
