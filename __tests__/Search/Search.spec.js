import React from 'react';
import expect from 'expect';

import mount from '../testUtil/mountwithMUIContext';
import Search from '../../src/components/Search';

const mockedProps = {
  tableName: 'Hi',
  onSearch: expect.createSpy(),
};

const searchTerm = 'My new value';

describe('Search component', () => {
  let MountedSearch;
  let Paper;
  let TextField;
  it('mounts successfully', () => {
    MountedSearch = mount(<Search {...mockedProps} />);
    expect(MountedSearch).toExist();
    expect(MountedSearch.length).toBe(1);
  });

  it('Contains a Paper component at the top level', () => {
    Paper = MountedSearch.find('Paper');
    expect(Paper.length).toBe(1);
  });

  it('The Paper contains a SearchIcon', () => {
    const SearchIcon = Paper.find('ActionSearch');
    expect(SearchIcon.length).toBe(1);
  });

  it('The Paper contains a TextField', () => {
    TextField = Paper.find('TextField');
    expect(TextField.length).toBe(1);
  });

  it('The Textfield placeholder text contains the tableName as expected', () => {
    expect(TextField.props().hintText).toBe(`Search All ${mockedProps.tableName}`);
  });

  it('The Textfield triggers onSearch when the user types', () => {
    expect(mockedProps.onSearch).toNotHaveBeenCalled();
    TextField.find('input').simulate('change', { target: { value: searchTerm } });
    expect(mockedProps.onSearch.calls.length).toEqual(1);
    const onSearchArgs = mockedProps.onSearch.calls[0].arguments;
    expect(onSearchArgs[0]).toInclude({ target: { value: searchTerm } });
    expect(onSearchArgs[1]).toBe(searchTerm);
  });
});
