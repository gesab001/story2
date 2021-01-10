import { Component, OnInit, ViewChild } from '@angular/core';
import { StateGroup } from '../stategroup';
import { TitleGroup } from '../titlegroup';
import {Observable} from 'rxjs';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {map, startWith, filter} from 'rxjs/operators';
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
  isSearchMode: boolean = false;
  isDefaultMode: boolean = true;
  stateGroups: StateGroup[];
  stateGroupsSearchable: any = [];
  filteredStateGroups: StateGroup[];
  searchResultsStateGroup; 
  latestTitle: string;
  latestDescription: string;
  newList: any = null;
  searchableTitles: [];
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
 
 setSearchData(group: StateGroup[]){
    for (var x=0; x<group.length; x++){
        var names = group[x]["names"];
        if(names.length>0){
           for (var y=0; y<names.length; y++){
                 this.stateGroupsSearchable.push(names[y]);
           }
        }
    }
         console.log(this.stateGroupsSearchable);

 }
    
 loadData() {
    this.subscription = this.storyService.getData().subscribe(
      res => (this.stateGroups = res["atoz"], this.setSearchData(res["atoz"]), this.newList = res["new"], this.loadCoverImage()),
      error => console.log(error),
    );
  }

  loadCoverImage(){
     var element = document.getElementById("cover-image");
     var latestIndex = this.newList.length - 1;
     var url = this.newList[latestIndex]["newcoverposter"];
     if(url.length==0){
       latestIndex = latestIndex - 1;
       url = this.newList[latestIndex]["newcoverposter"];
       this.latestTitle = this.newList[latestIndex]["otherTitle"];
       this.latestDescription = this.newList[latestIndex]["description"];

     }else{
       this.latestTitle = this.newList[latestIndex]["otherTitle"]; 
       this.latestDescription = this.newList[latestIndex]["description"];
     }
     console.log(url);
     element.style.backgroundImage = "linear-gradient(to bottom,transparent,transparent,transparent,#000), url("+url+")"; 
  }
  getPoster(name){
     var folder = name.replace(/\s/g, "").toLowerCase();
     return "https://gesab001.github.io/assets/images/"+folder+"/poster.jpg";
  }
  
  isTitleNull(event){
     var count = event.names.length;
     //console.log("count: " + count);
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
  
  searchTitle(event){
     this.searchResultsStateGroup = [];
     var title = event.target.value;
     if (title.length>0){
        this.isSearchMode = true; 
        this.isDefaultMode = false;
     }
     else {
       this.isSearchMode = false;
       this.isDefaultMode = true;
     };
	 var re = new RegExp(title, 'gi');
	 var matches = this.stateGroupsSearchable.filter(item => item["otherTitle"].match(re) || item["description"].match(re) || item["title"].match(re));       
     this.searchResultsStateGroup = matches;
     console.log(this.searchResultsStateGroup);

     
  } 
 
}
