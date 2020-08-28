export interface Stat {
  code: string;
  confirmed: number;
  deaths: number;
  recovered: number;
}

export interface StatFilter {
  startDate: string,
  endDate: string,
}

export enum StatActions {
  GET_STAT_START = "GET_STAT_START",
  GET_STAT_SUCCESS = "GET_STAT_SUCCESS",
  GET_STAT_FAILED = "GET_STAT_FAILED",
}

interface StatActionType<T, P> { // todo make second not mandatory
  type: T;
  payload: P;
}

export interface InitialReducerStateInterface {
  list: Stat[],
  loading: boolean,
}

export type StatAction =
  | StatActionType<typeof StatActions.GET_STAT_START, StatFilter>
  | StatActionType<typeof StatActions.GET_STAT_SUCCESS, Stat[]>
  | StatActionType<typeof StatActions.GET_STAT_FAILED, boolean> // todo make second not mandatory
;
