import React from 'react';
import WeatherScreen from './src/WeatherScreen';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './src/SettingsScreen';
import CreditScreen from './src/CreditScreen';


const config = {
	useSystemColorMode: false,
	initialColorMode: 'dark',
}
const customTheme = extendTheme({ config })

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NativeBaseProvider theme={customTheme}>
			<NavigationContainer theme={DarkTheme}>
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
			</NavigationContainer>
		</NativeBaseProvider>
	);
}

