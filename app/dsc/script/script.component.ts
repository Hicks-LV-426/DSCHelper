import { Component, Input, OnInit } from '@angular/core';
import { Collection } from '../collection/collection';

@Component({
  selector: 'dsc-script',
  templateUrl: 'app/dsc/script/script.component.html',
  styleUrls: ['app/dsc/script/script.component.css']
})
export class ScriptComponent implements OnInit 
{
  constructor() { }
  ngOnInit() { }

  @Input() collection : Collection;

  getContent() : string
  {
    return this.collection.serialize();
  }
}