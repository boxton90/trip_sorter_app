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

  constructor(private mockApiService: MockApiService, private searchDataService : SearchDataService) { }

  ngOnInit() {
    this.currency = this.mockApiService.getCurrency();
  }

  //function to update UI and filter selected at searchDataService
  onFilterClicked(event) {
    this.filterSelected = event.target.innerText;
    event.currentTarget.classList.toggle('is-active');
    this.searchDataService.changeFilter(this.filterSelected);
  }

}
