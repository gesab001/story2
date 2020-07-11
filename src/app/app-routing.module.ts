import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SlideshowComponent} from './slideshow/slideshow.component';

const routes: Routes = [
    {path: 'slideshow/:title', component: SlideshowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
