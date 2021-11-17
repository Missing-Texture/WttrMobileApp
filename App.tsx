import React, { useEffect, useState } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WeatherScreen from './src/WeatherScreen';
import SettingsScreen from './src/PreferencesScreen';
import CreditScreen from './src/CreditScreen';
import { PreferenceContext } from './src/PreferenceContext';
import { IPreferences } from './src/Interfaces';
import { getPreferences, PreferenceValues } from './src/PreferenceManager';


const config = {
	useSystemColorMode: false,
	initialColorMode: 'dark',
}
const customTheme = extendTheme({ config })

const Stack = createNativeStackNavigator();

export default function App() {

	// default values for Preferences get used as long as the user doesn't update the preferences
	const [preferences, setPreferences] = useState<IPreferences>({
		MeasuringSystem: PreferenceValues.MeasuringSystem.metric,
    	TemperatureScale: PreferenceValues.TemperatureScale.actual
	})

	useEffect(() => {
		console.log("retrieving preferences from async storage")
		getPreferences()
		.then((prefs: IPreferences) => {
			// don't update preferences State if values in async storage don't exist
			if (prefs !== undefined && prefs !== null) {
				setPreferences(prefs)
			}
		})
	}, [])

	return (
		<NativeBaseProvider theme={customTheme}>
			<NavigationContainer theme={DarkTheme}>
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
							name="Settings"
							component={SettingsScreen}
						/>
						<Stack.Screen 
							name="Credits"
							component={CreditScreen}
						/>
					</Stack.Navigator>
				</PreferenceContext.Provider>
			</NavigationContainer>
		</NativeBaseProvider>
	);
}

