import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import {AuthService} from "./auth";
import {Answer} from "../models/answer";
import {Question} from "../models/question";

@Injectable()
export class QuizService {
    private questions: Question[] = [];

    constructor(private http: Http, private authService: AuthService) {
    }

}
