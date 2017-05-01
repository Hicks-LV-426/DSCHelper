import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';

import { HelperCore } from './core/core';
import { SqlService } from './services/sql.service';
import { InjectorDirective } from './core/injector';

import { CoreViewerComponent } from './components/core.viewer';
import { TestComponent } from './components/test';
import { PageNotFoundComponent } from './components/page.not.found';
import { SqlComponent } from './components/sql';

const appRoutes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'core', component: CoreViewerComponent },
  { path: 'sql', component: SqlComponent },
  {
    path: '',
    redirectTo: '/core',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), BrowserModule, FormsModule, HttpModule],
  providers: [HelperCore, SqlService],
  declarations: [AppComponent, InjectorDirective, PageNotFoundComponent, CoreViewerComponent, TestComponent, SqlComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
