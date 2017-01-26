import { Component, OnInit } from '@angular/core';
import {Subject } from 'rxjs/Subject';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})
export class AppComponent implements OnInit
{ 
  constructor() {}
  componentToShow : string = "welcome";
  someValue : string;

  getRegionn() : string
  {
    var region : string;
    switch (this.componentToShow.toLowerCase()) {
      case "open":
      case "new":
        region = "DSCC"
        break;
      case "help":
        region = "HELP";
        break;
      case "about":
        region = "ABOUT";
        break;
      case "donate":
        region = "DONATE";
        break;
      case "welcome":
        region = "WELCOME";
        break;
      default:
        region = "404";
        break;
    }
    return region;
  }
  ngOnInit()
  {
  }

  onHeaderSelect(value : string)
  {
    this.componentToShow = value.toLowerCase();
  }
}
