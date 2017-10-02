import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Question} from "../../models/question";
import {QuestionsService} from "../../services/questions";
import {Answer} from "../../models/answer";
import {AuthService} from "../../services/auth";
@Component({
    selector: 'page-question',
    templateUrl: 'question.html'
})
export class QuestionPage implements OnInit {
    title: string;
    buttonText: string;
    mode: string;
    question: Question;
    index: number;

    questionForm: FormGroup;
    answers = [];
    token: string;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private actionSheetController: ActionSheetController,
                private alertController: AlertController,
                private toastController: ToastController,
                private questionsService: QuestionsService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.mode = this.navParams.get('mode') || 'New';
        if (this.mode == 'Edit') {
            this.question = this.navParams.get('question');
            this.answers = this.question.answers;
            this.index = this.navParams.get('index');
        }

        this.title = this.getTitleText();
        this.buttonText = this.getButtonText();

        this.initializeForm();
    }

    ionViewWillEnter() {
        if (this.authService.userIsAdmin()) {
            this.authService.getActiveUser().getToken().then(token => {
                this.token = token
            });
        }
    }

    private getTitleText() {
        switch (this.mode) {
            case 'New':
                return `Add a ${this.mode} Quiz Question`;
            case 'Edit':
                return `Edit Quiz Question`;
        }
    }

    private getButtonText() {
        switch (this.mode) {
            case 'New':
                return `Save Question`;
            case 'Edit':
                return `Save Changes`;
        }
    }

    createNewAnswerAlert() {
        return this.alertController.create({
            title: 'Add Answer',
            inputs: [
                {
                    name: 'answer',
                    placeholder: 'Answer'
                },
                {
                    type: 'number',
                    name: 'value',
                    placeholder: 'Value'
                },
                {
                    name: 'comment',
                    placeholder: 'Mellisa loves/hates that...'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Add',
                    handler: answer => {
                        if (answer.answer.trim() == '' || answer.answer == null) {
                            const toast = this.toastController.create({
                                message: 'You gotta enter an Answer',
                                duration: 1500,
                                position: 'bottom'
                            });
                            toast.present();
                            return;
                        }
                        (<FormArray>this.questionForm.get('answers'))
                            .push(new FormControl(answer.answer, Validators.required));
                        this.answers.push(answer);

                        const toast = this.toastController.create({
                            message: 'Answer added!',
                            duration: 1500,
                            position: 'bottom'
                        });
                        toast.present();
                    }
                }
            ]
        });
    };

    removeAnswer(i) {
        this.answers.splice(i, 1);
    }

    onAddAnswer() {
        this.createNewAnswerAlert().present();
    }

    onManageAnswers() {
        const actionSheet = this.actionSheetController.create({
            title: 'What do you want to do?',
            buttons: [
                {
                    text: 'Add Answer',
                    handler: () => {
                        this.createNewAnswerAlert().present();
                    }
                },
                {
                    text: 'Remove all Answers',
                    role: 'destructive',
                    handler: () => {
                        const fArray: FormArray = <FormArray>this.questionForm.get('answers');
                        const len = fArray.length;
                        if (len > 0) {
                            for (let i = len - 1; i >= 0; i--) {
                                fArray.removeAt(i);
                            }
                            const toast = this.toastController.create({
                                message: 'All Answers were deleted!',
                                duration: 1500,
                                position: 'bottom'
                            });
                            toast.present();
                        }
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }

    onSubmit() {
        const value = this.questionForm.value;
        let answers = [];
        if (this.answers.length > 0) {
            answers = this.answers.map(answer => {
                return {answer: answer.answer, value: answer.value, comment: answer.comment};
            });
        }

        if (this.mode == 'Edit') {
            this.questionsService.updateQuestion(this.token, this.index, value.question, value.weight, answers);
        } else {
            this.questionsService.addQuestion(this.token, value.question, value.weight, answers);
        }
        this.questionForm.reset();
        this.navCtrl.pop();
    }


    private initializeForm() {
        let question = null;
        let weight = null;
        let answers = [];

        if (this.mode == 'Edit') {
            question = this.question.question;
            weight = this.question.weight;
            if (this.answers.length > 0) {
                for (let answer of this.question.answers) {
                    answers.push(new FormControl(answer.answer, Validators.required));
                }
            }
        }

        this.questionForm = new FormGroup({
            'question': new FormControl(question, Validators.required),
            'weight': new FormControl(weight, Validators.required),
            'answers': new FormArray(answers)
        });
    }

    onDelete() {
        let alert = this.alertController.create({
            title: 'Really delete: ' + this.question.question + '?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Delete',
                    handler: () => {
                        this.questionsService.removeQuestion(this.token, this.index);
                        const toast = this.toastController.create({
                            message: 'Deleted that questions....You\'re right, it was stupid...',
                            duration: 2000,
                            position: 'top'
                        });
                        toast.present();
                        this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();

    }
}
