import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Rule } from './rule';

const FILE_URL: string = 'app/dsc/firewall/rules.list.json';


@Injectable()
export class RulesService
{
  constructor(private _http: Http) { }

  // private get servers and error handling
  public getServers(): Promise<Rule[]>
  {
    console.info("app/dsc/firewall/rule.service.ts is running in Debug mode");
    return this._http.get(FILE_URL)
      .toPromise()
      .then(r => r.json())
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any>
  {
    console.error('Debug: FeatureService.getServers.error', error); // debug only - not for prod use
    return Promise.reject(error.message || error);
  }
}