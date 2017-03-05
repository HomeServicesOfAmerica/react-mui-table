import React from 'react';
import expect from 'expect';

import mount from '../testUtil/mountwithMUIContext';
import MaterialTable from '../../src/components/MaterialTable';

const mockedProps = {
  itemUniqueId: 'uniqueString',
  filters: [
    {
      label: 'Phone',
      key: 'phone',
      options: ['landline', 'cell'],
    },
  ],
  avatar: 'pathToAvatar',
  actions: [
    {
      text: 'Edit',
      action: 'edit',
      handler: expect.createSpy(),
      enabled: true,
      icon: <span> icon thing </span>,
    },
  ],
  items: [
    {
      validated: false,
      uniqueString: 1,
      pets: ['dog', 'cat'],
      phone: 'cell',
      pathToAvatar: `http://www.notarealthing.com/u/randomAvatar`,
    },
    {
      validated: true,
      uniqueString: 2,
      pets: ['parrot'],
      phone: 'landline',
      pathToAvatar: `http://www.notarealthing.com/u/randomAvatar`,
    },
  ],
  columns: [
    {
      label: 'Pets',
      sortable: true,
      filterable: true,
      format: item => item.join(', ').toUpperCase(),
      key: 'pets',
    },
    {
      label: 'Phone',
      sortable: true,
      filterable: true,
      key: 'phone',
    },
  ],
  onItemClick: expect.createSpy(),
  currentSort: {},
  handleSort: expect.createSpy(),
  handleDelete: expect.createSpy(),
  handleFilter: expect.createSpy(),
  handleSearch: expect.createSpy(),
  hasNextPage: false,
  hasPreviousPage: false,
  paginationText: `1-15 out of literally 1 billion`,
  rows: 15,
  nextPage: expect.createSpy(),
  previousPage: expect.createSpy(),
  changeRowsPerPage: expect.createSpy(),
};


describe('MaterialTable component', () => {
  let MountedMaterialTable;

  it('mounts successfully', () => {
    MountedMaterialTable = mount(<MaterialTable {...mockedProps} />);
    expect(MountedMaterialTable).toExist();
    expect(MountedMaterialTable.length).toBe(1);
  });

  it('Should render the search component with correct props if searchEnabled is true', () => {
    let Search;
    expect(MountedMaterialTable.instance().searchEnabled).toBe(true);
    Search = MountedMaterialTable.find('Search');
    const currentProps = MountedMaterialTable.props();
    expect(Search.length).toBe(1);
    const expectedProps = {
      tableName: currentProps.tableName || '',
      onSearch: MountedMaterialTable.instance().onSearch,
    };
    expect(Search.props()).toEqual(expectedProps);

    MountedMaterialTable.setProps({ handleSearch: false });
    expect(MountedMaterialTable.instance().searchEnabled).toBe(false);
    Search = MountedMaterialTable.find('Search');
    expect(Search.length).toBe(0);
  });

  it('Should render pagination with correct props if paginationEnabled is true', () => {
    let Pagination;
    expect(MountedMaterialTable.instance().paginationEnabled).toBe(true);
    Pagination = MountedMaterialTable.find('Pagination');
    const currentProps = MountedMaterialTable.props();
    expect(Pagination.length).toBe(1);
    const expectedProps = {
      hasNextPage: currentProps.hasNextPage,
      hasPreviousPage: currentProps.hasPreviousPage,
      paginationText: currentProps.paginationText,
      changeRowsPerPage: currentProps.changeRowsPerPage,
      rows: currentProps.rows,
      nextPage: MountedMaterialTable.instance().handleNextPage,
      previousPage: MountedMaterialTable.instance().handlePreviousPage,
      rowOptions: MountedMaterialTable.instance().rowOptions,
    };
    expect(Pagination.props()).toEqual(expectedProps);

    MountedMaterialTable.setProps({ hasNextPage: undefined });
    expect(MountedMaterialTable.instance().paginationEnabled).toBe(false);
    Pagination = MountedMaterialTable.find('Pagination');
    expect(Pagination.length).toBe(0);
  });

  it('Should render TableHeaderRow with correct props', () => {
    const TableHeaderRow = MountedMaterialTable.find('TableHeaderRow');
    const currentProps = MountedMaterialTable.props();
    const currentInstance = MountedMaterialTable.instance();
    expect(TableHeaderRow.length).toBe(1);
    const expectedProps = {
      handleSort: currentProps.handleSort,
      currentSort: currentProps.currentSort,
      columns: currentProps.columns,
      avatar: currentProps.avatar,
      allSelected: currentInstance.state.allSelected,
      sortEnabled: currentInstance.sortEnabled,
      actionsEnabled: currentInstance.actionsEnabled,
      handleSelectAll: currentInstance.handleSelectAll,
      displayColumn: currentInstance.displayColumn,
      displayAvatar: currentInstance.displayAvatar,
    };
    expect(TableHeaderRow.props()).toInclude(expectedProps);
  });

  it('Should render ActionBar with correct props', () => {
    const TableHeaderRow = MountedMaterialTable.find('ActionBar');
    const currentProps = MountedMaterialTable.props();
    const currentInstance = MountedMaterialTable.instance();
    expect(TableHeaderRow.length).toBe(1);
    const expectedProps = {
      itemSelectedCount: currentInstance.state.countSelected,
      deleteEnabled: currentInstance.deleteEnabled,
      handleDelete: currentInstance.handleDelete,
      filterEnabled: currentInstance.filterEnabled,
      filters: currentProps.filters,
      handleFilter: currentProps.handleFilter,
    };
    expect(TableHeaderRow.props()).toInclude(expectedProps);
  });

  it('Should render TableHeaderRow with correct props', () => {
    const TableHeaderRow = MountedMaterialTable.find('TableHeaderRow');
    const currentProps = MountedMaterialTable.props();
    const currentInstance = MountedMaterialTable.instance();
    expect(TableHeaderRow.length).toBe(1);
    const expectedProps = {
      sortEnabled: currentInstance.sortEnabled,
      actionsEnabled: currentInstance.actionsEnabled,
      allSelected: currentInstance.state.allSelected,
      handleSelectAll: currentInstance.handleSelectAll,
      handleSort: currentProps.handleSort,
      currentSort: currentProps.currentSort,
      columns: currentProps.columns,
      avatar: currentProps.avatar,
      displayColumn: currentInstance.displayColumn,
      displayAvatar: currentInstance.displayAvatar,
    };
    expect(TableHeaderRow.props()).toInclude(expectedProps);
  });

  it('Should render TableBodyRow with correct props', () => {
    const TableBodyRows = MountedMaterialTable.find('TableBodyRow');
    const currentProps = MountedMaterialTable.props();
    const currentInstance = MountedMaterialTable.instance();
    expect(TableBodyRows.length).toBe(currentProps.items.length);
    const expectedProps = {
      actions: currentProps.actions,
      item: currentProps.items[0],
      itemUniqueId: currentProps.itemUniqueId,
      tableIdx: 0,
      avatar: currentProps.avatar,
      columns: currentProps.columns,
      displayColumn: currentInstance.displayColumn,
      displayAvatar: currentInstance.displayAvatar,
      handleSelect: currentInstance.handleSelect,
      selected: currentInstance.state.selections[0],
      actionsEnabled: currentInstance.actionsEnabled,
    };
    expect(TableBodyRows.at(0).props()).toInclude(expectedProps);
  });
});
