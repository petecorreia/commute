import React, { Component } from 'react';
import { AppState } from 'react-native';
import axios from 'axios';
import tflAPI from '../api/tfl';
import Fetcher from './Fetcher';

const TubeDisruptions = ({ lines, children }) => (
	<Fetcher
		fetch={cancelToken => fetch({ lines }, cancelToken)}
		pollingInterval={60000}
	>
		{children}
	</Fetcher>
);

async function fetch({ lines }, cancelToken) {
	const { data } = await tflAPI({
		url: `/Line/${lines.join(',')}/Disruption`,
		cancelToken,
	});

	return data.map(({ description }, i) => ({ id: i, description }));
}

export default TubeDisruptions;
