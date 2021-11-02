import React from 'react'
import { Box, Text, HStack, Center } from 'native-base'
import moment from 'moment'

import { IData } from './Interfaces'
import { right } from 'styled-system'


export default function AstronomyFooter(
    {data}:
    {data: IData}
) {
    return(
        <>
                <HStack pt={10} justifyContent="space-evenly">
                    <HStack>
                        <Text pr={3} fontSize={'lg'} color="blueGray.300">Sunrise:</Text>
                        <Text fontSize={'lg'} color="blueGray.300" fontWeight="bold">{convertToTime24(data.sunrise)}</Text>
                    </HStack>
                    
                    <HStack>
                        <Text pr={3} fontSize={'lg'} color="blueGray.300">Sunset:</Text>
                        <Text fontSize={'lg'} color="blueGray.300" fontWeight="bold">{convertToTime24(data.sunset)}</Text>
                    </HStack>
                </HStack>
        </>
    )
}

function convertToTime24(time12: string): string {
    return moment(time12, 'LT').format('HH:mm')
}