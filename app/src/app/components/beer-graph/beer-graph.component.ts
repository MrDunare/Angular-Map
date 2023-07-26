import { Component } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';

@Component({
  selector: 'app-beer-graph',
  templateUrl: './beer-graph.component.html',
  styleUrls: ['./beer-graph.component.scss']
})
export class BeerGraphComponent {
  numBeer!:number

  constructor(private graphServices:GraphService){}



  findGraph() {
    this.graphServices.getData().subscribe((data) => {
      console.log(data);
    });
  }

}
