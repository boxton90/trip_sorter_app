import { Component, OnInit } from '@angular/core';
import { MockApiService } from '../../services/mock-api.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  currency : string;
  
  constructor(private mockApiService : MockApiService) { }

  ngOnInit() {
    this.currency = this.mockApiService.getCurrency();
  }

}
