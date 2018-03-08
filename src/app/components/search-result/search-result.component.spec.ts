import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultComponent } from './search-result.component';
import { WarningComponent} from '../warning/warning.component';
import { AppModule } from '../../app.module';
import { MockApiService } from '../../services/mock-api/mock-api.service';
import { SearchDataService } from '../../services/search-data/search-data.service';
import { HttpClientModule } from '@angular/common/http';
import { Deal } from '../../model/deal';
import { Duration } from '../../model/duration';

describe('SearchResultComponent', () => {
  
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultComponent, WarningComponent],
      imports: [
        HttpClientModule
      ],
      providers: [ MockApiService, SearchDataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('function filterDealsByDeparture', async(() => {
    let deals = new Array<Deal>();
    let dealsFiltered = new Array<Deal>();
    let mockApiService = fixture.debugElement.injector.get(MockApiService);
    let spymockApiService = spyOn(mockApiService, 'getDeals').and.returnValue([
    {"transport":"train","departure":"London","arrival":"Amsterdam","duration":{"h":"05","m":"00"},"cost":160,"discount":0,"reference":"TLA0500"},
    {"transport":"bus","departure":"London","arrival":"Amsterdam","duration":{"h":"07","m":"45"},"cost":40,"discount":25,"reference":"BLA0745"},
    {"transport":"car","departure":"London","arrival":"Amsterdam","duration":{"h":"04","m":"45"},"cost":120,"discount":0,"reference":"CLA0445"},
    {"transport":"train","departure":"London","arrival":"Paris","duration":{"h":"04","m":"30"},"cost":160,"discount":0,"reference":"TLP0430"},
    {"transport":"bus","departure":"London","arrival":"Paris","duration":{"h":"05","m":"30"},"cost":40,"discount":50,"reference":"BLP0530"},
    {"transport":"car","departure":"London","arrival":"Paris","duration":{"h":"04","m":"15"},"cost":120,"discount":0,"reference":"CLP0415"},
    {"transport":"train","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"05","m":"15"},"cost":160,"discount":25,"reference":"TAW0515"},
    {"transport":"bus","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"05","m":"15"},"cost":40,"discount":25,"reference":"BAW0515"},
    {"transport":"car","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"04","m":"45"},"cost":120,"discount":0,"reference":"CAW0445"},
    {"transport":"train","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"05","m":"30"},"cost":160,"discount":0,"reference":"TAB0530"},
    {"transport":"bus","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"05","m":"45"},"cost":40,"discount":0,"reference":"BAB0545"},
    {"transport":"car","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"04","m":"30"},"cost":120,"discount":0,"reference":"CAB0430"},
    {"transport":"train","departure":"Amsterdam","arrival":"London","duration":{"h":"04","m":"15"},"cost":160,"discount":25,"reference":"TAL0415"},
    {"transport":"bus","departure":"Amsterdam","arrival":"London","duration":{"h":"05","m":"45"},"cost":40,"discount":50,"reference":"BAL0545"},
    {"transport":"car","departure":"Amsterdam","arrival":"London","duration":{"h":"04","m":"00"},"cost":120,"discount":0,"reference":"CAL0400"}]);
    
    fixture.whenStable().then(() => {
      deals = mockApiService.getDeals();
      dealsFiltered = component.filterDealsByDeparture(deals,'Amsterdam');
      expect(dealsFiltered).toEqual(Object([
      {"transport":"train","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"05","m":"15"},"cost":160,"discount":25,"reference":"TAW0515"},
      {"transport":"bus","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"05","m":"15"},"cost":40,"discount":25,"reference":"BAW0515"},
      {"transport":"car","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"04","m":"45"},"cost":120,"discount":0,"reference":"CAW0445"},
      {"transport":"train","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"05","m":"30"},"cost":160,"discount":0,"reference":"TAB0530"},
      {"transport":"bus","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"05","m":"45"},"cost":40,"discount":0,"reference":"BAB0545"},
      {"transport":"car","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"04","m":"30"},"cost":120,"discount":0,"reference":"CAB0430"},
      {"transport":"train","departure":"Amsterdam","arrival":"London","duration":{"h":"04","m":"15"},"cost":160,"discount":25,"reference":"TAL0415"},
      {"transport":"bus","departure":"Amsterdam","arrival":"London","duration":{"h":"05","m":"45"},"cost":40,"discount":50,"reference":"BAL0545"},
      {"transport":"car","departure":"Amsterdam","arrival":"London","duration":{"h":"04","m":"00"},"cost":120,"discount":0,"reference":"CAL0400"}]));
    });
  }));

  it('function filterDealsByDepartureAndArrival', async(() => {
    let deals = new Array<Deal>();
    let dealsFiltered = new Array<Deal>();
    let mockApiService = fixture.debugElement.injector.get(MockApiService);
    let spymockApiService = spyOn(mockApiService, 'getDeals').and.returnValue([
    {"transport":"train","departure":"London","arrival":"Amsterdam","duration":{"h":"05","m":"00"},"cost":160,"discount":0,"reference":"TLA0500"},
    {"transport":"bus","departure":"London","arrival":"Amsterdam","duration":{"h":"07","m":"45"},"cost":40,"discount":25,"reference":"BLA0745"},
    {"transport":"car","departure":"London","arrival":"Amsterdam","duration":{"h":"04","m":"45"},"cost":120,"discount":0,"reference":"CLA0445"},
    {"transport":"train","departure":"London","arrival":"Paris","duration":{"h":"04","m":"30"},"cost":160,"discount":0,"reference":"TLP0430"},
    {"transport":"bus","departure":"London","arrival":"Paris","duration":{"h":"05","m":"30"},"cost":40,"discount":50,"reference":"BLP0530"},
    {"transport":"car","departure":"London","arrival":"Paris","duration":{"h":"04","m":"15"},"cost":120,"discount":0,"reference":"CLP0415"},
    {"transport":"train","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"05","m":"15"},"cost":160,"discount":25,"reference":"TAW0515"},
    {"transport":"bus","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"05","m":"15"},"cost":40,"discount":25,"reference":"BAW0515"},
    {"transport":"car","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"04","m":"45"},"cost":120,"discount":0,"reference":"CAW0445"},
    {"transport":"train","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"05","m":"30"},"cost":160,"discount":0,"reference":"TAB0530"},
    {"transport":"bus","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"05","m":"45"},"cost":40,"discount":0,"reference":"BAB0545"},
    {"transport":"car","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"04","m":"30"},"cost":120,"discount":0,"reference":"CAB0430"},
    {"transport":"train","departure":"Amsterdam","arrival":"London","duration":{"h":"04","m":"15"},"cost":160,"discount":25,"reference":"TAL0415"},
    {"transport":"bus","departure":"Amsterdam","arrival":"London","duration":{"h":"05","m":"45"},"cost":40,"discount":50,"reference":"BAL0545"},
    {"transport":"car","departure":"Amsterdam","arrival":"London","duration":{"h":"04","m":"00"},"cost":120,"discount":0,"reference":"CAL0400"}]);
    
    fixture.whenStable().then(() => {
      deals = mockApiService.getDeals();
      dealsFiltered = component.filterDealsByDepartureAndArrival(deals,'London','Paris');
      expect(dealsFiltered).toEqual(Object([
      {"transport":"train","departure":"London","arrival":"Paris","duration":{"h":"04","m":"30"},"cost":160,"discount":0,"reference":"TLP0430"},
      {"transport":"bus","departure":"London","arrival":"Paris","duration":{"h":"05","m":"30"},"cost":40,"discount":50,"reference":"BLP0530"},
      {"transport":"car","departure":"London","arrival":"Paris","duration":{"h":"04","m":"15"},"cost":120,"discount":0,"reference":"CLP0415"}]));
    });
  }));

  it('function filterDealsByMinCostDiscounted', async(() => {
    let deals = new Array<Deal>();
    let dealsFiltered = new Array<Deal>();
    let mockApiService = fixture.debugElement.injector.get(MockApiService);
    let spymockApiService = spyOn(mockApiService, 'getDeals').and.returnValue([
    {"transport":"train","departure":"London","arrival":"Amsterdam","duration":{"h":"05","m":"00"},"cost":160,"discount":0,"reference":"TLA0500"},
    {"transport":"bus","departure":"London","arrival":"Amsterdam","duration":{"h":"07","m":"45"},"cost":40,"discount":25,"reference":"BLA0745"},
    {"transport":"car","departure":"London","arrival":"Amsterdam","duration":{"h":"04","m":"45"},"cost":120,"discount":0,"reference":"CLA0445"},
    {"transport":"train","departure":"London","arrival":"Paris","duration":{"h":"04","m":"30"},"cost":160,"discount":0,"reference":"TLP0430"},
    {"transport":"bus","departure":"London","arrival":"Paris","duration":{"h":"05","m":"30"},"cost":40,"discount":50,"reference":"BLP0530"},
    {"transport":"car","departure":"London","arrival":"Paris","duration":{"h":"04","m":"15"},"cost":120,"discount":0,"reference":"CLP0415"},
    {"transport":"train","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"05","m":"15"},"cost":160,"discount":25,"reference":"TAW0515"},
    {"transport":"bus","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"05","m":"15"},"cost":40,"discount":25,"reference":"BAW0515"},
    {"transport":"car","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"04","m":"45"},"cost":120,"discount":0,"reference":"CAW0445"},
    {"transport":"train","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"05","m":"30"},"cost":160,"discount":0,"reference":"TAB0530"},
    {"transport":"bus","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"05","m":"45"},"cost":40,"discount":0,"reference":"BAB0545"},
    {"transport":"car","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"04","m":"30"},"cost":120,"discount":0,"reference":"CAB0430"},
    {"transport":"train","departure":"Amsterdam","arrival":"London","duration":{"h":"04","m":"15"},"cost":160,"discount":25,"reference":"TAL0415"},
    {"transport":"bus","departure":"Amsterdam","arrival":"London","duration":{"h":"05","m":"45"},"cost":40,"discount":50,"reference":"BAL0545"},
    {"transport":"car","departure":"Amsterdam","arrival":"London","duration":{"h":"04","m":"00"},"cost":120,"discount":0,"reference":"CAL0400"}]);
    
    fixture.whenStable().then(() => {
      deals = mockApiService.getDeals();
      dealsFiltered = component.filterDealsByMinCostDiscounted(deals,30);
      expect(dealsFiltered).toEqual(Object([{"transport":"bus","departure":"London","arrival":"Amsterdam","duration":{"h":"07","m":"45"},"cost":40,"discount":25,"reference":"BLA0745"},
      {"transport":"bus","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"05","m":"15"},"cost":40,"discount":25,"reference":"BAW0515"}]));
    });
  }));

  it('function filterDealsByMinDuration', async(() => {
    let deals = new Array<Deal>();
    let dealsFiltered = new Array<Deal>();
    let mockApiService = fixture.debugElement.injector.get(MockApiService);
    let spymockApiService = spyOn(mockApiService, 'getDeals').and.returnValue([
    {"transport":"train","departure":"London","arrival":"Amsterdam","duration":{"h":"05","m":"00"},"cost":160,"discount":0,"reference":"TLA0500"},
    {"transport":"bus","departure":"London","arrival":"Amsterdam","duration":{"h":"07","m":"45"},"cost":40,"discount":25,"reference":"BLA0745"},
    {"transport":"car","departure":"London","arrival":"Amsterdam","duration":{"h":"04","m":"45"},"cost":120,"discount":0,"reference":"CLA0445"},
    {"transport":"train","departure":"London","arrival":"Paris","duration":{"h":"04","m":"30"},"cost":160,"discount":0,"reference":"TLP0430"},
    {"transport":"bus","departure":"London","arrival":"Paris","duration":{"h":"05","m":"30"},"cost":40,"discount":50,"reference":"BLP0530"},
    {"transport":"car","departure":"London","arrival":"Paris","duration":{"h":"04","m":"15"},"cost":120,"discount":0,"reference":"CLP0415"},
    {"transport":"train","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"05","m":"15"},"cost":160,"discount":25,"reference":"TAW0515"},
    {"transport":"bus","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"05","m":"15"},"cost":40,"discount":25,"reference":"BAW0515"},
    {"transport":"car","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"04","m":"45"},"cost":120,"discount":0,"reference":"CAW0445"},
    {"transport":"train","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"05","m":"30"},"cost":160,"discount":0,"reference":"TAB0530"},
    {"transport":"bus","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"05","m":"45"},"cost":40,"discount":0,"reference":"BAB0545"},
    {"transport":"car","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"04","m":"30"},"cost":120,"discount":0,"reference":"CAB0430"},
    {"transport":"train","departure":"Amsterdam","arrival":"London","duration":{"h":"04","m":"15"},"cost":160,"discount":25,"reference":"TAL0415"},
    {"transport":"bus","departure":"Amsterdam","arrival":"London","duration":{"h":"05","m":"45"},"cost":40,"discount":50,"reference":"BAL0545"},
    {"transport":"car","departure":"Amsterdam","arrival":"London","duration":{"h":"04","m":"00"},"cost":120,"discount":0,"reference":"CAL0400"}]);
    
    fixture.whenStable().then(() => {
      deals = mockApiService.getDeals();
      dealsFiltered = component.filterDealsByMinDuration(deals,465);
      expect(dealsFiltered).toEqual(Object([{"transport":"bus","departure":"London","arrival":"Amsterdam","duration":{"h":"07","m":"45"},"cost":40,"discount":25,"reference":"BLA0745"}]));
    });
  }));

  it('function calculateArrayCostDiscounted', async(() => {

    let deals = new Array<Deal>();
    let arrayCostDiscounted = new Array<number>();
    let mockApiService = fixture.debugElement.injector.get(MockApiService);
    let spymockApiService = spyOn(mockApiService, 'getDeals').and.returnValue([
    {"transport":"train","departure":"London","arrival":"Amsterdam","duration":{"h":"05","m":"00"},"cost":160,"discount":0,"reference":"TLA0500"},
    {"transport":"bus","departure":"London","arrival":"Amsterdam","duration":{"h":"07","m":"45"},"cost":40,"discount":25,"reference":"BLA0745"},
    {"transport":"car","departure":"London","arrival":"Amsterdam","duration":{"h":"04","m":"45"},"cost":120,"discount":0,"reference":"CLA0445"},
    {"transport":"train","departure":"London","arrival":"Paris","duration":{"h":"04","m":"30"},"cost":160,"discount":0,"reference":"TLP0430"}]);

    fixture.whenStable().then(() => {
      deals = mockApiService.getDeals();
      arrayCostDiscounted = component.calculateArrayCostDiscounted(deals);
      expect(arrayCostDiscounted).toEqual([160,30,120,160]);
    });
  }));
  it('function calculateArrayDurations', async(() => {

    let deals = new Array<Deal>();
    let arrayDurations = new Array<number>();
    let mockApiService = fixture.debugElement.injector.get(MockApiService);
    let spymockApiService = spyOn(mockApiService, 'getDeals').and.returnValue([
    {"transport":"train","departure":"London","arrival":"Amsterdam","duration":{"h":"05","m":"00"},"cost":160,"discount":0,"reference":"TLA0500"},
    {"transport":"bus","departure":"London","arrival":"Amsterdam","duration":{"h":"07","m":"45"},"cost":40,"discount":25,"reference":"BLA0745"},
    {"transport":"car","departure":"London","arrival":"Amsterdam","duration":{"h":"04","m":"45"},"cost":120,"discount":0,"reference":"CLA0445"},
    {"transport":"train","departure":"London","arrival":"Paris","duration":{"h":"04","m":"30"},"cost":160,"discount":0,"reference":"TLP0430"}]);

    fixture.whenStable().then(() => {
      deals = mockApiService.getDeals();
      arrayDurations = component.calculateArrayDurations(deals);
      expect(arrayDurations).toEqual([300,465,285,270]);
    });
  }));

  it('function getMin', () => {
    let array = new Array<number>();
    let min: number;
    array = [20,50,10,5];
    min = component.getMin(array);
    expect(min).toEqual(5); 
  });

  it('function getAdjustedDuration', () => {
    let duration: Duration = new Duration();
    let durationAdjusted: Duration = new Duration();
    duration.h = 23;
    duration.m = 75;
    durationAdjusted = component.getAdjustedDuration(duration);
    expect(durationAdjusted.h).toEqual(24);
    expect(durationAdjusted.m).toEqual(15); 
  });

  it('function removeWayBackDeal', async(() => {

    let deals = new Array<Deal>();
    let dealToRemove: Deal;
    let newDeals = new Array<Deal>();
    let mockApiService = fixture.debugElement.injector.get(MockApiService);
    let spymockApiService = spyOn(mockApiService, 'getDeals').and.returnValue([
    {"transport":"train","departure":"London","arrival":"Amsterdam","duration":{"h":"05","m":"00"},"cost":160,"discount":0,"reference":"TLA0500"},
    {"transport":"bus","departure":"London","arrival":"Amsterdam","duration":{"h":"07","m":"45"},"cost":40,"discount":25,"reference":"BLA0745"},
    {"transport":"car","departure":"London","arrival":"Amsterdam","duration":{"h":"04","m":"45"},"cost":120,"discount":0,"reference":"CLA0445"},
    {"transport":"train","departure":"London","arrival":"Paris","duration":{"h":"04","m":"30"},"cost":160,"discount":0,"reference":"TLP0430"},
    {"transport":"bus","departure":"London","arrival":"Paris","duration":{"h":"05","m":"30"},"cost":40,"discount":50,"reference":"BLP0530"},
    {"transport":"car","departure":"London","arrival":"Paris","duration":{"h":"04","m":"15"},"cost":120,"discount":0,"reference":"CLP0415"},
    {"transport":"train","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"05","m":"15"},"cost":160,"discount":25,"reference":"TAW0515"},
    {"transport":"bus","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"05","m":"15"},"cost":40,"discount":25,"reference":"BAW0515"},
    {"transport":"car","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"04","m":"45"},"cost":120,"discount":0,"reference":"CAW0445"},
    {"transport":"train","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"05","m":"30"},"cost":160,"discount":0,"reference":"TAB0530"},
    {"transport":"bus","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"05","m":"45"},"cost":40,"discount":0,"reference":"BAB0545"},
    {"transport":"car","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"04","m":"30"},"cost":120,"discount":0,"reference":"CAB0430"},
    {"transport":"train","departure":"Amsterdam","arrival":"London","duration":{"h":"04","m":"15"},"cost":160,"discount":25,"reference":"TAL0415"},
    {"transport":"bus","departure":"Amsterdam","arrival":"London","duration":{"h":"05","m":"45"},"cost":40,"discount":50,"reference":"BAL0545"},
    {"transport":"car","departure":"Amsterdam","arrival":"London","duration":{"h":"04","m":"00"},"cost":120,"discount":0,"reference":"CAL0400"}]);

    fixture.whenStable().then(() => {
      deals = mockApiService.getDeals();
      dealToRemove = deals[0];
      newDeals = component.removeWayBackDeal(deals,dealToRemove);
      expect(newDeals).toEqual(Object([
      {"transport":"train","departure":"London","arrival":"Amsterdam","duration":{"h":"05","m":"00"},"cost":160,"discount":0,"reference":"TLA0500"},
      {"transport":"bus","departure":"London","arrival":"Amsterdam","duration":{"h":"07","m":"45"},"cost":40,"discount":25,"reference":"BLA0745"},
      {"transport":"car","departure":"London","arrival":"Amsterdam","duration":{"h":"04","m":"45"},"cost":120,"discount":0,"reference":"CLA0445"},
      {"transport":"train","departure":"London","arrival":"Paris","duration":{"h":"04","m":"30"},"cost":160,"discount":0,"reference":"TLP0430"},
      {"transport":"bus","departure":"London","arrival":"Paris","duration":{"h":"05","m":"30"},"cost":40,"discount":50,"reference":"BLP0530"},
      {"transport":"car","departure":"London","arrival":"Paris","duration":{"h":"04","m":"15"},"cost":120,"discount":0,"reference":"CLP0415"},
      {"transport":"train","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"05","m":"15"},"cost":160,"discount":25,"reference":"TAW0515"},
      {"transport":"bus","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"05","m":"15"},"cost":40,"discount":25,"reference":"BAW0515"},
      {"transport":"car","departure":"Amsterdam","arrival":"Warsaw","duration":{"h":"04","m":"45"},"cost":120,"discount":0,"reference":"CAW0445"},
      {"transport":"train","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"05","m":"30"},"cost":160,"discount":0,"reference":"TAB0530"},
      {"transport":"bus","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"05","m":"45"},"cost":40,"discount":0,"reference":"BAB0545"},
      {"transport":"car","departure":"Amsterdam","arrival":"Brussels","duration":{"h":"04","m":"30"},"cost":120,"discount":0,"reference":"CAB0430"}
      ]));
    });
  }));

});
