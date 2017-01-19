import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subject } from 'rxjs/Subject';

import { NavigationService} from './navigation/navigation.service';
import { NavigationArgument } from './navigation/navigation-argument';


@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})
export class AppComponent implements OnInit, OnDestroy
{ 
  constructor(private navigationService : NavigationService) {}
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
    this.componentToShow = "welcome";
    this.navigationService.onNavigate.subscribe(value => this.onNavigate(value));
  }
  ngOnDestroy()
  {
    this.navigationService.onNavigate.unsubscribe();
  }
  onNavigate(component : NavigationArgument)
  {

    this.componentToShow = component.target;
  }
}
