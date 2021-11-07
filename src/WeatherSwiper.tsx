import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import PagerView from 'react-native-pager-view';

import WeatherData from './WeatherData'
import WeatherDataBackground from './WeatherDataBackground'
import globalStyles from './globalStyles'
import { IData } from './Interfaces'


const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export default function WeatherSwiper(
    { data, pageIndex, setPageIndex, scrollOffsetAV, positionAV }: 
    { data: IData, pageIndex: number, setPageIndex: any, scrollOffsetAV: Animated.Value, positionAV: Animated.Value }
) {
    return (
        <View style={ [globalStyles.P_overlappingContainer, { width: 350, height: 400, marginTop: 20 }]}>
            <View style={ globalStyles.C_overlappingContainer }>
                <WeatherDataBackground 
                    pageIndex={pageIndex} 
                    maxTemp={data!.maxTemp} 
                    minTemp={data!.minTemp} 
                />
            </View>

            <View style={ globalStyles.C_overlappingContainer }>
                <AnimatedPagerView 
                    style={{ flex: 1 }}
                    initialPage={0} 
                    onPageScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    offset: scrollOffsetAV,
                                    position: positionAV,
                                },
                            },
                        ],
                        {
                            listener: ({ nativeEvent: { offset, position } }: {nativeEvent: { offset: number, position:number }}) => {
                                console.log(`Position: ${position} Offset: ${offset}`);
                                // save position or page index in separate state so it can be passed and easier accessed
                                setPageIndex(position)
                            },
                            useNativeDriver: true,
                        }
                    )}
                >
                    <View key="1">
                        <WeatherData 
                            data={data!.dayInfos[0]} 
                            maxTemp={data!.maxTemp} 
                            minTemp={data!.minTemp}
                        />
                    </View>
                    <View key="2">
                        <WeatherData 
                            data={data!.dayInfos[1]} 
                            maxTemp={data!.maxTemp} 
                            minTemp={data!.minTemp}
                        />
                    </View>
                    <View key="3">
                        <WeatherData 
                            data={data!.dayInfos[2]} 
                            maxTemp={data!.maxTemp} 
                            minTemp={data!.minTemp}
                        />
                    </View>
                </AnimatedPagerView>
            </View>
        </View>
    )
}