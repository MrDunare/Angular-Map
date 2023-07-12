import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherModel } from '../models/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  key: string = '28f3e1293c92c50c960340bcd89dc39f';
  url: string =
    'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=28f3e1293c92c50c960340bcd89dc39f&units=metric&lang=it';
  lat: number = 0;
  lon: number = 0;

  constructor(private https: HttpClient) {}

  getWeatherUrl(lat: number, lon: number): string {
    this.url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=28f3e1293c92c50c960340bcd89dc39f&units=metric&lang=it`;
    return this.url;
  }
  getData() {
    return this.https.get<WeatherModel>(this.url);
  }
}
