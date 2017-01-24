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
  menuVisible : boolean = false;

  getContent() : string
  {
    return this.collection.serialize();
  }

  onMenuClick()
  {
    this.menuVisible = !this.menuVisible;
  }
  getMenuClass() : string
  {
    return this.menuVisible ? "show" : "hide";
  }
}