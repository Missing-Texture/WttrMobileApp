export function calculatePassedDayTimeInPercent(date: number): number {
    const msInDay = 24 * 60 * 60 * 1000

    let currentTime = new Date(date)

    let startOfDay = new Date(date)
    startOfDay.setHours(0,0,0,0)

    let currentMsPassed = currentTime.getTime() - startOfDay.getTime()
    return (currentMsPassed/msInDay) * 100
}