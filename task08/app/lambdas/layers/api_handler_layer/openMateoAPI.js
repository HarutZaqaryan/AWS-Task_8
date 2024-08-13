import axios from 'axios';

class OpenMeteoAPI {
    constructor(latitude, longitude) {
        this.baseUrl = 'https://api.open-meteo.com/v1/forecast';
        this.latitude = latitude;
        this.longitude = longitude;
    }

    async getWeatherForecast() {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    latitude: this.latitude,
                    longitude: this.longitude,
                    current: 'temperature_2m,wind_speed_10m',
                    hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching weather forecast:', error);
            throw error;
        }
    }
}

export default OpenMeteoAPI;