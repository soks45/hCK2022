import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () => import('@pages/sign-in-page/sign-in-page.module').then((m) => m.SignInPageModule),
  },
  {
    path: 'main-page',
    loadChildren: () => import('@pages/main-page/main-page.module').then((m) => m.MainPageModule),
  },
  {
    path: 'not-found',
    loadChildren: () => import('@pages/not-found-page/not-found-page.module').then((m) => m.NotFoundPageModule),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
