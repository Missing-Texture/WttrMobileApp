import React from 'react';
import { Button, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/core'


export default function SettingsScreen() {
    const navigation = useNavigation<any>()

    return(
        <VStack>
            <Text>Hallo</Text>
            <Button onPress={() => navigation.navigate('Credits')}>
                <Text>Credits</Text>
            </Button>
        </VStack>
    )
}