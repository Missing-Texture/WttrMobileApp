import React, { Component } from 'react'
import { Svg, G, Line } from 'react-native-svg'

export default class Cursor extends Component {

    cursorStrokeColor = 'rgba(207,68,211,0.8)'
    cursorStrokeWidth = 3

    current: string = this.getPassedTimePercent()
    

    getPassedTimePercent() {
        const msInDay = 24 * 60 * 60 * 1000

        let currentTime = new Date(Date.now())
        let startOfDay = new Date(Date.now())
        startOfDay.setHours(0,0,0,0)

        let currentMsPassed = currentTime.getTime() - startOfDay.getTime()

        // * 0.9 + 5 is used as an offset
        // this in combination with 105% svg canvas width fixes that 
        // the cursor stroke can't be displayed in full width at values close to the edges
        return (currentMsPassed/msInDay) * 100 * 0.90 + 5 + '%'
    }

    render() {
        return(
            <Svg style={{ width: '105%', height: '100%' }}>
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