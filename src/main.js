// showTime
// function showTime(){
//     var currentTime  = new Date();
//     var hour1 = currentTime.getHours();
//     var minute1 = currentTime.getMinutes();
//     var second1 = currentTime.getSeconds();
//     var hour = hour1.toString();
//     var minute = minute1.toString();
//     var second = second1.toString();
//     if(hour.length <= 1){
//         hour = "0"+hour;
//     }
//     if(minute.length <= 1){
//         minute = "0"+minute;
//     }
//     if(second.length <= 1){
//         second = "0"+second;
//     }
//     var time = document.getElementById("time");
//     time.innerHTML =  hour + ":" + minute + ":" + second;
// }
// setInterval(showTime, 1000);

// cookies
function setCookie(name, value, exdays){
    let expires = '';
    if(exdays){
        let date = new Date();
        date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (encodeURIComponent(value) || "") + expires + '; path=/';
}

function getCookie(name){
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++){
        let c=ca[i];
        while(c.charAt(0)==" ") c=c.substring(1, c.length);
        if(c.indexOf(nameEQ)==0)
        return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function removeCookie(name){
    document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
}

// dark mode
const darkModeBtn = document.querySelector('#darkMode');
darkModeBtn.addEventListener('click', darkMode);

function darkMode(e){
    e.preventDefault();
    if(getCookie('darkMode')==='true'){
        setCookie('darkMode', 'false', 3);
        document.querySelector('body').classList.remove('bg-dark');
        darkModeBtn.innerHTML = 'tryb ciemny';
    }else{
        setCookie('darkMode', 'true', 3);
        document.querySelector('body').classList.add('bg-dark');
        darkModeBtn.innerHTML = 'tryb jasny';
    }
    let city = cityNow();
    weatherForecast(city);
}

if(getCookie('darkMode')==='true'){
    document.querySelector('body').classList.add('bg-dark');
}else{
    document.querySelector('body').classList.remove('bg-dark');
}

// roll menu
document.addEventListener('DOMContentLoaded', rollMenuBtn);
var navRollMenuBtn = document.querySelector('#nav_rollMenuBtnId');
var navContainer = document.querySelector('#navContainer');
var navUl = document.querySelector('#navUl'); 
var navUlLink = document.getElementsByClassName('nav_ul_link');
var nav = document.querySelector('.nav');
window.addEventListener('resize', rollMenuBtn);
navRollMenuBtn.addEventListener('click', rollMenuClick);
var rollMenuActive = false;

function rollMenuBtn(){
    if(window.innerWidth < 900){
        if(rollMenuActive === false){
            navUl.style.display = 'none';
            navRollMenuBtn.style.display = 'flex';
            nav.style.gridTemplateColumns = '1fr 4fr 45px';
        }
    }else{
        if(rollMenuActive === true){
            rollMenu();
        }
        navUl.style.display = 'flex';
        navRollMenuBtn.style.display = 'none';
        nav.style.gridTemplateColumns = '1fr 4fr';
    }
}

function rollMenuClick(e){
    e.preventDefault();
    rollMenu();
}

function rollMenu(){
    if(rollMenuActive === false){
        rollMenuActive = true;
        navUl.style.display = 'flex';
        navContainer.classList.remove('nav_container');
        navUl.classList.remove('nav_ul');
        navContainer.classList.add('navRoll_container');
        navUl.classList.add('navRoll_ul');
    }else if(rollMenuActive === true){
        rollMenuActive = false;
        navUl.style.display = 'none';
        navContainer.classList.remove('navRoll_container');
        navUl.classList.remove('navRoll_ul');
        navContainer.classList.add('nav_container');
        navUl.classList.add('nav_ul');
    }
}

// Weather API current weather
const appiId = '19de70c141fa4749dd0305edb2cd82a9';
document.querySelector('.menu_link_btn').addEventListener('click', metricSys);
document.addEventListener('DOMContentLoaded', callWeather);
document.querySelector('#takeData').addEventListener('click', callWeather);
document.querySelector('#cityInput').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        callWeather();
    }
});
var metricS = 'metric';
var metricalTemp = '°C';
var metricalSpeed = 'm/s';
var cityGlobal = document.querySelector('#cityInput').value;
var superDate = '';

