import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Parameter } from './parameter';

@Component({
  selector: 'dsc-parameter',
  templateUrl: 'app/dsc/parameter/parameter.component.html',
  styleUrls: ['app/dsc/parameter/parameter.component.css']
})
export class ParameterComponent implements OnInit {

  constructor() { }

  valueTypes : string[] = ["string", "number", "boolean"];
  paramName : string;
  paramType : string = this.valueTypes[0];
  paramValue : string;
  errorMessage : string = "";
  parameter : Parameter;

  @Output() save : EventEmitter<Parameter> = new EventEmitter<Parameter>();
  @Output() cancel : EventEmitter<any> = new EventEmitter<any>();

  getValueTypes() : string[]
  {
    return this.valueTypes;
  }

  saveClicked()
  {
    if(!this.validate())
      return;
    
    this.save.emit({name: this.paramName, type: this.paramType, value: this.paramValue});
  }
  cancelClicked()
  {
    if(this.parameter)
    {
      this.paramName = this.parameter.name;
      this.paramType = this.parameter.type;
      this.paramValue = this.parameter.value;
    }
    else
    {
      this.paramName = '';
      this.paramType = this.valueTypes[0];
      this.paramValue = '';
    }
    this.cancel.emit();
  }

  hasValue(value : string) : boolean
  {
    return value != undefined && value.length > 0;
  }

  validate() : boolean
  {
    if(!this.hasValue(this.paramName))
    {
      this.showError("Name")
      return false;
    }
    if(!this.hasValue(this.paramType))
    {
      this.showError("Type")
      return false;
    }
    if(!this.hasValue(this.paramValue))
    {
      this.showError("Value")
      return false;
    }

    this.errorMessage = '';
    return true;
  }
  showError(name : string)
  {
    this.errorMessage = `Please specify ${name}`;
  }
  ngOnInit() {}

}