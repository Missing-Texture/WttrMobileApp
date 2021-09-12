import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import PagerView from 'react-native-pager-view';
import moment from 'moment'
import { fetchData } from './src/FetchData'
import WeatherData from './src/WeatherData'
import WeatherDataBackground from './src/WeatherDataBackground'
import { globalStyles } from './src/globalStyles'

export default function App() {

	const { data, isLoading } = fetchData('http://v2.wttr.in/ingolstadt?format=j1')
	const [pageIndex, setPageIndex] = React.useState(0);

	const weekDaysRef: any = useRef([])

	useEffect(() => {
		if (!isLoading) {
			weekDaysRef.current.forEach((elem: any) => {
				elem.setNativeProps({style: {fontWeight: 'normal'}})
				elem.setNativeProps({style: {opacity: 0.4}})
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
								<Text style={{ color: 'white', paddingLeft: 15, paddingRight: 15, fontSize: 15 }}
									key={i}
									ref={elem => weekDaysRef.current[i] = elem}
								>
									{/* necessary to use moment lib because toLocaleDateString doesnt work on Android */}
									{moment(item.date).format('ddd')}
									{/* {new Date(item.date).toLocaleDateString('en-US', {weekday: 'short'})} */}
								</Text>
							))}
						</View>

						<View style={ [globalStyles.P_overlappingContainer, { width: 350, height: 450, marginTop: 20 }]}>
							<View style={ globalStyles.C_overlappingContainer }>
								<WeatherDataBackground data={data!.dayInfos[0]} />
							</View>

							<View style={ globalStyles.C_overlappingContainer }>
								<PagerView initialPage={0} style={{ flex: 1 }}>
									<View key="1">
										<WeatherData data={data!.dayInfos[0]}/>
									</View>
									<View key="2">
										<WeatherData data={data!.dayInfos[1]}/>
									</View>
									<View key="3">
										<WeatherData data={data!.dayInfos[2]}/>
									</View>
								</PagerView>
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
		marginTop: 40,
		textAlign: 'center',
		color: '#e8e6ff',
		fontSize: 35,
		paddingTop: 10,
	}
});
