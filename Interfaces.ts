export interface IData {
	city: string
    dayInfos: IDayWeatherInfo[]
}

export interface IDayWeatherInfo {
	date: string
	temps: number[]
	rain: number[]
}