import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { FeatureEventArgs } from '../common/feature-event-args';
import { FeatureService } from './feature.service';
import { DependencyCoordinator } from './dependency.coordinator';
import { Credential } from '../common/credential';
import { Server } from './server';
import { Feature } from './feature';
import { Popup } from '../../popup/popup';

@Component({
  selector: 'dsc-feature',
  templateUrl: 'app/dsc/feature/feature.component.html',
  styleUrls: ['app/dsc/feature/feature.component.css'],
  providers: [DependencyCoordinator]
})
export class FeatureComponent implements OnInit 
{
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() save: EventEmitter<FeatureEventArgs> = new EventEmitter<FeatureEventArgs>();
  @Input() credentials: Credential[];

  selectedVersion: string = "";
  selectedCredential: string = "";
  selectedEnsure: string = "Present";
  selectedFeatures: string[] = [];
  servers: Server[];
  errorMessage: string = "";
  popup: Popup = new Popup();

  constructor(private _featureService: FeatureService, private _coordinator: DependencyCoordinator) { }
	ngOnInit()
  {
    var promise = this._featureService.getServers().then((servers) =>
    {
      this.servers = servers;
    });

    // subscribe to feature selected and unselected events
    this._coordinator.itemAdded.subscribe((value) =>
    {
      this.selectedFeatures.push(value);
    });
    this._coordinator.itemRemoved.subscribe((value) =>
    {
      var i = this.selectedFeatures.indexOf(value);
      this.selectedFeatures.splice(i, 1);
    });
  }
  getFeatures(): Feature[]
  {
    if (this.servers === undefined) return [];

    var s = this.servers.find(sv => sv.Version == this.selectedVersion);
    if (s === undefined) return [];

    return s.Features;
  }
  getFeaturesMessage() : string
  {
    return this.selectedVersion.length === 0 ? "select an operating system" : "all dependencies will be added automatically";
  }

  // cancel
  cancelClick(): void
  {
    this.cancel.emit(null);
  }

  // save click
  saveClick() : void
  {
    if (this.isValid())
    {
      var s = this.servers.find(sv => sv.Version == this.selectedVersion);
      var featuresWithDependencies = this.getDependencies(this.selectedFeatures, s.Features);

      var e = new FeatureEventArgs(featuresWithDependencies, this.selectedEnsure, this.selectedCredential);

      this.save.emit(e);
    }
  }
  getDependencies(values: string[], features: Feature[]): string[]
  {
    var fullList: string[] = [];

    for (let val of values)
    {
      var feat = features.find(f => f.Name === val);
      if (feat.DependsOn.length > 0)
      {
        var dependencies = this.getDependencies(feat.DependsOn, features);
        for (let dep of dependencies)
        {
          if (fullList.find(v => v === dep) === undefined)
          {
            fullList.push(dep);
          }
        }
      }

      if (fullList.find(v => v === val) === undefined)
      {
        fullList.push(val);
      }
    }

    return fullList;
    //console.info(arr1.concat(arr2));
  }
  isValid(): boolean
  {
    if (this.selectedVersion.trim().length === 0)
    {
      this.errorMessage = "select an operating system";
      return false;
    }

    if (this.selectedFeatures.length == 0)
    {
      this.errorMessage = "choose the features";
      return false;
    }

    this.errorMessage = "";
    return true;
  }
}