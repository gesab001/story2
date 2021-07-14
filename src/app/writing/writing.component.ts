import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { WritingService} from './writing.service';

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.sass'],
    providers: [WritingService ]
})
export class WritingComponent implements OnInit {

  plainText:string;  
  encryptText: string;  
  encPassword: string = "secret";  
  decPassword:string;  
  conversionEncryptOutput: string;  
  conversionDecryptOutput:string;  


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
  slides: any;
  
  constructor(private route: ActivatedRoute,private _location: Location, private writingService: WritingService) { }

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

  backClicked() {
    this._location.back();
  }
  
  
 loadData(filename) {
    this.subscription = this.writingService.getData(filename).subscribe(
      res => (this.slides = res["slides"]),
      error => console.log(error),
    );

  }
}
