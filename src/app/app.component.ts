import {Component, ViewChild, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { StoryService} from './story.service';
import { StateGroup } from './stategroup';
import { LogUpdateService } from './log-update.service';
import { DropboxService } from './dropbox/dropbox.service';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [StoryService, LogUpdateService, DropboxService ]
})
export class AppComponent {
  @ViewChild('drawer')drawer;
 clearCacheConfirm: string;
 stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });

  stateGroups: StateGroup[];
  storytitle: string;
  stateGroupOptions: Observable<StateGroup[]>;
  subscription;
  title = 'story';
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(private _formBuilder: FormBuilder, private storyService: StoryService, private logUpdateService: LogUpdateService, private dropboxService: DropboxService) {
  
    document.addEventListener(
	    "visibilitychange",
		() => {
		  if (document.hidden){
             console.log("document is hidden");
		  }else{
                  document.location.reload();
				 
                   
		  }			  			  

		}
		);
	}

  ngOnInit() {

    //this.loadData();
    this.loadDataFromDropbox();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
      
          this.logUpdateData(); 
  }

 logUpdateData() {
       this.logUpdateService.getAvailableUpdate();
  }
  
  clearCache(){
     this.storyService.clearCache();
     this.clearCacheConfirm = "cache cleared";
  }
  loadData() {
    this.subscription = this.storyService.getData().subscribe(
      res => (this.stateGroups = res),
      error => console.log(error),
    );
  }
  loadDataFromDropbox() {
    this.subscription = this.dropboxService.getStoryList().subscribe(
      res => (this.stateGroups = res),
      error => console.log(error),
    );
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  public onRouterOutletActivate(event : any) {

  }

  openDrawer(evt) {
     this.drawer.open();
  }

  getPoster(name){
     var folder = name.replace(/\s/g, "").toLowerCase();
     console.log("folder:", folder);
     return "https://gesab001.github.io/assets/images/"+folder+"/poster.jpg";
  }

}
