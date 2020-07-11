import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { StoryService} from './story.service';
import { StateGroup } from './stategroup';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [StoryService]
})
export class AppComponent {
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

  constructor(private _formBuilder: FormBuilder, private storyService: StoryService) {}

  ngOnInit() {
    this.loadData();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
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

}
