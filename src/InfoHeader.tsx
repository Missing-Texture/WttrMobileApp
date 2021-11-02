import React, { useEffect, useRef, useState } from 'react'
import { Box, Text, Pressable, HStack, Modal, FormControl, Input, Button } from 'native-base'
import moment from 'moment'

import { fetchWeatherData } from './FetchData'
import { IData } from './Interfaces'
import WeatherIcon from './WeatherIcon';


export default function WeatherData(
    { data, setData, setIsLoading }: 
    { data: IData, setData: any, setIsLoading: any }
) {
    const cityTextInput = useRef(null)

    const [city, setCity] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [isDaytime, setIsDaytime] = useState(true);

    // wrap codeblock in useEffect so it doesn't run unnecessarily 
    useEffect(() => {
        var currentTime = moment()
        var sunrise = moment(data.sunrise, 'LT')
        var sunset = moment(data.sunset, 'LT')

        // check if current time is between sunset and sunrise
        // change flag for night version of weather icon
        if(currentTime < sunrise || currentTime > sunset) {
            setIsDaytime(false)
        }
    }, [])

    return(
        <>
            <HStack pt={12} px={4} alignItems="center" justifyContent="space-between"> 
                <HStack alignItems="center">
                    <WeatherIcon weatherCode={data?.currentWeatherCode} dayTime={isDaytime}/>
                    <Text pl={3} fontSize={'xl'} color="blueGray.100">{data?.currentTemp}</Text>
                </HStack>
                <Pressable onPress={() => setModalVisible(true)}>
                    <Text fontSize={'3xl'} fontWeight="bold" color="blueGray.100" isTruncated maxW="170px" >{data?.city}</Text>
                </Pressable>
            </HStack>

            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={cityTextInput}>
                <Modal.Content maxWidth="80%">
                    <Modal.CloseButton />
                        <Modal.Header>Type in your City:</Modal.Header>
                        <Modal.Body pt={4}>
                            <FormControl>
                                <Input 
                                    ref={cityTextInput} 
                                    onChangeText={setCity} 
                                    onEndEditing={() => { fetchWeatherData(city, setData, setIsLoading) }}
                                />
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer pr={4} pb={4}>
                            <Button.Group >
                                <Button
                                    variant="ghost"
                                    colorScheme="blueGray"
                                    onPress={() => {
                                        setModalVisible(false)
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onPress={() => {
                                        fetchWeatherData(city, setData, setIsLoading)
                                        setModalVisible(false)
                                    }}
                                >
                                    Search
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
            </Modal>

        </>
            // <Modal
            //     animationType="slide"
            //     transparent={true}
            //     visible={modalVisible}
            //     onRequestClose={() => {
            //         setModalVisible(!modalVisible);
            //     }}
            //     onShow={() => {cityTextInput?.current?.focus()}}
            // >
            //     <View style={styles.centeredView}>
            //         <View style={styles.modalView}>
            //             <Text style={[ styles.cityText, globalStyles.whiteText ]}>Type in your City: </Text>
            //             <TextInput 
            //                 style={[ styles.cityText, globalStyles.whiteText ]}
            //                 onChangeText={setCity}
            //                 onEndEditing={() => { fetchWeatherData(url, setData, setIsLoading) }}
            //                 // value={city}
            //                 ref={cityTextInput}
            //             />
            //         </View>
            //     </View>     
            // </Modal>
    )
}