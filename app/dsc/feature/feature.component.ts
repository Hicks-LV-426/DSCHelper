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
  versions: string[] = ["2012 R2", "2016"];
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
}