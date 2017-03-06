import { Component, OnInit } from '@angular/core';

import { FeatureEventArgs } from '../common/feature-event-args';
import { Optionset } from '../common/optionset';
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
    
  }

  getItemNames(): string[]
  {
    return this.dscItems.concat(this.collection.getItemNames());
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
    var item = this.menuItems.find(v => v === action);
    if (item === undefined) this.selectedAction = "";
    else this.selectedAction = action.toLowerCase();

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

  // generic cancel

  // parameter events
  onCancel(event : any)
  {
    this.selectedAction = '';
  }
  onParameterSave(parameter : Parameter) : void
  {
    this.collection.addParameter(parameter);
    this.selectedAction = '';
  }
  
  // credential events
  onCredentialSave(credential : Credential) : void
  {
    this.collection.addCredential(credential);
    this.selectedAction = '';
  }

  // windows feature
  onFeatureSave(e: FeatureEventArgs) : void
  {
    this.collection.addWindowsFeature(e);
    this.selectedAction = '';
  }

  // windows firewall
  onFirewallSave(e: Optionset): void
  {
    this.collection.addFirewallRule(e);
    this.selectedAction = '';
  }
}