import { DscItem } from './dsc-item';
import { DscItemType } from './dsc-item-type';
import { Parameter } from '../common/parameter';
import { Credential } from '../common/credential';
import { NameManager } from '../common/name-manager';

export class ItemManager 
{
  private items : DscItem[] = [];
  private parameters : Parameter[] = [];
  private credentials : Credential[] = [];
  private incrementor : number = 1;
  private names : NameManager = new NameManager();

  // parameter methods
  public getParameters() : Parameter[]
  {
    return this.parameters;
  }
  public addParameter(parameter : Parameter) : boolean
  {
    var contains = this.hasParameter(parameter);
    if(contains) return false;

    this.assignName(parameter);
    this.parameters.push(parameter);
    return true;
  }
  private hasParameter(parameter : Parameter) : boolean
  {
    return (this.parameters.find(p => p.getId() === parameter.getId()) != undefined);
  }

  // item methods
  public getItems()
  {
    return this.items;
  }
  public addItem(item : DscItem) : boolean
  {
    console.debug("received id: " + item.getId());

    var contains = this.hasItem(item);
    console.debug("contains = " + contains);
    if(contains) return false;

    this.assignName(item);
    this.items.push(item);
    return true;
  }
  public hasItem(item : DscItem) : boolean
  {
    if(!item) return false;

    return (this.items.find(i => i.getId() === item.getId()) != undefined);
  }

  // credential methods
  public getCredentials() : Credential[]
  {
    return this.credentials;
  }
  public addCredential(credential : Credential) : boolean
  {
    var contains = this.hasCredential(credential);
    if(contains) return false;

    this.assignName(credential);
    this.credentials.push(credential);
    return true;
  }
  private hasCredential(credential : Credential) : boolean
  {
    var c = this.credentials.find(p => p.getId() === credential.getId());
    return (c != undefined);
  }

  // naming methods
  private assignName(item : DscItem)
  {
    var name = this.names.getName(item.getId(), item.getName(), item.getType());
    item.setDscName(name);
  }
}