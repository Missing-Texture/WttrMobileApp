import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { LineChart, AreaChart, XAxis, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Grid, DayTimeAxis, Cursor } from './UiComponents'
import { IDayWeatherInfo } from './Interfaces'
import { globalStyles } from './globalStyles'


export default function WeatherData({ data }: { data: IDayWeatherInfo }) {

    const styles = StyleSheet.create({
        tempsAxis: {
            color: 'white', 
            fontSize: 15
        }
    })

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
                    ></LineChart>
                </View>

                <View style={[ globalStyles.C_overlappingContainer, { position: 'absolute', width: '20%', height: '100%', paddingLeft: '3%' } ]}>
                    <Text style={[styles.tempsAxis, {paddingTop: 15, paddingBottom: 180}]}>{Math.max.apply(null, data.temps)}</Text>
                    <Text style={styles.tempsAxis}>{Math.min.apply(null, data.temps)}</Text>
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