//initial variables
var headerDateEl = document.querySelector("#header-date");
var headerCityEl = document.querySelector("#header-city");
var searchBtn = document.querySelector("#search-btn");
var searchInput = document.querySelector("#search-input");
var searchHistory = document.querySelector("#search-history");
var tempEl = document.querySelector("#temp");
var humidEl = document.querySelector("#humid");
var windEl = document.querySelector("#wind");
var uvEl = document.querySelector("#uv");

//handles form submit
function formSubmitHandler() {
    //prevent refresh
    event.preventDefault();
    //get name of city search 
    var citySearch = searchInput.value.trim();
    headerCityEl.textContent = citySearch;
    
    var createHistory = document.createElement("button");
    createHistory.textContent = citySearch;
    createHistory.classList.add("list-group-item", "list-group-item-action", "mt-1", "bg-dark", "text-white");
    createHistory.setAttribute("id", "search-history-item");
    searchHistory.appendChild(createHistory);
    if (citySearch) {
        getWeather();
    }
}

function getWeather() {
    apiUrl = "api.openweathermap.org/data/2.5/forecast?q=" + searchInput.value + "&appid=544584577b71259e77eacd33b4ad8c0f";
    //fetch api results for search
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data)
                var weatherName
            })
            }
        }
)}

//add ability to search by history on click, use id search-history-item

//add local storage for search history

searchBtn.addEventListener("click", formSubmitHandler);