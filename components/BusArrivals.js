import React, { Component } from 'react';
import { AppState, Text } from 'react-native';
import axios from 'axios';
import tflAPI from '../api/tfl';
import colors from '../styles/colors';
import Fetcher from './Fetcher';
import {
	ScheduleContent,
	ScheduleTimetable,
	ScheduleTimeProminentLabel,
	ScheduleTimeProminentAside,
	ScheduleTime,
	ScheduleTimeLabel,
	ScheduleTimeAside,
	ScheduleExtra,
	ScheduleExtraLabel,
	Loading,
} from './Schedule';

const BusArrivals = ({ station, filterByLines, children }) => (
	<Fetcher
		fetch={cancelToken => fetch({ station, filterByLines }, cancelToken)}
	>
		{({ data: busArrivals, isLoading, error }) => {
			if (isLoading) return <Loading />;
			if (error) return <Text>Error getting bus times.</Text>;
			if (!busArrivals.length) return <Text>No bus times. 🤷‍♂️</Text>;

			const first = busArrivals.shift();
			return (
				<ScheduleContent>
					<ScheduleTimetable>
						<Text>
							<ScheduleTimeProminentLabel color={colors.bus}>
								{first.minsLeft} mins
							</ScheduleTimeProminentLabel>
							{'  '}
							<ScheduleTimeProminentAside color={colors.bus}>
								{first.bus}
							</ScheduleTimeProminentAside>
						</Text>

						{busArrivals.slice(0, 4).map(({ id, minsLeft, bus }, i) => (
							<ScheduleTime key={id}>
								<ScheduleTimeLabel>{minsLeft} mins</ScheduleTimeLabel>
								{'  '}
								<ScheduleTimeAside>{bus}</ScheduleTimeAside>
							</ScheduleTime>
						))}
					</ScheduleTimetable>
					<ScheduleExtra>
						<ScheduleExtraLabel>Darley Road</ScheduleExtraLabel>
					</ScheduleExtra>
				</ScheduleContent>
			);
		}}
	</Fetcher>
);

async function fetch({ station, filterByLines }, cancelToken) {
	const { data } = await tflAPI({
		url: `/StopPoint/${station}/Arrivals`,
		cancelToken,
	});

	return data
		.filter(({ lineId }) =>
			filterByLines ? filterByLines.includes(lineId) : true
		)
		.sort((a, b) => a.timeToStation - b.timeToStation)
		.map(({ id, timeToStation, lineName, expectedArrival }) => ({
			id,
			minsLeft: Math.round(timeToStation / 60, 2),
			bus: lineName,
			expectedArrival: new Date(expectedArrival),
		}));
}

export default BusArrivals;
