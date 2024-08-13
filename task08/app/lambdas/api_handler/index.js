// import OpenMeteoAPI from "../layers/api_handler_layer/openMateoAPI";
import axios from "axios";
class OpenMeteoAPI {
  constructor(latitude, longitude) {
    this.baseUrl =
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";
    this.latitude = latitude;
    this.longitude = longitude;

    console.log("~~~latitude(from lambda layer)~~~", this.latitude);
    console.log("~~~longitude(from lambda layer)~~~", this.longitude);
  }

  async getWeatherForecast() {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          latitude: this.latitude,
          longitude: this.longitude,
          current: "temperature_2m,wind_speed_10m",
          hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m",
        },
      });
      console.log("~~~RESPONSE(from lambda LAYER)~~~", response);

      return response.data;
    } catch (error) {
      console.error("~~~Error from layer's try", error);
      throw error;
    }
  }
}

export const handler = async (event) => {
  console.log("~~~EVENT(from lambda func)~~~", event);
  const latitude = event.queryStringParameters.latitude || "52.52";
  console.log("~~~latitude(from lambda func)~~~", latitude);
  const longitude = event.queryStringParameters.longitude || "13.41";
  console.log("~~~longitude(from lambda func)~~~", longitude);

  const api = new OpenMeteoAPI(latitude, longitude);
  console.log("~~~API Class instance(from lambda func)~~~", api);

  try {
    const forecast = await api.getWeatherForecast();
    console.log("~~~forecast(from lambda func)~~~", event);
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
