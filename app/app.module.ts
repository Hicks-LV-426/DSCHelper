import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MenuService } from './menu/menu.service';
import { NavigationService} from './navigation/navigation.service';

import { AppComponent }  from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { CollectionComponent } from './dsc/collection/collection.component';
import { ParameterComponent } from './dsc/parameter/parameter.component';
import { ScriptComponent } from './dsc/script/script.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HeaderComponent, MenuComponent, CollectionComponent, ParameterComponent, ScriptComponent ],
  bootstrap:    [ AppComponent ],
  providers: [MenuService, NavigationService]
})
export class AppModule { }
