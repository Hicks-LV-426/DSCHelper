import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Credential } from '../common/credential';

@Component({
  selector: 'dsc-credential',
  templateUrl: 'app/dsc/credential/credential.component.html',
  styleUrls: ['app/dsc/credential/credential.component.css']
})
export class CredentialComponent implements OnInit {

  constructor() { }

  credentialName : string;
  accountName : string;
  errorMessage : string = "";
  @Input() credential : Credential;

  @Output() save : EventEmitter<Credential> = new EventEmitter<Credential>();
  @Output() cancel : EventEmitter<any> = new EventEmitter<any>();

  // implementation of ngInit
  ngOnInit() 
  {
    if(this.credential != undefined)
    {
      this.accountName = this.credential.accountName;
      this.credentialName = this.credential.name;
    }
  }

  // implementation of Credential Component
  saveClicked()
  {
    var isValid = this.validate();
    if(!isValid) return;

    if(this.credential === undefined) this.credential = new Credential();

    this.credential.name = this.credentialName;
    this.credential.accountName = this.accountName;

    this.save.emit(this.credential);
  }
  cancelClicked()
  {
    if(this.credential != undefined)
    {
      this.credentialName = this.credential.name;
      this.accountName = this.credential.accountName;
    }
    else
    {
      this.credentialName = '';
      this.accountName = '';
    }
    this.errorMessage = '';
    this.cancel.emit();
  }

  isNullOrEmpty(value : string) : boolean
  {
    return (value === undefined || value === null || value.trim().length === 0);
  }
  validate() : boolean
  {
    if(this.isNullOrEmpty(this.credentialName))
    {
      this.showError("Credential Name")
      return false;
    }
    if(this.isNullOrEmpty(this.accountName))
    {
      this.showError("Account Name")
      return false;
    }

    this.errorMessage = '';
    return true;
  }
  showError(name : string)
  {
    this.errorMessage = `Please specify ${name}`;
  }

}