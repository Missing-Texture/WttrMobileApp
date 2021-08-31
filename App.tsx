import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures'
import moment from 'moment'
import { fetchData } from './src/FetchData'
import WeatherData from './src/WeatherData'

export default function App() {

	const { data, isLoading } = fetchData('http://v2.wttr.in/ingolstadt?format=j1')
	const [pageIndex, setPageIndex] = React.useState(0);

	const weekDaysRef: any = useRef([])

	useEffect(() => {
		if (!isLoading) {
			weekDaysRef.current.forEach((elem: any) => {
				elem.setNativeProps({style: {fontWeight: 'normal'}})
			})
			weekDaysRef.current[pageIndex].setNativeProps({style: {fontWeight: 'bold'}})
		}
	}, [pageIndex])

	return (
		<View style={styles.container}>
			{/* show infinite loading circle while data is not loaded */
				isLoading ? <ActivityIndicator /> : (
					<View>
						<Text style={styles.header}>{data?.city}</Text>

						<View style={{ height: 50, width: 350, marginTop: 20, flexDirection:'row', justifyContent: 'center' }}>
							{data!.dayInfos.map((item, i) => (
								<Text style={{ color: 'white', padding: 10, fontSize: 15 }}
									key={i}
									ref={elem => weekDaysRef.current[i] = elem}
								>
									{/* necessary to use moment lib because toLocaleDateString doesnt work on Android */}
									{moment(item.date).format('ddd')}
									{/* {new Date(item.date).toLocaleDateString('en-US', {weekday: 'short'})} */}
								</Text>
							))}
						</View>

						<GestureRecognizer
							onSwipeLeft={() => {setPageIndex((pageIndex-1 < 0) ? 2 : pageIndex-1)}}
							onSwipeRight={() => setPageIndex((pageIndex+1)%3)}
						>
							<WeatherData data={data!.dayInfos[pageIndex]}/>
						</GestureRecognizer>
						
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
		marginTop: 40,
		textAlign: 'center',
		color: '#e8e6ff',
		fontSize: 25,
		paddingTop: 10,
	}
});
