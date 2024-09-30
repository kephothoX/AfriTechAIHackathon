import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './authn/auth.guard'


const routes: Routes = [
  { path: '', redirectTo: '/authn', pathMatch: 'full' },

  { path: 'authn', loadChildren: () => import('./authn/authn.module').then(m => m.AuthnModule) },

   { path: '404', title: 'Error', redirectTo: '/error' },
  { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  { path: 'diagnosis', loadChildren: () => import('./diagnosis/diagnosis.module').then(m => m.DiagnosisModule) },

  { path: '**', title: 'Error', redirectTo: '/error' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
