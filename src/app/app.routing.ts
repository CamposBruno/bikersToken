
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { AppComponent } from './app.component';
import { MainWrapperComponent } from './main-wrapper/main-wrapper.component';
import { BecomeComponent } from './become/become.component';



const APP_ROUTES: Routes = [
    { path : '', component: MainWrapperComponent,  pathMatch : 'full'},
    { path : 'become', component: BecomeComponent,  pathMatch : 'full'},
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
