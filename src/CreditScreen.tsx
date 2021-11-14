import React from 'react';
import { Text } from 'native-base';
import { useNavigation } from '@react-navigation/core'


export default function CreditScreen() {
    const navigation = useNavigation<any>()

    return(
        <Text>Danke Mama</Text>
    )
}