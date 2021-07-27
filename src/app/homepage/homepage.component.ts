import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { StateGroup } from '../stategroup';
import { TitleGroup } from '../titlegroup';
import {Observable} from 'rxjs';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {map, startWith, filter} from 'rxjs/operators';
import { StoryService} from '../story.service';
import { DropboxService } from '../dropbox/dropbox.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { interval } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass'],
  providers: [StoryService, DropboxService]

})
export class HomepageComponent implements OnInit {
  panelOpenState = false;
  isSearchBar: boolean = false;
  isMobile: boolean;
  isSearchIcon: boolean = true;
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
  latestIndex: number = -1;
  latestOtherTitle: string;
  latestDescription: string;
  newList: any = null;
  searchableTitles: [];
  storytitle: string;
  stateGroupOptions: Observable<StateGroup[]>;
  
  constructor(private deviceService: DeviceDetectorService, private _formBuilder: FormBuilder,  private storyService: StoryService, private dropboxService: DropboxService) { 
      this.checkDeviceType();
      
  }

  ngOnInit() {
    //this.loadData();
    this.loadDataFromDropbox();
  }

  checkDeviceType() {
 
      this.isMobile = this.deviceService.isMobile();
      this.isDesktop = this.deviceService.isDesktop();
      //console.log("ismobile: " + this.isMobile);
      //console.log("isDesktop: " + this.isDesktop);
      //alert("ismobile: " + this.isMobile);

    }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
     var key = event.key;

    if(key==="Escape"){
      this.isSearchMode = false;
      this.isDefaultMode = true;    
      this.hideSearchBar();

      //alert("you pressed escape");
    }
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
      res => (this.stateGroups = res["atoz"], this.setSearchData(res["atoz"]), this.newList = res["new"].reverse(), this.limitNewList(), this.loadCoverImage()),
      error => console.log(error),
    );
  }

 loadDataFromDropbox() {
    this.subscription = this.dropboxService.getStoryList().subscribe(
      res => (this.stateGroups = res["atoz"], this.setSearchData(res["atoz"]), this.newList = res["new"].reverse(), this.limitNewList(), this.loadCoverImage()),
      error => console.log(error),
    );
  }
    
  limitNewList(){
      var total = this.newList.length;
      if (total>10){
        var numbertodelete = total - 10;
        this.newList.splice(11,numbertodelete);
      }
  }
  
  startCoverImageSlideShow(){
     var slide = document.getElementById("next-button");
     slide.click();

  }
  
  
  loadCoverImage(){
     // Create an Observable that will publish a value on an interval
	const secondsCounter = interval(5000);
	// Subscribe to begin publishing values
	const subscription = secondsCounter.subscribe(n =>
	   this.startCoverImageSlideShow());


  }
  
  isFirstSlide(i){
    if (i==0){
       return true;
    }
  }

  notFirstSlide(i){
    if (i!=0){
       return true;
    }
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
      if (this.isDesktop){
		var defaultState = dom.childNodes[0].childNodes[0].childNodes[0];
		defaultState.style.display = "none";
		var hoverState = dom.childNodes[0].childNodes[0].childNodes[1];
		hoverState.style.display = "block";      
      }
     

 
  }
  imageHoverOut(dom){
    if (this.isDesktop){
     var defaultState = dom.childNodes[0].childNodes[0].childNodes[0];
     defaultState.style.display = "block";
     var hoverState = dom.childNodes[0].childNodes[0].childNodes[1];
     hoverState.style.display = "none";    
    }
    


  }
  
  focusSearchInput(){
     var searchbar = document.getElementById("searchbar");
     searchbar.style.display = "block";
     var inputfield = document.getElementById("inputField");
     inputfield.focus();
  }

  focusSearchInputMobile(){
     var searchbar = document.getElementById("searchbar-mobile");
     searchbar.style.display = "block";
     var inputfield = document.getElementById("inputField-mobile");
     inputfield.focus();
  }
    
  showSearchBar(){
      this.isSearchBar = true;    
      this.isSearchIcon = false;
      this.focusSearchInput();
  }
  
   showSearchBarMobile(){
      this.isSearchBar = true;    
      this.isSearchIcon = false;
      this.focusSearchInputMobile();
  }

  hideSearchBarMobile(){
      this.isSearchBar = false;
      this.isSearchIcon = true;
      var searchbar = document.getElementById("searchbar-mobile");
      searchbar.style.display = "none";
  }
    
  defaultMode(){
     this.isSearchMode = false;
     this.isDefaultMode = true;     
  }
    
  hideSearchBar(){
      this.isSearchBar = false;
      this.isSearchIcon = true;
      var searchbar = document.getElementById("searchbar");
      searchbar.style.display = "none";
      this.isSearchMode = false;
      this.isDefaultMode = true;
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
  
  openSlideshow(title){
     alert("open");
     window.open("/slideshow/"+title);
  }
 
}
