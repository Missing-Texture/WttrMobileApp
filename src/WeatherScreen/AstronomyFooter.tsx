import React, { useContext } from 'react'
import { Box, Text, HStack, VStack, Center, View } from 'native-base'
import moment from 'moment'

import { IData } from '../Interfaces'
import { Pressable } from 'react-native'
import { Menu } from '../../assets/MaterialIcons'
import { useNavigation } from '@react-navigation/core'
import { WeatherDataContext } from '../WeatherDataContext'


export default function AstronomyFooter() {
    const navigation = useNavigation<any>()
    const { data } = useContext(WeatherDataContext)

    return(
        <>
            <HStack justifyContent="space-between">
                <VStack ml={10}>
                    <HStack pb={1}>
                        <Text pr={3} fontSize={'md'} color="blueGray.300">Sunrise:</Text>
                        <Text fontSize={'md'} color="blueGray.300" fontWeight="bold">{convertToTime24(data!.sunrise)}</Text>
                    </HStack>
                    
                    <HStack>
                        <Text pr={3} fontSize={'md'} color="blueGray.300">Sunset:</Text>
                        <Text fontSize={'md'} color="blueGray.300" fontWeight="bold">{convertToTime24(data!.sunset)}</Text>
                    </HStack>
                </VStack>

                <View mr={4}>
                    <Pressable onPress={() => navigation.navigate('Settings')}>
                        <Menu height={50} width={50}></Menu>
                    </Pressable>
                </View>
            </HStack>
        </>
    )
}

function convertToTime24(time12: string): string {
    return moment(time12, 'LT').format('HH:mm')
}