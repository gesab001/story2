import { Component, OnInit } from '@angular/core';
import { StateGroup } from '../stategroup';
import {Observable} from 'rxjs';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { StoryService} from '../story.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass'],
  providers: [StoryService]

})
export class HomepageComponent implements OnInit {

 stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });
  subscription;

  stateGroups: StateGroup[];
  storytitle: string;
  stateGroupOptions: Observable<StateGroup[]>;
  
  constructor(private _formBuilder: FormBuilder,  private storyService: StoryService) { }

  ngOnInit() {
    this.loadData();
  }

 loadData() {
    this.subscription = this.storyService.getData().subscribe(
      res => (this.stateGroups = res),
      error => console.log(error),
    );
  }

  getPoster(name){
     var folder = name.replace(/\s/g, "").toLowerCase();
     return "https://gesab001.github.io/assets/images/"+folder+"/poster.jpg";
  }
  
  isTitleNull(event){
     var count = event.names.length;
     if (count>0){
        return true;
     }else{
          return false;

     }
  }
  
  isSwipeNeeded (event){
     var count = event.names.length;
     if (count>7){
        return true;
     }else{
          return false;

     }
  }
  
  swipeNext(id){
     var element = document.getElementById(id);
     element.scrollLeft += 1300;
     
  }
  
  swipePrev(id){
     var element = document.getElementById(id);
     element.scrollLeft -= 1300;
     
  }
}