function metricSys(){
    if(metricS === 'metric'){
        metricS = 'imperial';
        metricalTemp = '°F';
        metricalSpeed = 'mph';
        document.querySelector('.menu_link_btn').innerHTML = '°F';
    }else if(metricS === 'imperial'){
        metricS = 'metric';
        metricalTemp = '°C';
        metricalSpeed = 'm/s';
        document.querySelector('.menu_link_btn').innerHTML = '°C';
    }
    callWeather();
}

function cityNow(){
    var city = document.querySelector('#cityInput').value;
    if(city === ''){
        city = 'London';
    }
    return city;
}

function callWeather(){
    var city = cityNow();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metricS}&APPID=${appiId}`, true);      
    xhr.onload = function(){
        if(this.status == 200){
            var weather = JSON.parse(this.responseText);
            var timezone = '';
            timezone = parseInt(weather.timezone, 10);
            function cityTime(){
                var cityTime = new Date();
                var utcTime = cityTime.toUTCString();
                var hour = utcTime.substring(17, 19);
                var min = utcTime.substring(20, 22);
                var sec = utcTime.substring(23, 25);
                hour = +hour;
                min = +min;
                sec = +sec;
                time = ((hour * 60 * 60)+(min * 60)+(sec))+timezone;
                var newHour = Math.floor((time/60)/60);
                var tempTime = time-(newHour * 60 * 60);
                var newMin = Math.floor(tempTime/60);
                var newSec = tempTime-(newMin*60);
                if(newHour<10){
                    newHour = `0${newHour}`;
                }
                if(newMin<10){
                    newMin = `0${newMin}`;
                }
                if(newSec<10){
                    newSec = `0${newSec}`;
                }
                var day = utcTime.substring(0, 3);
                var newDay = '';
                switch(day){
                    case 'Mon':
                        newDay = 'Poniedziałek';
                        break;
                    case 'Tue':
                        newDay = 'Wtorek';
                        break;
                    case 'Wed':
                        newDay = 'Środa';
                        break;
                    case 'Thu':
                        newDay = 'Czwartek';
                        break;
                    case 'Fri':
                        newDay = 'Piątek';
                        break;
                    case 'Sat':
                        newDay = 'Sobota';
                        break;
                    case 'Sun':
                        newDay = 'Niedziela';
                        break;
                    default:
                        newDay = '';
                        break;
                }
                var dayNum = utcTime.substring(5, 7);
                var month = utcTime.substring(8, 11);
                var newMonth = '';
                switch(month){
                    case 'Jan':
                        newMonth = 'Styczeń';
                        break;
                    case 'Feb':
                        newMonth = 'Luty';
                        break;
                    case 'Mar':
                        newMonth = 'Marzec';
                        break;
                    case 'Apr':
                        newMonth = 'Kwiecień';
                        break;
                    case 'May':
                        newMonth = 'Maj';
                        break;
                    case 'Jun'||'June':
                        newMonth = 'Czerwiec';
                        break;
                    case 'Jul'||'July':
                        newMonth = 'Lipiec';
                        break;
                    case 'Aug':
                        newMonth = 'Śierpień';
                        break;
                    case 'Seppt':
                        newMonth = 'Wrzesień';
                        break;
                    case 'Oct':
                        newMonth = 'Październik';
                        break;
                    case 'Nov':
                        newMonth = 'Listopad';
                        break;
                    case 'Dec':
                        newMonth = 'Grudzień';
                        break;
                    default:
                        newMonth = '';
                        break;
                }
                document.querySelector('#time').innerHTML = `${newDay}, ${dayNum} ${newMonth} - ${newHour}:${newMin}`;
                superDate = `${newDay}, ${dayNum} ${newMonth}`;
            }
            setInterval(cityTime, 60000);
            var temp = '';
            var name = '';
            var img = '';
            var info = '';
            var wind = '';
            var press = '';
            var hum = '';
            var vis = '';
            var cloud = '';
            var rain = '';
            var snow = '';
            temp += `${Math.round(weather.main.temp)}${metricalTemp}`;
            name += `${weather.name}, ${weather.sys.country}`;
            img += `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
            info += `Temperatura odczuwalna ${Math.round(weather.main.feels_like)}${metricalTemp}`;
            wind += `Wiatr: ${weather.wind.speed}${metricalSpeed}`;
            press += `Ciśnienie: ${weather.main.pressure}hPa`;
            hum += `Wilgotność: ${weather.main.humidity}%`;
            vis += `Widoczność: ${weather.visibility/1000}km`;
            cloud += `Zachmurzenie: ${weather.clouds.all}%`;
            document.querySelector('.main_box_temp').innerHTML = temp;
            document.querySelector('.main_box_place').innerHTML = name;
            document.querySelector('.main_weatherImg_img').src = img;
            document.querySelector('.main_box_info').innerHTML = info;
            document.querySelector('.main_box_moreInfo_wind').innerHTML = wind;
            document.querySelector('.main_box_moreInfo_pressure').innerHTML = press;
            document.querySelector('.main_box_moreInfo_hum').innerHTML = hum;
            document.querySelector('.main_box_moreInfo_vis').innerHTML = vis;
            document.querySelector('.main_box_moreInfo_clouds').innerHTML = cloud;
            if(weather.rain){
                if(weather.rain['1h']){   
                    rain += `Deszcz: ${weather.rain['1h']}mm`;
                    let rainBox = document.querySelector('.main_box_moreInfo_rain');
                    rainBox.innerHTML = rain;
                    rainBox.title = 'Objętość opadów deszczu w ciągu ostaniej godziny podane w milimetrach';
                }if(weather.rain['3h']){
                    rain += `Deszcz: ${weather.rain['3h']}mm`;
                    let rainBox = document.querySelector('.main_box_moreInfo_rain');
                    rainBox.innerHTML = rain;
                    rainBox.title='Objętość opadów deszczu w ciągu ostatnich 3 godzin podane w milimetrach';
                }
            }
            if(weather.snow){
                if(weather.snow['1h']){
                    snow += `Śnieg: ${weather.snow['1h']}mm`;
                    let snowBox = document.querySelector('.main_box_moreInfo_snow');
                    snowBox.innerHTML = snow;
                    snowBox.title = 'Objętość opadów śniegu w ciągu ostataniej godziny podane w milimetrach';
                }
                if(weather.snow['3h']){
                    snow += `Śnieg: ${weather.snow['3h']}mm`;
                    let snowBox = document.querySelector('.main_box_moreInfo_snow');
                    snowBox.innerHTML = snow;
                    snowBox.title = 'Objętość opadów śniegu w ciągu ostatnich 3 godzin podane w milimetrach';
                }
            }
            cityTime();
            //console.log(weather);
        }else if(this.status == 404){
            let alert = document.querySelector('.main_box_alert');
            alert.style.display = 'grid';
            document.querySelector('.main_box_alert_text').innerHTML = `Nie udało się odnaleźć miejscowości ${city}`;
            setTimeout(()=>{
            alert.style.display = 'none';
            }, 10000);
        }} 
    xhr.send();
    weatherForecast(city);
    //weatherMap();
}

