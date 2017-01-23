import { Component, OnInit } from '@angular/core';

import { Collection } from './collection';
import { Parameter} from '../parameter/parameter';

@Component({
  selector: 'dsc-collection',
  templateUrl: 'app/dsc/collection/collection.component.html',
  styleUrls: ['app/dsc/collection/collection.component.css']
})
export class CollectionComponent implements OnInit 
{
  constructor() { }

  collection : Collection = new Collection();
  menuItems : string[] = ["Add...", "DSC {}"];
  subItems : string[] = ["Parameter", "Credential", "Windows Feature", "Firewall Rule", "Install SQL Server", "Copy File or Folder", "Create Folder", "Delete Folder", "Batch Create Folders"];

  selectedAction : string;
  subItemsVisible : boolean = false;

  itemClicked(action : string)
  {
    if(action.startsWith("Add"))
    {
      this.subItemsVisible = !this.subItemsVisible;
      return;
    }
    else if(action.startsWith("DSC"))
    {
      this.selectedAction = "dsc";
    }

    this.subItemsVisible = false;

  }
  subItemClicked(action : string)
  {
    switch (action) 
    {
      case "Parameter":
        this.selectedAction = "new-parameter";
        break;
      default:
        this.selectedAction = "dsc";
        break;
    }
    this.subItemsVisible = false;
  }

  getContentName() : string
  {
      if(this.selectedAction == undefined || this.selectedAction.length == 0)
      {
        return "dsc";
      }
      return this.selectedAction;
  }
  
  ngOnInit()
  {
    for(let item of this.collection.items)
    {
      this.menuItems.push(item);
    }
  }

  onParameterCancel(event : any)
  {
    this.selectedAction = "dsc";
  }
  onParameterSave(value : Parameter)
  {
    this.collection.parameters.push(value);
    this.selectedAction = "dsc";
  }

}