import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment.dev';
import { AppService } from '../app.service';
import { ErrorService } from '../error/error.service';
import { Observable, catchError, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthnService {

  constructor(
    private _errorService: ErrorService,
    private _appService: AppService,
    private _httpClient: HttpClient,
  ) {  }



}
