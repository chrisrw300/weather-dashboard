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
var forecastCardEl = document.querySelector("#forecast-card");

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
forecastUv();
}

var forecastUv = function(lat, lon) {
    var latCoor = lat;
    var lonCoor = lon;
    var uvApi = "https://api.openweathermap.org/data/2.5/uvi?appid=86c24a05a9ee394be1a05ee64605e1cb&lat=" + latCoor + "&lon=" + lonCoor;
    fetch(uvApi)
    .then(function (response) {
        var data = response.json();
        return data;
    })
    .then(function (data) {
        weather.uv = Math.round(data.value);
        uvEl.setAttribute("class", "info-text");
        if (weather.uv <= 2) {
            uvEl.setAttribute("class", "bg-info");
        } else if (weather.uv > 2 && weather.uv < 8) {
            uvEl.setAttribute("class", "bg-warning");
        } else if (weather.uv >= 8) {
            uvEl.setAttribute("class", "bg-danger");
        }
        uvEl.innerHTML = weather.uv;
    })
}


function forecastData() {
    forecastApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput.value + "&units=imperial" + apiKey;
    
    forecastCardEl.innerHTML = "";
    
    fetch(forecastApi)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                return response.json();
        }})
            .then(function(response) {
                    for (var i = 0; i < response.list.length; i+=8) {
                        console.log(response, "it works");
                        //creates div to hold cards
                        var createCardEl = document.createElement("div");
                        createCardEl.setAttribute("class", "card p-0 m-1 text-center");
                        createCardEl.setAttribute("style", "width: 200px");
                        //forecast header
                        var forecastHeaderEl = document.createElement("h2");
                        forecastHeaderEl.setAttribute("class", "card-text bg-dark text-white");
                        var forecastDay = moment(response.list[i].dt_txt).format("dddd");
                        forecastHeaderEl.innerHTML = forecastDay;
                        //forecast temperature
                        var forecastTempEl = document.createElement("p");
                        forecastTempEl.setAttribute("class", "card-text info-text p-2 bg-dark text-white m-0");
                        var forecastDayTemp = response.list[i].main.temp;
                        forecastTempEl.innerHTML = "Temp: " + forecastDayTemp + "<span> °F</span>";
                        //forecase humidity
                        var forecastHumidEl = document.createElement("p");
                        forecastHumidEl.setAttribute("class", "card-text info-text p-2 bg-dark text-white m-0");
                        var forecastDayHumid = response.list[i].main.humidity;
                        forecastHumidEl.innerHTML = "Humidity: " + forecastDayHumid + " %";
                        //forecast icon
                        var forecastIconEl = document.createElement("p");
                        forecastIconEl.setAttribute("class", "card-image-top");
                        var forecastDayIcon = response.list[i].weather[0].icon;
                        forecastIconEl.innerHTML = '<img src="./assets/img/' + forecastDayIcon + '.png"/>';
                        console.log(forecastIconEl);
                        //append all info to card
                        createCardEl.appendChild(forecastHeaderEl);
                        createCardEl.appendChild(forecastIconEl);
                        createCardEl.appendChild(forecastTempEl);
                        createCardEl.appendChild(forecastHumidEl);
                        //appends card to div
                        forecastCardEl.appendChild(createCardEl);
                    }
                })
            
}




//add ability to search by history on click, use id search-history-item

//add local storage for search history
getWeatherSearches();

searchBtn.addEventListener("click", formSubmitHandler);