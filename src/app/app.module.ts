declare var require: any;
declare var module: any;

import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AngularFireModule } from 'angularfire2';

import services from './services';

import { AppComponent } from './app.component';

import components from './components';
import pipes from './pipes';
import directives from './directives';

import { rootRouterConfig } from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    pipes,
    directives,
    components
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule,
    RouterModule.forRoot(rootRouterConfig),
    AngularFireModule.initializeApp(environment.firebase.config, environment.firebase.authConfig),
  ],
  providers: [
    services,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
