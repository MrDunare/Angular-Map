import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fact } from '../../models/catFact.interface';   

@Component({
  selector: 'app-cat-fact',
  templateUrl: './cat-fact.component.html',
  styleUrls: ['./cat-fact.component.scss'],
})
export class CatFactComponent {
  urlApi = 'https://cat-fact.herokuapp.com/facts';
  fact!: Fact;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCatFacts();
  }


  getCatFacts() {
    this.http.get<Fact[]>(this.urlApi).subscribe((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      this.fact = data[randomIndex];
    });
  }
}
