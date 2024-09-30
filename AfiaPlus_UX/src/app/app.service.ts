import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment.dev';
import { ErrorService } from './error/error.service';
import { Observable, catchError, of} from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private _errorService: ErrorService,
    private _httpClient: HttpClient,
    private _matSnackBar: MatSnackBar
  ) {  }

  httpOptionsMultipartForm = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data; boundary=---AfiaPlus',
    }),
  }

  httpOptionsPlainForm = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    response: 'json'
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    response: 'json'
  }



  ConvexAPIEndpoint = environment.ConvexAPIEndpoint;
  PythonAPIEndpoint = environment.PythonAPIEndpoint;



  ping(): Observable<any> {
    return this._httpClient.get(`${ this.PythonAPIEndpoint }/`).pipe(catchError(this._errorService.handleError));
  }


  prompt(data: any): Observable<any>{
    return this._httpClient.post(`${ this.PythonAPIEndpoint }/prompt`, data).pipe(catchError(this._errorService.handleError));
  }

  chat(data: any): Observable<any>{
    return this._httpClient.post(`${ this.PythonAPIEndpoint }/chat`, data).pipe(catchError(this._errorService.handleError));
  }

  translate(data: any): Observable<any>{
    return this._httpClient.post(`${ this.PythonAPIEndpoint }/translate`, data).pipe(catchError(this._errorService.handleError));
  }

  translateHTMLContent(data: any): Observable<any>{
    return this._httpClient.post(`${ this.PythonAPIEndpoint }/translate-html`, data).pipe(catchError(this._errorService.handleError));
  }

  selfDiagnosis(data: any): Observable<any>{
    return this._httpClient.post(`${ this.PythonAPIEndpoint }/self-diagnosis`, data).pipe(catchError(this._errorService.handleError));
  }


}
