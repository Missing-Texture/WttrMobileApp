export interface IData {
	city: string
    dayInfos: IDayWeatherInfo[]
	currentTemp: string
	currentWeather: string
	maxTemp: number
	minTemp: number
}

export interface IDayWeatherInfo {
	date: string
	temps: number[]
	rain: number[]
}