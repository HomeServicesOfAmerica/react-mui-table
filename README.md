### React MUI Table

A configurable Table component for displaying data sets using Material Design.

This package won't manage data, it only displays it. Callbacks are provided to trigger page changes, filter activation, searches, etc.

The `items` prop is where all of data gets passed in. All other props are for configuring table options. The table should work for any data set provided that the data is an array of objects.

**Install**
```bash
$ yarn install react-mui-table
```

**Import**
```js
import MaterialTable from 'react-mui-table';
```

### Props

Some of the prop types are complex enough that I have documented their Flowtypes instead of creating a table or writing them out. If you aren't familiar with Flow, here are a couple key points.
* A `?` denotes an optional parameter/property.
* `void` represents `undefined`.
* `Array<MyType>` denotes an array that contains only values that conform to type `MyType`
* `*` allows any type

**items**

  * description: Item can be an object of any shape. Most of the configuration to display the data in the table will be done in the columns prop.
  * type: `Array<Object>`


**itemUniqueId**

  * description:  Path to access a unique value within the current item. Used for React keys. (Ex: "item.author.id")
  * type: `string`


**columns**

  * description: Array of ColumnConfig objects. This how options like sortable, column label, and display override are set.
  * type: `Array<ColumnConfig>` where `ColumnConfig` is an Object with the following shape:
```
type ColumnConfig = {
  // Label to display at the top of the column
  label: string,

  // If the column should be clickable for sorting
  sortable?: boolean,

  // Override the visual representation of the column's data
  format?: (
    columnDataItem: any,
    columnDataObject: Object
  ) => React$Element<*> | string,

  // Path to access the value within the current item (Ex: "item.author.firstName")
  key: string,

  // Number of columns wide this column should be.
  // Useful for giving long values more room in the table.
  // Note: this doens't map to a grid system but rather simply
  // passes the 'colspan' html prop down to the underlying column
  // http://www.w3schools.com/TagS/att_td_colspan.asp
  colSpan?: number,

  // Should this column display on extra small screens? Default: true
  xs?: boolean,

  // Should this column display on small screens? Default: true
  sm?: boolean,

  // Should this column display on medium screens? Default: true
  md?: boolean,

  // Should this column display on large screens? Default: true
  lg?: boolean,

  // Should this column display on extra large screens? Default: true
  xl?: boolean,

  // Tooltip description for this column
  tooltip?: string,
}
```

**filters (Optional)**

  * description: Define the name and presets for each set of filters.
  * type: `Array<FilerConfig>` where `FilerConfig` is an Object with the following shape:

```
type FilterConfig = {
  // Label will be used as the "Title" for this set of filters
  label: string,

  // Unique identifier for each set of filters. It will be passed into the callback as a way to identify which filters have changed.
  key: string,

  // An array of possible values to filter by. A checkbox will be rendered for each option.
  options: Array<string>,
}
```

**actions (Optional)**

  * description: Define the presentation, handlers, and visibility for each action.
  * type: `Array<ActionConfig>` where `ActionConfig` is an Object with the following shape:

```
type ActionConfig = {
  // The label of the action in the dropdown menu
  text: string,

  // The callback to be fired when the action is clicked
  handler: ActionHandler,

  // Should this action be enabled. boolean or function that returns boolean
  enabled: boolean|(target: Object) => boolean,

  // Icon to use in the menu for the action
  icon: React$Element<*>,
}
```

**currentSort (Optional)**

  * description: Manipulate the UI to match the sort state in your application.
  * type: Object with the following shape:
```
type currentSort = {
  // Direction that the column is sorted
  direction: 'ASC' | 'DESC',

  // Corresponds to the label of the column that is sorted.
  label: string,
}
```

### Prop Groups

The following sections consist of top level props that are documented in groups based on their purpose.

**Pagination (Optional)**

These props determine how pagination should work in the table.
```
hasNextPage?: boolean,
hasPreviousPage?: boolean,

// Ex: "1-4 of 10,000"
paginationText?: string,

// When invoked, should pass in the new set of items with updated pagination data.
previousPage?: (...args: Array<void>) => void,

// When invoked, should pass in the new set of items with updated pagination data.
nextPage?: (...args: Array<void>) => void,
// Number of rows on the table
rows?: number,

// If the table should allow the user to switch the number of rows, specify which options they should have
rowOptions?: Array<number>,

// When invoked, should pass in the new set of items with updated pagination data.
changeRowsPerPage?: (newRowCount: number) => void,
```

**Handler Props**

Callback functions that will be invoked when certain interactions occur. These functions will need to update the `items` array passed in if the displayed items should be reordered or updated.
```
// label: Corresponds to column label.
// key: `column.key` for column that is being sorted.
// direction: 'ASC', 'DESC', or null
handleSort?: (label?: string, direction?: string, key?: string) => void,

// itemsToDelete: All items that had a checked state when the delete button was clicked.
handleDelete?: (itemsToDelete: Array<Object>) => void,

// key: The unique identifier for this filter (filters[x].key)
// activeOptions: An array containing all of this filter's options (filters[x].options)that are currently active.
handleFilter?: (key: string, activeOptions: Array<string|void>) => void,

// query: string that is currently typed into the search bar.
handleSearch?: (query: string) => void,

// item: corresponds to the row being clicked.
onItemClick?: (item: Object) => void,
```


**Visual Options**

```
// Inline style object to style the top level component.
containerStyle?: Object,

// Used in the Search bar's placeholder text
tableName?: string,

// Used to display an avatar on the left side of the row.
// Must be a path to access an image source within an item, or a function that will return the image source.
avatar?: string | (item: Object) => string|void,
```
