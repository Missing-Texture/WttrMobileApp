import React, { Component } from 'react'
import { Svg, G, Line } from 'react-native-svg'
import { calculatePassedDayTimeInPercent } from '../../../BusinessLogic/calculatePassedDayTimeInPercent'

export default function Cursor() {
    const cursorStrokeColor = 'rgba(207,68,211,0.8)'
    const cursorStrokeWidth = 3

    // * 0.9 + 5 is used as an offset
    // this in combination with 105% svg canvas width fixes that 
    // the cursor stroke can't be displayed in full width at values close to the edges
    var passedDayTime_WithOffset: string = calculatePassedDayTimeInPercent(Date.now()) * 0.90 + 5 + '%'
    

    return(
        <Svg style={{ width: '105%', height: '100%' }}>
            <Line
                key={0}
                y1={'0%'}
                y2={'100%'}
                x1={passedDayTime_WithOffset}
                x2={passedDayTime_WithOffset}
                strokeWidth={cursorStrokeWidth}
                stroke={cursorStrokeColor}
            />
        </Svg>
    )
}

