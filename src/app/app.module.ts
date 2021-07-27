import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//optional modules
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {HammerModule} from '@angular/platform-browser';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import { DeviceDetectorModule } from 'ngx-device-detector';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import {CdkScrollableModule} from '@angular/cdk/scrolling'; 
import { ScrollingModule } from '@angular/cdk/scrolling';
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";


import {MatMenuModule} from '@angular/material/menu'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { QuizComponent } from './quiz/quiz.component';
import { HomepageComponent } from './homepage/homepage.component';
import { StorylistComponent } from './storylist/storylist.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JigsawComponent } from './jigsaw/jigsaw.component';
import { MemorygameComponent } from './memorygame/memorygame.component';
import { HangmanComponent } from './hangman/hangman.component';
import { WordsearchComponent } from './wordsearch/wordsearch.component';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import { WritingComponent } from './writing/writing.component';
import { EditorComponent } from './editor/editor.component';
import { DropboxComponent } from './dropbox/dropbox.component';

//modules for autocomplete



@NgModule({
  declarations: [
    AppComponent,
    SlideshowComponent,
    QuizComponent,
    HomepageComponent,
    StorylistComponent,
    JigsawComponent,
    MemorygameComponent,
    HangmanComponent,
    WordsearchComponent,
    VocabularyComponent,
    WritingComponent,
    EditorComponent,
    DropboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSliderModule,
    MatSidenavModule,
    HammerModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatBadgeModule,
    HttpClientModule,
    LayoutModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatGridListModule,
    DeviceDetectorModule,
    MatFormFieldModule,
    CdkScrollableModule,
    ScrollingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule
  ],
  providers: [HttpErrorHandler, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
