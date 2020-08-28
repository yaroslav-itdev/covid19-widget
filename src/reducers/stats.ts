import { StatActions, StatAction, InitialReducerStateInterface } from "../model";
import createReducer from "./createReducer";

const initialState = {
	list: [],
	loading: false,
}

export default createReducer<InitialReducerStateInterface>(initialState, {
	[StatActions.GET_STAT_START](state: InitialReducerStateInterface, action: StatAction) {
		return { ...state, loading: true }
	},
	[StatActions.GET_STAT_SUCCESS](state: InitialReducerStateInterface, action: StatAction) {
		return { ...state, loading: false, list: action.payload }
	},
	[StatActions.GET_STAT_FAILED](state: InitialReducerStateInterface, action: StatAction) {
		return { ...state, loading: false }
	},
});
