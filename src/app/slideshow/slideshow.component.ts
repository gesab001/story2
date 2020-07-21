import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { SlideshowService} from './slideshow.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.sass'],
  providers: [SlideshowService]
})
export class SlideshowComponent implements OnInit {
  subscription;
  storytitle: string;
  quiztitle: string;
  constructor(private slideshowService: SlideshowService, private route: ActivatedRoute) {
      this.storytitle = "jesus";
      this.quiztitle = "jesus";
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
     });
    
  }

 loadData(filename) {
    this.subscription = this.slideshowService.getData(filename).subscribe(
      res => (this.slides = res["slides"]),
      error => console.log(error),
    );
  }
}
