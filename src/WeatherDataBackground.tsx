import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Grid, DayTimeAxis, Cursor } from './UiComponents'
import { IDayWeatherInfo } from './Interfaces'
import globalStyles from './globalStyles'


export default function WeatherDataBackground({ data }: { data: IDayWeatherInfo }) {

    return(
        <View>
            <View style={[ globalStyles.P_overlappingContainer, { width: '100%', height: '55%' } ]}>
                <View style={[globalStyles.C_overlappingContainer, { position: 'absolute', width: '100%', height: '100%' }]}>
                    <Grid />
                </View>

                <View style={[ globalStyles.C_overlappingContainer, { alignItems: 'center' } ]}>
                    <Cursor />
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
                    <Cursor />
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
    }
})