// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { HomeComponent } from './home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        LayoutsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        RouterModule
    ]
})
export class HomeModule {
    static section = 'Home';
    static uri = '/home';
}