document.querySelector('.main_box_alert_btnDiv_btn').addEventListener('click', ()=>{
    document.querySelector('.main_box_alert').style.display = 'none';
});

// 3 hour forecast
function weatherForecast(city, targetId){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metricS}&appid=${appiId}`, true);
    xhr.onload = function(){
        if(this.status == 200){
            var forecast = JSON.parse(this.responseText);    
            var i ='';     
            var date0 = '';  
            if(targetId){
                i = targetId;
                date0 += forecast.list[targetId].dt_txt;
                var checkCurrentDate = secondDate.indexOf(targetId);
                if(checkCurrentDate !== -1){
                    var currentDate = secondDate[checkCurrentDate+1];
                }else{
                    console.log('nie dziala');
                }
                //console.log(secondDate);
                document.querySelector('.main_box2_hourForecast_info').innerHTML = `${currentDate}`;
            }else{
                i = 0;
                date0 += forecast.list[0].dt_txt;
                document.querySelector('.main_box2_hourForecast_info').innerHTML = `${superDate}`;
            }     
            var dayFor = `${date0[8]}${date0[9]}`;
            var output = '';
            //console.log(forecast);
            var idTable = [];
            for(i; i<=forecast.list.length-1; i++){
                //console.log(i);
                let dateI = '';
                dateI += forecast.list[i].dt_txt;
                let dayCheck = `${dateI[8]}${dateI[9]}`;
                if(dayFor != dayCheck){
                    break;
                }
                let mode = '';
                let imgMode = '';
                if(getCookie('darkMode')==='true'){
                    mode += 'box_dark';
                    imgMode += 'rozwin-dark-mode.png';
                }else{
                    mode += 'box_light';
                    imgMode += 'rozwin.png';
                }
                let hourToShow = '';
                let img = '';
                let temp = '';
                let wind = '';
                let press = '';
                let hum = '';
                let vis = '';
                let cloud = '';
                let rain = '';
                let snow = '';
                hourToShow += forecast.list[i].dt_txt.substring(11, 16);
                img = `https://openweathermap.org/img/wn/${forecast.list[i].weather[0].icon}@2x.png`;
                temp = `${Math.round(forecast.list[i].main.temp)}${metricalTemp}`;
                wind = `Wiatr: ${forecast.list[i].wind.speed}${metricalSpeed}`;
                press = `Ciśnienie: ${forecast.list[i].main.pressure}hPa`;
                hum = `Wilgotność: ${forecast.list[i].main.humidity}%`;
                vis = `Widoczność: ${forecast.list[i].visibility/1000}km`;
                cloud = `Zachmurzenie: ${forecast.list[i].clouds.all}%`;
                if(forecast.list[i].rain){
                    if(forecast.list[i].rain['1h']){   
                        rain += `Deszcz: ${forecast.list[i].rain['1h']}mm`;
                    }if(forecast.list[i].rain['3h']){
                        rain += `Deszcz: ${forecast.list[i].rain['3h']}mm`;
                    }
                }
                if(forecast.list[i].snow){
                    if(forecast.list[i].snow['1h']){
                        snow += `Śnieg: ${forecast.list[i].snow['1h']}mm`;
                    }
                    if(forecast.list[i].snow['3h']){
                        snow += `Śnieg: ${forecast.list[i].snow['3h']}mm`;
                    }
                }
                output +=
                `<div class="main_box2_hourForecast_hour_box ${mode}" id="id${i}">
                    <div class="main_box2_hourForecast_hour_box_hourToShow">${hourToShow}</div>
                    <div class="main_box2_hourForecast_hour_box_img"><img class="main_box2_hourForecast_hour_box_img_g" src="${img}"></div>
                    <div class="main_box2_hourForecast_hour_box_temp">${temp}</div>
                    <div class="main_box2_hourForecast_hour_box_showMore"><img src="${imgMode}" class="main_box2_hourForecast_hour_box_showMore_link"></div>
                    <div class="main_box2_hourForecast_hour_box_rollMoreInfo" id="idInfo${i}">
                        <div class="main_box2_hourForecast_hour_box_rollMoreInfo_wind">${wind}</div>
                        <div class="main_box2_hourForecast_hour_box_rollMoreInfo_press">${press}</div>
                        <div class="main_box2_hourForecast_hour_box_rollMoreInfo_hum">${hum}</div>
                        <div class="main_box2_hourForecast_hour_box_rollMoreInfo_vis">${vis}</div>
                        <div class="main_box2_hourForecast_hour_box_rollMoreInfo_clouds">${cloud}</div>
                        <div class="main_box2_hourForecast_hour_box_rollMoreInfo_rain" title="Objętość opadów deszczu w okresie od 1 do 3 godzin podane w milimetrach">${rain}</div>
                        <div class="main_box2_hourForecast_hour_box_rollMoreInfo_snow" title="Objętość opadów śniegu w okresie od 1 do 3 godzin podane w milimetrach">${snow}</div>
                    </div>
                </div>`;              
                idTable.push(i);
            }
            document.querySelector('.main_box2_hourForecast_hour').innerHTML = output;           
            linkStart(idTable);
        }else{
            console.log(this.status);
        }
    }
    xhr.send();
    weatherDayForecast(city).then(linkStart2);
}

