import { Component, OnInit } from '@angular/core';
import { SearchDataService } from '../../services/search-data/search-data.service';
import { SearchData } from '../../model/search-data';
import { MockApiService } from '../../services/mock-api/mock-api.service';
import { Response } from '../../model/response';
import { Deal } from '../../model/deal';
import { Duration } from '../../model/duration';
import { Observable } from 'rxjs/';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  searchData: SearchData;
  deals: Array<Deal>;
  results: Array<Deal>;
  currencySymbol : string;
  tripTotalCost: number;
  tripTotalDuration : Duration;
  showTripWarning: boolean;

  constructor(private mockApiService: MockApiService, private searchDataService: SearchDataService) {
    this.deals = this.mockApiService.getDeals();
    this.currencySymbol = this.mockApiService.getCurrencySymbol();
    this.searchDataService.searchDataObservable.subscribe(searchData => this.searchData = searchData);
    this.results = new Array<Deal>();
    this.tripTotalCost = 0;
    this.showTripWarning = false;
  }

  ngOnInit() {
    this.routeAlgorithm();
  }

  routeAlgorithm() {
    if (this.searchData.filter == 'cheapest') {
      this.calculateCheapestRoute();
    }
    else if (this.searchData.filter == 'fastest') {
      this.calculatefastestRoute();
    }
  }

  calculateCheapestRoute() {

    let directTrip: Deal;
    let directTripTotalCost: number;
    let indirectTripTotalCost: number;
    let directTripTotalDuration: Duration;
    let indirectTripTotalDuration: Duration;

    let deals: Array<Deal>;
    let dealsFiltered: Array<Deal> = new Array<Deal>();

    let arrayCostsDiscounted: Array<number> = new Array<number>();
    let minArrayCostDiscounted: number;

    let source;
    let filterObservable;
    let currentDeparture;

    let loopCounter: number;
    let stopWhileLoop: boolean;

    // variable Initializations
    directTripTotalCost = 0;
    indirectTripTotalCost = 0;

    directTripTotalDuration = new Duration();
    directTripTotalDuration.h = 0;
    directTripTotalDuration.m = 0;

    indirectTripTotalDuration = new Duration();
    indirectTripTotalDuration.h = 0;
    indirectTripTotalDuration.m = 0;
    loopCounter = 0;
    stopWhileLoop = false;
    this.showTripWarning = false;
    deals = this.deals;
    currentDeparture = this.searchData.departure;

    if (this.searchData.departure == this.searchData.arrival) {
      this.showTripWarning = true;
    }
    else {
      
      // Calculating indirect route using Dijkstra algorithm concept
      while (currentDeparture !== this.searchData.arrival && loopCounter < this.deals.length && !stopWhileLoop) {

        /*
          - Filtering deals by departure
          - Calculating an array of costs discounted of this filtered array
          - Calculating the minimun value of this cost discounted array for the next filter
        */

        dealsFiltered = this.filterDealsByDeparture(deals, currentDeparture);
        arrayCostsDiscounted = this.calculateArrayCostDiscounted(dealsFiltered);
        minArrayCostDiscounted = this.getMin(arrayCostsDiscounted);

        /* 
          - Filtering previus filtered array with the minimun cost discounted
        */
        dealsFiltered = this.filterDealsByMinCostDiscounted(dealsFiltered, minArrayCostDiscounted);

        // To avoid looping trips (trips that are running in circles)
        if (!this.results.includes(dealsFiltered[0])) {

          /*
            - Removing way back of current deal filtered selected from deals array
            - Adding current deal selected to results array
            - Changing current departure to next one
            - Calculating total trip's cost and duration
            - Clearing arrays
          */

          deals = this.removeWayBackDeal(deals, dealsFiltered[0]);

          this.results.push(dealsFiltered[0]);
          currentDeparture = dealsFiltered[0].arrival;
          indirectTripTotalCost += (dealsFiltered[0].cost - ((dealsFiltered[0].cost * dealsFiltered[0].discount) / 100));

          indirectTripTotalDuration.h += dealsFiltered[0].duration.h * 1;
          indirectTripTotalDuration.m += dealsFiltered[0].duration.m * 1;

          dealsFiltered = [];
          arrayCostsDiscounted = [];
        }
        else {
          this.results = [];
          indirectTripTotalCost = 0;
          stopWhileLoop = true;
          this.showTripWarning = true;
        }

        loopCounter++;
      }

      this.tripTotalCost = indirectTripTotalCost;
      this.tripTotalDuration = this.getAdjustedDuration(indirectTripTotalDuration);

      //After calculating the indirect route if there is a direct route with less cost, this one is choosen as result
      if (this.isDirectTrip(deals)) {

        directTrip = this.getCheapestDirectTrip(this.deals);
        directTripTotalCost = directTrip.cost - ((directTrip.cost * directTrip.discount) / 100);
        directTripTotalDuration = directTrip.duration;

        if (directTripTotalCost <= indirectTripTotalCost) {
          this.results = [];
          this.results.push(directTrip);
          this.tripTotalCost = directTripTotalCost;
          this.tripTotalDuration = directTripTotalDuration;
        }
      }
    }

  }

  calculatefastestRoute() {

    let directTrip: Deal;
    let directTripTotalCost: number;
    let indirectTripTotalCost: number;
    let directTripTotalDuration: Duration;
    let indirectTripTotalDuration: Duration;

    let deals: Array<Deal>;
    let dealsFiltered: Array<Deal> = new Array<Deal>();

    //let arrayCostsDiscounted: Array<number> = new Array<number>();
    //let minArrayCostDiscounted: number;
    
    let arrayDurations: Array<number> = new Array<number>();
    let minArrayDuration: number;

    let source;
    let filterObservable;
    let currentDeparture;

    let loopCounter: number;
    let stopWhileLoop: boolean;

    // variable Initializations
    directTripTotalCost = 0;
    indirectTripTotalCost = 0;

    directTripTotalDuration = new Duration();
    directTripTotalDuration.h = 0;
    directTripTotalDuration.m = 0;

    indirectTripTotalDuration = new Duration();
    indirectTripTotalDuration.h = 0;
    indirectTripTotalDuration.m = 0;
    loopCounter = 0;
    stopWhileLoop = false;
    this.showTripWarning = false;
    deals = this.deals;
    currentDeparture = this.searchData.departure;

    if (this.searchData.departure == this.searchData.arrival) {
      this.showTripWarning = true;
    }
    else {
      
      // Calculating indirect route using Dijkstra algorithm concept
      while (currentDeparture !== this.searchData.arrival && loopCounter < this.deals.length && !stopWhileLoop) {

        /*
          - Filtering deals by departure
          - Calculating an array of durations of this filtered array
          - Calculating the minimun value of this durations array for the next filter
        */

        dealsFiltered = this.filterDealsByDeparture(deals, currentDeparture);
        arrayDurations = this.calculateArrayDurations(dealsFiltered);
        minArrayDuration = this.getMin(arrayDurations);

        /* 
          - Filtering previus filtered array with the minimun duration
        */
        dealsFiltered = this.filterDealsByMinDuration(dealsFiltered, minArrayDuration);

        // To avoid looping trips (trips that are running in circles)
        if (!this.results.includes(dealsFiltered[0])) {

          /*
            - Removing way back of current deal filtered selected from deals array
            - Adding current deal selected to results array
            - Changing current departure to next one
            - Calculating total trip's cost and duration
            - Clearing arrays
          */

          deals = this.removeWayBackDeal(deals, dealsFiltered[0]);

          this.results.push(dealsFiltered[0]);
          currentDeparture = dealsFiltered[0].arrival;
          indirectTripTotalCost += (dealsFiltered[0].cost - ((dealsFiltered[0].cost * dealsFiltered[0].discount) / 100));

          indirectTripTotalDuration.h += dealsFiltered[0].duration.h * 1;
          indirectTripTotalDuration.m += dealsFiltered[0].duration.m * 1;

          dealsFiltered = [];
          //arrayCostsDiscounted = [];
          arrayDurations = [];
        }
        else {
          this.results = [];
          indirectTripTotalCost = 0;
          stopWhileLoop = true;
          this.showTripWarning = true;
        }

        loopCounter++;
      }

      this.tripTotalCost = indirectTripTotalCost;
      this.tripTotalDuration = this.getAdjustedDuration(indirectTripTotalDuration);

      //After calculating the indirect route if there is a direct route with less cost, this one is choosen as result
      if (this.isDirectTrip(deals)) {

        directTrip = this.getFastestDirectTrip(this.deals);
        directTripTotalCost = directTrip.cost - ((directTrip.cost * directTrip.discount) / 100);
        directTripTotalDuration = directTrip.duration;

        if (directTripTotalDuration <= indirectTripTotalDuration) {
          this.results = [];
          this.results.push(directTrip);
          this.tripTotalCost = directTripTotalCost;
          this.tripTotalDuration = directTripTotalDuration;
        }
      }
    }

  }

  // Function to get a filtered array of deals by departure city
  filterDealsByDeparture(deals: Array<Deal>, departure: string): Array<Deal> {

    let source;
    let filterObservable;
    let dealsFiltered: Array<Deal> = new Array<Deal>();

    source = Observable.from(deals);

    filterObservable = source.filter(deal => deal.departure == departure);

    filterObservable.subscribe(val => {
      dealsFiltered.push(val);
    });

    return dealsFiltered;
  }

  // Function to get a filtered array of deals by departure and arrival city
  filterDealsByDepartureAndArrival(deals: Array<Deal>, departure: string, arrival: string): Array<Deal> {

    let source;
    let filterObservable;
    let dealsFiltered: Array<Deal> = new Array<Deal>();

    source = Observable.from(deals);

    filterObservable = source.filter(deal => deal.departure == departure && deal.arrival == arrival);

    filterObservable.subscribe(val => {
      dealsFiltered.push(val);
    });

    return dealsFiltered;
  }

  // Function to get a filtered array of deals by minimun cost discounted
  filterDealsByMinCostDiscounted(deals: Array<Deal>, minCostDiscounted: number): Array<Deal> {

    let source;
    let filterObservable;
    let dealsFiltered: Array<Deal> = new Array<Deal>();

    source = Observable.from(deals);

    filterObservable = source.filter(deal => deal.cost - ((deal.cost * deal.discount) / 100) == minCostDiscounted);

    filterObservable.subscribe(val => {
      dealsFiltered.push(val);
    });

    return dealsFiltered;
  }

  // Function to get a filtered array of deals by minimum duration
  filterDealsByMinDuration(deals: Array<Deal>, minDuration: number): Array<Deal> {

    let source;
    let filterObservable;
    let dealsFiltered: Array<Deal> = new Array<Deal>();

    source = Observable.from(deals);

    filterObservable = source.filter(deal => (deal.duration.h * 60) + (deal.duration.m * 1) == minDuration); 

    filterObservable.subscribe(val => {
      dealsFiltered.push(val);
    });

    return dealsFiltered;
  }

  // Function to get an array of deals' prices discounted
  calculateArrayCostDiscounted(deals: Array<Deal>): Array<number> {

    let arrayCostsDiscounted: Array<number> = new Array<number>();

    for (let deal of deals) {
      arrayCostsDiscounted.push(deal.cost - ((deal.cost * deal.discount) / 100));
    }

    return arrayCostsDiscounted;
  }

  // Function to get an array of deals' durations in minutes
  calculateArrayDurations(deals: Array<Deal>): Array<number> {

    let arrayDurations: Array<number> = new Array<number>();

    for (let deal of deals) {
      arrayDurations.push((deal.duration.h * 60) + (deal.duration.m * 1));
    }

    return arrayDurations;
  }

  // Function to get min value of array of numbers
  getMin(array: Array<number>): number {
    return Math.min.apply(null, array);;
  }

  // Funcion to get proper adjusted duration
  getAdjustedDuration(duration : Duration): Duration{
    
    let hoursToAdd : number = 0;
    let restMin : number = 0;

    if(duration.m >= 60){
      hoursToAdd = Math.trunc(duration.m / 60);
      restMin = duration.m % 60;
      duration.h += hoursToAdd;
      duration.m = restMin; 
    }
    return duration;
  }

  // Function to remove a deal with all kind of transport from an array of deals
  removeWayBackDeal(deals: Array<Deal>, dealToRemove: Deal): Array<Deal> {
    for (let deal of deals) {
      if (deal.arrival == dealToRemove.departure && deal.departure == dealToRemove.arrival) {
        deals.splice(deals.indexOf(deal), 3);
      }
    }
    return deals;
  }

  // Function to get if there is a direct trip available on an array of deals based on search data
  isDirectTrip(deals: Array<Deal>): boolean {
    for (let deal of deals) {
      if (deal.arrival == this.searchData.arrival && deal.departure == this.searchData.departure) {
        return true;
      }
    }
    return false;
  }

  // Function to get cheapest direct trip
  getCheapestDirectTrip(deals: Array<Deal>): Deal {

    let dealsFiltered: Array<Deal>;
    let minArrayCostDiscounted: number;

    dealsFiltered = this.filterDealsByDepartureAndArrival(deals, this.searchData.departure, this.searchData.arrival);

    minArrayCostDiscounted = this.getMin(this.calculateArrayCostDiscounted(dealsFiltered));

    dealsFiltered = this.filterDealsByMinCostDiscounted(dealsFiltered, minArrayCostDiscounted);

    return dealsFiltered[0];
  }

  // Function to get cheapest direct trip
  getFastestDirectTrip(deals: Array<Deal>): Deal {

    let dealsFiltered: Array<Deal>;
    let minArrayDurations: number;

    dealsFiltered = this.filterDealsByDepartureAndArrival(deals, this.searchData.departure, this.searchData.arrival);

    minArrayDurations = this.getMin(this.calculateArrayDurations(dealsFiltered));

    dealsFiltered = this.filterDealsByMinDuration(dealsFiltered, minArrayDurations);

    return dealsFiltered[0];
  }

}
