import React from 'react';
import expect from 'expect';

import mount from '../testUtil/mountwithMUIContext';
import SortableTableHeaderColumn from '../../src/components/SortableTableHeaderColumn';

const ascSort = {
  label: 'Pets',
  direction: 'ASC',
};
const descSort = {
  label: 'Pets',
  direction: 'DESC',
};

const mockedProps = {
  fieldKey: 'pets',
  sortEnabled: true,
  handleSort: expect.createSpy(),
  currentSort: {},
  label: 'Pets',
  sortable: true,
  format: item => item.join(', ').toUpperCase(),
  key: 'pets',
  colSpan: 2,
};

describe('SortableTableHeaderColumn component', () => {
  let MountedSortableTableHeaderColumn;

  it('mounts successfully', () => {
    MountedSortableTableHeaderColumn = mount(<SortableTableHeaderColumn {...mockedProps} />);
    expect(MountedSortableTableHeaderColumn).toExist();
    expect(MountedSortableTableHeaderColumn.length).toBe(1);

    // Mock a handleSort function to ease testing
    mockedProps.handleSort.andCall((label, direction) => {
      MountedSortableTableHeaderColumn.setProps({ currentSort: { label, direction } });
    });
  });

  it('renders a TableHeaderColumn with the correct props', () => {
    const TableHeaderColumn = MountedSortableTableHeaderColumn.find('TableHeaderColumn');
    const currentProps = MountedSortableTableHeaderColumn.props();
    const expectedProps = {
      colSpan: currentProps.colSpan,
      tooltip: currentProps.tooltip,
      onClick: MountedSortableTableHeaderColumn.instance().toggleSort,
    };
    expect(TableHeaderColumn.props()).toInclude(expectedProps);
  });

  it('renders the current sort\'s correct Icon and properly invokes props.handleSort', () => {
    let Span;
    let Icon;
    let expectedArgs;
    let currentProps;

    // No sort
    expect(mockedProps.handleSort).toNotHaveBeenCalled();
    expect(MountedSortableTableHeaderColumn.children().length).toBe(1);

    Span = MountedSortableTableHeaderColumn.childAt(0);
    expect(Span.text()).toBe(MountedSortableTableHeaderColumn.props().label);


    // ASC
    MountedSortableTableHeaderColumn.instance().toggleSort();

    expect(mockedProps.handleSort.calls.length).toBe(1);
    currentProps = MountedSortableTableHeaderColumn.props();
    expectedArgs = [currentProps.label, 'ASC', currentProps.fieldKey];
    expect(mockedProps.handleSort.calls[0].arguments).toEqual(expectedArgs);
    expect(MountedSortableTableHeaderColumn.props().currentSort).toEqual(ascSort);
    expect(MountedSortableTableHeaderColumn.children().length).toBe(2);

    Icon = MountedSortableTableHeaderColumn.childAt(0);
    expect(Icon.name()).toBe('NavigationArrowUpward');

    Span = MountedSortableTableHeaderColumn.childAt(1);
    expect(Span.text()).toBe(MountedSortableTableHeaderColumn.props().label);


    // DESC
    MountedSortableTableHeaderColumn.instance().toggleSort();

    expect(mockedProps.handleSort.calls.length).toBe(2);
    currentProps = MountedSortableTableHeaderColumn.props();
    expectedArgs = [currentProps.label, 'DESC', currentProps.fieldKey];
    expect(mockedProps.handleSort.calls[1].arguments).toEqual(expectedArgs);

    expect(MountedSortableTableHeaderColumn.props().currentSort).toEqual(descSort);
    expect(MountedSortableTableHeaderColumn.children().length).toBe(2);

    Icon = MountedSortableTableHeaderColumn.childAt(0);
    expect(Icon.name()).toBe('NavigationArrowDownward');

    Span = MountedSortableTableHeaderColumn.childAt(1);
    expect(Span.text()).toBe(MountedSortableTableHeaderColumn.props().label);

    // null
    MountedSortableTableHeaderColumn.instance().toggleSort();

    expect(mockedProps.handleSort.calls.length).toBe(3);
    expect(mockedProps.handleSort.calls[2].arguments).toEqual([]);
  });

  it('doesn\'t trigger handleSort or render Icon when column isn\'t sortable', () => {
    MountedSortableTableHeaderColumn.setProps({ sortEnabled: false });
    const currentCallCount = mockedProps.handleSort.calls.length;
    MountedSortableTableHeaderColumn.instance().toggleSort();
    expect(currentCallCount).toEqual(mockedProps.handleSort.calls.length);

    expect(MountedSortableTableHeaderColumn.children().length).toBe(1);
    expect(MountedSortableTableHeaderColumn.childAt(0).type()).toBe('span');
  });
});
