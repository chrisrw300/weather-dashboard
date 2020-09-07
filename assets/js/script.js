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
                        var dayCycle = [i]/8+1
                        
                        var createCardEl = document.createElement("div");
                        createCardEl.setAttribute("class", "card bg-dark text-white");
                        createCardEl.setAttribute("style", "width: 200px");
                        var forecastHeaderEl = document.createElement("h2");
                        forecastHeaderEl.setAttribute("class", "card-text");
                        var forecastDay = moment(response.list[i].dt_txt).format("dddd");
                        forecastHeaderEl.innerHTML = forecastDay;

                        var forecastTempEl = document.createElement("p");
                        forecastTempEl.setAttribute("class", "card-text info-text");
                        var forecastDayTemp = response.list[i].main.temp;
                        forecastTempEl.innerHTML = forecastDayTemp + "<span>°F</span>";

                        var forecastHumidEl = document.createElement("p");
                        forecastHumidEl.setAttribute("class", "card-text info-text");
                        var forecastDayHumid = response.list[i].main.humidity;
                        forecastHumidEl.innerHTML = forecastDayHumid;

                        var forecastIconEl = document.createElement("p");
                        forecastIconEl.setAttribute("class", "card-image-top");
                        var ForecastDayIcon = response.list[i].weather[0].icon;
                        forecastIconEl.innerHTML = '<img src="assets/images/' + ForecastDayIcon + '.png"/>';

                        createCardEl.appendChild(forecastHeaderEl);
                        createCardEl.appendChild(forecastIconEl);
                        createCardEl.appendChild(forecastTempEl);
                        createCardEl.appendChild(forecastHumidEl);

                        forecastCardEl.appendChild(createCardEl);
                    }
                })
            
}




//add ability to search by history on click, use id search-history-item

//add local storage for search history
getWeatherSearches();

searchBtn.addEventListener("click", formSubmitHandler);