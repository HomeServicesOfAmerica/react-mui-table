import React from 'react';
import expect from 'expect';
import { ReactWrapper } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import mount from '../testUtil/mountwithMUIContext';
import ActionMenu from '../../src/components/ActionMenu';

const enabledSpy = expect.createSpy();
const mockedProps = {
  actions: [
    {
      text: 'Edit',
      action: 'edit',
      handler: expect.createSpy(),
      enabled: (item) => {
        enabledSpy(item);
        return item.valid;
      },
      icon: <span> icon thing </span>,
    },
  ],
  item: { importantStuff: true, valid: false },
  itemId: 'uniqueString',
};

describe('ActionMenu component', () => {
  let MountedActionMenu;

  it('mounts successfully', () => {
    MountedActionMenu = mount(<ActionMenu {...mockedProps} />);
    expect(MountedActionMenu).toExist();
    expect(MountedActionMenu.length).toBe(1);
  });

  it('renders an IconMenu with correct props', () => {
    const IconMenu = MountedActionMenu.find('IconMenu');
    expect(IconMenu).toExist();
    expect(IconMenu.length).toBe(1);
    const expectedProps = {
      onRequestChange: MountedActionMenu.instance().toggleOpen,
      open: MountedActionMenu.state().open,
      onClick: MountedActionMenu.instance().stopPropagation,
      useLayerForClickAway: true,
      leftIcon: MountedActionMenu.props().icon,
      primaryText: MountedActionMenu.props().text,
    };
    expect(IconMenu.props()).toInclude(expectedProps);
    const IconButtonElement = new ReactWrapper(
      <MuiThemeProvider>
        {IconMenu.props().iconButtonElement}
      </MuiThemeProvider>
    );
    expect(IconButtonElement.find('IconButton').length).toBe(1);
    expect(IconButtonElement.find('NavigationMoreVert').length).toBe(1);
  });

  xit('renders an IconMenu that contains an ActionMenuItem child for each Action provided', () => {
    // Unable to track down the ActionMenuItems. Moving on for the time being.
  });
});
