import { Parameter } from '../parameter/parameter';
import { ItemManager } from '../name-management/item-manager';
import { DscItemType } from '../name-management/dsc-item-type';
import { DscItem } from '../name-management/dsc-item';

export class Collection 
{
  private itemNames : string[] = ["Parameters", "Credentials"];
  private parameters : Parameter[] = [];
  private itemManager : ItemManager = new ItemManager();


  public add(item : DscItem) : boolean
  {
    return this.itemManager.add(item);
  }
  public getItemNames() : string[]
  {
    return this.itemNames;
  }

  serialize() : string
  {
    var items = this.itemManager.getItems();
    var values : string[] = [];

    values.push("PARAM");
    values.push("(");
    values.push("\t[Parameter(Mandatory=$true)][String]$serverName");

    for(var i : number = 0; i < items.length; i++)
    {

      var mandatoryParam = items[0].serializeMandatoryParameter();
      if(this.hasValue(mandatoryParam)) 
      {
        values.push(`\r\n\t, [Parameter(Mandatory=$true)]${mandatoryParam}`);
      }
    }

    values.push(")\r\n# dsc parameters");

    for(var i : number = 0; i < items.length; i++)
    {
      var standardParam = items[0].serializeParameter();
      if(this.hasValue(standardParam))
      {
        values.push(standardParam);
      }
    }
    values.push("\r\n");
    values.push(`Configuration DscDeploy 
{  
  
  param( 
    [Parameter(Mandatory=$true)] 
    [String[]]$Servers, 
    [Parameter(Mandatory=$true)] 
    [String]$SourceFile, 
    [Parameter(Mandatory=$true)] 
    [String]$DestinationFile
  ) 

  Node $Servers
  {  
    File CopyHostFile 
    { 
        Ensure = "Present" 
        Type = "File" 
        SourcePath = $SourceFile
        DestinationPath = $DestinationFile
    } 
  } 
}

DscDeploy
  	-Servers @("ADM01","ADM11")
  	-SourceFile  "\\\\Share\\Hosts"
  	-DestinationFile  "C:\\Windows\\System32\\drivers\\etc\\"
  	-OutputPath  "C:\\DscDeploy\\";

Start-DscConfiguration -Wait -verbose -Path C:\\DscDeploy\\;`);
    return values.join('\r\n');
  }
  hasValue(value : string) : boolean
  {
    return (value != undefined && value != null && value.length > 0);
  }
}