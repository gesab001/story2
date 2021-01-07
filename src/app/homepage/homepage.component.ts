import { Component, OnInit, ViewChild } from '@angular/core';
import { StateGroup } from '../stategroup';
import {Observable} from 'rxjs';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { StoryService} from '../story.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass'],
  providers: [StoryService]

})
export class HomepageComponent implements OnInit {
  panelOpenState = false;
  isSearchBar: boolean = false;
  isMobile: boolean;
  isHoverState: boolean = false;
  isDefaultState: boolean = true;
  isDesktop: boolean;
 stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });
  subscription;

  stateGroups: StateGroup[];
  newGroups: StateGroup[];
  storytitle: string;
  stateGroupOptions: Observable<StateGroup[]>;
  
  constructor(private deviceService: DeviceDetectorService, private _formBuilder: FormBuilder,  private storyService: StoryService) { 
      this.checkDeviceType();
      
  }

  ngOnInit() {
    this.loadData();
  }

  checkDeviceType() {
 
      this.isMobile = this.deviceService.isMobile();
      this.isDesktop = this.deviceService.isDesktop();
      //console.log("ismobile: " + this.isMobile);
      //console.log("isDesktop: " + this.isDesktop);
      //alert("ismobile: " + this.isMobile);

    }
    
 loadData() {
    this.subscription = this.storyService.getData().subscribe(
      res => (this.stateGroups = res["atoz"]),
      error => console.log(error),
    );
  }

  getPoster(name){
     var folder = name.replace(/\s/g, "").toLowerCase();
     return "https://gesab001.github.io/assets/images/"+folder+"/poster.jpg";
  }
  
  isTitleNull(event){
     var count = event.names.length;
     console.log("count: " + count);
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
  
  imageHoverIn(dom){
      var defaultState = dom.childNodes[0].childNodes[0].childNodes[0];
      defaultState.style.display = "none";
      var hoverState = dom.childNodes[0].childNodes[0].childNodes[1];
      hoverState.style.display = "block";

 
  }
  imageHoverOut(dom){
     var defaultState = dom.childNodes[0].childNodes[0].childNodes[0];
     defaultState.style.display = "block";
     var hoverState = dom.childNodes[0].childNodes[0].childNodes[1];
     hoverState.style.display = "none";

  }
  
  showSearchBar(){
      this.isSearchBar = true;    
  }
  
  hideSearchBar(){
      this.isSearchBar = false;
  }
  
  openSideNav(){
    var nav = document.getElementById("side-menu"); 
    nav.style.width = "100%";
    var menuItems = document.getElementById("menu-items");
    menuItems.style.display = "block";
    var items = document.getElementById("items");
    items.style.display = "block";

  }
  
  closeSideNav(){
    var nav = document.getElementById("side-menu");
    nav.style.width = "0%";
    var menuItems = document.getElementById("menu-items");
    menuItems.style.display = "block";
    var items = document.getElementById("items");
    items.style.display = "none";
  }
}
