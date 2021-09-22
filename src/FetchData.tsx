import { useState, useEffect } from 'react';
import { IData } from './Interfaces'

export function fetchData(url: string) {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<IData>()

	// useEffect with empty dependencies only triggers api fetch once on page load
	useEffect(() => {
		fetch(url)
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
					'currentWeather': json.current_condition[0].weatherDesc[0].value,
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
	}, [])

	return { data, isLoading }
}