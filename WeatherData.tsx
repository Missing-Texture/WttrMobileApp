import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { LineChart, AreaChart, XAxis, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Grid, DayTimeAxis, Cursor } from './UiComponents'
import { IDayWeatherInfo } from './Interfaces'


export default function WeatherData({ data }: { data: IDayWeatherInfo }) {

    const styles = StyleSheet.create({
        dayTimeAxis: {
            color: 'white', 
            paddingLeft: 33, 
            paddingRight: 33,
            fontSize: 15
        },
    })

    return(
        <View>
            <View style={{ marginTop: 20, position: 'relative', width: 350, height: 250 }}>
                <View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <LineChart
                        style={{ width: '90%', height: '70%' }}
                        data={data.temps}
                        curve={shape.curveMonotoneX}
                        svg={{ stroke: 'rgb(81, 200, 85)', strokeWidth: 4 }}
                        contentInset={{ top: 4, bottom: 4 }}
                    ></LineChart>
                </View>

                <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    <Grid />
                </View>

                <View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', }}>
                    <Cursor />
                </View>
            </View>

            <View style={{ height: 40, width: 350, marginTop: 20, flexDirection:'row', justifyContent: 'center' }}>
                {/* <DayTimeAxis /> */}
                <Text style={styles.dayTimeAxis}>0</Text> 
                <Text style={styles.dayTimeAxis}>6</Text> 
                <Text style={styles.dayTimeAxis}>12</Text>
                <Text style={styles.dayTimeAxis}>18</Text> 
                <Text style={styles.dayTimeAxis}>24</Text> 
            </View>

            <View style={{ marginTop: 10, position: 'relative', height: 100, width: 350 }}>
                <View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <AreaChart
                        style={{ width: '90%', height: '70%' }}
                        data={data.rain}
                        yMax={100}
                        curve={shape.curveMonotoneX}
                        svg={{ fill: 'rgb(48, 59, 184)' }}
                    ></AreaChart>
                </View>

                <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    <Grid />
                </View>

                <View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', }}>
                    <Cursor />
                </View>
            </View>
        </View>
    )
}