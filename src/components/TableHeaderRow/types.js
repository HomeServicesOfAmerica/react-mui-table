// @flow
import type {
  NoArgsNoReturn,
  ColumnConfig,
  HandleSort,
  CurrentSort,
} from '../../../flow/common-types';
import type {
  DisplayAvatar,
  DisplayColumn,
} from '../MaterialTable/types';

export type TableHeaderRowProps = {
  allSelected: boolean,

  handleSort: HandleSort,
  currentSort: CurrentSort,
  avatar: string,
  columns: Array<ColumnConfig>,

  handleSelectAll: NoArgsNoReturn,
  displayAvatar: DisplayAvatar,
  displayColumn: DisplayColumn,

  sortEnabled: boolean,
  actionsEnabled: boolean,
}
