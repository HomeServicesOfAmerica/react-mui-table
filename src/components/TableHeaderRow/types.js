// @flow
import type {
  NoArgsNoReturn,
  ColumnConfig,
  HandleSort,
  CurrentSort,
  Avatar,
} from '../../../flow/common-types';
import type {
  DisplayAvatar,
  DisplayColumn,
} from '../MaterialTable/types';

export type TableHeaderRowProps = {
  allSelected: boolean,

  handleSort: HandleSort,
  currentSort: CurrentSort,
  avatar: Avatar,
  columns: Array<ColumnConfig>,

  handleSelectAll: NoArgsNoReturn,
  displayAvatar: DisplayAvatar,
  displayColumn: DisplayColumn,

  sortEnabled: boolean,
  actionsEnabled: boolean,
}
