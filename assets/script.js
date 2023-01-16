var weatherApiKey = "d8f684a9f3475c882b2c47422c709de2";
var city;
var forcastTrigger = true;
var weatherTrigger = true;
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener("click", () => {

    var searchInput = document.getElementById('searchInput').value;

    city = searchInput;
    var weatherApiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherApiKey;
    //create forcast row function
    function createWeatherCard()  { 
        if(weatherTrigger == true){
            var code = '<div class="card" style="width: 90%"><div class="card-header" id = "mainCity"></div><div class="card-body"><ul class="list-group list-group-flush"><li class="list-group-item" id = "mainTemp"></li><li class="list-group-item" id = "mainWind"></li><li class="list-group-item" id = "mainHumidity"></li></ul></div></div>'
            var weatherRow = document.getElementById('weatherRow');
            weatherRow.innerHTML += code;
            weatherTrigger = false;
        }
    };
    //create forcast row function
    function createForcastCards()  { 
        if(forcastTrigger == true){
            var i = 1;
            while (i <= 5) {
                var code = '<div class="card" id="nextDayCard' + i +  '"style = "width: 10rem;"><ul class="list-group list-group-flush" id="nextDayList' + i + '"><li class="list-group-item" id="nextDayDate' + i + '"></li><li class="list-group-item" id="nextDayTemp' + i + '"></li><li class="list-group-item" id="nextDayWind' + i + '"></li><li class="list-group-item"id="nextDayHumidity' + i + '"></li><li class="list-group-item"id="nextDaySymbol' + i + '"></li></ul></div>';
                var forcastRow = document.getElementById('forcastRow');
                forcastRow.innerHTML += code;
                i++;
            }
            forcastTrigger = false;
        }
    };
    //call weather row function
    createWeatherCard();
    //call forcast row function
    createForcastCards();

    fetch(weatherApiCall)
        .then(function (response) {
            return response.json()
        })
        .then(function (currentWeather) {
            console.log(currentWeather);
            //add first call to local storage
            localStorage.setItem("currentWeather" + searchInput, currentWeather);
            //create history button
            let btn = document.createElement("button");
            btn.innerHTML = searchInput;
            btn.id = searchInput;
            var searchHistory = document.getElementById('searchHistory');
            searchHistory.appendChild(btn);
            //main weather card variables and appening to html
            var mainCity = document.getElementById('mainCity');
            var mainTemp = document.getElementById('mainTemp');
            var mainWind = document.getElementById('mainWind');
            var mainHumidity = document.getElementById('mainHumidity');
            var mainDate = dayjs().format('YYYY/MM/DD');
            var temperature = Number((Number(currentWeather.main.temp) - 273.15) * 9/5 + 32).toFixed(2);
            mainHumidity.innerHTML = "Humidity: " + currentWeather.main.humidity;
            mainWind.innerHTML = "Wind: " + currentWeather.wind.speed;
            mainTemp.innerHTML = "Temperature: " + temperature
            mainCity.innerHTML = currentWeather.name + " - " + mainDate;
            // variable for second call to api
            var weatherForcastApiCall = "https://api.openweathermap.org/data/2.5/forecast?lat=" + currentWeather.coord.lat + "&lon=" + currentWeather.coord.lat + "&appid=" + weatherApiKey;
            fetch(weatherForcastApiCall)
                .then(function (response) {
                    return response.json()
                })
                .then(function (weatherForcast) {
                    //add second call to local storage
                    localStorage.setItem("weatherForcast" + searchInput, weatherForcast);
                })
        });
});