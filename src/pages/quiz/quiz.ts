import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import {QuizQuestionPage} from "../quiz-question/quiz-question";

/*
  Generated class for the QuizPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage {
  displayName: string;
  hasBegunQuiz: boolean = false;
  currentScore = 0;
  finalScore = 0;
  answers = []

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {}

  ionViewWillEnter() {
    this.displayName = this.authService.getActiveUserProfile().displayName;
  }

  onQuizStart() {
      this.hasBegunQuiz = true;
      this.navCtrl.push(QuizQuestionPage, this.answers);
  }


}
