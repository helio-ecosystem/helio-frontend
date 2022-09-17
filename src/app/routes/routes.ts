import { ErrorComponent } from '../components/error/error.component';
import { MainComponent } from "../layouts/main/main.component";

export const routes = [

    {
        path: '',
        component: MainComponent,
        children: [
            { path: 'home', loadChildren: () => import('../components/home/home.module').then(m => m.HomeModule) },
            { path: 'marketplace', loadChildren: () => import('../components/marketplace/marketplace.module').then(m => m.MarketplaceModule) },
            { path: 'mappings', loadChildren: () => import('../components/mapping/mapping.module').then(m => m.MappingModule) },
            { path: 'playground', loadChildren: () => import('../components/playground/playground.module').then(m => m.PlaygroundModule) },
            { path: 'tour', loadChildren: () => import('../components/tour/tour.module').then(m => m.TourModule) }
        ]
    },

    // Not found
    {   path: '**', component: ErrorComponent },

];
