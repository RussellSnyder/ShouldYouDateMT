import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Question} from "../../models/question";
import {QuestionsService} from "../../services/questions";
import {Answer} from "../../models/answer";
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


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private actionSheetController: ActionSheetController,
                private alertController: AlertController,
                private toastController: ToastController,
                private questionsService: QuestionsService) {
    }

    ionViewDidLoad() {

    }

    ngOnInit() {
        this.initializeForm();

    }

    ionViewWillEnter() {
        this.mode = this.navParams.get('mode') || 'New';

        this.title = this.getTitleText();
        this.buttonText = this.getButtonText();
    }

    private getTitleText() {
        switch (this.mode) {
            case 'New':
                return `Add a ${this.mode} Quiz Question`;
        }
    }

    private getButtonText() {
        switch (this.mode) {
            case 'New':
                return `Save Question`;
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
        console.log('1', value.answers);
        if (value.answers.length > 0) {
            answers = value.answers.map(answer => {
                console.log('2', answer);
                return {answer: answer.answer, value: answer.value, comment: answer.comment};
            });
        }
        console.log('3', answers);
        if (this.mode == 'Edit') {
            this.questionsService.updateQuestion(this.index, value.question, value.weight, answers);
        } else {
            this.questionsService.addQuestion(value.question, value.weight, answers);
        }
        this.questionForm.reset();
        this.navCtrl.pop();
    }


    private initializeForm() {
        let question = null;
        let weight = null;
        let answers = [];

        if (this.mode == 'Edit') {
            for (let answer of this.question.answers) {
                answers.push(new FormControl(answer.answer, Validators.required));
            }
        }

        this.questionForm = new FormGroup({
            'question': new FormControl(question, Validators.required),
            'weight': new FormControl(weight, Validators.required),
            'answers': new FormArray(answers)
        });
    }
}
