import {Component, OnInit} from '@angular/core';
import {AlertController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {QuestionPage} from "../question/question";
import {QuestionsService} from "../../services/questions";
import {Question} from "../../models/question";
import {AuthService} from "../../services/auth";

@Component({
    selector: 'page-questions',
    templateUrl: 'questions.html'
})
export class QuestionsPage {
    initalLoad = false;
    loading = true;
    questions = [];
    activeUser;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private popoverCtrl: PopoverController,
                private alertCtrl: AlertController,
                private questionService: QuestionsService,
                private authService: AuthService) {
    }

    ionViewWillEnter() {
        this.questions = this.questionService.getQuestions();
    }

    addQuestion() {
        this.navCtrl.push(QuestionPage, {mode: 'New'});
    }

    editQuestion(i) {
        this.navCtrl.push(QuestionPage, {mode: 'Edit', index: i, question: this.questions[i]});
    }

    loadQuestions() {
        this.loading = true;
        this.authService.getActiveUser().getToken().then(
            token => {
                this.questionService.fetchList(token).subscribe(questions => {
                    this.questions = questions;
                    this.initalLoad = true;
                    this.loading = false;
                })
            }
        )
    }

    saveQuestions() {
        this.authService.getActiveUser().getToken().then(token => this.questionService.saveList(token))
    }
}
