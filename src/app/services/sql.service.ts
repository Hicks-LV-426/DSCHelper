import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SqlGroup } from '../classes/sql.group';
import 'rxjs/add/operator/toPromise';

const FILE_URL: string = 'app/resources/sql.json';

@Injectable()
export class SqlService
{
  constructor(private _http: Http) { }

  public getGroup(): Promise<SqlGroup>
  {
    console.info("app/services/sql.service.ts is running in Debug mode");
    return this._http.get(FILE_URL)
      .toPromise()
      .then(r => r.json())
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any>
  {
    console.error('Debug: sql.service.ts.getServers.error', error); // debug only - not for prod use
    return Promise.reject(error.message || error);
  }
}