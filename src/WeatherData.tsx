import React, { useEffect, useState } from 'react'
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
    const [gradientColors, setGradientColors]: any = useState([])


    useEffect(() => {
        // max temp is 45, min temp is -30 -> +30 to clap values between 0 and 75
        let maxGradVal = (1 - ( ( maxTemp + 30 ) / 75 )).toFixed(1)
        let minGradVal = (1 - ( ( minTemp + 30 ) / 75 )).toFixed(1)

        // console.log("max: " + maxGradVal + ", min: " + minGradVal)

        const colorMappings: any = {
            0.0: "#E92020",
            0.2: "#E7872D",
            0.4: "#E1C627",
            0.5: "#3ADE4E",
            0.6: "#3CCCD3",
            0.8: "#2A26CF",
            1.0: "#8E1DCE"
        }

        var usedGradientColors: any = [ ]

        for (let key in colorMappings) {
            if (key == maxGradVal || (Number(key)+0.1).toFixed(1) == maxGradVal || (Number(key)-0.1).toFixed(1) == maxGradVal || 
                key == minGradVal || (Number(key)+0.1).toFixed(1) == minGradVal || (Number(key)-0.1).toFixed(1) == minGradVal) 
            {
                usedGradientColors.push(colorMappings[key])
            }
        }

        var usedGradientColorsLen = usedGradientColors.length

        for (let i = 0; i < usedGradientColorsLen; i++) {
            if (i == 0) {
                gradientColors.push({0:usedGradientColors[i]})
            }
            else if (i == usedGradientColorsLen-1) {
                gradientColors.push({1:usedGradientColors[i]})
            }
            else {
                let obj: any = {}
                obj[i/(usedGradientColorsLen-1)] = usedGradientColors[i]
                gradientColors.push(obj)
            }
        }

        // console.log(gradientColors)
    }, [])


    return(
        <View>
            <View style={[ globalStyles.P_overlappingContainer, { width: '100%', height: '50%' } ]}>
                <View style={[ globalStyles.C_overlappingContainer, { alignItems: 'center', justifyContent: 'center', marginLeft: 10 } ]}>
                    <LineChart
                        style={{ width: '90%', height: '70%' }}
                        data={data.temps}
                        curve={shape.curveMonotoneX}
                        svg={{ stroke: 'url(#grad)', strokeWidth: 5 }}
                        gradColors={gradientColors}
                        contentInset={{ top: 4, bottom: 4 }}
                        yMax={maxTemp}
                        yMin={minTemp}
                    ></LineChart>
                </View>
            </View>

            <View style={{ height: '15%', width: '100%' }}>
                {/* empty View for Axis name*/}
            </View>

            <View style={{ width: '100%', height: '25%', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                <AreaChart
                    style={{ width: '90%', height: '70%' }}
                    data={data.rain}
                    yMax={100}
                    curve={shape.curveMonotoneX}
                    svg={{ fill: 'rgb(48, 59, 184)' }}
                ></AreaChart>
            </View>

            <View style={{ height: '5%', width: '100%' }}>
                {/* empty View for Axis name*/}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
})