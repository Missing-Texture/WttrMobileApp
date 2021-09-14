export interface IData {
	city: string
    dayInfos: IDayWeatherInfo[]
	currentTemp: string
	currentWeather: string
}

export interface IDayWeatherInfo {
	date: string
	temps: number[]
	rain: number[]
}