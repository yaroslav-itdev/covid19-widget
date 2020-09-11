import { History } from "history";
import { combineReducers } from "redux";
import { InitialReducerStateInterface } from "../model";
import statsReducer from "./stats";

export interface RootState {
	stats: InitialReducerStateInterface,
}

export default (history: History) =>
	combineReducers({
		stats: statsReducer,
	});
