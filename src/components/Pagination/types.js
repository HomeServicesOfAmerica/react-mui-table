// @flow
import type { ChangeRowsPerPage, PreviousPage, NextPage } from '../../../flow/common-types';

export type PaginationProps = {
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  paginationText: string,
  rows: number,
  nextPage: NextPage,
  previousPage: PreviousPage,
  changeRowsPerPage?: ChangeRowsPerPage,
  rowOptions: Array<number>,
}

export type RowsPerPageState = {
  rowOptions: Array<number>,
}

export type RowsPerPageProps = {
  paginationText: string,
  changeRowsPerPage?: ChangeRowsPerPage,
  rows: number,
  rowOptions: Array<number>,
}

export type MenuChangeHandler = (evt: CustomSyntheticEvent, key: string, value: number) => void;
