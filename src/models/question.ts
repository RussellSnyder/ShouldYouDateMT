import {Answer} from "./answer";
export class Question {
    constructor(public question: string, public weight: number, public answers: Answer[]) {}
}
