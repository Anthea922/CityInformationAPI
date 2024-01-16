// Constants for API details
const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const WEATHER_API_URL = 'https://weatherbit-v1-mashape.p.rapidapi.com/current';


// Separate headers for the two APIs
const GEO_HEADERS = {
  'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  'X-RapidAPI-Key': 'b2e17efe33mshf379dbe2cc12efdp188e83jsna8b5e7c7a5b0'
};

const WEATHER_HEADERS = {
  'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
  'X-RapidAPI-Key': 'b2e17efe33mshf379dbe2cc12efdp188e83jsna8b5e7c7a5b0'
};

// Function to fetch city details using the Teleport API
const getCityDetails = async (cityName) => {
  try {
    let response = await fetch(`${GEO_API_URL}?name=${cityName}`, {
      method: 'GET',
      headers: GEO_HEADERS
    });

    // Parse the response data as JSON
    let data = await response.json();

    // Check if the data contains city details
    if (data.data && data.data.length > 0) {
      // Return the first city in the data array
      return data.data[0];
    } else {
      // Throw an error with specific details if the city is not found
      throw new Error(`City not found for query: ${cityName}`);
    }
  } catch (error) {
    // Log and rethrow any errors that occur during the process
    console.error(`Error fetching city details: ${error.message}`);
    throw error;
  }
};

// Function to fetch weather details using the Weatherbit API
const getWeatherDetails = async (latitude, longitude) => {
  try {
    let response = await fetch(`${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}`, {
      method: 'GET',
      headers: WEATHER_HEADERS
    });

    // Parse the response data as JSON
    let data = await response.json();

    // Check if the data contains weather details
    if (data.data && data.data.length > 0) {
      // Return the first weather details in the data array
      return data.data[0];
    } else {
      // Throw an error if weather data is not available
      throw new Error('Weather data not available');
    }
  } catch (error) {
    // Log and rethrow any errors that occur during the process
    console.log(`Error fetching weather details: ${error.message}`);
    throw error;
  }
};

// Function to fetch both city and weather details and return a combined object
const getCityAndWeatherInfo = async (cityName) => {
  try {
    // Fetch city details using the specified city name
    let cityDetails = await getCityDetails(cityName);

    // Fetch weather details using the latitude and longitude from cityDetails
    let weatherDetails = await getWeatherDetails(cityDetails.latitude, cityDetails.longitude);

    // Return an object containing population, elevation, and current temperature
    return {
      population: cityDetails.population,
      elevation: cityDetails.elevationMeters,
      currentTemperature: weatherDetails.temp
    };
  } catch (error) {
    // Log and handle errors that occur during the process
    console.log(`Error fetching city and weather details: ${error.message}`);
    throw error;
  }
};

// Example usage: Fetch city and weather information for a specific city name
getCityAndWeatherInfo('Cape Town')
  // Log the result if successful
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    // Log and handle errors that occur during the example usage
    console.error(error);
  });
