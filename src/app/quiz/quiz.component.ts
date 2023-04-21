import { Component, OnInit, HostListener, AfterViewInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlideshowService} from '../slideshow/slideshow.service';
import { DropboxService } from '../dropbox/dropbox.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass'],
  providers: [SlideshowService, DropboxService]
})
export class QuizComponent implements OnInit{
  storytitle: string;
    elem: any;
      buttonChoices;
  feedback;
  isfullscreen: boolean = true;
  questions: any;
  cardType: string = "questionCard";
  totalcorrect: number = 0;
  correct: string = "";
  mistakes: number = 0;
  answer: string = "";
  subscription;
  letterchoices: any = ['A', 'B', 'C', 'D'];
  questionNumber: number = 0;
  congrats: any = ["correct", "excellent", "awesome", "well done", "great job", "fantastic", "all right!", "exactly right", "exceptional", "sensational", "wonderful", "fabulous", "outstanding", "You're learning fast", "perfect", "You're doing well", "Unbelievable", "Way to go", "Marvelous", "Good for you", "That's great"];
  constructor(private _location: Location, private slideshowService: SlideshowService, private dropboxService: DropboxService, private route: ActivatedRoute, private render: Renderer2) { }
  buttonChoiceIndex = -1;
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
     var key = event.key;
    console.log("key:"+key);
    if (key==="b"){
        //alert("pressed b");
        console.log("index: " + this.buttonChoiceIndex);
               if(this.buttonChoiceIndex>3){
          this.buttonChoiceIndex = 0;
        }
        this.buttonChoices = document.querySelectorAll('.choice');
        this.buttonChoices[this.buttonChoiceIndex].focus();
        this.setButtonChoiceIndex();
    }
        if (key==="PageDown"){
		this.onSubmit();
    }
    console.log("isfullscreen:"+this.isfullscreen);

    var isFullScreen = document.fullscreen;
    console.log("fullscreenmode:" + isFullScreen);
    if (!isFullScreen){ 
		if (key==="Escape"){
			this.openFullscreen();
		}
    }

  }
  
   backClicked() {
    this._location.back();
  }
  
  setButtonChoiceIndex(){
        //alert(this.buttonChoices[this.buttonChoiceIndex].innerHTML);
 
        this.setAnswer();
        console.log("this.answer:"+this.answer);
        this.buttonChoiceIndex = this.buttonChoiceIndex + 1;

    
  }
  
  answerbuttonClick(event){
    this.answer = event;
	//alert("you chose: " + this.answer);
  }
  
@HostListener('focus', ["$event"])
    onFocus(event: KeyboardEvent) {
        console.log("Focus called from HostListener");
    }
    
  
  ngOnInit(): void {
     this.elem = document.documentElement;
     this.route.paramMap.subscribe(params => { this.storytitle = params.get('title');});
     let re = /\s/gi;   
     let filename = this.storytitle.replace(re, "_") + ".json";
     this.storytitle = this.storytitle.toUpperCase();
     //this.loadData(filename);
     this.loadDataFromDropbox(filename);

	 

  }

  ngAfterViewInit(){
    //this.setChoicesListener();

    this.setButtonChoiceIndex();
    this.openFullscreen();

  }
  
  loadData(filename) {
    this.subscription = this.slideshowService.getData(filename).subscribe(
      res => (this.questions = res["questions"]),
      error => console.log(error),
    );
  }

  loadDataFromDropbox(filename) {
    this.subscription = this.dropboxService.getStory(filename).subscribe(
      res => (this.questions = res["questions"], 	this.shuffleChoices(), this.setCorrectAnswer()),
      error => console.log(error),
    );
  }

  
  setCorrectAnswer(){
    this.correct = this.questions[this.questionNumber].answer;

  }
  setChoicesListener(){
    
    this.buttonChoices = document.querySelectorAll('.choice');
     for (var x=0; x<this.buttonChoices.length; x++){
      this.render.listen(this.buttonChoices[x], 'click', (target)=>{
        console.log('clicked', target);
        //this.setButtonChoiceIndex();
        

      });
    }  
  }
  
  destroyChoicesListener(){
      this.render.destroy();
  }
  
  setAnswer(){
     this.answer = this.questions[this.questionNumber].choices[this.buttonChoiceIndex];
     console.log("setAnswer: " + this.answer);
  }
  
  shuffleChoices(){
	  
      for (var x=0; x<this.questions.length; x++){
         this.questions[x].choices = this.shuffle(this.questions[x].choices);
      }
	  console.log("choices: " + this.questions);
  }

  getRandomNumberBetween(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

  onSubmit(){
    if (this.questionNumber==4){
        this.cardType = "scoreCard";
    }
    if (this.answer==""){
      this.feedback = "please choose an answer";
      this.buttonChoiceIndex = -1;
    }else{
        console.log("questionanswer:"+this.questions[this.questionNumber].answer + "==" + this.answer);
        if(this.questions[this.questionNumber].answer  ==  this.answer){
            let congratsMessage = this.congrats[this.getRandomNumberBetween(0,this.congrats.length-1)];
            this.playAudio("correct2.mp3");
            this.feedback = congratsMessage;
            this.shuffleChoices();
            
            this.questionNumber = this.questionNumber + 1;
            this.answer = "";
            this.setCorrectAnswer();
            this.buttonChoiceIndex = -1;
            this.setButtonChoiceIndex();
            

            
        }else{
           this.playAudio("wrong2.mp3");
          this.feedback = "wrong answer";

           this.mistakes = this.mistakes + 1;
           
        }
    }



  }

  startAgain(){
    this.cardType = "questionCard";
    this.questionNumber = 0;
    this.buttonChoiceIndex = -1;
    this.buttonChoices = document.querySelectorAll('.choice');
     for (var x=0; x<this.buttonChoices.length; x++){
      this.render.listen(this.buttonChoices[x], 'click', (target)=>{
        console.log('clicked', target);
      });
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

 playAudio(filename: string){
  let audio = new Audio();
  audio.src = "https://gesab001.github.io/assets/soundeffects/"+filename;
  audio.load();
  audio.play();
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
        if (this.elem.exitFullscreen) {
          this.elem.exitFullscreen();
        } else if (this.elem.mozCancelFullScreen) {
          /* Firefox */
          this.elem.mozCancelFullScreen();
        } else if (this.elem.webkitExitFullscreen) {
          /* Chrome, Safari and Opera */
          this.elem.webkitExitFullscreen();
        } else if (this.elem.msExitFullscreen) {
          /* IE/Edge */
          this.elem.msExitFullscreen();
        }
      }

}

 
