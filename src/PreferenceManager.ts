import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPreferences } from './Interfaces';

const PREFERENCES_KEY = "preferences"

export const PreferenceValues = {
    MeasuringSystem: {
        metric: "metric",
        imperial: "imperial",
    },
    TemperatureScale: {
        actual: "actual",
        feels_like: "feels_like",
    }
}

export const storePreferences = async (value: IPreferences) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(PREFERENCES_KEY, jsonValue)
    } catch (e) {
        // saving error
        console.log(e)
    }
}
  
export const getPreferences = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(PREFERENCES_KEY)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
        console.log(e)
    }
}