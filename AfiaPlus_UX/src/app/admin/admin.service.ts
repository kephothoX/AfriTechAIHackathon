import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of} from 'rxjs';
import { ErrorService } from '../error/error.service';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private _appService: AppService,
    private _httpClient: HttpClient,
    private _errorService: ErrorService
  ) { }


  newKnowledgeBase(data: any): Observable<any>{
    return this._httpClient.post(`${ this._appService.PythonAPIEndpoint }/embeddings/new`, data).pipe(catchError(this._errorService.handleError));
  }
}