// Show more on every hour weather
function linkStart(id){
    //console.log(id);
    for(let i=id[0]; i<=id[id.length-1]; i++){
        document.querySelector(`#id${i}`).addEventListener('click', showMoreHour);
    }
}

function showMoreHour(e){
    e.preventDefault();
    let targetClass = e.target.classList.value;
    if(targetClass === 'main_box2_hourForecast_hour_box_hourToShow' || targetClass === 'main_box2_hourForecast_hour_box_temp' || targetClass === 'main_box2_hourForecast_hour_box_showMore' || targetClass === 'main_box2_hourForecast_hour_box_img'){
        var id = +e.target.parentNode.id.substring(2,4);
    }
    if(targetClass === 'main_box2_hourForecast_hour_box_img_g' || targetClass === 'main_box2_hourForecast_hour_box_showMore_link' || targetClass === 'main_box2_hourForecast_hour_box_rollMoreInfo_wind' || 
    targetClass === 'main_box2_hourForecast_hour_box_rollMoreInfo_press' || targetClass === 'main_box2_hourForecast_hour_box_rollMoreInfo_hum' || targetClass === 'main_box2_hourForecast_hour_box_rollMoreInfo_vis' || 
    targetClass === 'main_box2_hourForecast_hour_box_rollMoreInfo_clouds' || targetClass === 'main_box2_hourForecast_hour_box_rollMoreInfo_rain' || targetClass === 'main_box2_hourForecast_hour_box_rollMoreInfo_snow'){
        var id = +e.target.parentNode.parentNode.id.substring(2,4);
    }
    if(targetClass === 'main_box2_hourForecast_hour_box box_light' || targetClass === 'main_box2_hourForecast_hour_box box_dark'){
        var id = +e.target.id.substring(2,4);
    }
    var hourBox = document.querySelector(`#idInfo${id}`);
    if(hourBox.style.display === 'grid'){
        hourBox.style.display = 'none';
    }else{
        hourBox.style.display = 'grid';
    }
}

