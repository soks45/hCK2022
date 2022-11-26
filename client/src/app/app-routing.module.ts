import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UnauthorizedGuard } from './auth/guards/unauthorized.guard';
import { EmployeeGuard } from './auth/guards/employee.guard';
import { OrganizationGuard } from './auth/guards/organization.guard';
import { SuperUserGuard } from './auth/guards/super-user.guard';
import { AuthGuard } from './auth';
import { InviteGuard } from './auth/guards/invite.guard';

const routes: Routes = [
  {
    path: 'main-page',
    loadChildren: () => import('@pages/main-page/main-page.module').then((m) => m.MainPageModule),
    canActivate: [UnauthorizedGuard]
  },
  {
    path: 'request-page',
    loadChildren: () => import('@pages/request-page/request-page.module').then((m) => m.RequestPageModule),
    canActivate: [UnauthorizedGuard]
  },
  {
    path: 'employee',
    loadChildren: () => import('@pages/default-employee-page/default-employee-page.module').then((m) => m.DefaultEmployeePageModule),
    canActivate: [EmployeeGuard]
  },
  {
    path: 'employee-list',
    loadChildren: () => import('@pages/employee-list-page/employee-list-page.module').then((m) => m.EmployeeListPageModule),
    canActivate: [OrganizationGuard]
  },
  {
    path: 'organisation-list',
    loadChildren: () => import('@pages/organizations-list-page/organizations-list-page.module').then((m) => m.OrganizationsListPageModule),
    canActivate: [SuperUserGuard]
  },
  {
    path: 'invite',
    loadChildren: () => import('@pages/registration-page/registration-page.module').then((m) => m.RegistrationPageModule),
    canActivate: [InviteGuard]
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
