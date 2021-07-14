import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Writing } from './writing';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { tap } from 'rxjs/operators';
import {publishReplay, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WritingService {
  _data: any = null;

  private handleError: HandleError;
  url = 'https://gesab001.github.io/assets/story/articles/';
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('WritingService');
  }

  clearCache() {
    this._data = null;
  }

  /** GET heroes from the server */
  getDataList (): Observable<Writing[]> {
    return this.http.get<Writing[]>(this.url)
      .pipe(
        catchError(this.handleError('getDataList', []))
      );
  }

  getData(filename) {
    this.clearCache();
    if (!this._data) {
      this._data = this.http
        .get(this.url+filename)
        .pipe(publishReplay(1), refCount());
    }
    return this._data;
  }

  getCachedData(){
          return this._data;
  }
}
