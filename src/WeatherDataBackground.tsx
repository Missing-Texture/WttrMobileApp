import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Grid, DayTimeAxis, Cursor } from './UiComponents'
import { IDayWeatherInfo } from './Interfaces'
import globalStyles from './globalStyles'


export default function WeatherDataBackground(
    { pageIndex, maxTemp, minTemp }: 
    { pageIndex: number, maxTemp: number, minTemp: number }
) {
    return(
        <View>
            <View style={[ globalStyles.P_overlappingContainer, { width: '100%', height: '55%' } ]}>
                <View style={[globalStyles.C_overlappingContainer, { position: 'absolute', width: '100%', height: '100%' }]}>
                    <Grid />
                </View>

                
                <View style={[ globalStyles.C_overlappingContainer, { alignItems: 'center' } ]}>
                    { pageIndex==0 ? <Cursor /> : <></> }
                </View> 
                

                <View style={[ globalStyles.C_overlappingContainer, { position: 'absolute', width: '20%', height: '100%', paddingLeft: '3%' } ]}>
                    <Text style={[styles.tempsAxis, {paddingTop: 10, paddingBottom: 68}]}>{maxTemp}</Text>
                    <Text style={[styles.tempsAxis, {paddingBottom: 70}]}>{Math.floor((maxTemp+minTemp)/2)}</Text>
                    <Text style={styles.tempsAxis}>{minTemp}</Text>
                </View>
            </View>

            <View style={{ height: '20%', width: '100%', flexDirection:'row', justifyContent: 'center', alignItems: 'center', }}>
                {/* <DayTimeAxis /> */}
                <Text style={styles.dayTimeAxis}>0</Text> 
                <Text style={styles.dayTimeAxis}>6</Text> 
                <Text style={styles.dayTimeAxis}>12</Text>
                <Text style={styles.dayTimeAxis}>18</Text> 
                <Text style={styles.dayTimeAxis}>24</Text> 
            </View>

            <View style={[ globalStyles.P_overlappingContainer, { width: '100%', height: '25%' } ]}>
                <View style={ globalStyles.C_overlappingContainer }>
                    <Grid />
                </View>

                <View style={[ globalStyles.C_overlappingContainer, { alignItems: 'center' } ]}>
                    { pageIndex==0 ? <Cursor /> : <></> }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dayTimeAxis: {
        color: 'white', 
        paddingLeft: 28, 
        paddingRight: 28,
        fontSize: 15
    },
    tempsAxis: {
        color: 'white', 
        fontSize: 15
    }
})