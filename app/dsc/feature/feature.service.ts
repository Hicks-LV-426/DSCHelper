import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Server } from './server';

const FEATURES_FILE_URL: string = 'app/dsc/feature/features.json';

@Injectable()
export class FeatureService
{
  constructor(private _http: Http) { }

  // private get servers and error handling
  public getServers(): Promise<Server[]>
  {
    return this._http.get(FEATURES_FILE_URL)
      .toPromise()
      .then(r => r.json())
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any>
  {
    console.error('FeatureService.getServers.error', error); // debu only - not for prod use
    return Promise.reject(error.message || error);
  }
}