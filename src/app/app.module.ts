import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {EditRecipePage} from "../pages/edit-recipe/edit-recipe";
import {RecipePage} from "../pages/recipe/recipe";
import {RecipesPage} from "../pages/recipes/recipes";
import {ShoppingListPage} from "../pages/shopping-list/shopping-list";
import {TabsPage} from "../pages/tabs/tabs";
import {ShoppingListService} from "../services/shopping-list";
import {RecipesService} from "../services/recipes";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {AuthService} from "../services/auth";
import {DatabaseOptionsPage} from "../pages/database-options/database-options";
import {QuestionsPage} from "../pages/questions/questions";
import {QuestionPage} from "../pages/question/question";
import {QuestionsService} from "../services/questions";
import {QuizService} from "../services/quiz";
import {QuizPage} from "../pages/quiz/quiz";
import {QuizQuestionPage} from "../pages/quiz-question/quiz-question";
import {QuizCommentPage} from "../pages/quiz-comment/quiz-comment";

@NgModule({
    declarations: [
        MyApp,
        EditRecipePage,
        RecipePage,
        RecipesPage,
        ShoppingListPage,
        TabsPage,
        SigninPage,
        SignupPage,
        DatabaseOptionsPage,
        QuestionsPage,
        QuestionPage,
        QuizPage,
        QuizQuestionPage,
        QuizCommentPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        EditRecipePage,
        RecipePage,
        RecipesPage,
        ShoppingListPage,
        TabsPage,
        SigninPage,
        SignupPage,
        DatabaseOptionsPage,
        QuestionsPage,
        QuestionPage,
        QuizPage,
        QuizQuestionPage,
        QuizCommentPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        ShoppingListService,
        RecipesService,
        AuthService,
        QuestionsService,
        QuizService
    ]
})
export class AppModule {
}
