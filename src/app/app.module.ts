import { SpeechService } from '../services/speech.service';
import { TranslateService } from '../services/translate.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, TranslationPopup } from './app.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import { GiphyService } from 'src/services/giphy.service';

@NgModule({
  declarations: [
    AppComponent,
    TranslationPopup
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  providers: [TranslateService, SpeechService, GiphyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
