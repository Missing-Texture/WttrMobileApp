import React from 'react';
import { Divider, HStack, Link, ScrollView, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/core'
import { Pressable } from 'react-native';


export default function CreditScreen() {
    const navigation = useNavigation<any>()

    const credits = [
        {
            title: "wttr.in",
            author: "Igor Chubin",
            url: "https://github.com/chubin/wttr.in"
        },
        {
            title: "Weather Icons",
            author: "Lai Ming",
            url: "https://dribbble.com/shots/4447863-Weather-icons-free-download"
        },
        {
            title: "Material Icons",
            author: "Google",
            url: "https://fonts.google.com/icons?selected=Material+Icons"
        },
        {
            title: "React",
            author: "Facebook",
            url: "https://github.com/facebook/react"
        },
        {
            title: "React Native",
            author: "Facebook",
            url: "https://github.com/facebook/react-native"
        },
        {
            title: "Expo",
            author: "Expo",
            url: "https://github.com/expo/expo"
        },
        {
            title: "NativeBase",
            author: "GeekyAnts",
            url: "https://github.com/GeekyAnts/nativebase"
        },
        {
            title: "react-native-svg-charts",
            author: "Jesper Lekland",
            url: "https://github.com/JesperLekland/react-native-svg-charts"
        },
        {
            title: "react-native-pager-view",
            author: "callstack",
            url: "https://github.com/callstack/react-native-pager-view"
        },
        {
            title: "Moment.js",
            author: "moment",
            url: "https://github.com/moment/moment/"
        },
    ]

    return(
        <ScrollView>
            {credits.map((credit, i) => {
                return(<Credit title={credit.title} author={credit.author} url={credit.url} key={i}/>)
            })}
        </ScrollView>
    )
}

function CreditWrapper({ children }: {children: any}) {
    return (
        <VStack>
            <VStack p={3}>
                { children }
            </VStack>
            <Divider />
        </VStack>
    )
}

function Credit(
    {title, author, url}: 
    {title: string, author: string, url: string}) 
{
    return(
        <VStack>
            <Link href={ url }>
                <VStack p={3}>
                    <Text fontSize={'xl'} color="blueGray.100">{ title }</Text>
                    <Text fontSize={'sm'} color="blueGray.300">{ author }</Text>
                </VStack>
            </Link>
            <Divider />
        </VStack>
    )
}