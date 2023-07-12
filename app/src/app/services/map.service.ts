import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coord } from '../models/coords.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  city!:string 
  key:string = 'caca54d857e1c0a67b50d4b4e1eea2d4'
  urlGeoApi:string = `http://api.openweathermap.org/geo/1.0/direct?q=&appid=${this.key}`
  generatedUrl!:string

  constructor(private http:HttpClient) { }


  generateUrl(city:string):string{
    this.generatedUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${this.key}`
    return this.generatedUrl
    
  }


  getCoords() {
    return this.http.get<Coord[]>(this.generatedUrl);
  }


}
