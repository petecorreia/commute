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

const colors = {
	bus: '#4CD964',
	train: '#5AC8FA',
	tube: '#FF2D55',
	gray: '#A5A6A9',
};

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

const Schedule = styled.View`
	flex: 1;
	flex-direction: row;
	width: 100%;
	margin: 15px 0;
`;

const ScheduleIcon = styled.Text`
	margin-top: 3px;
	margin-left: 25px;
	font-size: 36px;
`;

const SchedulePipe = styled.View`
	margin: 0 20px;
	width: 20px;
	height: 100%;
	border-radius: 10px;
	background-color: ${props => props.color || 'red'};
`;

const ScheduleContent = styled.View`
	flex: 1;
	margin-right: 10px;
`;

const ScheduleTimetable = styled.View`
	flex: 1;
`;

const ScheduleExtra = styled.View``;

const ScheduleExtraLabel = styled.Text.attrs({
	numberOfLines: 1,
})`
	font-size: 18px;
	color: ${colors.gray};
`;

const Footer = styled.View`
	flex: 0 0 50px;
	justify-content: center;
	align-items: center;
`;

const ScheduleLoading = styled.View`
	flex: 1;
	margin-top: 10px;
	align-items: flex-start;
`;

const Loading = () => (
	<ScheduleLoading>
		<ActivityIndicator />
	</ScheduleLoading>
);

const ScheduleTime = styled.Text`
	margin: 3px 0;
`;

const ScheduleTimeProminentLabel = styled.Text`
	font-size: 36px;
	font-weight: bold;
	color: ${props => props.color};
`;

const ScheduleTimeProminentAside = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: ${props => props.color};
`;

const ScheduleTimeProminentTiny = styled.Text`
	font-size: 12px;
	font-weight: bold;
	color: ${props => props.color};
`;

const ScheduleTimeLabel = styled.Text`
	font-size: 18px;
`;

const ScheduleTimeAside = styled.Text`
	font-size: 18px;
	color: ${colors.gray};
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

							<BusArrivals station="490005964N" filterByLines={['319', 'g1']}>
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

												{busArrivals
													.slice(0, 4)
													.map(({ id, minsLeft, bus }, i) => (
														<ScheduleTime key={id}>
															<ScheduleTimeLabel>
																{minsLeft} mins
															</ScheduleTimeLabel>
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
							</BusArrivals>
						</Schedule>

						<Schedule>
							<ScheduleIcon>🚆</ScheduleIcon>
							<SchedulePipe color={colors.train} />
							<ScheduleContent>
								<TrainStationDepartures
									station="CLJ"
									filterByPlatforms={['10']}
								>
									{({ data: trainDepartures, isLoading, error }) => {
										if (isLoading) return <Loading />;
										if (error)
											return <Text>Error getting train departures.</Text>;
										if (!trainDepartures.length)
											return <Text>No train departures. 🤷‍♂️</Text>;

										const first = trainDepartures.shift();
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
															<ScheduleTimeProminentTiny color={colors.train}>
																{formatTrainStatus(first.status)}
															</ScheduleTimeProminentTiny>
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
													<ScheduleExtraLabel>
														Clapham Junction
													</ScheduleExtraLabel>
												</ScheduleExtra>
											</ScheduleContent>
										);
									}}
								</TrainStationDepartures>
							</ScheduleContent>
						</Schedule>

						<Schedule>
							<ScheduleIcon>🚇</ScheduleIcon>
							<SchedulePipe color={colors.tube} />
							<ScheduleContent>
								<TubeDisruptions
									lines={['waterloo-city', 'bakerloo', 'district', 'circle']}
								>
									{({ data: tubeDisruptions, isLoading, error }) => {
										if (isLoading) return <Loading />;
										if (error)
											return <Text>Error getting tube disruptions.</Text>;
										if (!tubeDisruptions.length)
											return (
												<ScheduleTimeLabel>Tube is good. 👍</ScheduleTimeLabel>
											);

										return tubeDisruptions.map(({ description }, i) => (
											<ScheduleTimeLabel key={i}>
												{description}
											</ScheduleTimeLabel>
										));
									}}
								</TubeDisruptions>
							</ScheduleContent>
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

function formatTrainStatus(status) {
	return status !== 'STARTS HERE' && status !== 'ON TIME' ? status : '';
}
