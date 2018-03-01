import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultComponent } from './search-result.component';
import { WarningComponent} from '../warning/warning.component';
import { AppModule } from '../../app.module';
import { MockApiService } from '../../services/mock-api/mock-api.service';
import { SearchDataService } from '../../services/search-data/search-data.service';
import { HttpClientModule } from '@angular/common/http';

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
    // fixture.detectChanges();
  });

  it('function getMin', () => {
    let array = new Array<number>();
    let min: number;
    array = [20,50,10,5];
    min = component.getMin(array);
    expect(min).toEqual(5); 
  });
});
