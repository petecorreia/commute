import React, { Component } from 'react';
import { AppState, View, Text } from 'react-native';
import axios from 'axios';
import transportAPI from '../api/transport';
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
	ScheduleTimeProminentTiny,
	Loading,
} from './Schedule';

const TrainStationDepartures = ({ station, filterByPlatforms, children }) => (
	<Fetcher
		fetch={cancelToken => fetch({ station, filterByPlatforms }, cancelToken)}
		pollingInterval={60000}
	>
		{({ data: trainDepartures, isLoading, error }) => {
			if (isLoading) return <Loading />;
			if (error) return <Text>Error getting train departures.</Text>;
			if (!trainDepartures.length) return <Text>No train departures. 🤷‍♂️</Text>;

			const first = trainDepartures.shift();
			const firstStatus = formatTrainStatus(first.status);
			return (
				<ScheduleContent>
					<ScheduleTimetable>
						<View style={{ flexDirection: 'row' }}>
							<ScheduleTimeProminentLabel color={colors.train}>
								{first.minsLeft} mins
							</ScheduleTimeProminentLabel>
							<View
								style={{
									marginTop: -12,
									marginLeft: 10,
									justifyContent: 'flex-end',
									height: 50,
								}}
							>
								<ScheduleTimeProminentAside color={colors.train}>
									plat {first.platform}
								</ScheduleTimeProminentAside>
								{firstStatus && (
									<ScheduleTimeProminentTiny color={colors.train}>
										{firstStatus}
									</ScheduleTimeProminentTiny>
								)}
							</View>
						</View>

						{trainDepartures
							.slice(0, 4)
							.map(({ id, minsLeft, platform, status }) => (
								<ScheduleTime key={id}>
									<ScheduleTimeLabel>
										{minsLeft} mins plat {platform}
										{'  '}
									</ScheduleTimeLabel>
									<ScheduleTimeAside>
										{formatTrainStatus(status)}
									</ScheduleTimeAside>
								</ScheduleTime>
							))}
					</ScheduleTimetable>
					<ScheduleExtra>
						<ScheduleExtraLabel>Clapham Junction</ScheduleExtraLabel>
					</ScheduleExtra>
				</ScheduleContent>
			);
		}}
	</Fetcher>
);

async function fetch({ station, filterByPlatforms }, cancelToken) {
	const { data } = await transportAPI({
		url: `/uk/train/station/${station}/live.json`,
		cancelToken,
	});

	return data.departures.all
		.filter(({ platform }) =>
			filterByPlatforms ? filterByPlatforms.includes(platform) : true
		)
		.map(
			({
				train_uid,
				best_departure_estimate_mins,
				expected_departure_time,
				platform,
				status,
			}) => ({
				id: train_uid,
				minsLeft: best_departure_estimate_mins,
				time: expected_departure_time,
				platform,
				status,
			})
		);
}

function formatTrainStatus(status) {
	return status !== 'STARTS HERE' && status !== 'ON TIME' ? status : null;
}

export default TrainStationDepartures;
