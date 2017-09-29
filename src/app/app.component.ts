import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import firebase from 'firebase';

import { TabsPage } from "../pages/tabs/tabs";
import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";
import { AuthService } from "../services/auth";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              private menuCtrl: MenuController,
              private authService: AuthService) {
    var config = {
      apiKey: "AIzaSyCYyExRnWo8mZP-mEaEJW0kSkgN6hyFasw",
      authDomain: "shouldyoudatemt.firebaseapp.com",
      databaseURL: "https://shouldyoudatemt.firebaseio.com",
      projectId: "shouldyoudatemt",
      storageBucket: "shouldyoudatemt.appspot.com",
      messagingSenderId: "1062743778800"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        if (user.email === "irini@irini.com") {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = TabsPage;
        }

      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }
}
