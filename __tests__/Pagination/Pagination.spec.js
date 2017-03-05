import React from 'react';
import expect from 'expect';

import mount from '../testUtil/mountwithMUIContext';
import Pagination from '../../src/components/Pagination';

const mockedProps = {
  hasNextPage: false,
  hasPreviousPage: false,
  paginationText: `1-15 out of literally 1 billion`,
  rows: 15,
  nextPage: expect.createSpy(),
  previousPage: expect.createSpy(),
  changeRowsPerPage: expect.createSpy(),
};

describe('Pagination component', () => {
  let MountedPagination;

  it('mounts successfully', () => {
    MountedPagination = mount(<Pagination {...mockedProps} />);
    expect(MountedPagination).toExist();
    expect(MountedPagination.length).toBe(1);
    expect(MountedPagination.children().length).toBe(3);
  });

  it('should contain a RowsPerPage component with correct props passed in', () => {
    const MountedRowsPerPage = MountedPagination.childAt(0);
    expect(MountedRowsPerPage).toExist();
    expect(MountedRowsPerPage.name()).toBe('RowsPerPage');
    expect(MountedRowsPerPage.length).toBe(1);
    const expectedProps = {
      paginationText: mockedProps.paginationText,
      changeRowsPerPage: mockedProps.changeRowsPerPage,
      rows: mockedProps.rows,
      rowOptions: mockedProps.rowOptions,
    };
    expect(MountedRowsPerPage.props()).toEqual(expectedProps);
  });

  it('should contain an IconButtons for paging backwards', () => {
    // Icon button exists
    const MountedIconButton = MountedPagination.childAt(1);
    expect(MountedIconButton).toExist();
    expect(MountedIconButton.name()).toBe('IconButton');
    expect(MountedIconButton.length).toBe(1);

    // Icon button uses left arrow
    const MountedLeftIcon = MountedPagination.find('HardwareKeyboardArrowLeft');
    expect(MountedLeftIcon).toExist();
    expect(MountedLeftIcon.length).toBe(1);

    // Icon Button uses runPreviousPage to handle clicks
    expect(MountedPagination.instance().runPreviousPage).toBe(MountedIconButton.props().onClick);

    // runPreviousPage only invokes props.previousPage if there is a previousPage
    expect(MountedPagination.props().hasPreviousPage).toBe(false);
    expect(mockedProps.previousPage).toNotHaveBeenCalled();
    MountedPagination.instance().runPreviousPage();
    expect(mockedProps.previousPage).toNotHaveBeenCalled();
    MountedPagination.setProps({ hasPreviousPage: true });
    MountedPagination.instance().runPreviousPage();
    expect(mockedProps.previousPage).toHaveBeenCalled();
  });

  it('should contain an IconButtons for paging forwards', () => {
    // Icon button exists
    const MountedIconButton = MountedPagination.childAt(2);
    expect(MountedIconButton).toExist();
    expect(MountedIconButton.name()).toBe('IconButton');
    expect(MountedIconButton.length).toBe(1);

    // Icon button uses left arrow
    const MountedLeftIcon = MountedPagination.find('HardwareKeyboardArrowRight');
    expect(MountedLeftIcon).toExist();
    expect(MountedLeftIcon.length).toBe(1);

    // Icon Button uses runPreviousPage to handle clicks
    expect(MountedPagination.instance().runNextPage).toBe(MountedIconButton.props().onClick);

    // runNextPage only invokes props.previousPage if there is a previousPage
    expect(MountedPagination.props().hasNextPage).toBe(false);
    expect(mockedProps.nextPage).toNotHaveBeenCalled();
    MountedPagination.instance().runNextPage();
    expect(mockedProps.nextPage).toNotHaveBeenCalled();
    MountedPagination.setProps({ hasNextPage: true });
    MountedPagination.instance().runNextPage();
    expect(mockedProps.nextPage).toHaveBeenCalled();
  });
});
