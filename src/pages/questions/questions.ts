import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {QuestionPage} from "../question/question";
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html'
})
export class QuestionsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private popoverCtrl: PopoverController,
              private alertCtrl: AlertController
  ) {}

  addQuestion() {
    this.navCtrl.push(QuestionPage, {mode: 'New'});
  }

}
