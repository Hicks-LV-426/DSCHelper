import { Component, OnInit } from '@angular/core';

import { Collection } from './collection';

@Component({
  selector: 'dsc-collection',
  templateUrl: 'app/dsc/collection/collection.component.html',
  styleUrls: ['app/dsc/collection/collection.component.css']
})
export class CollectionComponent implements OnInit 
{
  constructor() { }

  collection : Collection = new Collection();
  menuItems : string[] = ["DSC", "Add..."];
  subItems : string[] = ["Parameter", "Credential", "Windows Feature", "Firewall Rule", "Install SQL Server", "Copy File or Folder", "Create Folder", "Delete Folder", "Batch Create Folders"];

  subItemsVisible : boolean = false;

  itemClicked(action : string)
  {
    if(action.startsWith("Add"))
    {
      this.subItemsVisible = !this.subItemsVisible;
      return;
    }

    this.subItemsVisible = false;

  }
  
  ngOnInit()
  {
    for(let item of this.collection.items)
    {
      this.menuItems.push(item);
    }
  }

}