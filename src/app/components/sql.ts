import { Component, OnInit } from '@angular/core';

import { SqlService } from '../services/sql.service';
import { SqlGroup } from '../classes/sql.group';
import { SqlParameter } from '../classes/sql.parameter';
import { SqlFeature } from '../classes/sql.feature';
import { SqlVersion } from '../classes/sql.version';
import { SqlState } from '../classes/sql.state';

@Component({
  selector: 'dsc-sql',
  templateUrl: 'app/components/sql.html'
})
export class SqlComponent implements OnInit
{
  constructor(private _sqlService: SqlService) { }
  group: SqlGroup;
  state: SqlState = new SqlState();

  ngOnInit()
  {
    if (this.group === undefined)
    {
      this._sqlService.getGroup().then((group) =>
      {
        this.group = group;
      });
    }
  }
  matchesVersion(feature: SqlFeature): boolean
  {
    if (this.state.version.length === 0) return false;

    if (feature.Compatibility === '*' ||
      feature.Compatibility === this.state.version ||
      feature.Compatibility === undefined ||
      feature.Compatibility.length === 0) return true;

    if (parseInt(feature.Compatibility[0]) !== NaN) return false; 

    let operator = feature.Compatibility[0];
    let version = parseInt(feature.Compatibility.substr(1));
    let selectedVersion = parseInt(this.state.version);

    switch (operator)
    {
      case '>':
        return selectedVersion > version;
      case '<':
        return selectedVersion < version; 
      case '=':
        return selectedVersion === version; 
      default:
        console.info(feature.Compatibility + ' ' + feature.Name);
        return false;
    }
  }

  toggleFeature(feature: string)
  {
    if (this.state.hasFeature(feature))
    {
      this.state.removeFeature(feature);
    }
    else
    {
      this.state.addFeature(feature);
    }
  }

  getFeatures(): SqlFeature[]
  {
    return this.group.Features.filter(f => this.matchesVersion(f));
  }
  getParameters(feature: string): SqlParameter[]
  {
    return this.group.Parameters.filter(p => p.RelatedFeatures.indexOf(feature) > -1);
  }
}