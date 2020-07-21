import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlideshowService} from '../slideshow/slideshow.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass'],
  providers: [SlideshowService]
})
export class QuizComponent implements OnInit{
  storytitle: string;
  questions: any;
  subscription;
  letterchoices: any = ['A', 'B', 'C', 'D'];
  constructor(private slideshowService: SlideshowService, private route: ActivatedRoute) { }

  ngOnInit(): void {

     this.route.paramMap.subscribe(params => { this.storytitle = params.get('title');});
     let re = /\s/gi;   
     let filename = this.storytitle.replace(re, "_") + ".json";
     this.storytitle = this.storytitle.toUpperCase();
     this.loadData(filename);
  }

  loadData(filename) {
    this.subscription = this.slideshowService.getData(filename).subscribe(
      res => (this.questions = res["questions"]),
      error => console.log(error),
    );
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

}

 
