import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import colors from '../styles/colors';

export const Schedule = styled.View`
	flex: 1;
	flex-direction: row;
	width: 100%;
	margin: 15px 0;
`;

export const ScheduleIcon = styled.Text`
	margin-top: 3px;
	margin-left: 25px;
	font-size: 36px;
`;

export const SchedulePipe = styled.View`
	margin: 0 20px;
	width: 20px;
	height: 100%;
	border-radius: 10px;
	background-color: ${props => props.color || 'red'};
`;

export const ScheduleContent = styled.View`
	flex: 1;
	margin-right: 10px;
`;

export const ScheduleTimetable = styled.View`
	flex: 1;
`;

export const ScheduleExtra = styled.View``;

export const ScheduleExtraLabel = styled.Text.attrs({
	numberOfLines: 1,
})`
	font-size: 14px;
	color: ${colors.gray};
`;

const ScheduleLoading = styled.View`
	flex: 1;
	margin-top: 10px;
	align-items: flex-start;
`;

export const Loading = () => (
	<ScheduleLoading>
		<ActivityIndicator />
	</ScheduleLoading>
);

export const ScheduleTime = styled.Text.attrs({
	numberOfLines: 1,
})`
	margin: 2px 0;
`;

export const ScheduleTimeProminentLabel = styled.Text`
	font-size: 36px;
	font-weight: bold;
	color: ${props => props.color};
`;

export const ScheduleTimeProminentAside = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: ${props => props.color};
`;

export const ScheduleTimeProminentTiny = styled.Text`
	font-size: 12px;
	font-weight: bold;
	color: ${props => props.color};
`;

export const ScheduleTimeLabel = styled.Text`
	font-size: 18px;
	color: ${colors.grayDark};
`;

export const ScheduleTimeAside = styled.Text`
	font-size: 18px;
	color: ${colors.gray};
`;
