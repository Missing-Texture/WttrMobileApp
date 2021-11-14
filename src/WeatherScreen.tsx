import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, AppState } from 'react-native';

import globalStyles from './globalStyles'
import { IData } from './Interfaces'
import { WeatherDataContext } from './WeatherDataContext'
import { fetchLocation, fetchWeatherData } from './WeatherScreen/FetchData'
import InfoHeader from './WeatherScreen/InfoHeader'
import Pagination from './WeatherScreen/Pagination';
import WeatherSwiper from './WeatherScreen/WeatherSwiper';
import AstronomyFooter from './WeatherScreen/AstronomyFooter';
import LoadingIndicator from './WeatherScreen/LoadingIndicator';


export default function WeatherScreen() {

	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<IData>()

	const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  	const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
	const [pageIndex, setPageIndex] = React.useState(0);


	useEffect(() => {
		AppState.addEventListener('change', handleAppStateChange)
	
		return () => {
			AppState.removeEventListener('change', handleAppStateChange)
		};
	}, [])
	
	// fetch data from api and update data state when app switches to foreground
	function handleAppStateChange(nextAppState: string) {
		if ( nextAppState === 'active' ) {
			console.log("app switched to foreground")

			fetchLocation()
			.then((city: String) => {
				fetchWeatherData(city, setData, setIsLoading)
			})
		}
	}


	return (
		<WeatherDataContext.Provider value={{ data, setData, isLoading, setIsLoading }}>
			<View style={[ styles.container, globalStyles.blackBackground ]}>
				{/* show infinite loading circle while data is not loaded */
					isLoading ? <LoadingIndicator /> : (
						<View>
							<InfoHeader />

							<Pagination
								scrollOffset={scrollOffsetAnimatedValue}
								scrollPosition={positionAnimatedValue}
								pageIndex={pageIndex}
							/>

							<WeatherSwiper 
								pageIndex={pageIndex}
								setPageIndex={setPageIndex}
								scrollOffsetAV={scrollOffsetAnimatedValue}
								positionAV={positionAnimatedValue}
							/>

							<AstronomyFooter />
						</View>
					)}
			</View>
		</WeatherDataContext.Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
});
