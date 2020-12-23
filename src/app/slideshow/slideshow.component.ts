import { DOCUMENT } from '@angular/common';
import {ChangeDetectionStrategy, ViewChild, Inject, Component, OnInit, HostListener, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import {Observable} from 'rxjs';
import { SlideshowService} from './slideshow.service';
import { ActivatedRoute } from '@angular/router';
  import { DeviceDetectorService } from 'ngx-device-detector';
import {NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
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

  hiddenNumber = 0;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
  subscription;
  storytitle: string;
  quiztitle: string;
  currentSlide: number;
  nextSlide; 
  previousSlide;
  quiztimeSlide;
  elem: any;
  constructor(@Inject(DOCUMENT) private document: any, config: NgbCarouselConfig, private slideshowService: SlideshowService, private route: ActivatedRoute, private deviceService: DeviceDetectorService, private render: Renderer2) {
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

    if (key==="PageUp"){
		  this.previousSlide.click();
 
    }
    if (key==="PageDown"){
        this.nextSlide.click();
        console.log("currentslide:"+this.currentSlide);
        if(this.currentSlide>10){
           console.log('quiztime');
           this.quiztimeSlide =  document.querySelector('.quiztime');
           this.quiztimeSlide.click();

        }
           
    }
    
    if(key==="b"){
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
    
      alert("you pressed escape");
    }
  }
  

  ngAfterViewInit(){
    this.nextSlide = document.querySelector('.carousel-control-next');
      this.render.listen(this.nextSlide, 'click', (target)=>{
        console.log('clicked', target);
      });
    console.log(this.nextSlide);
     this.previousSlide = document.querySelector('.carousel-control-prev');
      this.render.listen(this.previousSlide, 'click', (target)=>{
        console.log('clicked', target);
      });
    console.log(this.previousSlide);
   
    
    
    this.openFullscreen();

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
        this.quiztitle = this.storytitle;
        let re = /\s/gi;   
        let filename = this.storytitle.replace(re, "_") + ".json";
        this.storytitle = this.storytitle.toUpperCase();
        this.loadData(filename);
        this.currentSlide = -1;

     });
    
     this.myCarousel.activeId='0';
         this.openFullscreen();

  }

 loadData(filename) {
    this.subscription = this.slideshowService.getData(filename).subscribe(
      res => (this.slides = res["slides"]),
      error => console.log(error),
    );

  }
  nextSlideNumber(){
     this.currentSlide = this.currentSlide + 1; 

  }
 
  prevSlideNumber(){
     this.currentSlide = this.currentSlide - 1;
  }

 openFullscreen() {
     console.log("fullscreen mode");
        if (this.elem.requestFullscreen) {
          this.elem.requestFullscreen();
        } else if (this.elem.mozRequestFullScreen) {
          /* Firefox */
          this.elem.mozRequestFullScreen();
        } else if (this.elem.webkitRequestFullscreen) {
          /* Chrome, Safari and Opera */
          this.elem.webkitRequestFullscreen();
        } else if (this.elem.msRequestFullscreen) {
          /* IE/Edge */
          this.elem.msRequestFullscreen();
        }
 }
 /* Close fullscreen */
 closeFullscreen() {
        if (this.document.exitFullscreen) {
          this.document.exitFullscreen();
        } else if (this.document.mozCancelFullScreen) {
          /* Firefox */
          this.document.mozCancelFullScreen();
        } else if (this.document.webkitExitFullscreen) {
          /* Chrome, Safari and Opera */
          this.document.webkitExitFullscreen();
        } else if (this.document.msExitFullscreen) {
          /* IE/Edge */
          this.document.msExitFullscreen();
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
     alert("tap");
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
}