import React from 'react';
import expect from 'expect';

import mount from '../testUtil/mountwithMUIContext';
import Filter from '../../src/components/ActionBar/Filter';

const mockedProps = {
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

describe('Filter component', () => {
  let MountedFilter;

  it('mounts successfully', () => {
    MountedFilter = mount(<Filter {...mockedProps} />);
    expect(MountedFilter).toExist();
    expect(MountedFilter.length).toBe(1);
    expect(MountedFilter.children().length).toBe(1);
  });

  it('contains a div with a FlatButton child', () => {
    const ButtonContainer = MountedFilter.childAt(0);
    expect(ButtonContainer).toExist();
    expect(ButtonContainer.type()).toBe('div');
    expect(ButtonContainer.length).toBe(1);
    expect(ButtonContainer.children().length).toBe(1);
    const FlatButton = ButtonContainer.childAt(0);
    expect(FlatButton.length).toBe(1);
    expect(FlatButton.name()).toBe('FlatButton');

    // Doesn't show filter options by default and when opsVisible is false
    expect(MountedFilter.state().opsVisible).toBe(false);
    FlatButton.simulate('click');
    expect(MountedFilter.state().opsVisible).toBe(true);
    expect(MountedFilter.children().length).toBe(2);
  });

  it('should contain a div that displays each filter\'s options as Checkboxes', () => {
    expect(MountedFilter.state().opsVisible).toBe(true);
    const FilterOptions = MountedFilter.childAt(1);

    const FilterOptionsChildren = FilterOptions.children();
    expect(FilterOptionsChildren.length).toBe(MountedFilter.props().filters.length + 1);

    const FilterOptionsList = FilterOptionsChildren.slice(0, FilterOptionsChildren.length - 1);
    const Span = FilterOptionsChildren.slice(-1);

    expect(Span.length).toBe(1);
    expect(Span.type()).toBe('span');
    expect(Span.children().length).toBe(0);
    expect(Span.text()).toNotExist();

    // Should be 2 because we passed in two different filters
    expect(FilterOptionsList.length).toBe(2);

    FilterOptionsList.forEach((child, filterIndex) => {
      expect(child.type()).toBe('div');

      // We want to break up filter options up into columns of 4 so the component isn't too tall
      const numberOfColumns = Math.ceil(mockedProps.filters[filterIndex].options.length / 4);

      // We add an h4 to display which filter the options are for.
      expect(child.children().length).toBe(numberOfColumns + 1);
      expect(child.childAt(0).type()).toBe('h4');
      expect(child.childAt(0).text()).toBe(mockedProps.filters[filterIndex].label);

      // Slicing to exclude H4
      const OptionColumns = child.children().slice(1);

      // This outer loop iterates over each column of 4
      OptionColumns.forEach((Column, columnIndex) => {
        // The inner loop accounts for each option in a column.
        Column.children().forEach((Option, optionIndex) => {
          expect(Option.name()).toBe('Checkbox');
          expect(Option.length).toBe(1);

          const expectedProps = {
            onCheck: MountedFilter.instance().updateFilter,
            label: mockedProps.filters[filterIndex].options[(columnIndex * 4) + optionIndex],
            'data-label': mockedProps.filters[filterIndex].label,
            'data-key': mockedProps.filters[filterIndex].key,
            'data-value': mockedProps.filters[filterIndex].options[(columnIndex * 4) + optionIndex],
          };
          expect(Option.props()).toInclude(expectedProps);
        });
      });
    });
  });

  it('should call props.handleFilter when a Checkbox is checked or unchecked', () => {
    const MusicCheckboxes = MountedFilter.find('[data-key="music.genre"]');
    expect(MusicCheckboxes.length).toBe(2);
    expect(mockedProps.handleFilter).toNotHaveBeenCalled();
    const CheckboxOne = MusicCheckboxes.at(0).parent();
    const {
        'data-label': label,
        'data-key': key,
        // 'data-value': value,
      } = CheckboxOne.props();
    CheckboxOne.find('input').simulate('change', {
      target: {
        checked: true,
        dataset: { label, key },
      },
    });
    expect(mockedProps.handleFilter).toHaveBeenCalled();
  });

  xit('should pass the relevant filter\'s key and selected values into props.handleFilter', () => {
    // Currently it won't detect any checked boxes in the test environemnt because there is an issue
    // in enzyme regarding document.querySelectorAll
    // TODO: Potentially re-write the check in Filter to not be reliant on the DOM.

    const MusicCheckboxes = MountedFilter.find('[data-key="music.genre"]');
    expect(MusicCheckboxes.length).toBe(2);
    expect(mockedProps.handleFilter).toNotHaveBeenCalled();
    const CheckboxOne = MusicCheckboxes.at(0).parent();
    const {
        'data-label': label,
        'data-key': key,
        // 'data-value': value,
      } = CheckboxOne.props();
    CheckboxOne.find('input').simulate('change', {
      target: {
        checked: true,
        dataset: { label, key },
      },
    });
    expect(mockedProps.handleFilter).toHaveBeenCalled();
    // expect(mockedProps.handleFilter.calls[0].arguments).toEqual([key, [value]]);
  });
});
