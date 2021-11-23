import React, { useEffect, useState } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WeatherScreen from './src/WeatherScreen';
import PreferencesScreen from './src/PreferencesScreen';
import CreditScreen from './src/CreditScreen';
import { PreferenceContext } from './src/PreferenceContext';
import { IData, IError, IPreferences } from './src/Interfaces';
import { WeatherDataContext } from './src/WeatherDataContext';


const config = {
	useSystemColorMode: false,
	initialColorMode: 'dark',
}
const customTheme = extendTheme({ config })

const Stack = createNativeStackNavigator();

export default function App() {

	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<IData>({city: "", dayInfos: [{date: "", temps: [0,0], rain: [0,0]}], currentTemp: 0, currentWeatherCode: 0, maxTemp: 0, minTemp: 0, sunrise: "", sunset: "", humidity: 0, windspeed: 0})
	const [error, setError] = useState<IError | null>(null)

	const [preferences, setPreferences] = useState<IPreferences>({
		MeasuringSystem: "",
    	TemperatureScale: ""
	})

	return (
		<NativeBaseProvider theme={customTheme}>
			<NavigationContainer theme={DarkTheme}>
				<WeatherDataContext.Provider value={{ data, setData, isLoading, setIsLoading, error, setError }}>
					<PreferenceContext.Provider value={{preferences, setPreferences}}>
						<Stack.Navigator>
							<Stack.Screen 
								name="Weather" 
								component={WeatherScreen} 
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen 
								name="Preferences"
								component={PreferencesScreen}
							/>
							<Stack.Screen 
								name="Credits"
								component={CreditScreen}
							/>
						</Stack.Navigator>
					</PreferenceContext.Provider>
				</WeatherDataContext.Provider>
			</NavigationContainer>
		</NativeBaseProvider>
	);
}

