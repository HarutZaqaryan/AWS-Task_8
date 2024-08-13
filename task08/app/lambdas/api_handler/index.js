import OpenMeteoAPI from '/opt/nodejs/openMeteoApi.js';

export const handler = async (event) => {
    const latitude = event.queryStringParameters.latitude || '52.52';
    const longitude = event.queryStringParameters.longitude || '13.41';

    const api = new OpenMeteoAPI(latitude, longitude);
    try {
        const forecast = await api.getWeatherForecast();
        return {
            statusCode: 200,
            body: JSON.stringify(forecast),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch weather forecast' }),
        };
    }
};