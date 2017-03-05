import React from 'react';
import expect from 'expect';

import mount from '../testUtil/mountwithMUIContext';
import Delete from '../../src/components/ActionBar/Delete';

const mockedProps = {
  handleDelete: expect.createSpy(),
  itemSelectedCount: 15,
};

describe('Delete component', () => {
  let MountedDelete;

  it('mounts successfully', () => {
    MountedDelete = mount(<Delete {...mockedProps} />);
    expect(MountedDelete).toExist();
    expect(MountedDelete.length).toBe(1);
    expect(MountedDelete.children().length).toBe(2);
  });

  it('contains a span with a label', () => {
    const Label = MountedDelete.childAt(0);
    expect(Label).toExist();
    expect(Label.length).toBe(1);
    expect(Label.type()).toBe('span');
    const itemCount = MountedDelete.props().itemSelectedCount;
    expect(itemCount > 1).toBe(true);
    expect(Label.text()).toBe(`${itemCount} items selected`);

    MountedDelete.setProps({ itemSelectedCount: 1 });
    const newItemCount = MountedDelete.props().itemSelectedCount;
    expect(newItemCount > 1).toBe(false);
    expect(Label.text()).toBe(`${newItemCount} item selected`);
  });

  it('should contain an IconButtons for paging backwards', () => {
    // Icon button exists
    const MountedDeleteIcon = MountedDelete.childAt(1);
    expect(MountedDeleteIcon).toExist();
    expect(MountedDeleteIcon.name()).toBe('ActionDelete');
    expect(MountedDeleteIcon.length).toBe(1);

    // Icon Button uses handleDelete to handle clicks
    expect(MountedDelete.props().handleDelete).toBe(MountedDeleteIcon.props().onClick);
    expect(mockedProps.handleDelete).toNotHaveBeenCalled();
    MountedDeleteIcon.simulate('click');
    expect(mockedProps.handleDelete).toHaveBeenCalled();
  });
});
