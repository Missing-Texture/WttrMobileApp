import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Animated } from 'react-native';
import moment from 'moment'

import globalStyles from '../../../globalStyles'
import { WeatherDataContext } from '../../../Contexts/WeatherDataContext';


export default function Pagination(
  { scrollOffset, scrollPosition, pageIndex, }: 
  { scrollOffset: Animated.Value, scrollPosition: Animated.Value, pageIndex: number, }
) {
  	const { data } = useContext(WeatherDataContext)

  	const weekDaysRef: any = useRef([])
    useEffect(() => {
        weekDaysRef.current.forEach((elem: any) => {
            elem.setNativeProps({style: { fontWeight: 'normal', opacity: 0.6 }})
        })
        weekDaysRef.current[pageIndex].setNativeProps({style: { fontWeight: 'bold', opacity: 0.8 }})
	}, [pageIndex])
    

	const inputRange = [0, 3];
	const translateX = Animated.add(
	  scrollOffset,
	  scrollPosition
	).interpolate({
	  inputRange,
	  outputRange: [-70, 140],
	});
    

	return (
	  <View style={[ styles.container ]}>
		<Animated.View
		  style={[
			styles.paginationIndicator,
			{
			  position: 'absolute',
			  transform: [{ translateX: translateX }],
			},
		  ]}
		/>
		
        {data!.dayInfos.map((item, i) => (
            <Text style={[ styles.weekDayText, globalStyles.whiteText ]}
                key={i}
                ref={elem => weekDaysRef.current[i] = elem}
            >
                {/* necessary to use moment lib because toLocaleDateString doesnt work on Android */}
                {moment(item.date).format('ddd')}
                {/* {new Date(item.date).toLocaleDateString('en-US', {weekday: 'short'})} */}
            </Text>
        ))}
		 
	  </View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 50, 
        marginTop: 10, 
        flexDirection:'row', 
        justifyContent: 'center',
    },
    paginationIndicator: {
        width: 60,
        height: 35,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#ddd',
        marginTop: 8,
    },
    weekDayText: {
        width: 70,
        fontSize: 20,
        // backgroundColor: 'green',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});
