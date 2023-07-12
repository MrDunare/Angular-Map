import { Component, OnInit, OnChanges } from '@angular/core';
import { CatService } from 'src/app/services/cat.service';

@Component({
  selector: 'app-cat-fact',
  templateUrl: './cat-fact.component.html',
  styleUrls: ['./cat-fact.component.scss'],
})
export class CatFactComponent {
  fact!: string;

  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.catService.getCatFacts().subscribe((data) => {
      let randomIndex = Math.floor(Math.random() * data.length);
      console.log(data);
      this.fact = data[randomIndex].text;
    });
  }
}
