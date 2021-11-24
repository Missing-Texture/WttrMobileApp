import { createContext } from "react";
import { IData, IError } from "../Interfaces";

interface IWeatherDataContext {
    data: IData, 
    setData: (data: IData) => void, 
    isLoading: boolean, 
    setIsLoading: (isLoading: boolean) => void
    error: IError | null, 
    setError: (error: IError | null) => void
}

export const WeatherDataContext = createContext<IWeatherDataContext>({
    data: {
        city: "",
        dayInfos: [{
            date: "",
            temps: [0,0],
            rain: [0,0],
        }],
        currentTemp: 0,
        currentWeatherCode: 0,
        maxTemp: 0,
        minTemp: 0,
        sunrise: "",
        sunset: "",
        humidity: 0,
        windspeed: 0,
    },
    setData: () => {},
    isLoading: true,
    setIsLoading: () => {},
    error: null,
    setError: () => {},

})