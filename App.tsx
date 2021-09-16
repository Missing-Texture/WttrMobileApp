import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Animated } from 'react-native';
import PagerView from 'react-native-pager-view';

import { fetchData } from './src/FetchData'
import WeatherData from './src/WeatherData'
import WeatherDataBackground from './src/WeatherDataBackground'
import InfoHeader from './src/InfoHeader'
import Pagination from './src/Pagination';
import globalStyles from './src/globalStyles'


const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export default function App() {

	var specificCity = 'ingolstadt'

	const { data, isLoading } = fetchData('http://wttr.in/'+ specificCity +'?format=j1')

	const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  	const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
	const [pageIndex, setPageIndex] = React.useState(0);


	return (
		<View style={[ styles.container, globalStyles.blackBackground ]}>
			{/* show infinite loading circle while data is not loaded */
				isLoading ? <ActivityIndicator /> : (
					<View>
						<InfoHeader data={data!}/>

						<Pagination
							scrollOffset={scrollOffsetAnimatedValue}
							scrollPosition={positionAnimatedValue}
							data={data!}
							pageIndex={pageIndex}
						/>

						<View style={ [globalStyles.P_overlappingContainer, { width: 350, height: 450, marginTop: 30 }]}>
							<View style={ globalStyles.C_overlappingContainer }>
								<WeatherDataBackground data={data!.dayInfos[0]} />
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
										<WeatherData data={data!.dayInfos[0]}/>
									</View>
									<View key="2">
										<WeatherData data={data!.dayInfos[1]}/>
									</View>
									<View key="3">
										<WeatherData data={data!.dayInfos[2]}/>
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
