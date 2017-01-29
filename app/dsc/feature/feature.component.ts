import { Component, OnInit } from '@angular/core';

import { FeatureService } from './feature.service';
import { Server } from './server';
import { Feature } from './feature';
 
@Component({
  selector: 'dsc-feature',
  templateUrl: 'app/dsc/feature/feature.component.html',
  styleUrls: ['app/dsc/feature/feature.component.css']
})
export class FeatureComponent implements OnInit 
{
  selectedVersion: string = "";
  servers: Server[];


  constructor(private _featureService : FeatureService ){}
	ngOnInit()
  {
    var promise = this._featureService.getServers().then((servers) =>
    {
      this.servers = servers;
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