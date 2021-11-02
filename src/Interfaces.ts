export interface IData {
	city: string
    dayInfos: IDayWeatherInfo[]
	currentTemp: string
	currentWeatherCode: number
	maxTemp: number
	minTemp: number
	sunrise: string
	sunset: string
}

export interface IDayWeatherInfo {
	date: string
	temps: number[]
	rain: number[]
}