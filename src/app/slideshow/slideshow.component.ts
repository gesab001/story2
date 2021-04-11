import { DOCUMENT } from '@angular/common';
import {ChangeDetectionStrategy, ViewChild, Inject, Component, OnInit, HostListener, HostBinding, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import {Observable} from 'rxjs';
import { SlideshowService} from './slideshow.service';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import {NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.sass'],
  providers: [SlideshowService, NgbCarouselConfig],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideshowComponent implements OnInit {

  @ViewChild('myCarousel') myCarousel: NgbCarousel;
 //   @ViewChild("carouselCaption") carouselCaption: ElementRef;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  deviceInfo = null;
  isHiddenCaption: boolean = false;
  isHiddenImage: boolean = false;
  subscriptionScroll: Subscription;
  hiddenNumber = 0;
  animateState = "running";
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
  subscription;
  storytitle: string;
  titleparam: string;
  otherTitle: string;
  videoFileName: string;
  iframeIsNotLoaded: boolean = true;
  quiztitle: string;
  currentSlide  = 0;
  nextSlide; 
  previousSlide;
  quiztimeSlide;
  elem: any;
  currentActiveClass;
  isVideoSlide: boolean = false;
  scrollTimer;
  fontSizeInt = 24;
  fontSize = "24px";

  safeSrc: SafeResourceUrl;

  constructor(@Inject(DOCUMENT) private document: any, config: NgbCarouselConfig, private sanitizer: DomSanitizer, private slideshowService: SlideshowService, private route: ActivatedRoute, private deviceService: DeviceDetectorService, private render: Renderer2) {
      this.storytitle = "jesus";
      this.quiztitle = "jesus";
      this.currentSlide = 0;
      this.checkDeviceType();
      this.checkOrientation();

        config.interval = 1000000;
        config.wrap = false;
        config.keyboard = true;
        config.pauseOnHover = false;
  }

  @HostListener('window:resize', ['$event'])
    onOrientationChange(event) {
      this.checkOrientation();


  }
  
   
   @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
     var key = event.key;
     console.log(key);
     
    if (event.ctrlKey && event.shiftKey && event.key === '+') {
				this.increaseFontSize();
 
    }
    
    if (event.ctrlKey && event.shiftKey && event.key === '-') {
          this.decreaseFontSize();

    }
    if (key==="PageUp"){
            //  alert(key);
		  //this.previousSlide.click();
		  document.getElementById("prevSlide").click();
	/*
			var demoEl =document.getElementById("demo");
                 var inner = demoEl.getElementsByClassName("carousel-inner")[0];
                 var activeEl = inner.querySelector(".video-item");
                 //console.log(activeEl.className);
                 if(activeEl.className == "carousel-item video-item carousel-item-prev carousel-item-right"){
                     console.log("its a video slide");
                     this.isVideoSlide = true;
                 }else{
                                         this.isVideoSlide = false;

                 }


*/
    }
    if (key==="PageDown"){
          //alert(key);

		  document.getElementById("nextSlide").click();
           

        //this.nextSlide.click();
        console.log("currentslide:"+this.currentSlide);
       // alert(this.currentSlide);
 /*            var demoEl =document.getElementById("demo");
                 var inner = demoEl.getElementsByClassName("carousel-inner")[0];
                 var activeEl = inner.querySelector(".video-item");
                // console.log(activeEl.className);
                 if(activeEl.className == "carousel-item video-item carousel-item-next carousel-item-left"){
                     console.log("its a video slide");
                     this.isVideoSlide = true;
                 }else{
                     this.isVideoSlide = false;
                 }*/
     
           
    }
    
    if(key==="b" || key==="B"){
       //alert("you pressed b");
       this.hiddenNumber = this.hiddenNumber + 1;
       console.log("hiddennumber: " + this.hiddenNumber);
       //var carouselCaption =  document.querySelector('.carousel-caption');
     //  this.carouselCaption.nativeElement.style.display = "none";  
       if(this.hiddenNumber==1){
		  this.isHiddenCaption  = true;
 
	   }
	   if(this.hiddenNumber==2){
		  this.isHiddenCaption  = false;
 
	   }
	   if(this.hiddenNumber==3){
	       this.isHiddenImage = true;
	       console.log("hide image" + this.isHiddenImage);
	   }
	   if(this.hiddenNumber>3){
	    this.isHiddenImage = false;
	    console.log("hide image" + this.isHiddenImage);
	    this.hiddenNumber = 0;
        console.log("hiddennumber: " + this.hiddenNumber);

	   }

     }
    
    if(key==="Escape"){
       this.closeFullscreen();
      //alert("you pressed escape");
    }
  }
  
  isScrollOn: boolean = false;
  
    
  decreaseFontSize(){
         this.fontSizeInt = this.fontSizeInt - 1;
           this.fontSize = this.fontSizeInt + "px"; 
  }

  increaseFontSize(){
         this.fontSizeInt = this.fontSizeInt + 1;
           this.fontSize = this.fontSizeInt + "px"; 
  }
      
  stopScroll(){
     this.isScrollOn = false;
     clearInterval(this.scrollTimer);
     console.log("stop scroll");
  }
  
  toggleScroll(){
      if(this.isScrollOn==false){
         this.animateScrollText();
      }else{
         this.stopScroll();
      }
  }
  
  animateScrollText(){	
       this.isScrollOn = true;

        clearInterval(this.scrollTimer);
        this.scrollTimer = setInterval(() => {this.myTimer();}, 7);
                console.log("animate scrolltext");
       // this.myTimer();
      /*
        var scrollmenu = document.getElementById('scrollmenu-mobile');
        var container = scrollmenu;
    	var h1 = container.getElementsByTagName('h1')[0];
        console.log(h1.innerHTML);
        var scrollWidth = container.scrollWidth;
        console.log("scrollWidth" + scrollWidth);
		var cssAnimation = document.createElement('style');
		cssAnimation.type = 'text/css';
		var rules = document.createTextNode('@-webkit-keyframes scroll-left  {'+
		'0% {  -webkit-transform: translateX(100%); }'+
		'100% {  -webkit-transform: translateX(-'+scrollWidth+'px) }'+
		'}');
		cssAnimation.appendChild(rules);
	    //var newtext = "hello";
       // h1.innerHTML = newtext; 
        var lengthScroll = scrollWidth;
        console.log("lengthScroll: " + lengthScroll);
        //var lengthRule = document.createTextNode('animation: scroll-left 20s linear infinite');
        //cssAnimation.appendChild(lengthRule);
        h1.appendChild(cssAnimation);
        h1.style.animation = "scroll-left "+lengthScroll+"s linear infinite";
        var dupe = container.cloneNode(true);
        container.parentNode.replaceChild(dupe, container);
      */
  }
  
  onScroll(event){
     console.log(this.isEndOfScroll(event));
     //this.animateScrollText();
  }
  
  isEndOfScroll(event){
     console.log("scrollwidth: " + event.target.scrollWidth);
     console.log("left: " + event.target.scrollLeft);
     var offset = event.target.offsetWidth;
     var difference = event.target.scrollWidth - event.target.scrollLeft;
     console.log("offset: " + offset);
     console.log("difference: " + difference);
      if (offset == difference){
         return true;
      }else {
         return false;
      }
  }
  
  myTimer(){
      var activeEl = document.getElementsByClassName("carousel-item active")[0];
	  var scrollmenu = activeEl.getElementsByTagName('DIV')[0];
      scrollmenu.scrollLeft = scrollmenu.scrollLeft +  1;
      if (this.isEndOfScroll(scrollmenu)){
		  clearInterval(this.scrollTimer);

      }
      console.log("scrollmenu.scrollLeft:" + scrollmenu.scrollLeft);
  /*
        
    	h1.scrollLeft = h1.scrollLeft + 1;
    	*/

  }
  
  
  animatePause(){
       var scrollmenu = document.getElementsByClassName('scrollmenu');
       var container = scrollmenu[0];
       var h1 = container.getElementsByTagName('h1')[0];
       h1.style.animationPlayState = "paused";
  }
  
  animateRun(){
        var scrollmenu = document.getElementsByClassName('scrollmenu');
       var container = scrollmenu[0];
       var h1 = container.getElementsByTagName('h1')[0];
       h1.style.animationPlayState = "running";     

  }
  
  
  checkVideoSlide(activeEl){
         if (activeEl == "carousel-indicator-image item active"){
          // console.log("its a video slide");
           this.isVideoSlide = true;
           this.playVideo();
       }else{
          this.isVideoSlide = false;
       }
  }
  
  ngAfterViewInit(){
    //this.animateScrollText(); 
    
  //  this.increaseFontSize = document.querySelector('.increaseFontSize-button');
  //  this.render.listen(this.increaseFontSize, 'click', (target)=>{
  //      console.log("bigger font");
  //  });
    
    this.nextSlide = document.querySelector('.carousel-control-next');
      this.render.listen(this.nextSlide, 'click', (target)=>{
        // Create an Observable that will publish a value on an interval
        //this.subscriptionScroll.unsubscribe();
		//const source = interval(1000);
		//const text = 'Your Text Here';
		//this.subscriptionScroll = source.subscribe(val => this.animateScrollText());
		 var activeEl = document.getElementsByClassName("carousel-item active")[0];
	     var scrollmenu = activeEl.getElementsByTagName('DIV')[0];
         scrollmenu.scrollLeft = 0;
         this.stopScroll();
       // this.animateScrollText();
       // console.log("next slide listener");
       var activeEl = document.getElementsByClassName("carousel-indicators")[0].getElementsByTagName("IMG")[10];
     //  console.log(activeEl.className);
       this.checkVideoSlide(activeEl.className);
       console.log("detect changes");
       

      

      });
   // console.log(this.nextSlide);
     this.previousSlide = document.querySelector('.carousel-control-prev');
      this.render.listen(this.previousSlide, 'click', (target)=>{
        //console.log('clicked', target);
        //this.animateScrollText();
         var activeEl = document.getElementsByClassName("carousel-item active")[0];
	     var scrollmenu = activeEl.getElementsByTagName('DIV')[0];
         scrollmenu.scrollLeft = 0;
          this.stopScroll();
           //     console.log("previous slide");
       var activeEl = document.getElementsByClassName("carousel-indicators")[0].getElementsByTagName("IMG")[12];
       console.log(activeEl.className);
       this.checkVideoSlide(activeEl.className);
      });
   // console.log(this.previousSlide);
       var carouselIndicators = document.getElementsByClassName('carousel-indicators')[0].getElementsByTagName("IMG");
       for (var x= 0; x<carouselIndicators.length; x++){
		       console.log(carouselIndicators[x]);
		       console.log("listen");
		       var indicatorItem = carouselIndicators[x];
		       this.render.listen(indicatorItem, 'click', (target)=>{
		            console.log('clicked', target.originalTarget.dataset.slideTo);
		            var slideIndex = target.originalTarget.dataset.slideTo;
		            if (slideIndex==11){
		                 console.log("its a video slide");
		                 this.isVideoSlide = true;
		                 this.playVideo();
		            }else{
		                this.isVideoSlide = false;
						 console.log("its not video slide");

		            }
		       });

       }
    
     
   
    
    
    this.openFullscreen();
/*    var url = "https://gesab001.github.io/videoassets/"+this.videoFileName;
    var video = document	.getElementById('videoplayer');
    
     var source = document.createElement('source');   
     source.setAttribute('src', url);
     video.appendChild(source);
     video.style.display = "block";     */
     
  }
  
  
  iframeLoaded(event)
  {
     console.log("iframe loaded", event);
     this.iframeIsNotLoaded = false;
  }
  
  playVideo(){
     //alert(this.slides["video"]);
     var playIcon = document.getElementById("videoPlayIcon");
     playIcon.style.display = "none";
     var video = document.getElementById('videoplayer');
    
     var url = "https://gesab001.github.io/videoassets/"+this.videoFileName;
     var source = document.createElement('source');   
     source.setAttribute('src', url);
     video.appendChild(source);
     video.style.display = "block";
     //video.play();

  }
 
  /* 	 
  makeActive(element){
    var allElements = document.getElementsByClassName("carousel-indicator-image");
    console.log(allElements.length);
    for (var x=0; x<allElements.length; x++){
        this.makeInactive(allElements[x]);
    }

       element.style.borderStyle = "solid";
       element.style.borderColor = "blue";
       element.style.opacity = "0.7";
    


  }

  makeActive2(index){
	var allElements = document.getElementsByClassName("carousel-indicator-image");
	for (var x=0; x<allElements.length; x++){
		this.makeInactive(allElements[x]);
    }
	var element = allElements[index+1];
	element.style.borderStyle = "solid";
    element.style.borderColor = "blue";
    element.style.opacity = "0.7";
  }
  
  makeInactive(element){
    element.style.borderStyle = "none"; 
    element.style.borderColor = "none";
    element.style.opacity = "1";
  }
  
  */
   pauseVideo(){
     //alert(this.slides["video"]);
     var playIcon = document.getElementById("videoPlayIcon");
     playIcon.style.display = "none";
     var video = document.getElementById('videoplayer');
     video.style.display = "block";
     //video.pause();

  }
   
  getSlideImage(image){
   	 if(this.isHiddenImage){
   	      return "https://gesab001.github.io/assets/images/black.jpg";
   	 }else{
   	    return image;
   	 }

  }
  checkDeviceType() {
      this.deviceInfo = this.deviceService.getDeviceInfo();
      this.isMobile = this.deviceService.isMobile();
      this.isTablet = this.deviceService.isTablet();
      this.isDesktop = this.deviceService.isDesktop();
    }

  checkOrientation(){
      if(window.innerHeight > window.innerWidth){
            this.isPortrait = true;
            this.isLandscape = false;

        }else{
           this.isLandscape = true;
           this.isPortrait = false;

      }
      
  }

  slides: any;
  ngOnInit(): void {
     this.elem = document.documentElement;
     this.route.paramMap.subscribe(params => { 
        this.storytitle = params.get('title');
        this.titleparam = params.get('title');
        this.otherTitle = params.get('otherTitle');
        this.videoFileName = this.otherTitle + ".mp4"; 
        this.quiztitle = this.storytitle;
        let re = /\s/gi;   
        let filename = this.storytitle.replace(re, "_") + ".json";
        this.storytitle = this.storytitle.toUpperCase();
        this.loadData(filename);
        this.currentSlide = -1;

     });
    
     this.myCarousel.activeId='0';
         this.openFullscreen();
         this.currentActiveClass = document.getElementsByClassName("carousel-indicator-image")[0];
    var element = this.currentActiveClass;
    alert(this.currentActiveClass());
    element.style.borderStyle = "solid"; 
    element.style.borderColor = "blue";
    element.style.opacity = "1";    

  }
   

 loadData(filename) {
    this.subscription = this.slideshowService.getData(filename).subscribe(
      res => (this.slides = res,         this.safeSrc = this.getSafeSrc()),
      error => console.log(error),
    );

  }
  
  getVideoUrl(){
     var url = "https://gesab001.github.io/videoassets/"+this.slides['video'];
     var videoplayer = document.getElementById("videoplayer");
     console.log("getVideoUrl" + videoplayer);
     return url;
     
  }
  
  public getSafeSrc(): SafeResourceUrl {
     var stringurl = "https://gesab001.github.io/videoassets/"+this.videoFileName;
     this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(stringurl);
     return this.safeSrc;
  }
  
  nextSlideNumber(){
    
     this.currentSlide = this.currentSlide + 1;
     // this.makeActive2(this.currentSlide);
  //   console.log("you clicked next slide");
 

  }
 
  prevSlideNumber(){
	 this.currentSlide = this.currentSlide - 1;
     //this.makeActive2(this.currentSlide);
 /*         console.log("you clicked prev slide");
     var demoEl =document.getElementById("demo");
	 var inner = demoEl.getElementsByClassName("carousel-inner")[0];
	 var activeEl = inner.getElementsByClassName("carousel-item");
	 console.log(activeEl);*/

  }
  @ViewChild('fs') fs: ElementRef;

  @HostBinding('class.is-fullscreen') isFullscreen = false;
 isActive = false;
  isNotFullscreen = true;

	/* View in fullscreen */
 openFullscreen() {
	  if (this.elem.requestFullscreen) {
		this.elem.requestFullscreen();
	  } else if (this.elem.webkitRequestFullscreen) { /* Safari */
		this.elem.webkitRequestFullscreen();
	  } else if (this.elem.msRequestFullscreen) { /* IE11 */
		this.elem.msRequestFullscreen();
	  }
	}

  closeFullscreen(): void {
   // alert("close fullscreen");
    this.isFullscreen = false;
    this.isNotFullscreen = true;
    this.isActive =  false;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } 
  }
  
 onSwipeLeft(evt) {
     alert("left");
     this.myCarousel.activeId = (this.convertString(this.myCarousel.activeId) + 1).toString();
  }

  onSwipeRight(evt) {
     alert("right");
     this.myCarousel.activeId = (this.convertString(this.myCarousel.activeId) - 1).toString();
  }

  onTap(evt){
    // alert("tap");
     if(this.animateState=="running"){
        this.animatePause();
        this.animateState = "paused";
     }
     else{
        this.animateRun();
        this.animateState = "running";
     }
  }


  onSlide(event) {

    alert(event)
   
  }
  getCurrentSlide(event){
    this.currentSlide = event.current-1;
  }

  convertString(value){
    return parseFloat(value);
  }
  
  test(){
     alert("test");
  }
}
