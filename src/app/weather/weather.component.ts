import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherData } from './weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weatherData: WeatherData[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    const apiUrl = `http://localhost:3000/api/weather/`;

    this.http.get(apiUrl).subscribe((response: any) => {

      this.weatherData = response.map((forecast: any) => ({
        weatherType: forecast.weather_type,
        icon: forecast.icon,
        temp: forecast.temp,
        feelsLike: forecast.feels_like,
        tempMin: forecast.temp_min,
        tempMax: forecast.temp_max,
        pressure: forecast.pressure,
        humidity: forecast.humidity,
        visibility: forecast.visibility,
        windSpeed: forecast.wind_speed,
        windDeg: forecast.wind_deg,
        clouds: forecast.clouds,
        dt: forecast.dt,
        createdAt: forecast.createdAt,
      }));

      console.log(this.weatherData); // Log the weather data after mapping
    });
  }
}
