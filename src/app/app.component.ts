import { Component , OnInit } from '@angular/core';
import { Response } from './model/response';
import { Deal } from './model/deal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showSearchResult : boolean = false;
  
  constructor(){}

  ngOnInit(){
    
  }

  onSearchClicked(showResult : boolean){
    this.showSearchResult = showResult;
  }

}
