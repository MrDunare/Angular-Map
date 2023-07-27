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
  isVisible: boolean = false;
  tupGraph: string = 'line';

  constructor(private graphServices: GraphService) {}

  // Declare Highcharts as a type for the Highcharts library
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  // Method to fetch data from the graph service and display the graph as a column chart
  getValues() {
    // Generate the URL based on the number of beers
    this.graphServices.generateUrl(this.numBeer);
    // Fetch data from the service
    this.graphServices.getData().subscribe((data) => {
      this.beerList = data;

      // Initialize arrays to store beer names, volumes, and alcohol content
      let seriesData: number[] = [];

      // Process each beer in the data
      this.beerList.forEach((element) => {
        this.beerName.push(element.name); // Collect beer names
        this.volumes.push(element.alcohol.slice(0, -1)); // Collect alcohol volumes
        seriesData.push(parseFloat(element.alcohol.slice(0, -1))); // Collect alcohol content as numbers
      });

      // Highcharts options for the column chart
      this.chartOptions = {
        chart: {
          backgroundColor: 'grey',
        },
        title: {
          text: 'Beer Graph',
        },
        series: [
          {
            type: 'column',
            name: 'Volume Alcohol',
            data: seriesData,
            color: 'black',
          },
        ],
        xAxis: {
          title: {
            text: 'Name Beer',
          },
          categories: this.beerName, // Set beer names as categories on the x-axis
        },
        yAxis: {
          title: {
            text: 'alcohol content',
          },
        },
      };

      this.updateFlag = true; // Set updateFlag to trigger chart update
      this.isVisible = true; // Set isVisible to show the chart
    });
  }

  // Method to fetch data from the graph service and display the graph as an area chart
  getValuesArea() {
    // Generate the URL based on the number of beers
    this.graphServices.generateUrl(this.numBeer);
    // Fetch data from the service
    this.graphServices.getData().subscribe((data) => {
      this.beerList = data;

      // Initialize arrays to store beer names, volumes, and alcohol content
      let seriesData: number[] = [];

      // Process each beer in the data
      this.beerList.forEach((element) => {
        this.beerName.push(element.name); // Collect beer names
        this.volumes.push(element.alcohol.slice(0, -1)); // Collect alcohol volumes
        seriesData.push(parseFloat(element.alcohol.slice(0, -1))); // Collect alcohol content as numbers
      });

      // Highcharts options for the area chart
      this.chartOptions = {
        chart: {
          backgroundColor: 'grey',
        },
        title: {
          text: 'Beer Graph',
        },
        series: [
          {
            type: 'area',
            name: 'Volume Alcohol',
            data: seriesData,
            color: 'black',
          },
        ],
        xAxis: {
          title: {
            text: 'Name Beer',
          },
          categories: this.beerName, // Set beer names as categories on the x-axis
        },
        yAxis: {
          title: {
            text: 'alcohol content',
          },
        },
      };

      this.updateFlag = true; // Set updateFlag to trigger chart update
      this.isVisible = true; // Set isVisible to show the chart
    });
  }

  // Default Highcharts options for the column chart
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Beer Graph',
    },
    series: [
      {
        type: 'column',
        name: 'Volume Alcohol',
        data: this.volumes, // The data will be populated later with getValues or getValuesArea methods
      },
    ],
    xAxis: {
      title: {
        text: 'Name Beer',
      },
      categories: this.beerName, // The categories will be populated later with getValues or getValuesArea methods
    },
    yAxis: {
      title: {
        text: 'alcohol content',
      },
    },
  };
}
