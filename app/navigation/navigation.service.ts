import { Injectable, EventEmitter } from '@angular/core';
import {Subject } from 'rxjs/Subject';
import { Argument } from '../argument';
import { NavigationArgument } from './navigation-argument';

@Injectable()
export class NavigationService 
{
  constructor() { }

  onNavigate : Subject<NavigationArgument> = new Subject<NavigationArgument>();

  navigate(componentName : string)
  {
    var arg = new NavigationArgument();
    arg.target = componentName;
    arg.args = [];
    this.onNavigate.next(arg);
  }
}