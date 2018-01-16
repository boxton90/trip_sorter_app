import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  buttonText : string = 'Search';
  buttonIcon : string = 'fa fa-search';
  currentStatus : string = 'search';
  showResult : boolean = false;
  @Output() searchClicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onSearch(){
    if(this.currentStatus == 'search'){
      this.buttonText = 'Reset';
      this.buttonIcon = 'fa fa-refresh';
      this.currentStatus = 'reset';
      this.showResult = true;
      this.searchClicked.emit(this.showResult);
    }
    else if(this.currentStatus == 'reset'){
      this.buttonText = 'Search';
      this.buttonIcon = 'fa fa-search';
      this.currentStatus = 'search';
      this.showResult = false;
      this.searchClicked.emit(this.showResult);
    }
  }

}
