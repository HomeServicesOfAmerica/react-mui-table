import React from 'react';
import expect from 'expect';

import mount from '../testUtil/mountwithMUIContext';
import TableBodyRow from '../../src/components/TableBodyRow';

const enabledSpy = expect.createSpy();
const mockedProps = {
  actions: [
    {
      text: 'Edit',
      handler: expect.createSpy(),
      enabled: (item) => {
        enabledSpy(item);
        return item.validated;
      },
      icon: <span> icon thing </span>,
    },
  ],
  item: {
    validated: false,
    uniqueString: 1,
    pets: ['dog', 'cat'],
    phone: 'cell',
    pathToAvatar: `http://www.notarealthing.com/u/randomAvatar`,
  },
  itemUniqueId: 'uniqueString',
  tableIdx: 1,
  avatar: 'pathToAvatar',
  columns: [
    {
      label: 'Pets',
      sortable: true,
      format: item => item.join(', ').toUpperCase(),
      key: 'pets',
    },
    {
      label: 'Phone',
      sortable: true,
      key: 'phone',
    },
  ],
  displayColumn: expect.createSpy().andReturn(false),
  displayAvatar: expect.createSpy().andReturn(false),
  handleSelect: expect.createSpy(),
  selections: [false, true],
  actionsEnabled: false,
};

const tableRowColumnWithOneChild = node => node.name() === 'TableRowColumn'
  && node.children().length === 1;

describe('TableBodyRow component', () => {
  let MountedTableBodyRow;

  it('mounts successfully', () => {
    MountedTableBodyRow = mount(<TableBodyRow {...mockedProps} />);
    expect(MountedTableBodyRow).toExist();
    expect(MountedTableBodyRow.length).toBe(1);
  });

  it('always renders a checkbox that correctly handles checked state', () => {
    let currentProps;
    MountedTableBodyRow.setProps({ selected: [true, true] });
    expect(MountedTableBodyRow.children().length).toBe(1);
    const TableRowColumn = MountedTableBodyRow.children();
    expect(TableRowColumn.everyWhere(tableRowColumnWithOneChild)).toBe(true);
    expect(MountedTableBodyRow.childAt(0).childAt(0).name()).toBe('Checkbox');
    currentProps = MountedTableBodyRow.props();
    expect(TableRowColumn.childAt(0).props().checked)
      .toBe(currentProps.selections[currentProps.tableIdx]);
    MountedTableBodyRow.setProps({ selected: [false, false] });
    currentProps = MountedTableBodyRow.props();
    expect(TableRowColumn.childAt(0).props().checked)
      .toBe(currentProps.selections[currentProps.tableIdx]);
  });

  it('renders an ActionMenu with correct props if actionsEnabled is true', () => {
    MountedTableBodyRow.setProps({ actionsEnabled: true });
    const TableRowColumns = MountedTableBodyRow.children();
    expect(TableRowColumns.length).toBe(2);
    expect(TableRowColumns.everyWhere(tableRowColumnWithOneChild)).toBe(true);
    expect(TableRowColumns.at(0).childAt(0).name()).toBe('Checkbox');
    expect(TableRowColumns.at(1).childAt(0).name()).toBe('ActionMenu');
    const currentProps = MountedTableBodyRow.props();
    const expectedProps = {
      actions: currentProps.actions,
      item: currentProps.item,
      itemId: currentProps.item[currentProps.itemUniqueId],
    };
    expect(TableRowColumns.at(1).childAt(0).props()).toEqual(expectedProps);
  });

  it('renders an Avatar if avatar exists and displayAvatar returns true', () => {
    mockedProps.displayAvatar.andReturn(true);
    MountedTableBodyRow.setProps({ actionsEnabled: false });
    const TableRowColumns = MountedTableBodyRow.children();
    expect(TableRowColumns.length).toBe(2);
    expect(TableRowColumns.everyWhere(tableRowColumnWithOneChild)).toBe(true);
    expect(TableRowColumns.at(0).childAt(0).name()).toBe('Checkbox');
    expect(TableRowColumns.at(1).childAt(0).name()).toBe('Avatar');
    const currentProps = MountedTableBodyRow.props();
    expect(TableRowColumns.at(1).childAt(0).props().src)
      .toEqual(currentProps.item[currentProps.avatar]);
    expect(TableRowColumns.at(1).childAt(0).props().icon.type.displayName)
      .toEqual('SocialPerson');
  });

  it('renders item\'s columns if displayColumn returns true', () => {
    mockedProps.displayAvatar.andReturn(false);
    mockedProps.displayColumn.andReturn(true);
    MountedTableBodyRow.update();
    const TableRowColumns = MountedTableBodyRow.children();
    expect(TableRowColumns.length).toBe(3);
    expect(TableRowColumns.everyWhere(tableRowColumnWithOneChild)).toBe(true);
    expect(TableRowColumns.at(0).childAt(0).name()).toBe('Checkbox');
    expect(TableRowColumns.at(1).childAt(0).type()).toBe('span');
    expect(TableRowColumns.at(2).childAt(0).type()).toBe('span');
    const currentProps = MountedTableBodyRow.props();
    // First column provides a format function
    expect(TableRowColumns.at(1).childAt(0).text())
      .toBe(currentProps.columns[0].format(currentProps.item[currentProps.columns[0].key]));

    // Second column does not
    expect(TableRowColumns.at(2).childAt(0).text())
      .toBe(currentProps.item[currentProps.columns[1].key]);
  });
});
