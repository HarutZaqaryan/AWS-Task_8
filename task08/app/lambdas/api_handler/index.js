import OpenMeteoAPI from "/opt/nodejs/openMeteoApi.js";

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
