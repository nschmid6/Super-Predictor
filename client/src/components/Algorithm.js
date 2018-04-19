class weatherData {
    constructor(temperature, wind, pressure) {
        this.temperature = temperature;
        this.wind = wind;
        this.pressure = pressure;
    }
    get temperature() {
        return this.temperature;
    }
    get wind() {
        return this.wind;
    }
    get pressure() {
        return this.pressure;
    }
    set temperature(temperature) {
        this.temperature = temperature;
    }
    set wind(wind) {
        this.wind = wind;
    }
    set pressure(pressure) {
        this.pressure = pressure;
    }

}

const day1 = new weatherData(54, 10, 30);
const day2 = new weatherData(60, 23, 25);
const day3 = new weatherData(67, 30, 30);
const day4 = new weatherData(44, 5, 10);
const day5 = new weatherData(48, 7, 30);
const day6 = new weatherData(55, 10, 25);
const day7 = new weatherData(50, 15, 30);

var week = [day1, day2, day3, day4, day5, day6, day7];

function temperatureChange(yesterday, today) {
        return today.temperature - yesterday.temperature;
}
function windChange(yesterday, today) {
        return today.wind - yesterday.wind;
}
function pressureChange(yesterday, today) {
        return today.pressure - yesterday.pressure;
}

function forecast(weatherData) {
    var len = week.length;
    var yesterday = len - 2;
    var today = len - 1;
    var yesterdayWeather = week[yesterday];
    var todayWeather = weatherData;
    var deltaT = temperatureChange(yesterdayWeather, todayWeather);
    var deltaW = windChange(yesterdayWeather, todayWeather);
    var deltaP = pressureChange(yesterdayWeather, todayWeather);
    var avgDeltaT = [];
    var avgDeltaW = [];
    var avgDeltaP = [];
    var n;
    for (n=0; n<len; n++) {
        if (n !== 0) {
            if (temperatureChange(week[n-1], week[n]) == deltaT) {
                if (windChange(week[n-1], week[n]) == deltaW) {
                    if (pressureChange(week[n-1], week[n]) == deltaW) {
                        avgDeltaT.push(temperatureChange(week[n], week[n+1]));
                        avgDeltaW.push(windChange(week[n], week[n+1]));
                        avgDeltaP.push(pressureChange(week[n], week[n+1]));
                    }
                }
            }
        }
    }
    var totalT = 0;
    for (var i=0; i<avgDeltaT.length; i++) {
        totalT += avgDeltaT[i];
    }
    var tomorrowTempChange = totalT / avgDeltaT.length;
    var totalW = 0;
    for (var j=0; j<avgDeltaW.length; j++) {
        totalW += avgDeltaW[j];
    }
    var tomorrowWindChange = totalW / avgDeltaW.length;
    var totalP = 0;
    for (var k=0; k<avgDeltaP.length; k++) {
        totalP += avgDeltaP[k];
    }
    var tomorrowPressureChange = totalP / avgDeltaP.length;
    day8 = new weatherData(todayWeather.temperature + tomorrowTempChange, todayWeather.wind + tomorrowWindChange, todayWeather.pressure + tomorrowPressureChange);
    week.push(day8);
    return day8;
}
