import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Rule } from './rule';
import { RulesService } from './rules.service';
import { FirewallOptions } from './firewall.options';
import { Optionset } from '../common/optionset';

@Component({
  selector: 'dsc-firewall',
  templateUrl: 'app/dsc/firewall/firewall.component.html',
  styleUrls: ['app/dsc/firewall/firewall.component.css']
})
export class FirewallComponent implements OnInit
{
  constructor(private _rulesService: RulesService) { }
  ngOnInit()
  {
    this._rulesService.getServers().then((rules) =>
    {
      this.loadRules(rules);
    });
    this.protocol = 'TCP';
  }

  /* firewall properties */
  ruleType: string = '';
  enabled: string = 'True';
  ensure: string = 'Present';
  profiles: string[] = [];
  direction: string = 'InBound';
  program: string = '';
  protocol: string = 'TCP';
  port: string = '';
  version: string = '';
  predefinedRuleName: string = '';
  name: string = '';
  displayName: string = '';
  description: string = '';

  /* component properties */
  componentName: string = 'Firewall Rule';
  ruleTypes: string[] = [FirewallOptions.RULE_PROGRAM, FirewallOptions.RULE_PORT, FirewallOptions.RULE_PREDEFINED];
  rules: Rule[] = [];
  versions: string[] = [];
  errorMessage: string = '';
  portRegexp: RegExp = new RegExp("^((\\d{1,})(([,]\\d{1,}){0,})|((-\\d{1,}){0,})){1,}$");

  /* Output properties */
  @Output() save: EventEmitter<Optionset> = new EventEmitter<Optionset>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  /* properties */
  get selectedRule(): Rule
  {
    return this.rules.find(r => r.Name === this.predefinedRuleName);
  }

  /* helper methods */
  loadRules(rules: Rule[]) 
  {
    if (rules === undefined || rules.length === 0) return;

    this.rules = rules;
    if (this.versions.length > 0) this.versions = [];

    for (var rule of rules)
    {
      if (this.versions.find(v => v === rule.OS) === undefined) 
      {
        this.versions.push(rule.OS);
      }
    }
  }
  getJson(object: any): string
  {
    return JSON.stringify(object, null, 2);
  }

  /* profile methods */
  getProfiles(): string[]
  {
    return FirewallOptions.Profiles;
  }
  isProfileSelected(value: string): boolean
  {
    return this.profiles.indexOf(value) > -1;
  }
  toggleProfile(value: string)
  {
    var index = this.profiles.indexOf(value);
    if (index > -1)
      this.profiles.splice(index, 1);
    else
      this.profiles.push(value);
  }
  getProfilesDscValue(): string
  {
    return `('${this.profiles.join("', '")}')`;
  }

  /* elements display control methods */
  shouldShow(value: string): boolean
  {
    switch (value)
    {
      case 'commonFields':
        return this.isRuleTypeSelected();
      case 'non-predefined-fields':
        return this.isNonPredefined();
      case 'portFields':
        return this.ruleType === FirewallOptions.RULE_PORT;
      case 'programFields':
        return this.ruleType === FirewallOptions.RULE_PROGRAM;
      case 'version':
        return this.shouldShowVersions();
      case 'predefined-rules':
        return this.shouldShowRules();
      case 'saveButton':
        return this.shouldShowSaveButton();
      default:
        return false;
    }
  }

  isRuleTypeSelected(): boolean
  {
    return this.ruleType.trim().length > 0;
  }
  isNonPredefined(): boolean
  {
    return this.isRuleTypeSelected() && this.ruleType != FirewallOptions.RULE_PREDEFINED;
  }

  shouldShowVersions(): boolean
  {
    return this.ruleType === FirewallOptions.RULE_PREDEFINED;
  }
  shouldShowRules(): boolean
  {
    return this.shouldShowVersions() && this.version.length > 0;
  }
  shouldShowSaveButton(): boolean
  {
    switch (this.ruleType)
    {
      case FirewallOptions.RULE_PORT:
        return this.isPortRuleValid();
      case FirewallOptions.RULE_PREDEFINED:
        return this.isPredefinedRuleValid();
      case FirewallOptions.RULE_PROGRAM:
        return this.isProgramRuleValid();
      default:
        return false;
    }
  }

