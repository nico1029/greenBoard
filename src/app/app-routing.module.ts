import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m: typeof import('./modules/dashboard/dashboard.module')) =>
          m.DashboardModule
      ),
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
