import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-diagram',
  templateUrl: './bar-diagram.component.html',
  styleUrls: ['./bar-diagram.component.scss']
})
export class BarDiagramComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    (async () => {
      try {
        const data = await d3.csv('data/caracteristiques-2017.csv');
        console.log('data', data);
        const data2 = data.map(d => d.dep.replace(/^(.*)0$/, '$1')).reduce((acc, n) => {
          acc[n] = (acc[n] === undefined) ? 1 : acc[n] + 1;
          return acc;
        }, {});
        console.log('data2:', data2);
        const data3 = Object.keys(data2)
          .map(key => ({ dept: key, 'nbr-accident': data2[key] }))
          .sort((a, b) => {
            return a.dept > b.dept ? 1 : -1;
          });
        console.log('data3:', data3);
        const bars = d3.select('.histo').selectAll('.dept').data(data3);
        bars.enter()
          .append('div')
          .classed('dept', true)
          .html(d => `
      <span class="dept-num">${d.dept}</span>
      <div class="bar" style="width:0%; background-color: hsl(0,100%,80%)" title=${d['nbr-accident']}></div>`);
        // <span class="nbr-accident">${d['nbr-accident']}</span>`);
        console.log('bars', bars);
        const depts = d3.select('.histo').selectAll('.bar').data(data3);
        depts.transition().delay(1000).duration(2000)
          .style('width', d => `${(100 * d['nbr-accident'] / 7000)}%`)
          .transition().delay(1000).duration(2000)
          .style('background-color', 'hsl(0,100%,40%)');
      } catch (error) {
        console.log('error', error);
      }
      console.log('coucou');
    })();

  }

}
