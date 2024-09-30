import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { ErrorService } from 'src/app/error/error.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _errorService: ErrorService
  ) { }

  uploadFile(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/files/upload`, data, this._appService.httpOptionsMultipartForm).pipe(catchError(this._errorService.handleError));
  }

  newPost(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/blog/new`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }


  updatePost(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/blog/update`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  getPost(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/blog`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }


  getPosts(): Observable<any> {
    return this._httpClient.get(`${ this._appService.ConvexAPIEndpoint }/blog`, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  getPostsByUser(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/blog/user`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  getImage(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.ConvexAPIEndpoint }/image`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }


}
