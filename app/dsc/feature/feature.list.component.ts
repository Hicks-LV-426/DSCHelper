import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DependencyCoordinator } from './dependency.coordinator';
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

  selectedFeatures: string[] = [];

  constructor(private _coordinator: DependencyCoordinator) { }
  ngOnInit() { }

  getFeatures(): Feature[]
  {
    if (this.features === undefined) return [];

    return this.features.filter(f => f.Parent === this.parent).sort((n1, n2) => n1.Name > n2.Name ? 1 : 0);
  }
  isSelected(name: string): boolean
  {
    return this.selectedFeatures.find(f => f === name) != undefined;
  }
  itemToggle(name: string)
  {
    if (this.isSelected(name))
    {
      this.selectedFeatures.splice(this.selectedFeatures.indexOf(name), 1);
      this._coordinator.remove(name);
    }
    else
    {
      this.selectedFeatures.push(name);
      this._coordinator.add(name);
    }
  }
}