var weatherApiKey = "d8f684a9f3475c882b2c47422c709de2";
var city;


const searchButton = document.getElementById('searchButton');

searchButton.addEventListener("click", () => {

    var searchInput = document.getElementById('searchInput').value;

    city = searchInput;
    var weatherApiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherApiKey;

    function createWeatherCards()  {
        var i = 1;
        while (i <= 5) {
            var code = '<div class="card" id="nextDayCard' + i +  '"style = "width: 10rem;"><ul class="list-group list-group-flush" id="nextDayList' + i + '"><li class="list-group-item" id="nextDayDate' + i + '"></li><li class="list-group-item" id="nextDayTemp' + i + '"></li><li class="list-group-item" id="nextDayWind' + i + '"></li><li class="list-group-item"id="nextDayHumidity' + i + '"></li><li class="list-group-item"id="nextDaySymbol' + i + '"></li></ul></div>';
            var forcastRow = document.getElementById('forcastRow');
            forcastRow.innerHTML += code;
            i++;
        }
    };

    createWeatherCards();

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





 /*create div element
 let div = document.createElement("div");
 div.className = "card";
 div.id = "nextDay" + i
 div.style = "width: 10rem;";
 //call div parent
 var forcastRow = document.getElementById('forcastRow');
 //insert div through parent
 forcastRow.appendChild(div);
 //create ul
 let ul = document.createElement('ul');
 ul.className = "list-group list-group-flush";
 ul.id = "forcastList" + i;
 //call ul parent
 var forcastDiv = document.getElementById('nextDay' + i);
 //insert ul through parent
 forcastDiv.appendChild(ul);
 //create first li
 let li = document.createElement('li');
 li.className = "list-group-item";
 li.id = 'nextDay' + i + 'Temp'
 //call li parent
 var forcastList = document.getElementById('forcastList' + i);
 //insert li through parent
 forcastList.appendChild(li)
 //next li
 let li2 = document.createElement('li');
 li2.className = "list-group-item";
 li2.id = 'nextDay' + i + 'Wind'
 //insert li through parent
 forcastList.appendChild(li2)
 //next li
 let li3 = document.createElement('li');
 li3.className = "list-group-item";
 li3.id = 'nextDay' + i + 'Humidity'
     //insert li through parent
 forcastList.appendChild(li3)
 //next li
 let li4 = document.createElement('li');
 li4.className = "list-group-item";
 li4.id = 'nextDay' + i + 'Date'
     //insert li through parent
 forcastList.appendChild(li4)
 i++
}
*/