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

  // implementation of Identifiable
  private guid : string;
  private dscName : string;

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
  getImports(): string[]
  {
    return [];
  }
  getComments(): string[]
  {
    return [];
  }
  serialize() : string
  {
    var valuePart : string;
    if(this.isNulOrEmpty(this.value))
      valuePart = "";
    else
      valuePart = ` = ${this.formatValue(this.value, this.type)}`;

    return `$${this.dscName}${valuePart}`;
  }

  isNulOrEmpty(value : string) : boolean
  {
    return (value === undefined || value === null || value.trim().length === 0);
  }
  formatValue(type : string, value : string) : string
  {
    switch (type) 
    {
      case ParameterType.BOOLEAN:
        return `$${this.value}`;
      case ParameterType.NUMBER:
        return `${this.value}`;
      default:
        return `"${this.value}"`;
    }
  }
}