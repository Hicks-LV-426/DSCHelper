import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';

import { MenuService } from './menu/menu.service';
import { NavigationService} from './navigation/navigation.service';
import { FeatureService } from './dsc/feature/feature.service';
import { RulesService } from './dsc/firewall/rules.service';

import { SelectedValueComponent } from './selected-value/selected.value';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { CollectionComponent } from './dsc/collection/collection.component';
import { ParameterComponent } from './dsc/parameter/parameter.component';
import { ScriptComponent } from './dsc/script/script.component';
import { CredentialComponent } from './dsc/credential/credential.component';
import { FeatureComponent } from './dsc/feature/feature.component';
import { FeatureListComponent } from './dsc/feature/feature.list.component';
import { FirewallComponent } from './dsc/firewall/firewall.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [
    AppComponent,
    SelectedValueComponent,
    HeaderComponent,
    MenuComponent,
    CollectionComponent,
    ParameterComponent,
    ScriptComponent,
    CredentialComponent,
    FeatureComponent,
    FeatureListComponent,
    FirewallComponent
  ],
  bootstrap: [AppComponent],
  providers: [MenuService, NavigationService, FeatureService, RulesService]
})
export class AppModule { }
