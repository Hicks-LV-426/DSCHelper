import { Component, OnInit } from '@angular/core';

import { FeatureService } from './feature.service';
import { DependencyCoordinator } from './dependency.coordinator';
import { Server } from './server';
import { Feature } from './feature';
 
@Component({
  selector: 'dsc-feature',
  templateUrl: 'app/dsc/feature/feature.component.html',
  styleUrls: ['app/dsc/feature/feature.component.css'],
  providers: [DependencyCoordinator]
})
export class FeatureComponent implements OnInit 
{
  selectedVersion: string = "";
  servers: Server[];


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
      console.info(value + " added")
      //console.info(arr1.concat(arr2));
    });
    this._coordinator.itemRemoved.subscribe((value) => {
      console.info(value + " removed")
      //console.info(arr1.concat(arr2));
    });
  }
  getFeatures(): Feature[]
  {
    if (this.servers === undefined) return [];

    var s = this.servers.find(sv => sv.Version == this.selectedVersion);
    if (s === undefined) return [];

    return s.Features;
  }
}