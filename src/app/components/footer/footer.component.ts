import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentYear: string;

  constructor() { }

  ngOnInit() {
    this.currentYear = this.getCurrentYear(new Date());
  }

  getCurrentYear(currentDate: Date) : string {
    return currentDate.getFullYear().toString();
  }

}
