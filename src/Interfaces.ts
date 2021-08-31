export interface IData {
	city: string
    dayInfos: IDayWeatherInfo[]
	currentTemp: number
}

export interface IDayWeatherInfo {
	date: string
	temps: number[]
	rain: number[]
}