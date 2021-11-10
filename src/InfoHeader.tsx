import React, { useEffect, useRef, useState } from 'react'
import { Box, Text, Pressable, HStack, Modal, FormControl, Input, Button, Center, SearchIcon, View, Divider, VStack } from 'native-base'
import Svg, { Line } from 'react-native-svg'
import moment from 'moment'

import { fetchWeatherData } from './FetchData'
import { IData } from './Interfaces'
import WeatherIcon from './WeatherIcon';
import { Search } from '../assets/MaterialIcons'


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
                    <Text fontSize={'5xl'} color="blueGray.100" pl={5}>{data?.currentTemp}</Text>
                    <Text fontSize={'2xl'} color="blueGray.100" pl={1} pb={4}>°C</Text>
                </HStack>
                <VStack>
                    <HStack pb={1}>
                        <Text fontSize={'md'} color="blueGray.100" pr={2}>Humidity:</Text>
                        <Text fontSize={'md'} color="blueGray.100">{data?.humidity}</Text>
                        <Text fontSize={'md'} color="blueGray.100"> %</Text>
                    </HStack>
                    <HStack>
                        <Text fontSize={'md'} color="blueGray.100" pr={2}>Wind:</Text>
                        <Text fontSize={'md'} color="blueGray.100">{data?.windspeed}</Text>
                        <Text fontSize={'md'} color="blueGray.100"> kmh</Text>
                    </HStack>
                </VStack>
            </HStack>

            <Center mt={-50} mb={-90}>
                <Pressable onPress={() => setModalVisible(true)}>
                    <HStack alignItems="center">
                        <Text fontSize={'3xl'} fontWeight="bold" color="blueGray.100" pr={4} isTruncated >{data?.city}</Text>
                        <Search height={40} width={40}></Search>
                    </HStack>
                    <View alignItems="center" pt={1} pr={1}>
                        <Svg style={{ width: '110%', height: '20%' }}>
                            <Line x1={'0%'} x2={'100%'} y1={'50%'} y2={'50%'} stroke={'rgba(255,255,255,0.8)'} strokeWidth={3} />
                        </Svg>
                    </View>
                </Pressable>
            </Center>

            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={cityTextInput}>
                <Modal.Content maxWidth="80%" backgroundColor="muted.900">
                    <Modal.CloseButton />
                        <Modal.Header>Type in your City:</Modal.Header>
                        <Modal.Body pt={4}>
                            <FormControl>
                                <Input 
                                    ref={cityTextInput} 
                                    onChangeText={setCity} 
                                    onEndEditing={() => { fetchWeatherData(city, setData, setIsLoading) }}
                                    _focus={{
                                        borderColor: "info.500"
                                    }}
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
                                    colorScheme="info"
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