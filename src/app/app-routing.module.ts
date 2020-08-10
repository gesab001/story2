import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SlideshowComponent} from './slideshow/slideshow.component';
import {QuizComponent} from './quiz/quiz.component';
import {StorylistComponent} from './storylist/storylist.component';
import {JigsawComponent} from './jigsaw/jigsaw.component';
const routes: Routes = [
    {path: 'slideshow/:title', component: SlideshowComponent},
    {path: 'quiz/:title', component: QuizComponent},
    {path: 'list/:list', component: StorylistComponent},
    {path: 'jigsaw/:title', component: JigsawComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
