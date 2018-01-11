import { BrowserModule } from '@angular/platform-browser';
import { NgModule , APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { MockApiService } from './services/mock-api.service';
import { HttpClientModule } from '@angular/common/http';
import { SectorComponent } from './components/sector/sector.component';
import { FiltersComponent } from './components/filters/filters.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    SectorComponent,
    FiltersComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [MockApiService,
    { provide: APP_INITIALIZER, useFactory: MockApiProviderFactory, deps: [MockApiService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}

// Function to load and provided the server data to the app when the app it is getting initialized 
export function MockApiProviderFactory(provider: MockApiService) {
  return () => provider.loadData();
}