import { Component, OnInit } from '@angular/core';
import { MockApiService } from '../../services/mock-api/mock-api.service';
import { SearchDataService } from '../../services/search-data/search-data.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  currency: string;
  filterSelected: string = 'cheapest';
  cheapestTabSelected : boolean = true;
  fastestTabSelected : boolean = false;

  constructor(private mockApiService: MockApiService, private searchDataService : SearchDataService) {
  }

  ngOnInit() {
    this.currency = this.mockApiService.getCurrency();
    this.searchDataService.changeFilter(this.filterSelected);
  }

  onCheapestFilterClicked(event) {
    if(!this.cheapestTabSelected){
      this.cheapestTabSelected = !this.cheapestTabSelected;
      this.fastestTabSelected = !this.fastestTabSelected;
      this.filterSelected = 'cheapest';
      this.searchDataService.changeFilter(this.filterSelected);
    }
  }

  onFastestFilterClicked(event) {
    if(!this.fastestTabSelected){
      this.fastestTabSelected = !this.fastestTabSelected;
      this.cheapestTabSelected = !this.cheapestTabSelected;
      this.filterSelected = 'fastest';
      this.searchDataService.changeFilter(this.filterSelected);
    }
  }

}
