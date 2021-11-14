import { createContext } from "react";
import { IData } from "./Interfaces";

interface IWeatherDataContext {
    data: IData, 
    setData: (data: IData) => void, 
    isLoading: boolean, 
    setIsLoading: (isLoading: boolean) => void
}

export const WeatherDataContext = createContext<Partial<IWeatherDataContext>>({})