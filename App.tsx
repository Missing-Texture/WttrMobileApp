import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View , ActivityIndicator } from 'react-native';
import { LineChart, AreaChart, XAxis, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Grid, DayTimeAxis, Cursor } from './UiComponents'


interface IData {
	city: string
	day1: IDayWeatherInfo
	day2: IDayWeatherInfo
	day3: IDayWeatherInfo
}

interface IDayWeatherInfo {
	date: string
	temps: number[]
	rain: number[]
}

export default function App() {

	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<IData>()

	// useEffect with empty dependencys only triggers api fetch once on page load
	useEffect(() => {
		fetch('http://v2.wttr.in/ingolstadt?format=j1')
			.then(response => {
				return response.json()
			})
			.then(json => {
				setData({
					'city': json.nearest_area[0].areaName[0].value,
					'day1': {
						date: json.weather[0].date,
						temps: json.weather[0].hourly.map((datapoint: any) => {return Number(datapoint.tempC)}),
						rain: json.weather[0].hourly.map((datapoint: any) => {return Number(datapoint.chanceofrain)}),
					},
					'day2': {
						date: json.weather[1].date,
						temps: json.weather[1].hourly.map((datapoint: any) => {return Number(datapoint.tempC)}),
						rain: json.weather[1].hourly.map((datapoint: any) => {return Number(datapoint.chanceofrain)}),
					},
					'day3': {
						date: json.weather[2].date,
						temps: json.weather[2].hourly.map((datapoint: any) => {return Number(datapoint.tempC)}),
						rain: json.weather[2].hourly.map((datapoint: any) => {return Number(datapoint.chanceofrain)}),
					}
				})
			})
			.catch(error => {
				console.error(error);
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [])

	return (
		<View style={styles.container}>
			{/* show infinite loading circle while data is not loaded */
			isLoading ? <ActivityIndicator/> : (
				<View>
					<Text style={styles.header}>{data?.city}</Text>

					<View style={{ marginTop: 20, position: 'relative', width: 350, height: 250 }}>
						<View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
							<LineChart
								style={{ width: '90%', height: '70%' }}
								data={data!.day1.temps}
								curve={shape.curveMonotoneX}
								svg={{ stroke: 'rgb(81, 200, 85)', strokeWidth: 4 }}
								contentInset={{ top: 4, bottom: 4 }}
							></LineChart>
						</View>

						<View style={{ position: 'absolute', width: '100%', height: '100%' }}>
							<Grid />
						</View>

            <View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', }}>
							<Cursor />
						</View>
					</View>

					<View style={{ marginTop: 10, width: 350, height: 30}}>
						<DayTimeAxis />
					</View>

					<View style={{ marginTop: 10, position: 'relative', height: 75, width: 350 }}>
						<View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
							<AreaChart
								style={{ width: '90%', height: '70%' }}
								data={data!.day1.rain}
								yMax={100}
								curve={shape.curveMonotoneX}
								svg={{ fill: 'rgb(48, 59, 184)' }}
							></AreaChart>
						</View>

						<View style={{ position: 'absolute', width: '100%', height: '100%' }}>
							<Grid />
						</View>

            <View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', }}>
							<Cursor />
						</View>
					</View>
				</View>
				)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#131516',
		alignItems: 'center',
	},
	header: {
		marginTop: 20,
		textAlign: 'center',
		color: '#e8e6ff',
		fontSize: 25,
		paddingTop: 10,
	}
});
