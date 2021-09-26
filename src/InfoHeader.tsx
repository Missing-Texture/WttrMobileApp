import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { fetchWeatherData } from './FetchData'
import { IData } from './Interfaces'
import globalStyles from './globalStyles'
import WeatherIcon from './WeatherIcon';


export default function WeatherData({ data, url, city, setCity, setData, setIsLoading }: { data: IData, url: string, city: string, setCity: any, setData: any, setIsLoading: any }) {

    return(
        <View style={ styles.container }> 
            <View style={ styles.weatherSubContainer }>
                <WeatherIcon weatherCode={data?.currentWeatherCode}/>
                <Text style={[ styles.temperatureText, globalStyles.whiteText ]}>{data?.currentTemp}</Text>
            </View>
            <TextInput 
                style={[ styles.cityText, globalStyles.whiteText ]}
                onChangeText={setCity}
                onEndEditing={() => { fetchWeatherData(url, setData, setIsLoading) }}
                value={city}
            />
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', 
        marginTop: 50, 
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