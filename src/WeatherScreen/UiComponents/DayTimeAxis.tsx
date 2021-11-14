import React, { Component } from 'react'
import { Svg, G } from 'react-native-svg'

export default class DayTimeAxis extends Component {

    textColor = 'rgba(255,255,255,0.8)'
    
    verticals: string[] = ['5%', '27.5%', '50%', '72.5%', '95%']
    timeStrings: string[] = ['0', '6', '12', '18', '24']

    render() {
        return(
            <Svg style={{ width: '100%', height: '100%' }}>
                <G>
                    {this.verticals.map((v, i) => (
                        <text textAnchor='middle' x={v} y={'70%'} fill={this.textColor} font-family="Arial, Helvetica, sans-serif"> 
                            {this.timeStrings[i]} 
                        </text>
                    ))}
                </G>
            </Svg>
        )
    }
}