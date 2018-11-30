import React, { Component } from 'react';
import {
	Dimensions,
	Text,
	ActivityIndicator,
	SafeAreaView,
	View,
	Animated,
	TouchableOpacity,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
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
	margin: 35px 0;
	width: ${Dimensions.get('window').width};
`;

const TabBar = styled.View`
	flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
	flex: 1;
	align-items: center;
	padding: 16px;
`;

const Work = () => (
	<Itinerary>
		<Schedule>
			<ScheduleIcon>🚍</ScheduleIcon>
			<SchedulePipe color={colors.bus} />
			<BusArrivals station="490005964N" filterByLines={['319', 'g1']} />
		</Schedule>

		<Schedule>
			<ScheduleIcon>🚆</ScheduleIcon>
			<SchedulePipe color={colors.train} />
			<TrainStationDepartures station="CLJ" filterByPlatforms={['10']} />
		</Schedule>

		<Schedule>
			<ScheduleIcon>🚇</ScheduleIcon>
			<SchedulePipe color={colors.tube} />
			<TubeDisruptions
				lines={['waterloo-city', 'bakerloo', 'district', 'circle']}
			/>
		</Schedule>
	</Itinerary>
);

const Home = () => (
	<Itinerary>
		<Schedule>
			<ScheduleIcon>🚇</ScheduleIcon>
			<SchedulePipe color={colors.tube} />
			<TubeDisruptions lines={['waterloo-city', 'northern']} />
		</Schedule>

		<Schedule>
			<ScheduleIcon>🚆</ScheduleIcon>
			<SchedulePipe color={colors.train} />
			<TrainStationDepartures
				station="WAT"
				filterByPlatforms={['1', '2', '3', '4', '5', '6']}
			/>
		</Schedule>

		<Schedule>
			<ScheduleIcon>🚍</ScheduleIcon>
			<SchedulePipe color={colors.bus} />
			<BusArrivals station="490005332T" filterByLines={['319', 'g1']} />
		</Schedule>
	</Itinerary>
);

export default class App extends Component {
	state = {
		index: 0,
		routes: [{ key: 'first', title: 'Work' }, { key: 'second', title: 'Home' }],
	};

	handleIndexChange = index => this.setState({ index });

	renderTabBar = props => {
		const inputRange = props.navigationState.routes.map((x, i) => i);

		return (
			<TabBar>
				{props.navigationState.routes.map((route, i) => {
					const color = props.position.interpolate({
						inputRange,
						outputRange: inputRange.map(inputIndex =>
							inputIndex === i ? colors.bus : '#000'
						),
					});
					return (
						<TabItem onPress={() => this.setState({ index: i })}>
							<Animated.Text style={{ color, fontSize: 18 }}>
								{route.title}
							</Animated.Text>
						</TabItem>
					);
				})}
			</TabBar>
		);
	};

	renderScene = SceneMap({
		first: Work,
		second: Home,
	});

	render() {
		return (
			<Container>
				<SafeAreaView>
					<TabView
						navigationState={this.state}
						renderScene={this.renderScene}
						renderTabBar={this.renderTabBar}
						onIndexChange={this.handleIndexChange}
						tabBarPosition="bottom"
					/>
				</SafeAreaView>
			</Container>
		);
	}
}
