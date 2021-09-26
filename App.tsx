import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Animated, AppState, Button } from 'react-native';
import PagerView from 'react-native-pager-view';

import { fetchWeatherData } from './src/FetchData'
import WeatherData from './src/WeatherData'
import WeatherDataBackground from './src/WeatherDataBackground'
import InfoHeader from './src/InfoHeader'
import Pagination from './src/Pagination';
import globalStyles from './src/globalStyles'
import { IData } from './src/Interfaces'


const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export default function App() {

	const [city, setCity] = useState('ingolstadt')
	var url = 'http://wttr.in/'+ city +'?format=j1'

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
	
			fetchWeatherData(url, setData, setIsLoading)
		}
	}


	return (
		<View style={[ styles.container, globalStyles.blackBackground ]}>
			{/* show infinite loading circle while data is not loaded */
				isLoading ? <ActivityIndicator /> : (
					<View>
						<InfoHeader data={data!} url={url} city={city} setCity={setCity} setData={setData} setIsLoading={setIsLoading}/>

						<Pagination
							scrollOffset={scrollOffsetAnimatedValue}
							scrollPosition={positionAnimatedValue}
							data={data!}
							pageIndex={pageIndex}
						/>

						<View style={ [globalStyles.P_overlappingContainer, { width: 350, height: 400, marginTop: 30 }]}>
							<View style={ globalStyles.C_overlappingContainer }>
								<WeatherDataBackground pageIndex={pageIndex} maxTemp={data!.maxTemp} minTemp={data!.minTemp} />
							</View>

							<View style={ globalStyles.C_overlappingContainer }>
								<AnimatedPagerView initialPage={0} style={{ flex: 1 }}
									onPageScroll={Animated.event(
										[
											{
												nativeEvent: {
													offset: scrollOffsetAnimatedValue,
													position: positionAnimatedValue,
												},
											},
										],
										{
											listener: ({ nativeEvent: { offset, position } }: {nativeEvent: { offset: number, position:number }}) => {
												console.log(`Position: ${position} Offset: ${offset}`);
												// save position or page index in separate state so it can be passed and easier accessed
												setPageIndex(position)
											},
											useNativeDriver: true,
										}
									)}
								>
									<View key="1">
										<WeatherData data={data!.dayInfos[0]} maxTemp={data!.maxTemp} minTemp={data!.minTemp}/>
									</View>
									<View key="2">
										<WeatherData data={data!.dayInfos[1]} maxTemp={data!.maxTemp} minTemp={data!.minTemp}/>
									</View>
									<View key="3">
										<WeatherData data={data!.dayInfos[2]} maxTemp={data!.maxTemp} minTemp={data!.minTemp}/>
									</View>
								</AnimatedPagerView>

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
		alignItems: 'center',
	},
});
