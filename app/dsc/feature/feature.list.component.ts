import { Component, OnInit, Input, Output } from '@angular/core';

import { Feature } from './feature';

@Component({
  selector: 'dsc-feature-list',
  templateUrl: 'app/dsc/feature/feature.list.component.html',
  styleUrls: ['app/dsc/feature/feature.list.component.css']
})
export class FeatureListComponent implements OnInit
{
  @Input() features: Feature[];

  constructor() { }
  ngOnInit(){}
}