import { Component, OnInit, Input } from '@angular/core';

import { Feature } from './feature';

@Component({
  selector: 'dsc-feature-list',
  templateUrl: 'app/dsc/feature/feature.list.component.html',
  styleUrls: ['app/dsc/feature/feature.list.component.css']
})
export class FeatureListComponent implements OnInit
{
  @Input() features: Feature[];
  @Input() parent: string;

  constructor() { }
  ngOnInit() { }

  getFeatures(): Feature[]
  {
    if (this.features === undefined) return [];

    return this.features.filter(f => f.Parent === this.parent).sort((n1, n2) => n1.Name > n2.Name ? 1 : 0);
  }
}