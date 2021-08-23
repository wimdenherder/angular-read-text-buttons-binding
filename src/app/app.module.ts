import { SpeechService } from '../services/speech.service';
import { TranslateService } from '../services/translate.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/';
import { AngularFireAuthModule } from "@angular/fire/auth";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogOverviewExampleDialog, TranslationPopup } from './components/duobutton/duobutton.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import { GiphyService } from 'src/services/giphy.service';
import { environment } from '../environments/environment';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DuobuttonComponent } from './components/duobutton/duobutton.component';
import { AuthService } from './services/auth-service.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { NotWhitelistedComponent } from './components/not-whitelisted/not-whitelisted.component';

@NgModule({
  declarations: [
    AppComponent,
    TranslationPopup,
    SignInComponent,
    DuobuttonComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    PrivacyPolicyComponent,
    DialogOverviewExampleDialog,
    NotWhitelistedComponent
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
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [TranslateService, SpeechService, GiphyService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
