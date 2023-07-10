import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatFact } from './models/catFact.interface';

@Component({
  selector: 'app-cat-fact',
  templateUrl: './cat-fact.component.html',
  styleUrls: ['./cat-fact.component.scss'],
})
export class CatFactComponent {
  urlApi = 'https://cat-fact.herokuapp.com/facts';
  fact: any = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCatFacts();
  }

  getCatFacts() {
    return this.http.get<CatFact[]>(this.urlApi).subscribe((data) => {
      this.fact = data;
      let randomIndex = Math.floor(Math.random()*data.length)
      console.log(randomIndex)
      for(let i = 0; i < data.length; i++){
        this.fact = data[randomIndex].text;

      }

    });
  }
}
