// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const weatherApi ={
    key: "9eec84a2f0c724c7aef2abfc781faa02",
    baseUrl: "http://api.openweathermap.org/data/2.5/weather"
}


//Event listener function on keypress
const searchInputBox = document.getElementById('input-box')

searchInputBox.addEventListener('keypress', (event) =>{
    console.log(event)
    if(event.keyCode == 13){   // code 13 = EnterKey
        console.log(searchInputBox.value);
        getweatherreport(searchInputBox.value);
        // document.querySelector('.weather-body').style.display = "block";
    }
});

//Get weather report
function getweatherreport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        // console.log(weather);
        return weather.json();
    }).then(showWeatherReport);
}
function getweatherreportByCoords(position){
    const coords = position.coords;
    fetch(`${weatherApi.baseUrl}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}


//Show weather report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minmax = document.getElementById('min-max');
    minmax.innerHTML =  `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerHTML = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerHTML = dateManage(todayDate);

    if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = "url('images/clear.jpg')"
    } else if(weatherType.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url('images/cloud.jpg')"
    } else if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage = "url('images/cloud.jpg')"
    } else if(weatherType.textContent == 'Rain'){
        document.body.style.backgroundImage = "url('images/rain.jpg')"
    } else if(weatherType.textContent == 'Thunderstorm'){
        document.body.style.backgroundImage = "url('images/thunder.jpg')"
    } else if(weatherType.textContent == 'Snow'){
        document.body.style.backgroundImage = "url('images/snow.jpg')"
    } else if(weatherType.textContent == 'Mist'){
        document.body.style.backgroundImage = "url('images/mist.jpg')"
    } else if(weatherType.textContent == 'Fog'){
        document.body.style.backgroundImage = "url('images/fog.jpg')"
    }
}


//Date manage
function dateManage(dateArgs) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let year = dateArgs.getFullYear();
    let month = months[dateArgs.getMonth()];
    let date = dateArgs.getDate();
    let day = days[dateArgs.getDay()];
    return `${date} ${month} (${day}), ${year}`;

}

const successCallback = (position) => {
    getweatherreportByCoords(position);
}
const errorCallback = (error) => {
    console.error(error);
}

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);