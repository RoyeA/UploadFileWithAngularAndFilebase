import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AngularFireModule,AngularFire} from 'angularfire2'

import {UploadFileComponent} from './upload-file.component'

export const angConfig = {
    apiKey: "AIzaSyBHfHpAaQK9XDO8pZFL1LF2spdI_T5mHYA",
    authDomain: "dev1-494e4.firebaseapp.com",
    databaseURL: "https://dev1-494e4.firebaseio.com",
    storageBucket: "dev1-494e4.appspot.com",
    messagingSenderId: "431790261245"
};

@NgModule({
  declarations: [
    AppComponent,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(angConfig),
  ],
  providers: [AngularFire],
  bootstrap: [AppComponent]
})
export class AppModule { }
