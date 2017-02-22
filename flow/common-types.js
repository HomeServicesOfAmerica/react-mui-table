// @flow

export type NoArgsNoReturn = (...args: Array<void>) => void;

export type ActionHandler = (target: Object) => {};
export type ChangeRowsPerPage = (newRowCount: number) => void;
export type NextPage = NoArgsNoReturn;
export type PreviousPage = NoArgsNoReturn;

// Passed nothing to clear the sort, otherwise all are required
export type HandleSort = (label?: string, direction?: string, key?: string) => void;
export type HandleFilter = (key: string, activeOptions: Array<string|void>) => void;
export type FormatFunction = (
  columnDataItem: any,
  columnDataObject: Object
) => React$Element<*> | string;

export type CurrentSort = {
  direction: string,
  label: string,
}


// Main Prop List items
export type ColumnConfig = {
  // Label to display at the top of the column on the frontend
  label: string,
  // Should the column be clickable for sorting?
  sortable: boolean,
  // @deprecated. Use filterConfig prop instead
  filterable: boolean,
  // Override the visual representation of the column's data
  format?: FormatFunction,
  // field path to get to the value from the item Object
  // ex, item.author.firstName
  key: string,
  // optional: Number of columns this item should span
  // Useful for giving long values more room in the table.
  // Note this doens't map to a grid system but rather simply
  // passes the 'colspan' html prop down to the underlying column
  // http://www.w3schools.com/TagS/att_td_colspan.asp
  colSpan?: number,
  // should this column display on xs screens. Default: true
  xs?: boolean,
  // should this column display on sm screens. Default: true
  sm?: boolean,
  // should this column display on md screens. Default: true
  md?: boolean,
  // should this column display on lg screens. Default: true
  lg?: boolean,
  // should this column display on xl screens. Default: true
  xl?: boolean,
  // optional tooltip description for this column
  tooltip?: string,
};


export type ActionConfig = {
  // The label of the action in the dropdown menu
  text: string,
  // This action string was previously used as a way to have a single
  // handler that would receive the action type as well as the item.
  // It is now deprecated and could be removed in a future release.
  action: string,
  // The callback to be fired when the action is clicked
  handler: ActionHandler,
  // Should this action be enabled. boolean or function that returns boolean
  enabled: boolean|(target: Object) => boolean,
  // Icon to use in the menu for the action
  icon: React$Element<*>,
};

export type FilterConfig = {
  // label is the label to display on the frontend
  label: string,
  // key is the database path to the field being filtered
  // Note: For us we use some postgres/sequelize specific syntax
  // in the key option to aid in sending requests to graphql
  key: string,
  // An array of possible values to filter by.
  options: Array<string>,
};
