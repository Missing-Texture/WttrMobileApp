import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Animated, AppState } from 'react-native';

import globalStyles from '../../globalStyles'
import { IData, IPreferences } from '../../Interfaces'
import { WeatherDataContext } from '../../Contexts/WeatherDataContext'
import { fetchLocation, fetchWeatherData } from '../../FetchData'
import InfoHeader from './StatefulComponents/InfoHeader'
import Pagination from './StatefulComponents/Pagination';
import WeatherSwiper from './StatefulComponents/WeatherSwiper';
import AstronomyFooter from './StatefulComponents/AstronomyFooter';
import LoadingIndicator from './StaticComponents/LoadingIndicator';
import { PreferenceContext } from '../../Contexts/PreferenceContext';
import { getPreferences, PreferenceValues } from '../../PreferenceManager';
import { useToast } from 'native-base';


export default function WeatherScreen() {

	const { setData, isLoading, setIsLoading, error, setError } = useContext(WeatherDataContext)
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
						fetchWeatherData(city, setData, setIsLoading, setError, prefs)
					})
				})
			}
		}
	}

	const toast = useToast()
	
	// Error Handler
	useEffect(() => {
		if (error != null) {
			console.log("there was an error");
			
			toast.show({
				status: "error", 
				title: error.title,
				description: error.description
			})
			setError(null)
		}
	}, [error])


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
