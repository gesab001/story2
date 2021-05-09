import {ChangeDetectionStrategy, ViewChild, Component, OnInit, HostListener } from '@angular/core';
import {Observable} from 'rxjs';
import { MemorygameService} from './memorygame.service';
import { ActivatedRoute } from '@angular/router';
  import { DeviceDetectorService } from 'ngx-device-detector';
import {NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';

@Component({
  selector: 'app-memorygame',
  templateUrl: './memorygame.component.html',
  styleUrls: ['./memorygame.component.sass'],
  providers: [MemorygameService, NgbCarouselConfig],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemorygameComponent implements OnInit {

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
  constructor(private _location: Location, config: NgbCarouselConfig, private memoryGameService: MemorygameService, private route: ActivatedRoute, private deviceService: DeviceDetectorService) {
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
  
      backClicked() {
    this._location.back();
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
  imagelist: any = {"items": []};
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
    
     this.myCarousel.activeId='0';
  }

 loadData(filename) {
    this.subscription = this.memoryGameService.getData(filename).subscribe(
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

  getImageList(){
     var id:number;
     var imgname:string;
     var imgurl:string;
     var jsonobj:any;
     for(var i=0; i<10; i++){
      id =  i;
      imgname = "name"+id;
      imgurl = this.slides[id]["image"];
      jsonobj = {'name': imgname, 'img': imgurl, 'id': id};
      this.imagelist["items"].push(jsonobj);
     }
     return JSON.stringify(this.imagelist);
  }
}
