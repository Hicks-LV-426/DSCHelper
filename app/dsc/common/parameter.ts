import { DscItem } from './dsc-item';
import { Guid } from './guid';
import { DscItemType} from './dsc-item-type';
import { ParameterType } from './parameter-type';

export class Parameter implements DscItem 
{
  constructor()
  {
      this.guid = Guid.getNewId();
  }

  // implementation of Parameter
  name : string;
  type : string;
  value : string;
  isMandatory : boolean = false;

  // implementation of Identifiable
  guid : string;
  dscName : string;

  getId() : string
  {
    return this.guid;
  }
  getName() : string
  {
    return this.name;
  }
  getType() : string
  {
    return DscItemType.PARAMETER;
  }
  setDscName(name : string)
  {
    this.dscName = name;
  }
  getDscName() : string
  {
    return this.dscName;
  }
  serialize() : string
  {
    switch (this.type) 
    {
      case ParameterType.BOOLEAN:
        return `$${this.dscName} = $${this.value};`;
      case ParameterType.NUMBER:
        return `$${this.dscName} = ${this.value};`;
      default:
        return `$${this.dscName} = "${this.value}";`;
    }
  }
  getParameters() : Parameter[]
  {
    return [];
  }
}