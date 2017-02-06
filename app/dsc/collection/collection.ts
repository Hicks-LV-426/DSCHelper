import { Parameter } from '../common/parameter';
import { Credential } from '../common/credential';
import { DscItem } from '../common/dsc-item';
import { ItemManager } from '../common/item-manager';

export class Collection 
{
  private itemNames : string[] = ["Parameters", "Credentials"];
  private parameters : Parameter[] = [];
  private itemManager : ItemManager = new ItemManager();


  public getItemNames() : string[]
  {
    return this.itemNames;
  }
  public addItem(item : DscItem) : boolean
  {
    return this.itemManager.addItem(item);
  }
  public addParameter(parameter : Parameter) : boolean
  {
    return this.itemManager.addParameter(parameter);
  }
  public addCredential(credetial : Credential) : boolean
  {
    return this.itemManager.addCredential(credetial);
  }
  public getCredentials(): Credential[]
  {
    return this.itemManager.getCredentials();
  }

  serialize() : string
  {
    var credentials = this.itemManager.getCredentials();
    var parameters = this.itemManager.getParameters();
    var values : string[] = [];

    values.push("PARAM");
    values.push("(");
    values.push("\t[Parameter(Mandatory=$true)][String]$serverName");

    for(var cred of credentials)
    {
      values.push(`\r\n\t, [Parameter(Mandatory=$true)][String]${cred.getPasswordParameter().serialize()}`);
    }

    values.push(")\r\n");
    values.push("# dsc parameters");

    for(var param of parameters)
    {
        values.push(param.serialize() + ";");
    }

    values.push("\r\n");
    values.push("# dsc credentials");
    for(var cred of credentials)
    {
      values.push(cred.serialize());
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

  isNullOrEmpty(value : string) : boolean
  {
    return (value === undefined || value === null || value.trim().length === 0);
  }
}