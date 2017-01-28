import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Popup } from '../popup/popup';

@Component({
  selector: 'app-header',
  templateUrl: 'app/header/header.component.html',
  styleUrls: ['app/header/header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  title: string = "Desired State Configuration Helper";
  popup: Popup = new Popup();
  menuItems : string[] = ["New", "Save", "Open", "Help", "About", "Donate"];
  @Output() select : EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {}
  menuItemClicked(value : string)
  {
    this.select.emit(value);
    this.popup.hide();
  }
  
  //toggleMenu()
  //{
  //  this.menuVisible = !this.menuVisible;
  //}
  //getMenuVisibility() : string
  //{
  //  return this.menuVisible ? "show" : "hide";
  //}
  //getMenuButtonClass() : string
  //{
  //  return this.menuVisible ? " popup-button-selected" : "";
  //}
  //handleMenuMouseOut()
  //{
  //  this.menuMouseOver = false;
  //  setTimeout(() => 
  //    {
  //      if(!this.menuMouseOver && this.menuVisible) this.menuVisible = false;
  //    }, 
  //    800);//the timeout 500ms
  //}
  //handleMenuMouseOver()
  //{
  //  this.menuMouseOver = true;
  //}
}