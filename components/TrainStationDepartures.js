import React, { Component } from 'react';
import { AppState } from 'react-native';
import axios from 'axios';
import transportAPI from '../api/transport';
import Fetcher from './Fetcher';

const TrainStationDepartures = ({ station, filterByPlatforms, children }) => (
	<Fetcher
		fetch={cancelToken => fetch({ station, filterByPlatforms }, cancelToken)}
		pollingInterval={60000}
	>
		{children}
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

export default TrainStationDepartures;
