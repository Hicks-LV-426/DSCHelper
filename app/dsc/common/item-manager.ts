import { DscItem } from './dsc-item';
import { DscItemType } from './dsc-item-type';
import { Parameter } from '../common/parameter';

export class ItemManager 
{
  private items : DscItem[] = [];
  private parameters : Parameter[] = [];
  private incrementor : number = 1;

  public findByType(itemType : string) : DscItem[]
  {
    return this.items.filter(i => i.getType() === itemType);
  }
  public getParameters() : Parameter[]
  {
    return this.parameters;
  }
  public getItems()
  {
    return this.items;
  }
  public add(item : DscItem) : boolean
  {
    var value = <Parameter>item;
    console.debug("received id: " + item.getId());

    var contains = this.contains(item);
    console.debug("contains = " + contains);
    if(contains) return false;

    this.assignName(item);

    if(item.getType() == DscItemType.PARAMETER)
    {
      this.parameters.push(<Parameter>item);
    }
    else
    {
      this.items.push(item);
    }
    return true;
  }
  public contains(item : DscItem) : boolean
  {
    if(!item) return false;

    return (this.items.find(i => i.getId() === item.getId()) != undefined);
  }

  private assignName(item : DscItem)
  {
    var newName : string = item.getName();

    if(this.items.find(i => i.getDscName() === newName))
      newName = newName + this.incrementor++;
    
    item.setDscName(newName);
  }
}