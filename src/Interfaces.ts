export interface IData {
	city: string
    dayInfos: IDayWeatherInfo[]
	currentTemp: number
	currentWeatherCode: number
	maxTemp: number
	minTemp: number
	sunrise: string
	sunset: string
	humidity: number
	windspeed: number
}

export interface IDayWeatherInfo {
	date: string
	temps: number[]
	rain: number[]
}

export interface IPreferences {
	MeasuringSystem: string
    TemperatureScale: string
}

export interface IError {
	title: string
	description: string
}