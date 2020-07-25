import {ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { SlideshowService} from './slideshow.service';
import { ActivatedRoute } from '@angular/router';
  import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.sass'],
  providers: [SlideshowService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideshowComponent implements OnInit {
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
  constructor(private slideshowService: SlideshowService, private route: ActivatedRoute, private deviceService: DeviceDetectorService) {
      this.storytitle = "jesus";
      this.quiztitle = "jesus";
      this.currentSlide = -1;
      this.checkDeviceType();

  }

  checkDeviceType() {
      alert('hello `Home` component');
      this.deviceInfo = this.deviceService.getDeviceInfo();
      this.isMobile = this.deviceService.isMobile();
      this.isTablet = this.deviceService.isTablet();
      this.isDesktop = this.deviceService.isDesktop();
      alert(this.deviceInfo);
      alert(this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
      alert(this.isTablet);  // returns if the device us a tablet (iPad etc)
      alert(this.isDesktop); // returns if the app is running on a Desktop browser.
        if(window.innerHeight > window.innerWidth){
            alert("you are on portrait mode");
            this.isPortrait = true;
            this.isLandscape = false;
        }else{
           alert("you are on landscape mode");
           this.isLandscape = true;
           this.isPortrait = false;
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


}
