import { Optionset } from '../common/optionset';
import { Option } from '../common/option';
import { FirewallOptions } from './firewall.options';
import { StringExtensions } from '../common/string-extensions';
import { DscItemType } from '../common/dsc-item-type';
import { DscItem } from '../common/dsc-item';
import { Guid } from '../common/guid';

export class FirewallRule implements DscItem
{
  constructor(e: Optionset)
  {
    this.guid = Guid.getNewId();
    this.options = e;
    this.name = e.getOptionValue(FirewallOptions.Name);
    //this.builtIn = e.builtIn;
    //this.enabled = e.enabled;
    //this.ensure = e.present ? 'Present' : 'Absent';
  }

  // implementation of Firewall Rule
  name: string;
  options: Optionset;

  // implementation of DscItem
  private guid: string;
  private dscName: string;

  getId(): string
  {
    return this.guid;
  }
  getName(): string
  {
    return this.name;
  }
  getType(): string
  {
    return DscItemType.FIREWALL_RULE;
  }
  setDscName(name: string)
  {
    this.dscName = name;
  }
  getDscName(): string
  {
    return this.dscName;
  }
  getImports(): string[]
  {
    return ['Import-DSCResource -ModuleName xNetworking;'];
  }
  getComments(): string[]
  {
    return ["#Please install 'xNetworking' module to source machine and target server before runnig this DSC script",
      "#\tlocal install example: Install-Module 'xNetworking' -Force;",
      "#\tremote install example: Save-Module -Name 'xNetworking' -Path '\\\\remote_server\\C$\\Program Files\\WindowsPowerShell\\Modules' -Force"];
  }

  serialize(): string
  {
    var lines: string[] = [];
    lines.push(`\t\txFirewall "${this.name}"`);
    lines.push('\t\t{')
    for (let option of this.options.getOptions())
    {
      if (option.name == FirewallOptions.RuleType)
        continue;

      if (option.asIs)
        lines.push(`\t\t\t${option.name} = ${option.value}`);
      else
        lines.push(`\t\t\t${option.name} = '${option.value}'`);
    }
    lines.push('\t\t}');

    return lines.join("\r\n");
  }
}