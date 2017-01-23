import { Parameter } from '../parameter/parameter';

export class Collection 
{
  items : string[] = ["Parameters", "Credentials"];
  parameters : Parameter[] = [];

  serialize() : string
  {
    var values : string[] = [];
    for(let param of this.parameters)
    {
      values.push(param.serialize());
    }
    values.push(`Configuration DeployHostFile 
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

DeployHostFile
  	-Servers @("ADM01","ADM11")
  	-SourceFile  "\\\\Share\\Hosts"
  	-DestinationFile  "C:\\Windows\\System32\\drivers\\etc\\"
  	-OutputPath  "C:\\DeployHostFile\\";

Start-DscConfiguration -Wait -verbose -Path C:\\DeployHostFile\\;`);
    return values.join('\r\n');
  }
}