import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Beer } from 'src/app/models/Beer.interface';
import { GraphService } from 'src/app/services/graph.service';

@Component({
  selector: 'app-beer-graph',
  templateUrl: './beer-graph.component.html',
  styleUrls: ['./beer-graph.component.scss'],
})
export class BeerGraphComponent {
  numBeer!: number;
  beerList: Beer[] = [];
  data: string[] = [];
  volumes: string[] = [];

  constructor(private graphServices: GraphService) {}

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  findGraph() {
    this.graphServices.generateUrl(this.numBeer);
    this.graphServices.getData().subscribe((data) => {
      this.beerList = data;
    });
  }

  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'column',
        data: this.data,
      },
    ],
  };
}
