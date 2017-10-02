import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the QuizQuestionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-quiz-question',
  templateUrl: 'quiz-question.html'
})
export class QuizQuestionPage {
  questionNumber = 1;
  totalQuestions = 10;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizQuestionPage');
  }

}
