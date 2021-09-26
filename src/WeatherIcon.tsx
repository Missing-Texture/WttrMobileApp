import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { Sunny, PartlyCloudy, Cloudy, VeryCloudy, LightShowers, LightRain, HeavyRain } from '../assets/WeatherIcons'

const iconSize = 60

export default function WeatherIcon({ weatherCode }: { weatherCode: number }) {

    switch(weatherCode) {
        case 113: return <Sunny height={iconSize} width={iconSize} />           // sunny
        case 116: return <PartlyCloudy height={iconSize} width={iconSize} />    // partly cloudy
        case 119: return <Cloudy height={iconSize} width={iconSize} />          // cloudy
        case 122: return <VeryCloudy height={iconSize} width={iconSize} />      // very cloudy
        case 176: return <LightShowers height={iconSize} width={iconSize} />    // light showers
        case 297: return <LightRain height={iconSize} width={iconSize} />       // light rain
        case 302: return <HeavyRain height={iconSize} width={iconSize} />       // heavy showers
        default: return <PartlyCloudy height={iconSize} width={iconSize} />
    }
}