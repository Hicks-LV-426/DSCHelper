import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MenuItem } from './menu-item';
import { MenuService } from './menu.service';
import { NavigationService} from '../navigation/navigation.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'app/menu/menu.component.html',
  styleUrls: ['app/menu/menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {

  constructor(private menuService : MenuService, private navigationService : NavigationService)
  {}

  @Input() root : string = null;

  submenuVisible : boolean = false;
  menuVisible : boolean = false;
  selectedItem : string = null;

  items : MenuItem[];

  bind()
  {
    if(this.menuService != null)
    {
      if(this.root === null || this.root.length === 0)
      {
        this.items = this.menuService.getItems();
      }
      else
      {
        this.items = this.menuService.getItemsByRoot(this.root);
      }
      this.menuVisible = this.items != undefined && this.items != null && this.items.length > 0;
    }
  }
  menuItemClicked(value : string) : void
  {
    this.selectedItem = value;

    var children = this.menuService.getItemsByRoot(value);
    if(children != null && children.length > 0)
    {
       this.submenuVisible = !this.submenuVisible;
    }
    else
    {
      this.submenuVisible = false;
      this.navigationService.navigate(value);
    }
  }

  ngOnInit() 
  {
    this.bind();
    this.navigationService.onNavigate.subscribe(value => this.onNavigate(value));

  }
  onNavigate(value : any)
  {
    this.submenuVisible = false;
  }
  ngOnChanges(changes : SimpleChanges)
  {
    if(changes['root'].previousValue === undefined) return;
    
    if(changes['root'].previousValue != changes['root'].currentValue)
    {
      this.bind();
    }
  }

}