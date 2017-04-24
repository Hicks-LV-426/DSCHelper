import { Component, OnInit } from '@angular/core';

import { HelperCore } from './core/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent implements OnInit
{
  constructor(private _core: HelperCore) { }
  ngOnInit()
  {
    this._core.addItem('app component');
  }
}
