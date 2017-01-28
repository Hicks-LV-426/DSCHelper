import { Component, OnInit } from '@angular/core';

import { Collection } from './collection';
import { Parameter } from '../common/parameter';
import { Credential } from '../common/credential';
import { Popup } from '../../popup/popup';

@Component({
  selector: 'dsc-collection',
  templateUrl: 'app/dsc/collection/collection.component.html',
  styleUrls: ['app/dsc/collection/collection.component.css']
})
export class CollectionComponent implements OnInit 
{
  collection: Collection = new Collection();
  popup: Popup = new Popup();
  dscItems : string[] = ["DSC {}"];
  menuItems : string[] = ["Parameter", "Credential", "Windows Feature", "Firewall Rule", "Install SQL Server", "Copy File or Folder", "Create Folder", "Delete Folder", "Batch Create Folders"];
  selectedAction: string;

  constructor() { }

  ngOnInit()
  {
    for(let item of this.collection.getItemNames())
    {
      this.dscItems.push(item);
    }
  }

  // handle item clicks
  itemClicked(action : string)
  {
    if(action.startsWith("DSC"))
    {
      this.selectedAction = "dsc";
    }
    else
    {
      this.selectedAction = "";
    }
  }
  popupItemClicked(action : string)
  {
    switch (action) 
    {
      case "Parameter":
        this.selectedAction = action.toLowerCase();
        break;
      case "Credential":
        this.selectedAction = action.toLowerCase();
        break;
      default:
        this.selectedAction = "";
        break;
    }
    this.popup.hide();
  }

  getContentName() : string
  {
      if(this.selectedAction == undefined || this.selectedAction.length == 0)
      {
        return "";
      }
      return this.selectedAction;
  }

  // parameter events
  onParameterCancel(event : any)
  {
    this.selectedAction = "";
  }
  onParameterSave(parameter : Parameter)
  {
    this.collection.addParameter(parameter);
    this.selectedAction = "";
  }
  
  // credential events
  onCredentialCancel(event : string)
  {
    this.selectedAction = "";
  }
  onCredentialSave(credential : Credential)
  {
    this.collection.addCredential(credential);
    this.selectedAction = "";
  }
}