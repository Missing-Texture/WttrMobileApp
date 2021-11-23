import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Svg, { Defs, LinearGradient, Stop } from 'react-native-svg'
import Path from './animated-path'

class Chart extends PureComponent {
    state = {
        width: 0,
        height: 0,
    }

    _onLayout(event) {
        const {
            nativeEvent: {
                layout: { height, width },
            },
        } = event
        this.setState({ height, width })
    }

    createPaths() {
        throw 'Extending "Chart" requires you to override "createPaths'
    }

    render() {
        const {
            data,
            xAccessor,
            yAccessor,
            yScale,
            xScale,
            style,
            animate,
            animationDuration,
            numberOfTicks,
            contentInset: { top = 0, bottom = 0, left = 0, right = 0 },
            gridMax,
            gridMin,
            clampX,
            clampY,
            svg,
            gradColors,
            children,
        } = this.props

        const { width, height } = this.state

        if (data.length === 0) {
            return <View style={style} />
        }

        const mappedData = data.map((item, index) => ({
            y: yAccessor({ item, index }),
            x: xAccessor({ item, index }),
        }))

        const yValues = mappedData.map((item) => item.y)
        const xValues = mappedData.map((item) => item.x)

        const yExtent = array.extent([...yValues, gridMin, gridMax])
        const xExtent = array.extent([...xValues])

        const { yMin = yExtent[0], yMax = yExtent[1], xMin = xExtent[0], xMax = xExtent[1] } = this.props

        //invert range to support svg coordinate system
        const y = yScale()
            .domain([yMin, yMax])
            .range([height - bottom, top])
            .clamp(clampY)

        const x = xScale()
            .domain([xMin, xMax])
            .range([left, width - right])
            .clamp(clampX)

        const paths = this.createPaths({
            data: mappedData,
            x,
            y,
        })

        const ticks = y.ticks(numberOfTicks)

        const extraProps = {
            x,
            y,
            data,
            ticks,
            width,
            height,
            ...paths,
        }

        return (
            <View style={style}>
                <View style={{ flex: 1 }} onLayout={(event) => this._onLayout(event)}>
                    {height > 0 && width > 0 && (
                        <Svg style={{ height, width }}>
                            {React.Children.map(children, (child) => {
                                if (child && child.props.belowChart) {
                                    return React.cloneElement(child, extraProps)
                                }
                                return null
                            })}
                            <Path
                                fill={'none'}
                                {...svg}
                                d={paths.path}
                                animate={animate}
                                animationDuration={animationDuration}
                            />
                            
                            <Defs>
                                <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0" gradientTransform="matrix(0,0.55,1,0,0,0)">
                                    {gradColors.map((col) => <Stop offset={Object.keys(col)[0]} stopColor={Object.values(col)[0]} stopOpacity="1" key={Object.keys(col)[0]} />)}
                                    
                                    {/* <Stop offset="0" stopColor="#E92020" stopOpacity="1" />
                                    <Stop offset="0.2" stopColor="#E7872D" stopOpacity="1" />
                                    <Stop offset="0.4" stopColor="#E1C627" stopOpacity="1" />
                                    <Stop offset="0.5" stopColor="#3ADE4E" stopOpacity="1" />
                                    <Stop offset="0.6" stopColor="#3CCCD3" stopOpacity="1" />
                                    <Stop offset="0.8" stopColor="#2A26CF" stopOpacity="1" />
                                    <Stop offset="1" stopColor="#8E1DCE" stopOpacity="1" /> */}
                                </LinearGradient>
                            </Defs>

                            {React.Children.map(children, (child) => {
                                if (child && !child.props.belowChart) {
                                    return React.cloneElement(child, extraProps)   
                                }
                                return null
                            })}
                        </Svg>
                    )}
                </View>
            </View>
        )
    }
}

Chart.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(PropTypes.array),
    ]).isRequired,
    svg: PropTypes.object,

    gradColors: PropTypes.array,

    style: PropTypes.any,

    animate: PropTypes.bool,
    animationDuration: PropTypes.number,

    curve: PropTypes.func,
    contentInset: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
    }),
    numberOfTicks: PropTypes.number,

    gridMin: PropTypes.number,
    gridMax: PropTypes.number,

    yMin: PropTypes.any,
    yMax: PropTypes.any,
    xMin: PropTypes.any,
    xMax: PropTypes.any,
    clampX: PropTypes.bool,
    clampY: PropTypes.bool,

    xScale: PropTypes.func,
    yScale: PropTypes.func,

    xAccessor: PropTypes.func,
    yAccessor: PropTypes.func,
}

Chart.defaultProps = {
    svg: {},
    width: 100,
    height: 100,
    curve: shape.curveLinear,
    contentInset: {},
    numberOfTicks: 10,
    xScale: scale.scaleLinear,
    yScale: scale.scaleLinear,
    xAccessor: ({ index }) => index,
    yAccessor: ({ item }) => item,
}

export default Chart
