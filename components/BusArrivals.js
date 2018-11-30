import React, { Component } from 'react';
import { AppState } from 'react-native';
import axios from 'axios';
import tflAPI from '../api/tfl';
import Fetcher from './Fetcher';

const BusArrivals = ({ station, filterByLines, children }) => (
	<Fetcher
		fetch={cancelToken => fetch({ station, filterByLines }, cancelToken)}
	>
		{children}
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
