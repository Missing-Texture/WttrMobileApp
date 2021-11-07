import React from 'react';
import { Box, Text, HStack, Center, Spinner, VStack } from 'native-base'


export default function LoadingIndicator() {
    return(
        <Center flex={1}>
            <VStack space={4}> 
                <Spinner size="lg" color="info.300" />
                <Text fontSize={'lg'} color="info.200">loading...</Text>
            </VStack>
        </Center>
    )
}