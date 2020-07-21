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
  correct: string = "";
  answer: string = "";
  subscription;
  letterchoices: any = ['A', 'B', 'C', 'D'];
  questionNumber: number = 0;
  congrats: any = ["correct", "excellent", "awesome", "well done", "great job", "fantastic", "all right!", "exactly right", "exceptional", "sensational", "wonderful", "fabulous", "outstanding", "You're learning fast", "perfect", "You're doing well", "Unbelievable", "Way to go", "Marvelous", "Good for you", "That's great"];
  constructor(private slideshowService: SlideshowService, private route: ActivatedRoute) { }

  ngOnInit(): void {

     this.route.paramMap.subscribe(params => { this.storytitle = params.get('title');});
     let re = /\s/gi;   
     let filename = this.storytitle.replace(re, "_") + ".json";
     this.storytitle = this.storytitle.toUpperCase();
     this.loadData(filename);
     this.shuffleChoices();
     this.setCorrectAnswer();

  }

  loadData(filename) {
    this.subscription = this.slideshowService.getData(filename).subscribe(
      res => (this.questions = res["questions"]),
      error => console.log(error),
    );
  }

  setCorrectAnswer(){
    this.correct = this.questions[this.questionNumber].answer;
  }

  setAnswer(event){
     this.answer = event;
  }
  
  shuffleChoices(){
      for (var x=0; x<this.questions.length; x++){
         this.questions[x].choices = this.shuffle(this.questions[x].choices);
      }
  }

  getRandomNumberBetween(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

  onSubmit(){
    if (this.answer==""){
      alert("please choose an answer");
    }else{
        if(this.questions[this.questionNumber].answer  ==  this.answer){
            let congratsMessage = this.congrats[this.getRandomNumberBetween(0,this.congrats.length-1)];
            alert(congratsMessage);
            this.shuffleChoices();
            this.questionNumber = this.questionNumber + 1;
            this.answer = "";
            this.setCorrectAnswer();
        }else{
           alert("wrong answer");
        }
    }
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

 
