import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../model/response';
import { Deal } from '../../model/deal';

@Injectable()
export class MockApiService {

  responseData: Response;

  constructor(private httpClient: HttpClient) {

  }

  loadData() {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get('/assets/mock-response/response.json')
        .subscribe((data: Response) => {
          this.responseData = data;
          resolve(true);
        })
    })
  }

  // function to get all respond data
  getAllData(): Response {
    return this.responseData;
  }

  // function to get deals
  getDeals() : Array<Deal>{
    return this.responseData.deals;
  }

  // function to get list of departure cities without repetition
  getDepartureList(): Array<string> {

    let deals = this.responseData.deals;
    var departureList: Array<string> = new Array<string>();

    for (let deal of deals) {
      if (!departureList.includes(deal.departure)) {
        departureList.push(deal.departure);
      }
    }

    return departureList;
  }

  // function to get list of arrival cities without repetition
  getArrivalList() {
    let deals = this.responseData.deals;
    var arrivalList: Array<string> = new Array<string>();

    for (let deal of deals) {
      if (!arrivalList.includes(deal.arrival)) {
        arrivalList.push(deal.arrival);
      }
    }

    return arrivalList;
  }

  // function to get currency
  getCurrency(): string {
    return this.responseData.currency;
  }

  // function to get currency symbol 
  getCurrencySymbol(): string{
    
    let currency : string = this.getCurrency();

    switch(currency){
      case 'EUR':
        return '€';
      case 'USD':
        return '$';
      case 'GBP':
        return '£';
      case 'JPY':
        return '¥';
      default:
        return currency;
    }
  }

}
