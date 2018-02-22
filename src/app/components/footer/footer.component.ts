import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentDate: Date;
  currentYear: string;

  constructor() { }

  ngOnInit() {
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear().toString();
  }

}
