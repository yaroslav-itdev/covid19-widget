import React, { useRef } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import HighchartsReact from 'highcharts-react-official';
import * as Highcharts from 'highcharts';
import {Stat} from "../model";

interface Props {

}

export default (props: Props) => {
	const {  } = props;
	const classes = useStyles(props);
	const options: Highcharts.Options = {
		series: [{
			type: 'line',
			data: [1, 2, 3]
		}]
	}

	return (
		<Paper className={classes.wrapper}>
			<HighchartsReact
				highcharts={Highcharts}
				options={options}
				constructorType = { 'mapChart' }
				{...props}
			/>
		</Paper>
	);
}

const useStyles = makeStyles({
	wrapper: {

	},
});
