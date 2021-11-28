import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import * as shape from 'd3-shape'
import Svg, { Line } from 'react-native-svg'

import { IDayWeatherInfo } from '../../../Interfaces'
import globalStyles from '../../../globalStyles'
import LineChart from '../../../SvgCharts/line-chart';
import AreaChart from '../../../SvgCharts/area-chart';
import convertMinMaxTempToColorMappings from '../../../BusinessLogic/convertMinMaxTempToColorMappings';


export default function WeatherData(
    { data, maxTemp, minTemp }: 
    { data: IDayWeatherInfo, maxTemp: number, minTemp: number }
) {
    // use state to prevent constant recalculation of color mappings
    const [gradientColors, setGradientColors]: any = useState([])

    useEffect(() => {
        setGradientColors(convertMinMaxTempToColorMappings(minTemp, maxTemp))
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

            <View style={[ globalStyles.P_overlappingContainer, { width: '100%', height: '25%', marginLeft: 10 } ]}>
                <View style={[ globalStyles.C_overlappingContainer , { alignItems: 'center', justifyContent: 'center' } ]}>
                    <AreaChart
                        style={{ width: '90%', height: '70%' }}
                        data={data.rain}
                        yMax={100}
                        curve={shape.curveMonotoneX}
                        svg={{ fill: 'url(#grad)', opacity: '0.8' }}
                        gradColors={[{0:"#1924A0"},{1:"#303BB8"}]}
                    ></AreaChart>
                </View>
                {/* thin indication line at 0% for better visual clarity */}
                <View style={[ globalStyles.C_overlappingContainer, { alignItems: 'center', justifyContent: 'center' } ]}>
                    <Svg style={{ width: '90%', height: '100%' }}>
                        <Line x1={'0%'} x2={'100%'} y1={'85%'} y2={'85%'} stroke={'rgb(48, 59, 184)'} strokeWidth={1} opacity={'0.8'} />
                    </Svg> 
                </View>

                <View style={[ globalStyles.C_overlappingContainer , { alignItems: 'center', justifyContent: 'center' } ]}>
                    <AreaChart
                        style={{ width: '90%', height: '70%' }}
                        data={data.snow}
                        yMax={100}
                        curve={shape.curveMonotoneX}
                        svg={{ fill: 'url(#grad)', opacity: '0.6' }}
                        gradColors={[{0:"#D5D7ED"},{1:"#FFFFFF"}]}
                    ></AreaChart>
                </View>
            </View>

            <View style={{ height: '5%', width: '100%' }}>
                {/* empty View for Axis name*/}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
})