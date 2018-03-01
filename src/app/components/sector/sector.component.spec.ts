import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorComponent } from './sector.component';
import { HttpClientModule } from '@angular/common/http';
import { MockApiService } from '../../services/mock-api/mock-api.service';
import { SearchDataService } from '../../services/search-data/search-data.service';
import { FormsModule } from '@angular/forms';

describe('SectorComponent', () => {
  let component: SectorComponent;
  let fixture: ComponentFixture<SectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorComponent ],
      imports: [
        HttpClientModule,
        FormsModule
      ],
      providers: [ MockApiService , SearchDataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
