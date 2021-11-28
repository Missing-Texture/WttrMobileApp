import convertMinMaxTempToColorMappings from "../src/BusinessLogic/convertMinMaxTempToColorMappings"


const wholeColorSpectrum: any = {
    0.0: "#E92020", // 45°C
    0.2: "#E7872D", // 30°C
    0.4: "#E1C627", // 15°C
    0.5: "#3ADE4E", // 7.5°C
    0.6: "#3CCCD3", // 0°C
    0.8: "#2A26CF", // -15°C
    1.0: "#8E1DCE"  // -30°C
}


test('full temperature range returns full color spectrum', () => {
    let maxTemp = 45
    let minTemp = -30

    expect(convertMinMaxTempToColorMappings(minTemp, maxTemp)).toBe([{"0": "#E92020"}, {"0.2": "#E7872D"}, {"0.4": "#E1C627"}, {"0.5": "#3ADE4E"}, {"0.6": "#3CCCD3"}, {"0.8": "#2A26CF"}, {"1": "#8E1DCE"}])
})

test('part of temperature range returns part of full color spectrum', () => {
    let maxTemp = 25
    let minTemp = -10

    expect(convertMinMaxTempToColorMappings(minTemp, maxTemp)).toStrictEqual([{"0": "#E7872D"}, {"0.3333333333333333": "#E1C627"}, {"0.5": "#3ADE4E"}, {"0.6666666666666666": "#3CCCD3"}, {"1": "#2A26CF"}])
})

test('part of temperature range returns part of full color spectrum', () => {
    let maxTemp = 15
    let minTemp = 0

    expect(convertMinMaxTempToColorMappings(minTemp, maxTemp)).toStrictEqual([{"0": "#E1C627"}, {"0.5": "#3ADE4E"}, {"1": "#3CCCD3"}])
})

test('very narrow temperature range returns 2 colors', () => {
    let maxTemp = 16
    let minTemp = 15

    expect(convertMinMaxTempToColorMappings(minTemp, maxTemp)).toStrictEqual([{"0": "#E1C627"}, {"1": "#3ADE4E"}])
})

test('identical temperature range around 0° returns 2 colors', () => {
    let maxTemp = 0
    let minTemp = 0

    expect(convertMinMaxTempToColorMappings(minTemp, maxTemp)).toStrictEqual([{"0": "#3ADE4E"}, {"1": "#3CCCD3"}])
})

test('identical temperature range around everywhere else returns 2 times the same colors', () => {
    let maxTemp = 30
    let minTemp = 30

    expect(convertMinMaxTempToColorMappings(minTemp, maxTemp)).toStrictEqual([{"0": "#E7872D"}, {"1": "#E7872D"}])
})

test('temperature range out of bounds on both sides returns clipped full color spectrum', () => {
    let maxTemp = 50
    let minTemp = -35

    expect(convertMinMaxTempToColorMappings(minTemp, maxTemp)).toBe([{"0": "#E92020"}, {"0.2": "#E7872D"}, {"0.4": "#E1C627"}, {"0.5": "#3ADE4E"}, {"0.6": "#3CCCD3"}, {"0.8": "#2A26CF"}, {"1": "#8E1DCE"}])
})