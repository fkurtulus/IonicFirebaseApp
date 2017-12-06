import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { firebaseConfig } from './credentials';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp(firebaseConfig); //Ionic Firebase Connection has done...  
    // Firebase Auth Listener, always calling itself until someone login the firebase account 
    const unsubscribe = firebase.auth().onAuthStateChanged(user=>{
      if(!user){
        this.rootPage = 'LoginPage';
        unsubscribe();
      }else{
        this.rootPage=HomePage;
        unsubscribe();
      }
    });

    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

