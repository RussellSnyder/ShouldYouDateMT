import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

import { AuthService } from "./auth";
import {Answer} from "../models/answer";
import {Question} from "../models/question";

@Injectable()
export class QuestionsService {
  private questions: Question[] = [];

  constructor(private http: Http, private authService: AuthService) {}

  addQuestion(question: string,
            weight: number,
            answers: Answer[]) {

    console.log(this.questions);
    this.questions.push(new Question(question, weight, answers));
  }

  getQuestions() {
    return this.questions.slice();
  }

  updateQuestion(index: number,
                 question: string,
                 weight: number,
                 answers: Answer[]) {
    this.questions[index] = new Question(question, weight, answers);
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://shouldyoudatemt.firebaseio.com/questions.json?auth=' + token, this.questions)
      .map((response: Response) => response.json());
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://shouldyoudatemt.firebaseio.com/' + userId + '/questions.json?auth=' + token)
      .map((response: Response) => {
        const questions: Question[] = response.json() ? response.json() : [];
        for (let item of questions) {
          if (!item.hasOwnProperty('answers')) {
            item.answers = [];
          }
        }
        return questions;
      })
      .do((questions: Question[]) => {
        if (questions) {
          this.questions = questions;
        } else {
          this.questions = [];
        }
      });
  }
}
