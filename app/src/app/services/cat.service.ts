import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fact } from '../models/catFact.interface';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  urlApi = 'https://cat-fact.herokuapp.com/facts';

  constructor(private http: HttpClient) {}

  getCatFacts() {
    return this.http.get<Fact[]>(this.urlApi);
  }
}
