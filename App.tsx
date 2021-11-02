import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Animated, AppState, Button } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';

import { fetchLocation, fetchWeatherData } from './src/FetchData'
import InfoHeader from './src/InfoHeader'
import Pagination from './src/Pagination';
import globalStyles from './src/globalStyles'
import { IData } from './src/Interfaces'
import WeatherSwiper from './src/WeatherSwiper';
import AstronomyFooter from './src/AstronomyFooter';


const config = {
	useSystemColorMode: false,
	initialColorMode: 'dark',
}
const customTheme = extendTheme({ config })

export default function App() {

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
		<NativeBaseProvider theme={customTheme}>
			<View style={[ styles.container, globalStyles.blackBackground ]}>
				{/* show infinite loading circle while data is not loaded */
					isLoading ? <ActivityIndicator /> : (
						<View>
							<InfoHeader 
								data={data!} 
								setData={setData} 
								setIsLoading={setIsLoading}
							/>

							<Pagination
								scrollOffset={scrollOffsetAnimatedValue}
								scrollPosition={positionAnimatedValue}
								data={data!}
								pageIndex={pageIndex}
							/>

							<WeatherSwiper 
								data={data!}
								pageIndex={pageIndex}
								setPageIndex={setPageIndex}
								scrollOffsetAV={scrollOffsetAnimatedValue}
								positionAV={positionAnimatedValue}
							/>

							<AstronomyFooter
								data={data!}
							/>
						</View>
					)}
			</View>
		</NativeBaseProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
});
