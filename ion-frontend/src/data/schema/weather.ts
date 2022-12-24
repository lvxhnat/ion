export interface CurrentWeatherSchema {
    city: string;
    sunrise: number;
    sunset: number;
    weather_condition: string;
    weather_icon_url: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    wind_speed: number;
    wind_deg: number;
}
