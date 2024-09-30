import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule, } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment.dev';
import { provideHttpClient } from '@angular/common/http';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule  } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './components/header/header.component'
import { ProfileDirective } from './directives/profile.directive';


@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    ProfileDirective,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    NgbModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCardModule,
    AuthModule.forRoot({
      domain: 'kephothosolutions.us.auth0.com',
      clientId: environment.Auth0ClientID,
     authorizationParams: {
      audience: 'https://kephothosolutions.us.auth0.com/api/v2/',
      redirect_uri: 'http://localhost:4201/authn'
     }
  })

  ],
  providers: [
    provideHttpClient(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


