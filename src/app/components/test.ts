import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'helper-test',
  templateUrl: 'app/components/test.html',
})
export class TestComponent implements OnInit
{ 
  displayName: string;
  constructor()
  {
  }
  ngOnInit()
  {
    this.displayName = 'Very injected component';
  }
}
