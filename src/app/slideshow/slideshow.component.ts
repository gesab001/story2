import {ChangeDetectionStrategy, ViewChild, Component, OnInit } from '@angular/core';
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
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  deviceInfo = null;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
  subscription;
  storytitle: string;
  quiztitle: string;
  currentSlide: number;
  constructor(config: NgbCarouselConfig, private slideshowService: SlideshowService, private route: ActivatedRoute, private deviceService: DeviceDetectorService) {
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
           this.isPortrait = false
      }
  }

  slides: any;
  ngOnInit(): void {

     this.route.paramMap.subscribe(params => { 
        this.storytitle = params.get('title');
        this.quiztitle = this.storytitle;
        let re = /\s/gi;   
        let filename = this.storytitle.replace(re, "_") + ".json";
        this.storytitle = this.storytitle.toUpperCase();
        this.loadData(filename);
        this.currentSlide = -1;

     });
    
     this.myCarousel.activeId='2';
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

 onSwipeLeft(evt) {
     alert("left");
  }

  onSwipeRight(evt) {
     alert("right");
  }

  onTap(evt){
     alert("tap");
  }


  onSlide(event) {

    alert(event)
   
  }
  getCurrentSlide(event){
    this.currentSlide = event.current;
  }
}
