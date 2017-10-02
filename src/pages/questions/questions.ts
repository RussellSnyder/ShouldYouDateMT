import {Component, OnInit} from '@angular/core';
import {AlertController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {QuestionPage} from "../question/question";
import {QuestionsService} from "../../services/questions";
import {Question} from "../../models/question";
import {AuthService} from "../../services/auth";
import {QuizPage} from "../quiz/quiz";
import {SignupPage} from "../signup/signup";

@Component({
    selector: 'page-questions',
    templateUrl: 'questions.html'
})
export class QuestionsPage {
    initalLoad = false;
    loading = true;
    questions = [];

    highScore;
    lowScore;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private popoverCtrl: PopoverController,
                private alertCtrl: AlertController,
                private questionService: QuestionsService,
                private authService: AuthService) {
    }

    ionViewWillEnter() {
        if (!this.authService.getActiveUser()) {
            this.navCtrl.push(SignupPage);
        } else if (!this.authService.userIsAdmin()) {
            this.navCtrl.push(QuizPage);
        }
    }

    ionViewDidEnter() {
        this.questionService.fetchList()
            .subscribe(() => {
                this.questions = this.questionService.getQuestions();
                this.calculateHiLowScorePossibilies();

        });
    }


    addQuestion() {
        this.navCtrl.push(QuestionPage, {mode: 'New'});
    }

    editQuestion(i) {
        this.navCtrl.push(QuestionPage, {mode: 'Edit', index: i, question: this.questions[i]});
    }

    saveQuestions() {
        this.authService.getActiveUser().getToken().then(token => this.questionService.saveList(token))
    }

    calculateHiLowScorePossibilies() {
        let highScore = 0;
        let lowScore = 0;
        let answersWithValuesSorted = this.questions.map(question => {
            return question.answers.sort((a, b) => {
                return a.value < b.value;
            })
        })

        answersWithValuesSorted.forEach((answers) => {
            highScore +=  parseInt(answers[0].value);
            lowScore +=  parseInt(answers[answers.length - 1].value);
        })

        this.highScore = highScore;
        this.lowScore = lowScore;
    }
}