// weather 5 days forecast
var newId = '';
var secondDate = [];

function weatherDayForecast(city){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metricS}&appid=${appiId}`, true);
    return new Promise((resolve, reject) => {
        xhr.onload = function () {
            if(this.status == 200){
                var forecast = JSON.parse(this.responseText);
                var date = forecast.list[0].dt_txt.substring(0, 10);
                var id = [];
                for(let i=0; i<forecast.list.length; i++){
                    let tempDate = forecast.list[i].dt_txt.substring(0, 10);
                    if(date != tempDate){
                        id.push(i);
                        date = tempDate;
                    }
                }
                id.unshift(0);
                var output = '';
                var xSecondDate = [];
                for(let i=0; i<id.length; i++){
                    let trueId = id[i];
                    let trueBox = forecast.list[trueId];
                    let month = trueBox.dt_txt.substring(5, 7);
                    let showDay = trueBox.dt_txt.substring(8, 10);
                    var showMonth = '';
                    switch(month){
                        case '01'||'1':
                            showMonth = 'Styczeń';
                            break;
                        case '02'||'2':
                            showMonth = 'Luty';
                            break;
                        case '03'||'3':
                            showMonth = 'Marzec';
                            break;
                        case '04'||'4':
                            showMonth = 'Kwiecień';
                            break;
                        case '05'||'5':
                            showMonth = 'Maj';
                            break;
                        case '06'||'6':
                            showMonth = 'Czerwiec';
                            break;
                        case '07'||'7':
                            showMonth = 'Lipiec';
                            break;
                        case '08'||'8':
                            showMonth = 'Sierpień';
                            break;
                        case '09'||'9':
                            showMonth = 'Wrzesień';
                            break;
                        case '10':
                            showMonth = 'Październik';
                            break;
                        case '11':
                            showMonth = 'Listopad';
                            break;
                        case '12':
                            showMonth = 'Grudzień';
                            break;
                        default:
                            showMonth = month;
                            break;
                    }
                    let mode = '';
                    let imgMode = '';
                    if(getCookie('darkMode')==='true'){
                        mode += 'box_dark';
                        imgMode += 'rozwin-dark-mode.png';
                    }else{
                        mode += 'box_light';
                        imgMode += 'rozwin.png';
                    }
                    let date = `${showDay}, ${showMonth}`;
                    xSecondDate.push(id[i], date);
                    let tempMinMax = `${Math.floor(trueBox.main.temp_min)}${metricalTemp}/${Math.ceil(trueBox.main.temp_max)}${metricalTemp}`;
                    let img = `https://openweathermap.org/img/wn/${trueBox.weather[0].icon}@2x.png`;
                    if(i === 0){
                        date = 'Dzisiaj';
                    }
                    output += 
                    `<div class="main_box2_dayForecast_day_box ${mode}" id="iid${i}">
                        <div class="main_box2_dayForecast_day_box_date">${date}</div>
                        <div class="main_box2_dayForecast_day_box_tempMinMax">${tempMinMax}</div>
                        <div class="main_box2_dayForecast_day_box_img">
                            <img class="main_box2_dayForecast_day_box_img_g" src="${img}">
                        </div>
                        <div class="main_box2_dayForecast_day_box_showMore"><img src="${imgMode}" class="main_box2_dayForecast_day_box_showMore_link"></div>
                    </div>`;
                    }
                document.querySelector('.main_box2_dayForecast_day').innerHTML = output;
                linkStart2(id.length);
                newId = id;
                secondDate = xSecondDate;
                }
            else{
            console.log(this.status);
            }   
        }
        xhr.send();
        const error = false;
        if(!error){
            resolve();
        }else{
            reject('Error: Somethink went wrong');
        }
    });   
}

