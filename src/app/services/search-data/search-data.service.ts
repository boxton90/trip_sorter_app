import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SearchData } from '../../model/search-data';

@Injectable()
export class SearchDataService {

  private searchDataSource = new BehaviorSubject<SearchData>({departure : '', arrival : '', filter : ''});
  searchDataObservable = this.searchDataSource.asObservable();

  constructor() { }

  changeSearchData(searchData : SearchData){
    this.searchDataSource.next(searchData);
  }

  changeFilter(filter : string){
    this.searchDataObservable.subscribe(
      searchData => searchData.filter = filter
    );
  }

}
