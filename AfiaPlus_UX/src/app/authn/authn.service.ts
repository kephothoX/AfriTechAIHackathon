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


  signIn(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/auth/signin`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  getUserWithEmail(data: Object): Observable<any> {
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/users/email`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  getUser(data: Object): Observable<any> {
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/user`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  ifUserAuthenticated(data: Object): Observable<any> {
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/users/auth`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  updateUser(data: Object): Observable<any> {
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/users/update`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  getVerifier(data: Object): Observable<any> {
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/users/verifier`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  uploadFile(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/files/upload`, data, this._appService.httpOptionsMultipartForm).pipe(catchError(this._errorService.handleError));
  }


}
