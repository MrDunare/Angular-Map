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
  beerName: string[] = [];
  volumes: string[] = [];
  isVisible: boolean = false

  constructor(private graphServices: GraphService) {}

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  getValues() {
    this.graphServices.generateUrl(this.numBeer);
    this.graphServices.getData().subscribe((data) => {
      this.beerList = data;
      console.log(data);
  
      let seriesData: number[] = [];
  
      this.beerList.forEach((element) => {
        this.beerName.push(element.name);
        this.volumes.push(element.alcohol.slice(0, -1));
        seriesData.push(parseFloat(element.alcohol.slice(0, -1)));
      });
  
      this.chartOptions = {
        title: {
          text: 'Beer Graph',
        },
        series: [
          {
            type: 'column',
            name: 'Volume Alcohol',
            data: seriesData,
          },
        ],
        xAxis: {
          title: {
            text: 'Name Beer',
          },
          categories: this.beerName,
        },
        yAxis: {
          title: {
            text: 'alcohol content',
          },
        },
      };
  
      this.updateFlag = true;
      this.isVisible = true
    });
  }
  
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Beer Graph',
    },

    series: [
      {
        type: 'column',
        name: 'Volume Alcohol',
        data: this.volumes,
      },
    ],
    xAxis: {
      title: {
        text: 'Name Beer',
      },
      categories: this.beerName,
    },
    yAxis: {
      title: {
        text: 'alcohol content',
      },
    },
  };
}







