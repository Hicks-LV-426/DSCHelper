import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MenuService } from './menu/menu.service';
import { NavigationService} from './navigation/navigation.service';

import { AppComponent }  from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, HeaderComponent, MenuComponent ],
  bootstrap:    [ AppComponent ],
  providers: [MenuService, NavigationService]
})
export class AppModule { }
