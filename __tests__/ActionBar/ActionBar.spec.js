import React from 'react';
import expect from 'expect';

import mount from '../testUtil/mountwithMUIContext';
import ActionBar from '../../src/components/ActionBar';

const mockedProps = {
  handleDelete: expect.createSpy(),
  itemSelectedCount: 15,
  filterEnabled: false,
  deleteEnabled: false,
  handleFilter: expect.createSpy(),
  filters: [
    {
      label: 'music genre',
      key: 'music.genre',
      options: ['country', 'western'],
    },
    {
      label: 'pets',
      key: 'pets,types',
      options: ['dog', 'cat', 'fish', 'turtle', 'fox', 'pterodactyl'],
    },
  ],
};

describe('Delete component', () => {
  let MountedActionBar;

  it('mounts successfully', () => {
    MountedActionBar = mount(<ActionBar {...mockedProps} />);
    expect(MountedActionBar).toExist();
    expect(MountedActionBar.length).toBe(1);
  });

  it('renders Delete and nothing else if itemSelectedCount && deleteEnabled are true', () => {
    expect(MountedActionBar.props().itemSelectedCount).toBe(15);
    expect(MountedActionBar.props().deleteEnabled).toBe(false);
    expect(MountedActionBar.children().length).toBe(0);

    MountedActionBar.setProps({ itemSelectedCount: 0 });
    expect(MountedActionBar.props().itemSelectedCount).toBe(0);
    expect(MountedActionBar.props().deleteEnabled).toBe(false);
    expect(MountedActionBar.children().length).toBe(0);

    MountedActionBar.setProps({ itemSelectedCount: 15, deleteEnabled: true });
    expect(MountedActionBar.children().length > 0).toBe(true);
    expect(MountedActionBar.find('Delete').length).toBe(1);
  });

  it('renders Filter and nothing else if Delete wasn\'t and filterEnabled is true', () => {
    MountedActionBar.setProps({ itemSelectedCount: 0, deleteEnabled: false });
    expect(MountedActionBar.find('Delete').length).toBe(0);
    expect(MountedActionBar.find('Filter').length).toBe(0);
    expect(MountedActionBar.children().length).toBe(0);

    MountedActionBar.setProps({ filterEnabled: true });
    expect(MountedActionBar.find('Delete').length).toBe(0);
    expect(MountedActionBar.find('Filter').length).toBe(1);
  });

  it('renders nothing otherwise', () => {
    MountedActionBar.setProps({ itemSelectedCount: 0, deleteEnabled: false, filterEnabled: false });
    expect(MountedActionBar.children().length).toBe(0);
  });
});
