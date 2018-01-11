import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  buttonText : string = 'Search';
  buttonIcon : string = 'fa fa-search'

  constructor() { }

  ngOnInit() {
  }

}
