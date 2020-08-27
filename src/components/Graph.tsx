import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import WorldGeoJSON from '@highcharts/map-collection/custom/world.geo.json';
import { Stat } from "../model";

interface Props {
	data: Stat[];
}

highchartsMap(Highcharts);

export default (props: Props) => {
	const { data } = props
	const options = useMemo(() => ({
		title: {
			text: 'My chart',
		},
		chart: {
			map: WorldGeoJSON,
		},
		plotOptions: {
			map: {
				mapData: WorldGeoJSON,
				allAreas: true,
				joinBy: ['iso-a2', 'code'],
				dataLabels: {
					enabled: true,
					color: 'white',
					style: {
						fontWeight: 'bold',
					},
				},
				tooltip: {
					headerFormat: '',
					pointFormat: `<div>
					  <div>{point.code}</div>:
					  <div>Confirmed: {point.confirmed}</div>
					  <div>Recovered: {point.recovered}</div>
					  <div>Deaths: {point.deaths}</div>
					</div>`,
				},
			},
		},
		series: [{
			name: 'Countries with statistic',
			data,
		}],
	}), [data]);

	return (
		<div>
			<HighchartsReact
				highcharts={Highcharts}
				options={options}
				constructorType="mapChart"
			/>
		</div>
	);
}
