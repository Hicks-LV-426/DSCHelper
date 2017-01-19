import { Injectable } from '@angular/core';
import { MenuItem } from './menu-item';

@Injectable()
export class MenuService 
{
  constructor() {}

  getItems() : MenuItem[] 
  {
    return this.items;
  }
  getItemsByRoot(root : string)  : MenuItem[]
  {
    var d = this.items.find(v => v.name == root);

    if(d === undefined || d === null) return [];
    else return d.items;
  }

  items : MenuItem[] = 
  [
    new MenuItem('root', [], [
      new MenuItem('Menu', [], null)
    ]),
    /**********/
    new MenuItem('Menu', [], [
      new MenuItem('New', [], null),
      new MenuItem('Open', [], null),
      new MenuItem('Help', [], null),
      new MenuItem('About', [], null),
      new MenuItem('Donate', [], null)
      ])
    /**********/
  ]
  
}