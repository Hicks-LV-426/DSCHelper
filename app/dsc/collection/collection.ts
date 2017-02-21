import { Parameter } from '../common/parameter';
import { Credential } from '../common/credential';
import { DscItem } from '../common/dsc-item';
import { ItemManager } from '../common/item-manager';
import { FeatureEventArgs } from '../common/feature-event-args';
import { FirewallRule } from '../common/firewall.rule';
import { FirewallRuleEventArgs } from '../common/firewall.rule.event.args';
import { WindowsFeature } from '../common/windows-feature';

export class Collection 
{
  private itemNames: string[] = ["Parameters", "Credentials"];
  private parameters: Parameter[] = [];
  private itemManager: ItemManager = new ItemManager();

  // 
  public getItemNames(): string[]
  {
    return this.itemNames;
  }

  // windows feature methods
  public addWindowsFeature(e: FeatureEventArgs): boolean
  {
    var feature = new WindowsFeature(e.features, e.ensure, e.credentialName);
    var added = this.itemManager.addItem(feature);
    if (added) this.itemNames.push('Windows Features');
    return added;
  }
  public addFirewallRule(e: FirewallRuleEventArgs): boolean
  {
    var rule = new FirewallRule(e);
    var added = this.itemManager.addItem(rule);
    if (added) this.itemNames.push(rule.getName());
    return added;
  }

  // parameter methods
  public addParameter(parameter: Parameter): boolean
  {
    return this.itemManager.addParameter(parameter);
  }

  // credential methods
  public addCredential(credetial: Credential): boolean
  {
    return this.itemManager.addCredential(credetial);
  }
  public getCredentials(): Credential[]
  {
    return this.itemManager.getCredentials();
  }

  // serialization methods
  serialize(): string
  {
    var credentials = this.itemManager.getCredentials();
    var parameters = this.itemManager.getParameters();
    var items = this.itemManager.getItems();
    var values: string[] = [];

    // add comments from DSC Items
    for (var item of items)
    {
      var comments = item.getComments();
      if (comments.length > 0)
      {
        values.push(comments.join('\r\n'));
      }
    }

    values.push("PARAM");
    values.push("(");
    values.push("\t[Parameter(Mandatory=$true)][String]$serverName");

    for (var cred of credentials)
    {
      values.push(`\r\n\t, [Parameter(Mandatory=$true)][String]${cred.getPasswordParameter().serialize()}`);
    }

    values.push(")\r\n");
    values.push("# dsc parameters");

    for (var param of parameters)
    {
      values.push(param.serialize() + ";");
    }

    values.push("\r\n");
    values.push("# dsc credentials");
    for (var cred of credentials)
    {
      values.push(cred.serialize());
    }

    values.push("\r\n");
    values.push('Configuration DscDeploy');
    values.push('{');
    values.push('Import-DscResource -ModuleName PSDesiredStateConfiguration;');
    for (var dscItem of items)
    {
      var imports = dscItem.getImports();
      if (imports.length > 0) values.push(imports.join('\r\n'));
    }
    values.push('\r\n');
    values.push('\tNode $serverName');
    values.push('\t{');

    for (var dscItem of items)
    {
      values.push(dscItem.serialize());
    }
    values.push('\t}');
    values.push('}');
    values.push("\r\n");

    values.push('$cd = @{');
    values.push('AllNodes = @(');
    values.push('    @{');
    values.push('        NodeName = $serverName');
    values.push('        PSDscAllowDomainUser = $true');
    values.push('        PSDscAllowPlainTextPassword = $true');
    values.push('    }');
    values.push(')');
    values.push('}');

    values.push("\r\n");
    values.push('DscDeploy -OutputPath "C:\\DscDeploy\\" -ConfigurationData $cd;');
    values.push('Start-DscConfiguration -Wait -verbose -Path C:\\DscDeploy\\;');
    return values.join('\r\n');
  }

}