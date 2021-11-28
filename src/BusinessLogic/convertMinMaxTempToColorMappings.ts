export default function convertMinMaxTempToColorMappings(minTemp: number, maxTemp: number) {

    // max temp is 45, min temp is -30 -> +30 to clap values between 0 and 75
    let maxGradVal = (1 - ( ( maxTemp + 30 ) / 75 )).toFixed(1)
    let minGradVal = (1 - ( ( minTemp + 30 ) / 75 )).toFixed(1)

    // console.log("max: " + maxGradVal + ", min: " + minGradVal)

    const colorMappings: any = {
        0.0: "#E92020",
        0.2: "#E7872D",
        0.4: "#E1C627",
        0.5: "#3ADE4E",
        0.6: "#3CCCD3",
        0.8: "#2A26CF",
        1.0: "#8E1DCE"
    }

    var usedGradientColors: any = [ ]

    for (let key in colorMappings) {
        if (key == maxGradVal || (Number(key)+0.1).toFixed(1) == maxGradVal || (Number(key)-0.1).toFixed(1) == maxGradVal || 
            key == minGradVal || (Number(key)+0.1).toFixed(1) == minGradVal || (Number(key)-0.1).toFixed(1) == minGradVal) 
        {
            usedGradientColors.push(colorMappings[key])
        }
    }

    var usedGradientColorsLen = usedGradientColors.length

    let gradientColors = []

    for (let i = 0; i < usedGradientColorsLen; i++) {
        if (i == 0) {
            gradientColors.push({0:usedGradientColors[i]})
        }
        else if (i == usedGradientColorsLen-1) {
            gradientColors.push({1:usedGradientColors[i]})
        }
        else {
            let obj: any = {}
            obj[i/(usedGradientColorsLen-1)] = usedGradientColors[i]
            gradientColors.push(obj)
        }
    }

    // console.log(gradientColors)

    return gradientColors
}