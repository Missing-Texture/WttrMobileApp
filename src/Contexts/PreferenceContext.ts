import { createContext } from "react";
import { IPreferences } from "../Interfaces"

interface IPreferenceContext {
    preferences: IPreferences, 
    setPreferences: (data: IPreferences) => void, 
}

export const PreferenceContext = createContext<IPreferenceContext>({
    preferences: {MeasuringSystem: "",TemperatureScale: ""},
    setPreferences: () => {}
})