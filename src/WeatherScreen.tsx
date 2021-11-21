import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Animated, AppState } from 'react-native';

import globalStyles from './globalStyles'
import { IData, IPreferences } from './Interfaces'
import { WeatherDataContext } from './WeatherDataContext'
import { fetchLocation, fetchWeatherData } from './WeatherScreen/FetchData'
import InfoHeader from './WeatherScreen/InfoHeader'
import Pagination from './WeatherScreen/Pagination';
import WeatherSwiper from './WeatherScreen/WeatherSwiper';
import AstronomyFooter from './WeatherScreen/AstronomyFooter';
import LoadingIndicator from './WeatherScreen/LoadingIndicator';
import { PreferenceContext } from './PreferenceContext';
import { getPreferences, PreferenceValues } from './PreferenceManager';


export default function WeatherScreen() {

	const { setData, isLoading, setIsLoading } = useContext(WeatherDataContext)
	const { preferences, setPreferences } = useContext(PreferenceContext)

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

			// check if preferences have not been fetched yet 
			if (preferences.MeasuringSystem === "" && preferences.TemperatureScale === "") {
				console.log("retrieving preferences from async storage")
				getPreferences()
				.then((prefs: IPreferences) => {
					// if values don't exist in async storage use default values
					if (prefs === undefined && prefs === null) {
						prefs = {
							MeasuringSystem: PreferenceValues.MeasuringSystem.metric,
							TemperatureScale: PreferenceValues.TemperatureScale.actual
						}
					}

					setPreferences(prefs)

					fetchLocation()
					.then((city: String) => {
						fetchWeatherData(city, setData, setIsLoading, prefs)
					})
				})
			}
		}
	}


	return (
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
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
});
