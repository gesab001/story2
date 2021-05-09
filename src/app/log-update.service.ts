import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})

export class LogUpdateService {
  _data: any = null;
  updates: SwUpdate;   
  constructor(updates: SwUpdate) {
       this.updates = updates;
  
  }

  clearCache() {
    this._data = null;
  }
  
  getAvailableUpdate(){ 
      this.clearCache();
	 // console.log("log update service get available update");
	 // alert("checking for updates");
	  this.updates.available.subscribe(event => {
        console.log('current version is', event.current.hash);
		alert('current version is '+ event.current.hash + ', available version is' + event.available.hash);
        console.log('available version is', event.available.hash);
		var promptUser = confirm("update available. press ok to update");
		if (promptUser) {
			this.updates.activateUpdate().then(() =>
				document.location.reload());
		}
      });

  }
  
  getActivatedUpdate(){
	  this.updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
	  var string = 'old version: ' + event.previous.hash + " > " + "new version: " + event.current.hash;
	  alert(string);
    });
  }
  
  checkForUpdates(){
	  alert("checking for updates");
	  this.updates.checkForUpdate().then(value => {console.log(value)}).catch(err => {console.log(err)});
  }
}