  isPredefinedRuleValid(): boolean
  {
    return this.isRuleTypeValid()
      && this.isEnabledValid()
      && this.isEnsureValid()
      && this.isVersionValid()
      && this.isRuleNameValid();
  }
  isProgramRuleValid(): boolean
  {
    return this.isRuleTypeValid()
      && this.isEnabledValid()
      && this.isEnsureValid()
      && this.isProfileValid()
      && this.isDirectionValid()
      && this.isProgramValid()
      && this.isNameValid()
      && this.isDisplayNameValid();
  }
  isPortRuleValid(): boolean
  {
    return this.isRuleTypeValid()
      && this.isEnabledValid()
      && this.isEnsureValid()
      && this.isProfileValid()
      && this.isDirectionValid()
      && this.isProtocolValid()
      && this.isPortValid()
      && this.isNameValid()
      && this.isDisplayNameValid();
  }
  /* Validation */
  isRuleTypeValid(): boolean
  {
    return this.ruleType.length > 0;
  }
  isEnabledValid(): boolean
  {
    return this.enabled.length > 0;
  }
  isEnsureValid(): boolean
  {
    return this.ensure.length > 0;
  }
  isProfileValid(): boolean
  {
    return this.profiles.length > 0;
  }
  isDirectionValid(): boolean
  {
    return this.direction.length > 0;
  }
  isProgramValid(): boolean
  {
    return this.program.trim().length > 0;
  }
  isProtocolValid(): boolean
  {
    return this.protocol.length > 0;
  }
  isPortValid(): boolean
  {
    return this.port.length > 0 && this.portRegexp.test(this.port);
  }
  isVersionValid(): boolean
  {
    return this.version.length > 0;
  }
  isRuleNameValid(): boolean
  {
    return this.predefinedRuleName.length > 0;
  }
  isNameValid(): boolean
  {
    return this.name.trim().length > 0;
  }
  isDisplayNameValid(): boolean
  {
    return this.displayName.trim().length > 0;
  }

  getPredefinedRuleOptions(): Optionset
  {
    var o = new Optionset();
    o.setOption(FirewallOptions.RuleType, this.ruleType);
    o.setOption(FirewallOptions.Enabled, this.enabled);
    o.setOption(FirewallOptions.Ensure, this.ensure);
    o.setOption(FirewallOptions.Name, this.predefinedRuleName);
    return o;
  }
  getProgramRuleOptions(): Optionset
  {
    var o = new Optionset();
    o.setOption(FirewallOptions.RuleType, this.ruleType);
    o.setOption(FirewallOptions.Enabled, this.enabled);
    o.setOption(FirewallOptions.Ensure, this.ensure);
    o.setOption(FirewallOptions.Profile, this.getProfilesDscValue(), true);
    o.setOption(FirewallOptions.Direction, this.direction);
    o.setOption(FirewallOptions.Program, this.program);
    o.setOption(FirewallOptions.Name, this.name);
    o.setOption(FirewallOptions.DisplayName, this.displayName);
    o.setOption(FirewallOptions.Description, this.description);
    return o;
  }
  getPortRuleOptions(): Optionset
  {
    var o = new Optionset();
    o.setOption(FirewallOptions.RuleType, this.ruleType);
    o.setOption(FirewallOptions.Enabled, this.enabled);
    o.setOption(FirewallOptions.Ensure, this.ensure);
    o.setOption(FirewallOptions.Profile, this.getProfilesDscValue(), true);
    o.setOption(FirewallOptions.Direction, this.direction);
    o.setOption(FirewallOptions.Protocol, this.protocol);
    o.setOption(FirewallOptions.Port, this.port);
    o.setOption(FirewallOptions.Name, this.name);
    o.setOption(FirewallOptions.DisplayName, this.displayName);
    o.setOption(FirewallOptions.Description, this.description);
    return o;
  }

  onSave(): void
  {
    var e: Optionset;

    if (this.ruleType === FirewallOptions.RULE_PREDEFINED)
      e = this.getPredefinedRuleOptions();
    else if (this.ruleType === FirewallOptions.RULE_PORT)
      e = this.getPortRuleOptions();
    else if (this.ruleType === FirewallOptions.RULE_PROGRAM)
      e = this.getProgramRuleOptions();

    if (e != undefined) this.save.emit(e);
  }
  onCancel(): void
  {
    this.cancel.emit(null);
  }
}