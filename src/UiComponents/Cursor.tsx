import React, { Component } from 'react'
import { Svg, G, Line } from 'react-native-svg'

export default class Cursor extends Component {

    cursorStrokeColor = 'rgba(207,68,211,0.8)'
    cursorStrokeWidth = 5

    current: string = this.getPassedTimePercent()
    

    getPassedTimePercent() {
        const msInDay = 24 * 60 * 60 * 1000

        let currentTime = new Date(Date.now())
        let startOfDay = new Date(Date.now())
        startOfDay.setHours(0,0,0,0)

        let currentMsPassed = currentTime.getTime() - startOfDay.getTime()

        // convert float to 2 digit percentage string 0.75323 -> '75%'
        return (currentMsPassed/msInDay).toFixed(2).slice(2) + '%'
    }

    render() {
        return(
            <Svg style={{ width: '90%', height: '100%' }}>
                <Line
                    key={0}
                    y1={'0%'}
                    y2={'100%'}
                    x1={this.current}
                    x2={this.current}
                    strokeWidth={this.cursorStrokeWidth}
                    stroke={this.cursorStrokeColor}
                />
            </Svg>
        )
    }
}