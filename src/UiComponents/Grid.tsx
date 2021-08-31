import React, { Component } from 'react'
import { Svg, G, Line } from 'react-native-svg'

export default class Grid extends Component {

    gridStrokeColor = 'rgba(255,255,255,0.8)'
    gridStrokeWidth = 0.1
    
    verticals: string[] = ['10%', '30%', '50%', '70%', '90%']
    horizontals: string[] = ['15%', '50%', '85%']

    render() {
        return(
            <Svg style={{ width: '100%', height: '100%' }}>
                <G>
                    {this.verticals.map((v, i) => (
                        <Line
                            key={i}
                            y1={'0%'}
                            y2={'100%'}
                            x1={v}
                            x2={v}
                            strokeWidth={this.gridStrokeWidth}
                            stroke={this.gridStrokeColor}
                        />
                    ))}

                    {this.horizontals.map((h, i) => (
                        <Line
                            key={i}
                            y1={h}
                            y2={h}
                            x1={'0%'}
                            x2={'100%'}
                            strokeWidth={this.gridStrokeWidth}
                            stroke={this.gridStrokeColor}
                        />
                    ))}
                </G>
            </Svg>
        )
    }
}