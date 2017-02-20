import { StringExtensions } from '../common/string-extensions';
import { DscItemType } from './dsc-item-type';
import { DscItem } from './dsc-item';
import { Guid } from './guid';

export class WindowsFeature implements DscItem
{
  constructor(features : string[], ensure : string, credentialName : string)
  {
    this.guid = Guid.getNewId();
    this.features = features;
    this.ensure = ensure;
    this.credentialName = credentialName;
  }

  // implementation of WindowsFeature
  features: string[];
  ensure: string;
  credentialName: string;

  // implementation of DscItem
  private guid: string;
  private dscName: string;

  getId(): string {
    return this.guid;
  }
  getName(): string
  {
    return "featureList";
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
    return [];
  }
  getComments(): string[]
  {
    return [];
  }
  serialize(): string
  {
    if (this.features === undefined || this.features === null || this.features.length === 0) return "";

    var lines: string[] = [];
    lines.push('\t\t$' + this.dscName + ' = @("' + this.features.join('","') + '")');
    lines.push('\t\tforeach ($feature in $' + this.dscName + ')');
    lines.push('\t\t{');
    lines.push('\t\t\tWindowsFeature "$feature"');
    lines.push('\t\t\t{')
    lines.push('\t\t\t\tName = "$feature"');
    lines.push('\t\t\t\tEnsure = "' + this.ensure + '"');
    if (StringExtensions.isNullOrEmpty(this.credentialName) != true) lines.push('\t\t\tCredential = $' + this.credentialName);
    lines.push('\t\t\t}');
    lines.push('\t\t}');

    return lines.join("\r\n");
  }
}