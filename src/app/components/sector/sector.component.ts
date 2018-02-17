import { Component, OnInit } from '@angular/core';
import { MockApiService } from '../../services/mock-api/mock-api.service';
import { SearchDataService } from '../../services/search-data/search-data.service';
import { SearchData } from '../../model/search-data';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {

  departureList: Array<string>;
  arrivalList: Array<string>;
  departureSelected: string;
  arrivalSelected: string;

  constructor(private mockApiService: MockApiService, private searchDataService: SearchDataService) {
    this.departureList = this.mockApiService.getDepartureList();
    this.arrivalList = this.mockApiService.getArrivalList();
  }

  ngOnInit() {
    
  }
  
  //function to update sector info at searchDataService
  onChangeCity(){
    this.searchDataService.changeSearchData({departure : this.departureSelected, arrival : this.arrivalSelected, filter : ''});
  }

}
