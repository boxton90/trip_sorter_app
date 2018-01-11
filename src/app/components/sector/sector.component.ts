import { Component, OnInit } from '@angular/core';
import { MockApiService } from '../../services/mock-api.service';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {

  departureList : Array<string>;
  arrivalList : Array<string>;

  constructor(private mockApiService : MockApiService) { }

  ngOnInit() {
    this.departureList = this.mockApiService.getDepartureList();
    this.arrivalList = this.mockApiService.getArrivalList();
  }

}
