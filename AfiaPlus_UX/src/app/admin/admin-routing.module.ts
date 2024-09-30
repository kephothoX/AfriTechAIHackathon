import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'new', title: 'New KnowledgeBase',  component: UploadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
