import React, { Component } from 'react';
import styled from 'styled-components/native';
import { AppState, View } from 'react-native';
import axios from 'axios';
import tflAPI from '../api/tfl';
import colors from '../styles/colors';
import Fetcher from './Fetcher';
import { Loading, ScheduleTimeLabel, ScheduleTime } from './Schedule';

const Wrapper = styled.View`
	margin-top: 6px;
`;

const TubeDisruptions = ({ lines, children }) => (
	<View style={{ marginTop: 5 }}>
		<Fetcher
			fetch={cancelToken => fetch({ lines }, cancelToken)}
			pollingInterval={60000}
		>
			{({ data: tubeDisruptions, isLoading, error }) => {
				if (isLoading) return <Loading />;
				if (error) return <Text>Error getting tube disruptions.</Text>;
				if (!tubeDisruptions.length)
					return (
						<Wrapper>
							<ScheduleTime>
								<ScheduleTimeLabel>Tube is good. 👍</ScheduleTimeLabel>
							</ScheduleTime>
						</Wrapper>
					);

				return (
					<Wrapper>
						{tubeDisruptions.map(({ description }, i) => (
							<ScheduleTime>
								<ScheduleTimeLabel key={i}>{description}</ScheduleTimeLabel>
							</ScheduleTime>
						))}
					</Wrapper>
				);
			}}
		</Fetcher>
	</View>
);

async function fetch({ lines }, cancelToken) {
	const { data } = await tflAPI({
		url: `/Line/${lines.join(',')}/Disruption`,
		cancelToken,
	});

	return data.map(({ description }, i) => ({ id: i, description }));
}

export default TubeDisruptions;
