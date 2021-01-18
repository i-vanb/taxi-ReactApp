export const getUniqueKey = () => {
    let number = _addNumber[_addNumber.length-1];
    _addNumber.push(number+1);
    return number
}
const _addNumber = [0];


export const dateToString = (dateMS) => {
    const strDate = new Date(dateMS)
    const month = (strDate.getMonth()+1).toString()
    const day = strDate.getDate().toString()
    const hours = strDate.getHours().toString()
    const minutes = strDate.getMinutes().toString()
    const seconds = strDate.getSeconds().toString()
    const yyyy = strDate.getFullYear().toString()
    const mo = month.length===1?'0'.concat(month):month
    const dd = day.length===1?'0'.concat(day):day
    const hh = hours.length===1?'0'.concat(hours):hours
    const mi = minutes.length===1?'0'.concat(minutes):minutes
    const ss = seconds.length===1?'0'.concat(seconds):seconds

    return yyyy+mo+dd+hh+mi+ss
}
