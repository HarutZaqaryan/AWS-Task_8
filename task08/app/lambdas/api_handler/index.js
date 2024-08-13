import axios from "axios";
class OpenMeteoAPI {
  constructor() {
    this.baseUrl = "https://api.open-meteo.com/v1/forecast";
  }

  async getWeatherForecast(latitude, longitude) {
    const params = {
      latitude: latitude,
      longitude: longitude,
      current: "temperature_2m,wind_speed_10m",
      hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m",
    };

    try {
      const response = await axios.get(this.baseUrl, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }
}

export const handler = async (event) => {
  const latitude = 52.52;
  const longitude = 13.41;

  const api = new OpenMeteoAPI();

  try {
    const forecast = await api.getWeatherForecast(latitude, longitude);
    return {
      statusCode: 200,
      body: JSON.stringify(forecast),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch weather forecast" }),
    };
  }
};
