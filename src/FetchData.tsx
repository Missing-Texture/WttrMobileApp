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
				setData({
					'city': json.nearest_area[0].areaName[0].value,
					'dayInfos': [
						{
							date: json.weather[0].date,
							temps: json.weather[0].hourly.map((datapoint: any) => { return Number(datapoint.tempC) }),
							rain: json.weather[0].hourly.map((datapoint: any) => { return Number(datapoint.chanceofrain) }),
						},
						{
							date: json.weather[1].date,
							temps: json.weather[1].hourly.map((datapoint: any) => { return Number(datapoint.tempC) }),
							rain: json.weather[1].hourly.map((datapoint: any) => { return Number(datapoint.chanceofrain) }),
						},
						{
							date: json.weather[2].date,
							temps: json.weather[2].hourly.map((datapoint: any) => { return Number(datapoint.tempC) }),
							rain: json.weather[2].hourly.map((datapoint: any) => { return Number(datapoint.chanceofrain) }),
						}],
					'currentTemp': json.current_condition[0].temp_C,
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