import { NgModule } from '@angular/core';
import { ErrorModule } from './error/error.module';
import { HomeModule } from './home/home.module';
import {ComponentModule} from "./component/component.module";
import {LayoutsModule} from "../layouts/layouts.module";

@NgModule({
    imports: [
        LayoutsModule,
        HomeModule,
        ComponentModule,
        ErrorModule
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class ComponentsModule {}
