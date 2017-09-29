import {Component} from '@angular/core';

import {ShoppingListPage} from "../shopping-list/shopping-list";
import {RecipesPage} from "../recipes/recipes";
import {QuestionsPage} from "../questions/questions";

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {
    questionsPage = QuestionsPage;
    slPage = ShoppingListPage;
    recipesPage = RecipesPage;
}
