import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { MockApiService } from '../../services/mock-api/mock-api.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchDataService } from '../../services/search-data/search-data.service';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [ MockApiService , SearchDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
