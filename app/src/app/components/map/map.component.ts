import { Component } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  city!: string;
  lat = 51.505;
  lon = -0.09;
  map!: L.Map;
  isCityUndefined: boolean = false;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.initMap();
  }

  //collegato al bottone cerca
  getUrl() {
    try {
      this.isCityUndefined = false;
      this.mapService.generateUrl(this.city);
      this.mapService.getCoords().subscribe((data) => {
        if (data[0] === undefined) {
          this.isCityUndefined = true;
        }
        this.lat = data[0].lat;
        this.lon = data[0].lon;
        this.map.setView([this.lat, this.lon], 13);
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
