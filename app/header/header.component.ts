import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'app/header/header.component.html',
  styleUrls: ['app/header/header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  title : string = "Desired State Configuration Helper";
  menuVisible : boolean = false;
  menuMouseOver : boolean = false;

  ngOnInit() {
  }
  toggleMenu()
  {
    this.menuVisible = !this.menuVisible;
  }
  getMenuVisibility() : string
  {
    return this.menuVisible ? "show" : "hide";
  }
  getMenuButtonClass() : string
  {
    return this.menuVisible ? " header-menu-open" : "";
  }
  handleMenuMouseOut()
  {
    this.menuMouseOver = false;
    setTimeout(() => 
      {
        if(!this.menuMouseOver && this.menuVisible) this.menuVisible = false;
      }, 
      500);//the timeout 500ms
  }
  handleMenuMouseOver()
  {
    this.menuMouseOver = true;
  }
}