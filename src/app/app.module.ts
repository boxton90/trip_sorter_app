import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { MockApiService } from './services/mock-api/mock-api.service';
import { HttpClientModule } from '@angular/common/http';
import { SectorComponent } from './components/sector/sector.component';
import { FiltersComponent } from './components/filters/filters.component';
import { SearchComponent } from './components/search/search.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { FormsModule } from '@angular/forms';
import { SearchDataService } from './services/search-data/search-data.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WarningComponent } from './components/warning/warning.component';


@NgModule({
  declarations: [
    AppComponent,
    SectorComponent,
    FiltersComponent,
    SearchComponent,
    SearchResultComponent,
    HeaderComponent,
    FooterComponent,
    WarningComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MockApiService,
    SearchDataService,
    { provide: APP_INITIALIZER, useFactory: MockApiProviderFactory, deps: [MockApiService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {

}

// Function to load and provided the server data to the app when the app it is getting initialized 
export function MockApiProviderFactory(provider: MockApiService) {
  return () => provider.loadData();
}