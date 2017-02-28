export class FirewallOptions
{
  public static get RULE_PREDEFINED(): string { return 'Predefined'; }
  public static get RULE_PROGRAM(): string { return 'Program'; }
  public static get RULE_PORT(): string { return 'Port'; }

  public static get Enabled(): string { return 'Enabled'; }
  public static get Ensure(): string { return 'Ensure'; }
  public static get PredefinedRuleName(): string { return 'PredefinedRule'; }
  public static get RuleType(): string { return 'RuleType'; }
}