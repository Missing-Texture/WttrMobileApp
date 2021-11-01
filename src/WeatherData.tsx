import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { AreaChart, XAxis, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Grid, DayTimeAxis, Cursor } from './UiComponents'
import { IDayWeatherInfo } from './Interfaces'
import globalStyles from './globalStyles'

import LineChart from './SvgCharts/line-chart';


export default function WeatherData(
    { data, maxTemp, minTemp }: 
    { data: IDayWeatherInfo, maxTemp: number, minTemp: number }
) {
    return(
        <View>
            <View style={[ globalStyles.P_overlappingContainer, { width: '100%', height: '55%' } ]}>
                <View style={[ globalStyles.C_overlappingContainer, { alignItems: 'center', justifyContent: 'center' } ]}>
                    <LineChart
                        style={{ width: '80%', height: '70%' }}
                        data={data.temps}
                        curve={shape.curveMonotoneX}
                        svg={{ stroke: 'rgb(81, 200, 85)', strokeWidth: 4 }}
                        contentInset={{ top: 4, bottom: 4 }}
                        yMax={maxTemp}
                        yMin={minTemp}
                    ></LineChart>
                </View>
            </View>

            <View style={{ height: '20%', width: '100%' }}>
            
            </View>

            <View style={{ width: '100%', height: '25%', alignItems: 'center', justifyContent: 'center' }}>
                <AreaChart
                    style={{ width: '80%', height: '70%' }}
                    data={data.rain}
                    yMax={100}
                    curve={shape.curveMonotoneX}
                    svg={{ fill: 'rgb(48, 59, 184)' }}
                ></AreaChart>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
})