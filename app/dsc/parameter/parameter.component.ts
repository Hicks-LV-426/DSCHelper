import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Parameter } from '../common/parameter';
import { ParameterType } from '../common/parameter-type';

@Component({
  selector: 'dsc-parameter',
  templateUrl: 'app/dsc/parameter/parameter.component.html',
  styleUrls: ['app/dsc/parameter/parameter.component.css']
})
export class ParameterComponent implements OnInit {

  constructor() { }

  paramName : string;
  paramType : string;
  paramValue : string;
  errorMessage : string = "";
  parameter : Parameter = new Parameter();

  @Output() save : EventEmitter<Parameter> = new EventEmitter<Parameter>();
  @Output() cancel : EventEmitter<any> = new EventEmitter<any>();

  // implementation of ngInit
  ngOnInit() 
  {
    this.paramType = ParameterType.getTypes()[0];
  }

  // implementation of Parameter Component
  getValueTypes() : string[]
  {
    return ParameterType.getTypes();
  }

  saveClicked()
  {
    var isValid = this.validate();
    if(!isValid) return;

    this.parameter.name = this.paramName;
    this.parameter.type = this.paramType
    this.parameter.value = this.paramValue;

    this.save.emit(this.parameter);
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
      this.paramType = ParameterType.getTypes()[0];
      this.paramValue = '';
    }
    this.errorMessage = '';
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
}