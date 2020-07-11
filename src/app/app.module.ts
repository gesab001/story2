import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';
import { SlideshowComponent } from './slideshow/slideshow.component';
//modules for autocomplete



@NgModule({
  declarations: [
    AppComponent,
    SlideshowComponent
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
    MatGridListModule,
    DeviceDetectorModule,
    MatFormFieldModule
  ],
  providers: [HttpErrorHandler, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
