window.addEventListener('DOMContentLoaded', async function() {
  // Get a reference to the "get weather" button
  let getWeatherButton = document.querySelector(`.get-weather`)

  // When the "get weather" button is clicked:
  getWeatherButton.addEventListener(`click`, async function(event) {
    // - Ignore the default behavior of the button
    event.preventDefault()

    // - Get a reference to the element containing the user-entered location
    let locationInput = document.querySelector(`#location`)

    // - Get the user-entered location from the element's value
    let location = locationInput.value

    // HW: Get a reference to the element containing the user-entered number of days
    let daysInput = document.querySelector(`#days`)

    // HW: Get the user-entered number of days from the element's value
    let days = daysInput.value

    // - Check to see if the user entered anything; if so:
    // HW: Check for both location and days

    if (location.length > 0 && days.length>0) {
      // - Construct a URL to call the WeatherAPI.com API
      let url = `https://api.weatherapi.com/v1/forecast.json?key=146c6355f5d44ee5b6552628210405&q=${location}&days=${days}`

      // - Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)

      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()

      // - Write the json-formatted data to the JavaScript console
      console.log(json)

      // - Store the returned location, current weather conditions, the forecast as three separate variables
      // HW: Parse location as "city name, region". Also store current temperature as an additional separate variable
      let interpretedLocation = `${json.location.name}, ${json.location.region}`
      let currentWeather = json.current.condition
      let currentTemp = json.current.temp_f
      let dailyForecast = json.forecast.forecastday

      // Store a reference to the "current" element
      let currentElement = document.querySelector(`.current`)

      // Fill the current element with the location and current weather conditions
      currentElement.innerHTML = `
        <div class="text-center space-y-2">
          <div class="font-bold text-3xl">Current Weather for ${interpretedLocation}</div>
          <div class="font-bold">
            <img src=https:${currentWeather.icon} class="inline-block">
            <span class="temperature">${currentTemp}</span>° 
            and
            <span class="conditions">${currentWeather.text}</span>
          </div>
        </div>
      `
    // HW:
      // Display a daily forecast for the number of days provided by the end-user, showing date, high and low temperature, and a summary of the conditions

        // Create variable for the div containing the forecast
        let forecastData = document.querySelector(`.forecast`)

        // Create HTML variable that displays the number of days entered by the end-user
        forecastData.innerHTML = `
            <div class="text-center space-y-2">
                <div class="font-bold text-3xl">${days} Day Forecast</div>
            </div>
            `

        // Reference the forecast object for weather conditions described above
        // Loop through forecast object to display data for every day
        for (let i=0; i<dailyForecast.length; i++) {
            forecastData.insertAdjacentHTML(`beforeend` , `
                <div class="text-center">
                    <img src="https:${dailyForecast[i].day.condition.icon}" class="mx-auto">
                    <h1 class="text-xl text-bold">${dailyForecast[i].date}</h1>
                    <h2 class="text-2xl">Low ${dailyForecast[i].day.mintemp_f}° – High ${dailyForecast[i].day.maxtemp_f}°</h2>
                    <p class="text-2x1">${dailyForecast[i].day.condition.text}</h1>
                </div>
            
            `)
        }
    }
  })
})