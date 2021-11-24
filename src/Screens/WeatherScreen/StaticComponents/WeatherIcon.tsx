import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { Sunny, PartlyCloudy, Cloudy, VeryCloudy, LightShowers, LightRain, HeavyRain, Snow, Sleet, PartlyCloudyNight, SunnyNight } from '../../../../assets/WeatherIcons'

const iconSize = 60

export default function WeatherIcon(
    { weatherCode, dayTime }: 
    { weatherCode: number, dayTime: boolean }
) {
    switch(weatherCode) {
        case 113: return    dayTime ? <Sunny height={iconSize*0.9} width={iconSize*0.9} /> : <SunnyNight height={iconSize*0.7} width={iconSize*0.7} />                  // sunny
        case 116: return    dayTime ? <PartlyCloudy height={iconSize} width={iconSize} /> : <PartlyCloudyNight height={iconSize} width={iconSize} />    // partly cloudy
        case 119: return    <Cloudy height={iconSize} width={iconSize} />                                                                               // cloudy
        case 122: return    <VeryCloudy height={iconSize} width={iconSize} />                                                                           // very cloudy
        case 176: case 263: case 353: return    <LightShowers height={iconSize} width={iconSize} />                                                     // light showers
        case 266: case 293: case 296: return    <LightRain height={iconSize} width={iconSize} />                                                        // light rain
        case 299: case 302: case 305: case 308: case 356: case 359: return      <HeavyRain height={iconSize} width={iconSize} />                        // heavy rain
        case 227: case 230: case 320: case 329: case 332: case 338: return      <Snow height={iconSize} width={iconSize} />                             // snow
        case 179: case 281: case 182: case 284: case 185: case 311: case 314: case 317: case 323: case 326: case 335: case 350: case 362: case 365: case 368: case 371: case 374: case 377: case 392: case 395: return      <Sleet height={iconSize} width={iconSize} />    // sleet
        default: return     <PartlyCloudy height={iconSize} width={iconSize} />
    }
}