import React from 'react';
import expect from 'expect';
import { ReactWrapper } from 'enzyme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import mount from '../testUtil/mountwithMUIContext';
import RowsPerPage from '../../src/components/Pagination/RowsPerPage';

const mockedProps = {
  paginationText: '1-15 out of literally 1 billion',
  changeRowsPerPage: expect.createSpy(),
  rows: 15,
};

describe('RowsPerPage component', () => {
  let MountedRowsPerPage;

  it('mounts successfully', () => {
    MountedRowsPerPage = mount(<RowsPerPage {...mockedProps} />);
    expect(MountedRowsPerPage).toExist();
    expect(MountedRowsPerPage.length).toBe(1);
    expect(MountedRowsPerPage.children().length).toBe(3);
  });

  it('contains a span with paginationText', () => {
    const PaginationText = MountedRowsPerPage.childAt(2);
    expect(PaginationText).toExist();
    expect(PaginationText.length).toBe(1);
    expect(PaginationText.type()).toBe('span');
    expect(PaginationText.text()).toBe(mockedProps.paginationText);
  });

  it('contains a label and DropDownMenu if changeRowsPerPage is defined', () => {
    let DropDownMenu;
    let Popover;
    let RenderToLayer;
    let PopoverPortalRender;
    let options;
    let MenuItems;

    const Label = MountedRowsPerPage.childAt(0);
    expect(Label).toExist();
    expect(Label.length).toBe(1);
    expect(Label.type()).toBe('span');
    expect(Label.text()).toBe('Rows per page:');

    // Default rowOptions
    DropDownMenu = MountedRowsPerPage.childAt(1);
    expect(DropDownMenu).toExist();
    expect(DropDownMenu.length).toBe(1);
    expect(DropDownMenu.name()).toBe('DropDownMenu');

    Popover = DropDownMenu.find('Popover');
    expect(Popover.length).toBe(1);
    RenderToLayer = Popover.find('RenderToLayer');
    expect(RenderToLayer.length).toBe(1);

    PopoverPortalRender = new ReactWrapper(
      <MuiThemeProvider>
        {RenderToLayer.props().render()}
      </MuiThemeProvider>
    );

    MenuItems = PopoverPortalRender.find('MenuItem');
    expect(MenuItems.length).toBe(3);

    options = MountedRowsPerPage.state().rowOptions;

    MenuItems.forEach((MenuItem, index) => {
      expect(MenuItem.props().value).toBe(options[index]);
      expect(MenuItem.props().primaryText).toBe(options[index].toString());
    });


    // custom rowOptions
    DropDownMenu = MountedRowsPerPage.childAt(1);
    expect(DropDownMenu).toExist();
    expect(DropDownMenu.length).toBe(1);
    expect(DropDownMenu.name()).toBe('DropDownMenu');

    Popover = DropDownMenu.find('Popover');
    expect(Popover.length).toBe(1);
    RenderToLayer = Popover.find('RenderToLayer');
    expect(RenderToLayer.length).toBe(1);

    PopoverPortalRender = new ReactWrapper(
      <MuiThemeProvider>
        {RenderToLayer.props().render()}
      </MuiThemeProvider>
    );

    MenuItems = PopoverPortalRender.find('MenuItem');
    expect(MenuItems.length).toBe(3);

    options = MountedRowsPerPage.state().rowOptions;

    MenuItems.forEach((MenuItem, index) => {
      expect(MenuItem.props().value).toBe(options[index]);
      expect(MenuItem.props().primaryText).toBe(options[index].toString());
    });
  });

  it('contains neither a label or DropDownMenu if changeRowsPerPage is undefined', () => {
    expect(MountedRowsPerPage.find('span').length).toBe(2);
    expect(MountedRowsPerPage.find('DropDownMenu').length).toBe(1);

    MountedRowsPerPage.setProps({ changeRowsPerPage: undefined });
    expect(MountedRowsPerPage.find('DropDownMenu').length).toBe(0);
    expect(MountedRowsPerPage.find('span').length).toBe(1);
  });
});
