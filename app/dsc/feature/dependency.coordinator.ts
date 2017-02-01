import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DependencyCoordinator
{
  constructor() { }
  public itemAdded: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public itemRemoved: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  public add(value: string)
  {
    this.itemAdded.next(value);
  }
  public remove(value: string)
  {
    this.itemRemoved.next(value);
  }
}