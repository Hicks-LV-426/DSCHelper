import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Rule } from './rule';
import { RulesService } from './rules.service';
import { FirewallRuleEventArgs } from '../common/firewall.rule.event.args';
import { FirewallOptions } from '../common/firewall.options';
import { Optionset } from '../common/optionset';

@Component({
  selector: 'dsc-firewall',
  templateUrl: 'app/dsc/firewall/firewall.component.html',
  styleUrls: ['app/dsc/firewall/firewall.component.css']
})
export class FirewallComponent implements OnInit
{
  constructor(private _rulesService: RulesService)
  {
    this.selectedEnsure = 'Present';
    this.selectedEnabled = 'True';
  }
  ngOnInit()
  {
    this._rulesService.getServers().then((rules) =>
    {
      this.loadRules(rules);
    });
  }

  componentName: string = 'Firewall Rule';
  ruleTypes: string[] = [FirewallOptions.RULE_PROGRAM, FirewallOptions.RULE_PORT, FirewallOptions.RULE_PREDEFINED];
  rules: Rule[] = [];
  versions: string[] = [];
  options: Optionset = new Optionset();
  selectedVersion: string = '';
  errorMessage: string = '';

  /* Output properties */
  @Output() save: EventEmitter<FirewallRuleEventArgs> = new EventEmitter<FirewallRuleEventArgs>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  /* getters and setters */
  set selectedRuleType(value: string)
  {
    if (value.trim().length > 0)
    {
      this.options.setOption(FirewallOptions.RuleType, value);
    }
    else
      this.options.removeOption(FirewallOptions.RuleType);
  }
  get selectedRuleType(): string
  {
    return this.options.getOptionValue(FirewallOptions.RuleType);
  }
  set predefinedRuleName(value: string)
  {
    if (value.trim().length > 0)
    {
      this.options.setOption(FirewallOptions.PredefinedRuleName, value);
    }
    else
      this.options.removeOption(FirewallOptions.PredefinedRuleName);
  }
  get predefinedRuleName(): string
  {
    return this.options.getOptionValue(FirewallOptions.PredefinedRuleName);
  }
  set selectedEnsure(value: string)
  {
    if (value.trim().length > 0)
    {
      this.options.setOption(FirewallOptions.Ensure, value);
    }
    else
      this.options.removeOption(FirewallOptions.Ensure);
  }
  get selectedEnsure(): string
  {
    return this.options.getOptionValue(FirewallOptions.Ensure);
  }
  set selectedEnabled(value: string)
  {
    if (value.trim().length > 0)
    {
      this.options.setOption(FirewallOptions.Enabled, value);
    }
    else
      this.options.removeOption(FirewallOptions.Enabled);
  }
  get selectedEnabled(): string
  {
    return this.options.getOptionValue(FirewallOptions.Enabled);
  }
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

  /* elements display control methods */
  resetSelectedRuleType(): void
  {
    this.resetSelectedVersion();
    this.selectedRuleType = '';
  }
  resetSelectedVersion(): void
  {
    this.resetSelectedRule();
    this.selectedVersion = '';
  }
  resetSelectedRule(): void
  {
    this.predefinedRuleName = '';
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
      case 'version':
        return this.shouldShowVersions();
      case 'predefined-rules':
        return this.shouldShowRules();
      case 'ensure':
        return this.shouldShowEnsure();
      case 'buttons':
        return this.shouldShowButtons();
      default:
        return false;
    }
  }
  shouldShowVersions(): boolean
  {
    return this.selectedRuleType === FirewallOptions.RULE_PREDEFINED;
  }
  shouldShowRules(): boolean
  {
    return this.shouldShowVersions() && this.selectedVersion.length > 0;
  }
  shouldShowEnabled(): boolean
  {
    if (this.shouldShowVersions()) return this.predefinedRuleName.length > 0;

    return this.selectedRuleType.length > 0;
  }
  shouldShowEnsure(): boolean
  {
    return this.shouldShowEnabled() && this.selectedRuleType != FirewallOptions.RULE_PREDEFINED;
  }

  shouldShowButtons(): boolean
  {
    return (this.shouldShowEnabled() && this.selectedEnsure.length > 0 && this.selectedEnabled.length > 0);
  }

  onSave(): void
  {
    if (this.selectedRuleType === FirewallOptions.RULE_PREDEFINED)
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