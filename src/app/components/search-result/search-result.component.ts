import { Component, OnInit } from '@angular/core';
import { SearchDataService } from '../../services/search-data/search-data.service';
import { SearchData } from '../../model/search-data';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  currentSearchData : SearchData;

  constructor(private searchDataService : SearchDataService) {
    this.searchDataService.searchDataObservable.subscribe(searchData => this.currentSearchData = searchData);
  }

  ngOnInit() {
    
  }

}
