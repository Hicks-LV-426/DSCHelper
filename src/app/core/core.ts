import { Injectable, OnInit } from '@angular/core';

import { TestComponent } from '../components/test';
import { Navigon } from './navigon';

@Injectable()
export class HelperCore implements OnInit
{
  public items: Navigon[] = [];

  constructor()
  {
    this.items.push(new Navigon('SQL Server', '/sql'));
    this.items.push(new Navigon('Test', '/test'));
    this.items.push(new Navigon('Core', '/core'));
  }
  ngOnInit()
  {
  }

  public addItem(value: string): void
  {
    //var i = this.items.findIndex(v => v === value);
    //if (i < 0)
    //{
    //  this.items.push(value);
    //}
  }
}