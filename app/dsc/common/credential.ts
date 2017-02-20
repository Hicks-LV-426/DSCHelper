import { DscItem } from './dsc-item';
import { Guid } from './guid';
import { DscItemType} from './dsc-item-type';
import { Parameter } from './parameter';
import { ParameterType } from './parameter-type';

export class Credential implements DscItem 
{
  constructor()
  {
      this.guid = Guid.getNewId();
  }
  // implementation of Parameter
  name : string;
  accountName : string;

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
    return DscItemType.CREDENTIAL;
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
    var secureDeclaration = `$${this.getPasswordSecureName()} = ConvertTo-SecureString $${this.getPasswordParameterName()} -AsPlainText -Force;\r\n`;
    var credentialDeclaration = `$${this.dscName} = New-Object System.Management.Automation.PSCredential ("${this.accountName}", $${this.getPasswordSecureName()})`;
    return secureDeclaration + credentialDeclaration;
  }
  getPasswordParameter() : Parameter
  {
    var passwordParameter = new Parameter();
    passwordParameter.name = this.getPasswordParameterName();
    passwordParameter.setDscName(this.getPasswordParameterName());
    passwordParameter.type = ParameterType.PASSWORD;

    return passwordParameter;
  }
  getPasswordParameterName() : string
  {
    return this.dscName + "Password";
  }
  getPasswordSecureName() : string
  {
    return this.getPasswordParameterName() + "Secure";
  }
}