import {ChangeDetectionStrategy, ViewChild, Component, OnInit, HostListener } from '@angular/core';
import {Observable} from 'rxjs';
import { WordsearchService} from './wordsearch.service';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as CryptoJS from 'crypto-js';  
import {NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-wordsearch',
  templateUrl: './wordsearch.component.html',
  styleUrls: ['./wordsearch.component.sass'],
  providers: [WordsearchService, NgbCarouselConfig],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsearchComponent implements OnInit {

 plainText:string;  
  encryptText: string;  
  encPassword: string = "secret";  
  decPassword:string;  
  conversionEncryptOutput: string;  
  conversionDecryptOutput:string;  
  @ViewChild('myCarousel') myCarousel: NgbCarousel;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  wordlength: number = 3;
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
  constructor(config: NgbCarouselConfig, private wordsearchService: WordsearchService, private route: ActivatedRoute, private deviceService: DeviceDetectorService) {
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
    this.subscription = this.wordsearchService.getData(filename).subscribe(
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

 //method is used to encrypt and decrypt the text  
  convertText(conversion:string) {  
      if (conversion=="encrypt") {  
        this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText.trim(), this.encPassword.trim()).toString();  
      }  
      else {  
        this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);  

    }  
  }  
  wordlist: any = {"items": []};
  getWordList(){
     this.wordlist["items"] = [];
     var words:string = "";

     for(var i=0; i<10; i++){
      words = words + " " + this.slides[i]["text"];
     }
     words = words.toLowerCase().replace(/[^a-zA-Z ]/g, "");
     var wordlist:any = words.split(" ");
     
     var result = wordlist.filter(word => word.length == this.wordlength);
     result = result.filter((item,index) =>{

     return result.indexOf(item === index)});
     var uniquewords: any = [];
     var uniquestring: string = "";
     for (let entry of result){
        if (uniquewords.includes(entry)==false)  {
           uniquewords.push(entry);
           uniquestring = uniquestring + " " + entry;
           this.wordlist["items"].push(entry);
        }
     }
     return this.wordlist;
  }
  
  wordListToString(){
    return JSON.stringify(this.getWordList());
  }
}
