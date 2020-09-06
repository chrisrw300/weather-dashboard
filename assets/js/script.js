//initial variables
var apiKey = "&appid=544584577b71259e77eacd33b4ad8c0f";
var headerDateEl = document.querySelector("#header-date");
var headerCityEl = document.querySelector("#header-city");
var searchBtn = document.querySelector("#search-btn");
var searchInput = document.querySelector("#search-input");
var searchHistory = document.querySelector("#search-history");
var tempEl = document.querySelector("#temp");
var humidEl = document.querySelector("#humid");
var windEl = document.querySelector("#wind");
var uvEl = document.querySelector("#uv");
var cardEl = document.querySelector("#forecast-card");
// var cardEl = document.querySelector("#card-body");
// var cardDate = document.querySelector("#card-date");
// var cardIcon = document.querySelector("#card-weather-icon");
// var cardTemp = document.querySelector("#card-temp");
// var cardHumid = document.querySelector("#card-humid");

//today's date
var currentDay = moment().format("L");
headerDateEl.textContent = currentDay;

//get storage
function getWeatherSearches() {
    localStorage.getItem("location");
}

//handles form submit
function formSubmitHandler() {
    //prevent refresh
    event.preventDefault();
    //get name of city search 
    var citySearch = searchInput.value.trim();
    headerCityEl.textContent = citySearch;

    //set search in local storage
    window.localStorage.setItem("location", citySearch);
    
    //creates search history that is clickable
    var createHistory = document.createElement("button");
    createHistory.textContent = citySearch;
    createHistory.classList.add("list-group-item", "list-group-item-action", "mt-1", "bg-dark", "text-white");
    createHistory.setAttribute("id", "search-history-item");
    // createHistory.onclick.getWeather(citySearch);
    searchHistory.appendChild(createHistory);
    getWeather();
}

function getWeather() {
    apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&units=imperial" + apiKey;
    
    //fetch api results for search
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data.main);
                tempEl.textContent = data.main.temp + " °F";
                humidEl.textContent = data.main.humidity + " %";
                windEl.textContent = data.wind.speed + "MPH";
                
                })
            }
        }
        
        //add catch to handle errors   
)
forecastData();
}

function forecastData() {
    apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput.value + "&units=imperial" + apiKey + "&cnt=15";
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(fiveDayForecast) {
                    for (var i = 0; i < fiveDayForecast.list.length; i+=8) {
                        console.log(fiveDayForecast, "it works");
                        var forecastObj = {
                            date: fiveDayForecast.list[i].dt_txt,
                            temp: fiveDayForecast.list[i].main.temp,
                            humidity: fiveDayForecast.list[i].main.humidity
                        }
                        console.log(forecastObj, "string")
                        var dateStr = forecastObj.date;
                        var trimmedDate = dateStr.substring(0, 10);
                        console.log(trimmedDate, "Hello")
                        createForecastCards(trimmedDate, forecastObj.temp, forecastObj.humidity);
                    }
                })
            }
        })
}

function createForecastCards(date, temp, humidity) {
    //HTML elements created for card
    console.log(date + " + " + temp + " + " + humidity);
    var forecastCardEl = document.createElement("div").setAttribute("class", "card");
    var cardDateEl = document.createElement("h3").setAttribute("class", "card-header");
    var cardTempEl = document.createElement("p").setAttribute("class", "card-text");
    var cardHumidityEl = document.createElement("p").setAttribute("class", "card-text"); 
    console.log(date + " + " + temp + " + " + humidity + "TESTING");

    cardDateEl.textContent(date);
    cardTempEl.textContent('Temp:' + temp);
    cardHumidityEl.textContent('Humidity' + humidity + '%');

    cardEl.appendChild(forecastCardEl);
    console.log(forecastCardEl)
    
    
    // forecastCardEl.append(cardDateEl, /*icon*/ cardTempEl, cardHumidityEl);
    // cardEl.appendChild(forecastCardEl);
}



//add ability to search by history on click, use id search-history-item

//add local storage for search history
getWeatherSearches();

searchBtn.addEventListener("click", formSubmitHandler);