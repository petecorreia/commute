import React, { Component } from 'react';
import { View, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
	<View style={[styles.container, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
	<View style={[styles.container, { backgroundColor: '#673ab7' }]} />
);

export default class Tabs extends Component {
	state = {
		index: 0,
		routes: [
			{ key: 'first', title: 'First' },
			{ key: 'second', title: 'Second' },
		],
	};

	handleIndexChange = index => this.setState({ index });

	renderTabBar = props => {
		const inputRange = props.navigationState.routes.map((x, i) => i);

		return (
			<View style={styles.tabBar}>
				{props.navigationState.routes.map((route, i) => {
					const color = props.position.interpolate({
						inputRange,
						outputRange: inputRange.map(inputIndex =>
							inputIndex === i ? '#D6356C' : '#222'
						),
					});
					return (
						<TouchableOpacity
							style={styles.tabItem}
							onPress={() => this.setState({ index: i })}
						>
							<Animated.Text style={{ color }}>{route.title}</Animated.Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	};

	renderScene = SceneMap({
		first: FirstRoute,
		second: SecondRoute,
	});

	render() {
		return (
			<TabView
				navigationState={this.state}
				renderScene={this.renderScene}
				renderTabBar={this.renderTabBar}
				onIndexChange={this.handleIndexChange}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tabBar: {
		flexDirection: 'row',
	},
	tabItem: {
		flex: 1,
		alignItems: 'center',
		padding: 16,
	},
});
