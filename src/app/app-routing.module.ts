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
import {HomepageComponent} from './homepage/homepage.component';
import {WritingComponent} from './writing/writing.component';
import {EditorComponent} from './editor/editor.component';

const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'slideshow/:title/:otherTitle', component: SlideshowComponent},
    {path: 'quiz/:title', component: QuizComponent},
    {path: 'list/:list', component: StorylistComponent},
    {path: 'jigsaw/:slides', component: JigsawComponent},
    {path: 'memorygame/:slides', component: MemorygameComponent},
    {path: 'hangman/:slides', component: HangmanComponent},
    {path: 'wordsearch/:slides', component: WordsearchComponent},
    {path: 'vocabulary/:slides', component: VocabularyComponent},
    {path: 'writing/:slides', component: WritingComponent},
    {path: 'editor/:data', component: EditorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
