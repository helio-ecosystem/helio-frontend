import { NgModule } from '@angular/core';
import { ErrorModule } from './error/error.module';
import { HomeModule } from './home/home.module';
import { MarketplaceModule } from "./marketplace/marketplace.module";
import { LayoutsModule } from "../layouts/layouts.module";
import { MappingModule } from "./mapping/mapping.module";
import { PlaygroundModule } from "./playground/playground.module";

@NgModule({
    imports: [
      LayoutsModule,
      HomeModule,
      MarketplaceModule,
      MappingModule,
      PlaygroundModule,
      ErrorModule
    ],
    declarations: [],
    exports: []
})
export class ComponentsModule {}
