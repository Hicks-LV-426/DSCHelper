import { Component, OnInit, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';

import { HelperCore } from '../core/core';

@Component({
  selector: 'core-viewer',
  templateUrl: 'app/components/core.viewer.html',
  styleUrls: ['app/components/core.viewer.css']
})
export class CoreViewerComponent implements OnInit
{
  title : string = "DSC Genome Project";

  constructor(private _core: HelperCore) { }

  ngOnInit()
  {
    this._core.addItem('core component');
  }
}