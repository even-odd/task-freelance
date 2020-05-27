
// daysAmount * dayHours * oneHourInMinutes * oneMinuteInSec * oneSecInMillsec 
const TEN_DAYS = 10 * 24 * 60 * 60 * 1000; 
export function getTenDays(currTime) {  
    return currTime + TEN_DAYS;
}