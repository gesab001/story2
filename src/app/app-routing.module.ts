import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SlideshowComponent} from './slideshow/slideshow.component';
import {QuizComponent} from './quiz/quiz.component';

const routes: Routes = [
    {path: 'slideshow/:title', component: SlideshowComponent},
    {path: 'quiz/:title', component: QuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
