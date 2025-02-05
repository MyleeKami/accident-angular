import { Component, OnInit } from '@angular/core';
import { WikidataService } from 'src/app/wikidata.service';

@Component({
  selector: 'app-wikidata-image-list',
  templateUrl: './wikidata-image-list.component.html',
  styleUrls: ['./wikidata-image-list.component.scss']
})
export class WikidataImageListComponent implements OnInit {
  result: any;

  constructor(private wd: WikidataService) { }

  async ngOnInit() {
    const sparql = `
    SELECT ?h ?hLabel ?dead ?image
    WHERE
    {
      ?h wdt:P31 wd:Q5.
      ?h wdt:P570 ?dead.
      ?h wdt:P509 wd:Q9687.
      ?h wdt:P27 wd:Q142.
      Optional{ ?h wdt:P18 ?image. }.
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    }
      ORDER by desc(?dead)`;
    this.result = await this.wd.request(sparql);
    console.log('results', this.result);
  }

}
