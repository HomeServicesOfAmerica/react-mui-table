import React from 'react';
import expect from 'expect';

import mount from '../testUtil/mountwithMUIContext';
import ActionMenuItem from '../../src/components/ActionMenu/ActionMenuItem';

const mockedProps = {
  text: 'Item Text',
  toggleMenu: expect.createSpy(),
  item: { importantStuff: true },
  handler: expect.createSpy(),
  icon: <span> icon thing </span>,
};

describe('ActionMenuItem component', () => {
  let MountedActionMenuItem;

  it('mounts successfully', () => {
    MountedActionMenuItem = mount(<ActionMenuItem {...mockedProps} />);
    expect(MountedActionMenuItem).toExist();
    expect(MountedActionMenuItem.length).toBe(1);
  });

  it('renders a MenuItem with a leftIcon, text, and onClick supplied', () => {
    const MenuItem = MountedActionMenuItem.find('MenuItem');
    expect(MenuItem).toExist();
    expect(MenuItem.length).toBe(1);
    const expectedProps = {
      onClick: MountedActionMenuItem.instance().handleClick,
      leftIcon: MountedActionMenuItem.props().icon,
      primaryText: MountedActionMenuItem.props().text,
    };
    expect(MenuItem.props()).toInclude(expectedProps);
  });

  it('clickHandler should pass item into handler and close menu ', () => {
    expect(mockedProps.handler).toNotHaveBeenCalled();
    expect(mockedProps.toggleMenu).toNotHaveBeenCalled();
    MountedActionMenuItem.instance().handleClick();
    expect(mockedProps.handler).toHaveBeenCalled();
    expect(mockedProps.toggleMenu).toHaveBeenCalled();
    expect(mockedProps.handler.calls[0].arguments).toEqual([MountedActionMenuItem.props().item]);
    expect(mockedProps.toggleMenu.calls[0].arguments).toEqual([false]);
  });
});
