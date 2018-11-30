import React, { Component } from 'react';
import {
	Dimensions,
	Text,
	ActivityIndicator,
	SafeAreaView,
	View,
} from 'react-native';
import styled from 'styled-components/native';
import BusArrivals from './components/BusArrivals';
import TubeDisruptions from './components/TubeDisruptions';
import TrainStationDepartures from './components/TrainStationDepartures';
import colors from './styles/colors';
import { Schedule, ScheduleIcon, SchedulePipe } from './components/Schedule';

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const Itinerary = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	margin-top: 35px;
	width: ${Dimensions.get('window').width};
`;

const Footer = styled.View`
	flex: 0 0 50px;
	justify-content: center;
	align-items: center;
`;

export default class App extends Component {
	render() {
		return (
			<Container>
				<SafeAreaView>
					<Itinerary>
						<Schedule>
							<ScheduleIcon>🚍</ScheduleIcon>
							<SchedulePipe color={colors.bus} />
							<BusArrivals station="490005964N" filterByLines={['319', 'g1']} />
						</Schedule>

						<Schedule>
							<ScheduleIcon>🚆</ScheduleIcon>
							<SchedulePipe color={colors.train} />
							<TrainStationDepartures
								station="CLJ"
								filterByPlatforms={['10']}
							/>
						</Schedule>

						<Schedule>
							<ScheduleIcon>🚇</ScheduleIcon>
							<SchedulePipe color={colors.tube} />
							<TubeDisruptions
								lines={['waterloo-city', 'bakerloo', 'district', 'circle']}
							/>
						</Schedule>
					</Itinerary>

					<Footer>
						<Text>Footer</Text>
					</Footer>
				</SafeAreaView>
			</Container>
		);
	}
}