function linkStart2(x){
    for(let i=0; i<=x-1; i++){
        document.querySelector(`#iid${i}`).addEventListener('click', test);
    }
}
function test(e){
    e.preventDefault();
    let targetClass = e.target.classList.value;
    if(targetClass === 'main_box2_dayForecast_day_box_date' || targetClass === 'main_box2_dayForecast_day_box_tempMinMax' || targetClass === 'main_box2_dayForecast_day_box_img' || targetClass === 'main_box2_dayForecast_day_box_showMore'){
        var checkId = e.target.parentNode.id.substring(3, 4);
    }
    if(targetClass === 'main_box2_dayForecast_day_box_img_g' || targetClass === 'main_box2_dayForecast_day_box_showMore_link'){
        var checkId = e.target.parentNode.parentNode.id.substring(3, 4);
    }
    if(targetClass === 'main_box2_dayForecast_day_box box_light' || targetClass === 'main_box2_dayForecast_day_box box_dark'){
        var checkId = e.target.id.substring(3, 4);
    }
    var targetId = newId[checkId];
    var city = cityNow();
    weatherForecast(city, targetId);
    let special = document.querySelector('#special');
    if(getCookie('darkMode')==='true'){
        special.classList.add('special-dark-mode');
    }else{
        special.classList.add('special');
    }
    setTimeout(lostFocus, 1000);
    let targetElement = document.querySelector('.main_box2');
    if(targetElement && window.innerWidth < 449){
        let scrollOffset = -20;
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        window.scrollBy(0, scrollOffset);
    }
}

function lostFocus(){
    let special = document.querySelector('#special');
    special.classList.remove('special');
    special.classList.remove('special-dark-mode');
}


// weather map
// function weatherMap(){
//     let xhr = new XMLHttpRequest();
//     lat = 1;
//     lon = 3;
//     let x = 2;
//     let layer = 'clouds_new';
//     xhr.open('GET', `http://maps.openweathermap.org/maps/2.0/weather/${layer}/${x}/${lat}/${lon}.png?appid=${appiId}`, true);
//     xhr.onload = function(){
//         if(this.status == 200){
//             var map = `<img src=${this.responseURL}>`;
//             document.querySelector('.main_box_map').innerHTML = map;
//         }else{
//             console.log(this.status);
//         }
//     }
//     xhr.send();
// }