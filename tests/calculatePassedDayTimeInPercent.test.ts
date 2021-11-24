import { calculatePassedDayTimeInPercent } from "../src/BusinessLogic/calculatePassedDayTimeInPercent"

test('start of the Day [00:00] returns 0', () => {
    // create Date with date of today
    let testTime = new Date(Date.now())
    // manually set time
    testTime.setHours(0,0,0,0)

    expect(calculatePassedDayTimeInPercent(testTime.getTime())).toBe(0)
})

test('end of the Day [24:00] returns 0', () => {
    // create Date with date of today
    let testTime = new Date(Date.now())
    // manually set time
    testTime.setHours(24,0,0,0)

    expect(calculatePassedDayTimeInPercent(testTime.getTime())).toBe(0)
})

test('mid of the Day [12:00] returns 50', () => {
    // create Date with date of today
    let testTime = new Date(Date.now())
    // manually set time
    testTime.setHours(12,0,0,0)

    expect(calculatePassedDayTimeInPercent(testTime.getTime())).toBe(50)
})

test('close before end of the Day [23:59] returns <100', () => {
    // create Date with date of today
    let testTime = new Date(Date.now())
    // manually set time
    testTime.setHours(23,59,59,59)

    expect(calculatePassedDayTimeInPercent(testTime.getTime())).toBeLessThan(100)
})