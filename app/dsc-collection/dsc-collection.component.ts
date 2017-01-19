import { Component, OnInit } from '@angular/core';
import { Argument } from '../argument';

@Component({
  selector: 'dsc-collection',
  templateUrl: './dsc-collection.component.html',
  styleUrls: ['./dsc-collection.component.css']
})
export class DscCollectionComponent implements OnInit {

  constructor(args : Argument[]) { }

  ngOnInit() {
  }

}