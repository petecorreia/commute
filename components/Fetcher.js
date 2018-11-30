import React, { Component } from 'react';
import { AppState } from 'react-native';
import axios from 'axios';
import tflAPI from '../api/tfl';

export default class Fetcher extends Component {
	state = {
		data: [],
		isLoading: true,
		error: null,
	};

	static defaultProps = {
		pollingInterval: 15000,
	};

	componentDidMount() {
		this.setState({ isLoading: true }, this.callFetch);
		this.startPolling();
		AppState.addEventListener('change', this.handleAppStateChange);
	}

	componentWillUnmount() {
		this.source.cancel('Component unmounted');
		this.stopPolling();
		AppState.removeEventListener('change', this.handleAppStateChange);
	}

	render() {
		const { data, isLoading, error } = this.state;
		return this.props.children({ data, isLoading, error });
	}

	handleAppStateChange = appState => {
		if (appState.match(/inactive|background/)) {
			this.stopPolling();
		}
		if (appState === 'active') {
			this.callFetch();
			this.startPolling();
		}
	};

	startPolling = () => {
		this.polling = setInterval(
			() => this.callFetch(),
			this.props.pollingInterval
		);
	};

	stopPolling = () => {
		clearInterval(this.polling);
	};

	callFetch = async () => {
		const { fetch } = this.props;

		const CancelToken = axios.CancelToken;
		this.source = CancelToken.source();

		try {
			const data = await fetch(this.source.token);

			this.setState({
				data,
				isLoading: false,
			});
		} catch (error) {
			this.setState({
				error,
				isLoading: false,
			});
		}
	};
}
