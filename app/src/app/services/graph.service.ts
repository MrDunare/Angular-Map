import { Injectable } from '@angular/core';
import { Beer } from '../models/Beer.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private https: HttpClient) {}

  url: string = `https://random-data-api.com/api/v2/beers`;

  generateUrl(numBeer: number) {
    this.url = `https://random-data-api.com/api/v2/beers?size=${numBeer}`;
    console.log(this.url);
  }

  getData() {
    return this.https.get<Beer[]>(this.url);
  }


}
