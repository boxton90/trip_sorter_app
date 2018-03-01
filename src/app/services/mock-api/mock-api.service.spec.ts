import { TestBed, inject } from '@angular/core/testing';

import { MockApiService } from './mock-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('MockApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockApiService],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([MockApiService], (service: MockApiService) => {
    expect(service).toBeTruthy();
  }));
});
