import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Rule } from './rule';
import { RulesService } from './rules.service';
import { FirewallRuleEventArgs } from '../common/firewall.rule.event.args';
const RULE_BUILT_IN: string = 'Built-In';
const RULE_USER_DEFINED: string = 'User defined';


@Component({
  selector: 'dsc-firewall',
  templateUrl: 'app/dsc/firewall/firewall.component.html',
  styleUrls: ['app/dsc/firewall/firewall.component.css']
})
export class FirewallComponent implements OnInit
{
  componentName: string = 'Firewall Rule';
  @Output() save: EventEmitter<FirewallRuleEventArgs> = new EventEmitter<FirewallRuleEventArgs>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  ruleTypes: string[] = [RULE_BUILT_IN, RULE_USER_DEFINED];
  ruleTypeBuiltIn: string = RULE_BUILT_IN;
  ruleTypeUserDefined: string = RULE_USER_DEFINED;
  rules: Rule[] = [];
  versions: string[] = [];
  selectedVersion: string = '';
  selectedRuleType: string = '';
  selectedRule: Rule;
  set selectedRuleName(value: string)
  {
    this.selectedRule = this.rules.find(r => r.Name === value);
  }
  get selectedRuleName(): string
  {
    return this.selectedRule === undefined ? '' : this.selectedRule.Name;
  }
  selectedEnsure: string = 'Present';
  selectedEnabled: string = 'True';
  errorMessage: string = '';

  constructor(private _rulesService: RulesService) { }
  ngOnInit()
  {
    this._rulesService.getServers().then((rules) =>
    {
      this.loadRules(rules);
    });
  }
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
  resetSelectedVersion(): void
  {
    this.resetSelectedRuleType();
    this.selectedVersion = '';
  }
  resetSelectedRuleType(): void
  {
    this.resetSelectedRule();
    this.selectedRuleType = '';
  }
  resetSelectedRule(): void
  {
    this.selectedRule = undefined;
  }
  resetSelectedEnsure()
  {
    this.selectedEnsure = '';
  }
  resetSelectedEnabled()
  {
    this.selectedEnabled = '';
  }

  shouldShow(value: string): boolean
  {
    switch (value)
    {
      case 'enabled':
        return this.shouldShowEnsure();
      case 'ensure':
        if (this.selectedRuleType === RULE_BUILT_IN)
        {
          this.selectedEnsure = 'Present';
          return false;
        }
        else
        {
          return this.shouldShowEnsure();
        }
      case 'buttons':
        return this.shouldShowButtons();
      default:
        return false;
    }
  }

  shouldShowEnsure(): boolean
  {
    return (this.selectedRuleType === RULE_BUILT_IN && this.selectedRule != undefined)
      || (this.selectedRuleType.length > 0 && this.selectedRuleType != RULE_BUILT_IN)
  }
  shouldShowButtons(): boolean
  {
    return (this.shouldShowEnsure() && this.selectedEnsure.length > 0 && this.selectedEnabled.length > 0);
  }

  onSave(): void
  {
    if (this.selectedRuleType === RULE_BUILT_IN)
    {
      var e = FirewallRuleEventArgs.getBuiltIn(this.selectedRule.Name, this.selectedEnabled === 'True' ? true : false);
      this.save.emit(e);
    }
  }
  onCancel(): void
  {
    this.cancel.emit(null);
  }
}