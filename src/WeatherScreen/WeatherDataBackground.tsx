import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Grid, DayTimeAxis, Cursor } from './UiComponents'
import { IDayWeatherInfo } from '../Interfaces'
import globalStyles from '../globalStyles'
import { PreferenceContext } from '../PreferenceContext';
import { PreferenceValues } from '../PreferenceManager';


export default function WeatherDataBackground(
    { pageIndex, maxTemp, minTemp }: 
    { pageIndex: number, maxTemp: number, minTemp: number }
) {
    const { preferences } = useContext(PreferenceContext)

    return(
        <View>
            <View style={[ globalStyles.P_overlappingContainer, { width: '100%', height: '50%' } ]}>
                <View style={[globalStyles.C_overlappingContainer, { position: 'absolute', width: '100%', height: '100%' }]}>
                    <Grid />
                </View>

                
                <View style={[ globalStyles.C_overlappingContainer, { alignItems: 'center' } ]}>
                    { pageIndex==0 ? <Cursor /> : <></> }
                </View> 
                

                <View style={[ globalStyles.C_overlappingContainer, { position: 'absolute', width: '20%', height: '100%', paddingLeft: '5%' } ]}>
                    <Text style={[styles.tempsAxis, {paddingTop: 5, paddingBottom: 10}]}>
                        {preferences.MeasuringSystem == PreferenceValues.MeasuringSystem.metric ? "°C" : "°F"}
                    </Text>
                    <Text style={[styles.tempsAxis, {paddingBottom: 50}]}>{maxTemp}</Text>
                    <Text style={[styles.tempsAxis, {paddingBottom: 50}]}>{Math.floor((maxTemp+minTemp)/2)}</Text>
                    <Text style={styles.tempsAxis}>{minTemp}</Text>
                </View>
            </View>

            <View style={{ height: '15%', width: '100%', flexDirection:'row', justifyContent: 'center', alignItems: 'center', paddingLeft: "5%" }}>
                {/* <DayTimeAxis /> */}
                <Text style={styles.dayTimeAxis}>00:00</Text> 
                <Text style={styles.dayTimeAxis}>06:00</Text> 
                <Text style={styles.dayTimeAxis}>12:00</Text>
                <Text style={styles.dayTimeAxis}>18:00</Text> 
                <Text style={styles.dayTimeAxis}>24:00</Text> 
            </View>

            <View style={[ globalStyles.P_overlappingContainer, { width: '100%', height: '25%' } ]}>
                <View style={ globalStyles.C_overlappingContainer }>
                    <Grid />
                </View>

                <View style={[ globalStyles.C_overlappingContainer, { alignItems: 'center' } ]}>
                    { pageIndex==0 ? <Cursor /> : <></> }
                </View>

                <View style={[ globalStyles.C_overlappingContainer, { position: 'absolute', width: '20%', height: '100%', paddingLeft: '5%' } ]}>
                    <Text style={[styles.tempsAxis, {paddingTop: 0, paddingBottom: 0}]}>%</Text>
                    <Text style={[styles.tempsAxis, {paddingTop: 0, paddingBottom: 50}]}>100</Text>
                    <Text style={styles.tempsAxis}>0</Text>
                </View>
            </View>

            <View style={{ height: '5%', width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 20, paddingLeft: '5%' }}>
                <Text style={ styles.tempsAxis }>Chance of Rain</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dayTimeAxis: {
        color: '#f1f5f9', 
        paddingLeft: 24, 
        paddingRight: 24,
        fontSize: 12
    },
    tempsAxis: {
        color: '#f1f5f9', 
        fontSize: 12
    }
})