import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutesModule } from './routes/routes.module';
import { LayoutsModule } from './layouts/layouts.module';
import { ComponentsModule } from './components/components.module';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor} from "@angular/common/http";
import {environment} from "../environments/environment";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    RoutesModule,
    LayoutsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: environment.interceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
