import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SlideshowComponent} from './slideshow/slideshow.component';
import {QuizComponent} from './quiz/quiz.component';
import {StorylistComponent} from './storylist/storylist.component';
import {JigsawComponent} from './jigsaw/jigsaw.component';
import {MemorygameComponent} from './memorygame/memorygame.component';
import {HangmanComponent} from './hangman/hangman.component';
import {WordsearchComponent} from './wordsearch/wordsearch.component';
import {VocabularyComponent} from './vocabulary/vocabulary.component';
const routes: Routes = [
    {path: 'slideshow/:title', component: SlideshowComponent},
    {path: 'quiz/:title', component: QuizComponent},
    {path: 'list/:list', component: StorylistComponent},
    {path: 'jigsaw/:title', component: JigsawComponent},
    {path: 'memorygame/:title', component: MemorygameComponent},
    {path: 'hangman/:title', component: HangmanComponent},
    {path: 'wordsearch/:title', component: WordsearchComponent},
    {path: 'vocabulary/:title', component: VocabularyComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
