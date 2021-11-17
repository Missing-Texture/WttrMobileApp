import { createContext } from "react";
import { IPreferences } from "./Interfaces"

interface IPreferenceContext {
    preferences: IPreferences, 
    setPreferences: (data: IPreferences) => void, 
}

// these default values should always get overwritten by the actual defaults in App.tsx
export const PreferenceContext = createContext<IPreferenceContext>({
    preferences: {MeasuringSystem: "",TemperatureScale: ""},
    setPreferences: () => {}
})