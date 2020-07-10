import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { StateGroup } from './stategroup';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { tap } from 'rxjs/operators';
import {publishReplay, refCount} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StoryService {
  _data: any = null;

  private handleError: HandleError;
  url = 'https://gesab001.github.io/assets/story/stories.json';
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('StoryService');
  }

  clearCache() {
    this._data = null;
  }

  /** GET heroes from the server */
  getDataList (): Observable<StateGroup[]> {
    return this.http.get<StateGroup[]>(this.url)
      .pipe(
        catchError(this.handleError('getDataList', []))
      );
  }

  getData() {
    if (!this._data) {
      this._data = this.http
        .get(this.url)
        .pipe(publishReplay(1), refCount());
    }
    return this._data;
  }

  getCachedData(){
          return this._data;
  }
}
