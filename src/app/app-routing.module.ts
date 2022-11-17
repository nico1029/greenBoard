import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./modules/user/components/sign-in/sign-in.component').then(
        (
          m: typeof import('./modules/user/components/sign-in/sign-in.component')
        ) => m.SignInComponent
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m: typeof import('./modules/dashboard/dashboard.module')) =>
          m.DashboardModule
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/components/page-not-found/page-not-found.component').then(
        (
          m: typeof import('./core/components/page-not-found/page-not-found.component')
        ) => m.PageNotFoundComponent
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
