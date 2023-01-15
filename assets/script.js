var weatherApiKey = "d8f684a9f3475c882b2c47422c709de2";
var city;


const searchButton = document.getElementById('searchButton');

searchButton.addEventListener("click", () => {

    var searchInput = document.getElementById('searchInput').value;
    city = searchInput;
    var weatherApiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherApiKey;
    fetch(weatherApiCall)
        .then(function (response) {
            return response.json()
        })
        .then(function (currentWeather) {
            console.log(currentWeather);
            var weatherForcastApiCall = "https://api.openweathermap.org/data/2.5/forecast?lat=" + currentWeather.coord.lat + "&lon=" + currentWeather.coord.lat + "&appid=" + weatherApiKey;
            fetch(weatherForcastApiCall)
                .then(function (response) {
                    return response.json()
                })
                .then(function (weatherForcast) {
                    console.log(weatherForcast)
                })
        });

    /*
    localStorage.setItem(searchInput,);


    */
});

function displayWeather() {

}


