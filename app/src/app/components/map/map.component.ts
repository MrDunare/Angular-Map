import { Component } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from 'src/app/services/map.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  //variabili mappa
  city!: string;
  lat = 51.505;
  lon = -0.09;
  map!: L.Map;
  isCityUndefined: boolean = false;
  //variabili meteo
  cityName!: string;
  temp!: number;
  description!: string;
  country!: string;
  isCityFound: boolean = false;

  constructor(
    private mapService: MapService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.initMap();
  }
  componentInit() {
    this.isCityUndefined = false;
    this.isCityFound = false;
  }

  //collegato al bottone cerca
  getUrl() {
    try {
      this.componentInit();
      this.mapService.generateUrl(this.city);
      this.mapService.getCoords().subscribe((data) => {
        if (data[0] === undefined) {
          this.isCityUndefined = true;
        }
        this.lat = data[0].lat;
        this.lon = data[0].lon;
        this.map.setView([this.lat, this.lon], 13);
        //Creo url per la chiamata al meteo
        this.weatherService.getWeatherUrl(this.lat, this.lon);
        this.weatherService.getData().subscribe((data) => {
          this.isCityFound = true;
          this.cityName = data.name;
          this.temp = data.main.temp;
          this.description = data.weather[0].description;
          this.country = data.sys.country;
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  initMap() {
    this.map = L.map('map').setView([this.lat, this.lon], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }
}
