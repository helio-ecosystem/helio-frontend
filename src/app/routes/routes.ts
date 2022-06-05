import { ErrorComponent } from '../components/error/error.component';
import {MainComponent} from "../layouts/main/main.component";

export const routes = [

    {
        path: '',
        component: MainComponent,
        children: [
            { path: 'home', loadChildren: () => import('../components/home/home.module').then(m => m.HomeModule) },
            { path: 'components', loadChildren: () => import('../components/component/component.module').then(m => m.ComponentModule) }
        ]
    },

    // Not found
    {   path: '**', component: ErrorComponent },

];
