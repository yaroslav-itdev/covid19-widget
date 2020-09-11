import { AxiosResponse } from 'axios'
import api from '../api'
import { StatFilter, StatActions } from "../model";

export function getStats(filter: StatFilter) {
	return (dispatch: Function) => {
		dispatch({ type: StatActions.GET_STAT_START, payload: filter });

		// executing fetch request
		api.get('/stats', {
			params: filter,
		})
			.then((res: AxiosResponse) => dispatch({ type: StatActions.GET_STAT_SUCCESS, payload: res.data }))
			.catch((res: AxiosResponse) => dispatch({ type: StatActions.GET_STAT_SUCCESS, payload: false })) // todo: make payload not mandatory
	};
}
