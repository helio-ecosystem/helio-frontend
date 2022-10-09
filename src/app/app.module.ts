import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutesModule } from './routes/routes.module';
import { LayoutsModule } from './layouts/layouts.module';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from "@angular/common/http";
import { MarketplaceService } from './services/marketplace.service';
import { ConfigService } from './services/config.service';


const appInitializerFn = (configService: ConfigService) => {
  return () => {
    return configService.setConfig();
  };
};


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
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [ConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
