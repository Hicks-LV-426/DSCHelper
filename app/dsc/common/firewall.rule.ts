import { FirewallRuleEventArgs } from './firewall.rule.event.args';
import { StringExtensions } from '../common/string-extensions';
import { DscItemType } from './dsc-item-type';
import { DscItem } from './dsc-item';
import { Guid } from './guid';

export class FirewallRule implements DscItem
{
  constructor(e: FirewallRuleEventArgs)
  {
    this.guid = Guid.getNewId();
    this.builtIn = e.builtIn;
    this.name = e.name;
    this.enabled = e.enabled;
    this.ensure = e.present ? 'Present' : 'Absent';
  }

  // implementation of WindowsFeature
  private name: string;
  private builtIn: boolean;
  private enabled: boolean;
  private ensure: string;
  private getEnabledValue(): string
  {
    return this.enabled ? 'True' : 'False';
  }
  private serializeBuildIn(): string
  {
    var lines: string[] = [];
    lines.push(`\t\txFirewall "${this.name}"`);
    lines.push('\t\t{')
    lines.push(`\t\t\tName = "${this.name}"`);
    lines.push(`\t\t\tEnabled = "${this.getEnabledValue()}"`);
    lines.push(`\t\t\tEnsure = "${this.ensure}"`);
    lines.push('\t\t}');

    return lines.join("\r\n");
  }
  private serializeUserDefined(): string
  {
    return '';
  }


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
    return DscItemType.WINDOWS_FEATURE;
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
    return this.builtIn ? this.serializeBuildIn() : this.serializeUserDefined();
  }
}