import React, { useContext } from 'react';
import { Button, Divider, HStack, Select, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/core'

import { storePreferences, getPreferences, PreferenceValues } from './PreferenceManager';
import { PreferenceContext } from './PreferenceContext';
import { WeatherDataContext } from './WeatherDataContext';
import { fetchLocation, fetchWeatherData } from './WeatherScreen/FetchData';
import { Pressable } from 'react-native';


export default function PreferencesScreen() {
    const navigation = useNavigation<any>()
    const { preferences, setPreferences } = useContext(PreferenceContext)

    const { setData, setIsLoading } = useContext(WeatherDataContext)

    return(
        <VStack>
            <Preference>
                <Text fontSize={'xl'} color="blueGray.100">Measuring System</Text>
                <Select 
                    pt={1.5} pb={1.5} pl={3} color="blueGray.100" minWidth={150} 
                    defaultValue={preferences?.MeasuringSystem}
                    onValueChange={(value) => {
                        let pref = preferences
                        pref.MeasuringSystem = value
                        setPreferences(pref)
                        storePreferences(pref)
                        refetchWeatherData()
                    }}
                >
                    <Select.Item label="Metric" value={PreferenceValues.MeasuringSystem.metric} />
                    <Select.Item label="Imperial" value={PreferenceValues.MeasuringSystem.imperial} />
                </Select>
            </Preference>

            <Preference>
                <Text fontSize={'xl'} color="blueGray.100">Temperature Scale</Text>
                <Select 
                    pt={1.5} pb={1.5} pl={3} color="blueGray.100" minWidth={150} 
                    defaultValue={preferences?.TemperatureScale}
                    onValueChange={(value) => {
                        let pref = preferences
                        pref.TemperatureScale = value
                        setPreferences(pref)
                        storePreferences(pref)
                        refetchWeatherData()
                    }}
                >
                    <Select.Item label="actual" value={PreferenceValues.TemperatureScale.actual} />
                    <Select.Item label="feels like" value={PreferenceValues.TemperatureScale.feels_like} />
                </Select>
            </Preference>

            <Pressable onPress={() => navigation.navigate('Credits')}>
                <Preference>    
                    <Text fontSize={'xl'} color="blueGray.100">Credits</Text>
                </Preference>
            </Pressable>
        </VStack>
    )

    function refetchWeatherData() {
        fetchLocation()
        .then((city: String) => {
            fetchWeatherData(city, setData, setIsLoading, preferences)
        })
    }
}

function Preference({ children }: {children: any}) {
    return (
        <VStack>
            <HStack p={3} pl={4} pr={4} justifyContent="space-between" alignItems="center">
                { children }
            </HStack>
            <Divider />
        </VStack>
    )
}