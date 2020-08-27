import React, {useCallback, useEffect, useState} from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment'
import { DATE_FILTER_FORMAT } from "../constants";
import Graph from "../components/Graph";
import DateRangePicker from "../components/DateRangePicker";
import LoadingIndicator from "../components/LoadingIndicator";
import { RootState } from "../reducers";
import { getStats } from '../actions/stats'

export function HomePage() {
	const classes = useStyles();
	const dispatch = useDispatch()
	const [filter, setFilter] = useState({
		startDate: moment().subtract(1, 'day').toDate(),
		endDate: moment().toDate(),
	})
	const stats = useSelector((state: RootState) => state.stats);
	const statsList = stats.list;
	const statsLoading = stats.loading;

	const handleDateChange = useCallback(value => setFilter(value), [setFilter])

	useEffect(() => {
		dispatch(getStats({
			startDate: moment(filter.startDate).format(DATE_FILTER_FORMAT),
			endDate: moment(filter.endDate).format(DATE_FILTER_FORMAT),
		}))
	}, [filter])

	return (
		<div className={classes.root}>
			<Typography variant="h4" gutterBottom>
				COVID-19 Graph
			</Typography>
			<div className={classes.controls}>
				<DateRangePicker onChange={handleDateChange} startDate={filter.startDate} endDate={filter.endDate} />
			</div>
			<div className={classes.centerContainer}>
				{statsLoading ? <LoadingIndicator /> : <Graph data={statsList} />}
			</div>
		</div>
	);
}

const useStyles = makeStyles({
	root: {
		height: "100%",
		textAlign: "center",
		paddingLeft: 15,
		paddingRight: 15,
	},

	centerContainer: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		marginTop: 20,
	},

	controls: {
		marginTop: 20,
	},
});
