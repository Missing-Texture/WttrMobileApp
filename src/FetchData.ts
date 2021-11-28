import * as Location from 'expo-location';
import { useContext } from 'react';
import { IData, IError, IPreferences } from './Interfaces';
import { PreferenceContext } from './Contexts/PreferenceContext';
import { PreferenceValues } from './PreferenceManager';


export var fetchLocation = () => new Promise<String>((resolve, reject) => {
	Location.requestForegroundPermissionsAsync()
	.then(({ status }) => {
		if (status === 'granted') {
			Location.getCurrentPositionAsync()
			.then(location => {
				let coords = location.coords

				// test none city coords
				// setLat(48.8142481)
				// setLon(11.4537253)

				// console.log(coords)

				fetchCity(coords.latitude, coords.longitude)
				.then(city => {
					resolve(city)
				})
				.catch(error => {
					reject(error)
				})
			})
		}
	})
})

var fetchCity = (latitude: Number, longitude: Number) => new Promise<String>((resolve, reject) => {
	fetch('https://nominatim.openstreetmap.org/reverse?lat='+ latitude +'&lon='+ longitude +'&format=json')
	.then(response => {
		return response.json()
	})
	.then(json => {
		// console.log(json.address)

		if ('city' in json.address) {
			resolve(json.address.city)
		}
		else {
			console.log("Sorry, we could not find your nearest city")
			resolve('')
		}
	})
	.catch(error => {
		console.error(error);
		reject("Error")
	})
})


export function fetchWeatherData(city: String, setData: (data: IData) => void, setIsLoading: (isLoading: boolean) => void, setError: (error: IError | null) => void,  preferences: IPreferences) {
	setIsLoading(true)

	fetch('http://wttr.in/'+ city +'?format=j1')
	.then(response => {
		if (response.status != 200) {
			setError({
				title: "We can't find that City",
				description: "Try searching another City manually",
			})
		}
		return response.json()
	})
	.then(json => {
		var selected_current_temp = "temp_C"
		var	selected_temp = "tempC"
		var	selected_windspeed = "windspeedKmph"

		// decide which values to use based on users preferences
		if (preferences.MeasuringSystem == PreferenceValues.MeasuringSystem.metric &&
			preferences.TemperatureScale == PreferenceValues.TemperatureScale.actual) 
		{
			selected_current_temp = "temp_C"
			selected_temp = "tempC"
			selected_windspeed = "windspeedKmph"
		} 
		else if (preferences.MeasuringSystem == PreferenceValues.MeasuringSystem.metric &&
			preferences.TemperatureScale == PreferenceValues.TemperatureScale.feels_like) 
		{ 
			selected_current_temp = "FeelsLikeC"
			selected_temp = "FeelsLikeC"
			selected_windspeed = "windspeedKmph"
		} 
		else if (preferences.MeasuringSystem == PreferenceValues.MeasuringSystem.imperial &&
			preferences.TemperatureScale == PreferenceValues.TemperatureScale.actual) 
		{
			selected_current_temp = "temp_F"
			selected_temp = "tempF"
			selected_windspeed = "windspeedMiles"
		} 
		else if (preferences.MeasuringSystem == PreferenceValues.MeasuringSystem.imperial &&
			preferences.TemperatureScale == PreferenceValues.TemperatureScale.feels_like) 
		{
			selected_current_temp = "FeelsLikeF"
			selected_temp = "FeelsLikeF"
			selected_windspeed = "windspeedMiles"
		}


		let temps = []
		let rains = []
		let snows = []
		for (let i = 0; i < 3; i++) {
			temps[i] = json.weather[i].hourly.map((datapoint: any) => { return Number(datapoint[selected_temp]) })
			rains[i] = json.weather[i].hourly.map((datapoint: any) => { return Number(datapoint.chanceofrain) })
			snows[i] = json.weather[i].hourly.map((datapoint: any) => { return Number(datapoint.chanceofsnow) })		}

		let combinedTempRange = [...temps[0], ...temps[1], ...temps[2]]

		setData({
			'city': json.nearest_area[0].areaName[0].value,
			'dayInfos': [
				{
					date: json.weather[0].date,
					temps: temps[0],
					rain: rains[0],
					snow: snows[0],
				},
				{
					date: json.weather[1].date,
					temps: temps[1],
					rain: rains[1],
					snow: snows[1],
				},
				{
					date: json.weather[2].date,
					temps: temps[2],
					rain: rains[2],
					snow: snows[2],
				}],
			'currentTemp': Number(json.current_condition[0][selected_current_temp]),
			'currentWeatherCode': Number(json.current_condition[0].weatherCode),
			'maxTemp': Math.max.apply(null, combinedTempRange),
			'minTemp': Math.min.apply(null, combinedTempRange),
			'sunrise': json.weather[0].astronomy[0].sunrise,
			'sunset': json.weather[0].astronomy[0].sunset,
			'humidity': Number(json.current_condition[0].humidity),
			'windspeed': Number(json.current_condition[0][selected_windspeed]),
		})
	})
	.catch(error => {
		console.error(error);
	})
	.finally(() => {
		setIsLoading(false)
	})
}