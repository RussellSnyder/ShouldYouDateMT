import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import {AuthService} from "./auth";
import {Answer} from "../models/answer";
import {Question} from "../models/question";

@Injectable()
export class QuestionsService {
    private questions: Question[] = [];

    constructor(private http: Http, private authService: AuthService) {
    }


    addQuestion(token: string,
                question: string,
                weight: number,
                answers: Answer[]) {
        this.questions.push({question: question, weight: weight, answers: answers});
        this.saveList(token);
    }

    getQuestions() {
        return this.questions.slice();
    }

    updateQuestion(token: string,
                   index: number,
                   question: string,
                   weight: number,
                   answers: Answer[]) {

        this.questions[index] = new Question(question, weight, answers);
        this.saveList(token);
    }

    removeQuestion(token, index: number) {
        this.questions.splice(index, 1);
        this.saveList(token)
    }

    saveList(token) {
        return this.http.put('https://shouldyoudatemt.firebaseio.com/questions.json?auth=' + token, this.questions)
            .subscribe((response: Response) => {
                this.questions = response.json();
                return response.json();
            })
    }

    fetchList() {
        return this.http
            .get('https://shouldyoudatemt.firebaseio.com/questions.json')
            .map((response: Response) => {
                const questions: Question[] = response.json() ? response.json() : [];
                for (let item of questions) {
                    if (!item.hasOwnProperty('answers')) {
                        item.answers = [];
                    }
                }
                return questions;
            }, err => console.log(err))
            .do((questions: Question[]) => {
                if (questions) {
                    this.questions = questions;
                } else {
                    this.questions = [];
                }
            });
    }
}
