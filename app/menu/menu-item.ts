import { Argument } from '../argument';

export class MenuItem {
  constructor(name : string, args : Argument[], items : MenuItem[])
  {
    this.name = name;
    this.items = items;
    this.arguments = args;
  }
  name : string;
  items : MenuItem[] = [];
  arguments : Argument[];
}