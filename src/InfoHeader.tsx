import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

import { IData } from './Interfaces'
import globalStyles from './globalStyles'
import PartlyCloudy from '../assets/WeatherIcons/PartlyCloudy.svg'


export default function WeatherData({ data }: { data: IData }) {

    return(
        <View style={ styles.container }> 
            <View style={ styles.weatherSubContainer }>
                <PartlyCloudy height={60} width={60} />
                <Text style={[ styles.temperatureText, globalStyles.whiteText ]}>{data?.currentTemp}</Text>
            </View>
            <Text style={[ styles.cityText, globalStyles.whiteText ]}>{data?.city}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', 
        marginTop: 40, 
        paddingLeft: 10, 
        paddingRight: 10, 
        alignItems: 'center', 
        justifyContent: 'space-between',
	},
    weatherSubContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    temperatureText: {
        fontSize: 23, 
        marginLeft: 15,
    },
    cityText: {
        fontSize: 30, 
        fontWeight: 'bold',
    },
});