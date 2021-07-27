import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { tap } from 'rxjs/operators';
import {publishReplay, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DropboxService {
  _data: any = null;
  private handleError: HandleError;

  params = new HttpParams()
  .set('path', '/stories.json')
  .set('mode', 'add')
  .set('autorename', 'true')
  .set('mute', 'false')
  .set('strict_conflict', 'false');
  
  constructor(
    private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('DropboxService');
  }

  clearCache() {
    this._data = null;
  }

  getStoryList(){
    let url = 'https://content.dropboxapi.com/2/files/download';
    let token = 'ov1Fn0M5gUgAAAAAAAAAAUH__lAitVjxIuHNTfxKDKUvWPyyElPaTre_sLqx26g2';
    this.clearCache();
    if (!this._data) {
      this._data = this.http
        .post(url, null,{headers: {
            "Authorization": "Bearer " + token,
            "Dropbox-API-Arg": "{\"path\": \"/stories.json\"}"
         }})
        .pipe(publishReplay(1), refCount());
    }
    return this._data;
  }
  getStory(filename) {
    var path = "articles/"+filename;
    this.clearCache();
    let url = 'https://content.dropboxapi.com/2/files/download';
    let token = 'ov1Fn0M5gUgAAAAAAAAAAUH__lAitVjxIuHNTfxKDKUvWPyyElPaTre_sLqx26g2';
    this.clearCache();
    if (!this._data) {
      this._data = this.http
        .post(url, null,{headers: {
            "Authorization": "Bearer " + token,
            "Dropbox-API-Arg": "{\"path\": \"/"+path+"\"}"
         }})
        .pipe(publishReplay(1), refCount());
    }
    return this._data;
  }
    
  updateHistory(jsondata: string) {
    let url = 'https://content.dropboxapi.com/2/files/upload';
    let token = '4mFTnt2XoDYAAAAAAAAAAdgicpARclZsURJj1s_N7qCQ-Qo4bRnX-oXv6dQxo-Jb';
    this.clearCache();
    if (!this._data) {
      this._data = this.http
        .post(url, jsondata, {headers: {
            "Authorization": "Bearer " + token,
            "Dropbox-API-Arg": "{\"path\": \"/history.json\",\"mode\": \"overwrite\",\"autorename\": true,\"mute\": false,\"strict_conflict\": false}",
            "Content-Type": "application/octet-stream"
         }})
        .pipe(publishReplay(1), refCount());
    }
    return this._data;
  }
}
