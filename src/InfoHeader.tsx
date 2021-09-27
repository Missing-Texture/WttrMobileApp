import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Modal, Pressable } from 'react-native';

import { fetchWeatherData } from './FetchData'
import { IData } from './Interfaces'
import globalStyles from './globalStyles'
import WeatherIcon from './WeatherIcon';


export default function WeatherData({ data, url, city, setCity, setData, setIsLoading }: { data: IData, url: string, city: string, setCity: any, setData: any, setIsLoading: any }) {

    const cityTextInput = useRef<TextInput>(null)

    const [modalVisible, setModalVisible] = useState(false);

    return(
        <>
            <View style={ styles.container }> 
                <View style={ styles.weatherSubContainer }>
                    <WeatherIcon weatherCode={data?.currentWeatherCode}/>
                    <Text style={[ styles.temperatureText, globalStyles.whiteText ]}>{data?.currentTemp}</Text>
                </View>
                <Pressable onPress={() => setModalVisible(true)}>
                    <Text style={[ styles.cityText, globalStyles.whiteText ]}>{data?.city}</Text>
                </Pressable>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                onShow={() => {cityTextInput?.current?.focus()}}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={[ styles.cityText, globalStyles.whiteText ]}>Type in your City: </Text>
                        <TextInput 
                            style={[ styles.cityText, globalStyles.whiteText ]}
                            onChangeText={setCity}
                            onEndEditing={() => { fetchWeatherData(url, setData, setIsLoading) }}
                            // value={city}
                            ref={cityTextInput}
                        />
                    </View>
                </View>     
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', 
        marginTop: 50, 
        paddingLeft: 10, 
        paddingRight: 10, 
        alignItems: 'center', 
        justifyContent: 'space-between',
	},
    weatherSubContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    temperatureText: {
        fontSize: 23, 
        marginLeft: 15,
    },
    cityText: {
        fontSize: 30, 
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '80%',
        height: '30%',
        margin: 20,
        backgroundColor: "black",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});