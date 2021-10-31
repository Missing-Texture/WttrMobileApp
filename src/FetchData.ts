
import * as Location from 'expo-location';


export function fetchLocation() {
	return new Promise((resolve, reject) => {
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

					fetch('https://nominatim.openstreetmap.org/reverse?lat='+ coords.latitude +'&lon='+ coords.longitude +'&format=json')
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
			}
		})
	})
}

export function fetchWeatherData(city: any, setData: any, setIsLoading: any) {
	setIsLoading(true)

	fetch('http://wttr.in/'+ city +'?format=j1')
	.then(response => {
		return response.json()
	})
	.then(json => {
		let temps = []
		let rains = []
		for (let i = 0; i < 3; i++) {
			temps[i] = json.weather[i].hourly.map((datapoint: any) => { return Number(datapoint.tempC) })
			rains[i] = json.weather[i].hourly.map((datapoint: any) => { return Number(datapoint.chanceofrain) })
		}

		let combinedTempRange = [...temps[0], ...temps[1], ...temps[2]]

		setData({
			'city': json.nearest_area[0].areaName[0].value,
			'dayInfos': [
				{
					date: json.weather[0].date,
					temps: temps[0],
					rain: rains[0],
				},
				{
					date: json.weather[1].date,
					temps: temps[1],
					rain: rains[1],
				},
				{
					date: json.weather[2].date,
					temps: temps[2],
					rain: rains[2],
				}],
			'currentTemp': json.current_condition[0].temp_C + '°C',
			'currentWeatherCode': Number(json.current_condition[0].weatherCode),
			'maxTemp': Math.max.apply(null, combinedTempRange),
			'minTemp': Math.min.apply(null, combinedTempRange),
		})
	})
	.catch(error => {
		console.error(error);
	})
	.finally(() => {
		setIsLoading(false)
	})
}