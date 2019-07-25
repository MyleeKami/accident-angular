import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-choropleth',
  templateUrl: './choropleth.component.html',
  styleUrls: ['./choropleth.component.scss']
})
export class ChoroplethComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.generateKilledFile();
  }
  async generateKilledFile() {
    const usagers = await d3.csv('assets/data/usagers-2017.csv');
    const caracteristics = await d3.csv('assets/data/caracteristiques-2017.csv');
    //filtrer sur les morts
    const killed = usagers.filter(r => r.grav === '2')
      .map(r => r.Num_Acc);
    const deps = killed.map(numAcc => {
      return caracteristics.find(r => r.Num_Acc === numAcc).dep;
    });
    const result = deps.reduce((acc, n) => {
      acc[n] = (acc[n] === undefined) ? 1 : acc[n] + 1;
      return acc;
    }, {});

    console.log('return', result);
  }

}
