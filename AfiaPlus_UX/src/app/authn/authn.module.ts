import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { environment } from 'src/environments/environment.dev';

import { AuthnRoutingModule } from './authn-routing.module';
import { AuthnComponent } from './authn.component';


@NgModule({
  declarations: [
    AuthnComponent

  ],
  imports: [
    CommonModule,
    AuthnRoutingModule,
    ReactiveFormsModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatProgressBarModule
  ],
  providers: [
    provideHttpClient()
  ],

})
export class AuthnModule { }
