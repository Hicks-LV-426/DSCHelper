export class FirewallOptions
{
  public static get RULE_PREDEFINED(): string { return 'Predefined'; }
  public static get RULE_PROGRAM(): string { return 'Program'; }
  public static get RULE_PORT(): string { return 'Port'; }
  public static get Profiles(): string[] { return ['Private', 'Public', 'Domain']; }

  public static get Enabled(): string { return 'Enabled'; }
  public static get Ensure(): string { return 'Ensure'; }
  public static get Name(): string { return 'Name'; }
  public static get RuleType(): string { return 'RuleType'; }
  public static get Profile(): string { return 'Profile'; }
  public static get Program(): string { return 'Program'; }
  public static get Protocol(): string { return 'Protocol'; }
  public static get Port(): string { return 'LocalPort'; }
  public static get DisplayName(): string { return 'DisplayName'; }
  public static get Description(): string { return 'Description'; }
  public static get Direction(): string { return 'Direction'; }
  
}