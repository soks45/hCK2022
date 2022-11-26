import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
