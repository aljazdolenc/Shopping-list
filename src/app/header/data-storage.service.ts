
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './../Recipe book/recipe.service';
import { Injectable } from '@angular/core';
import { Recipe } from '../Recipe book/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(
        private recipeService: RecipeService,
        private http: HttpClient) { }

    getHttpLink() {
        const userId = JSON.parse(localStorage.getItem('userData')).id;
        const link = 'https://recipe-shopping-5925d-default-rtdb.europe-west1.firebasedatabase.app/' + userId + '.json';
        return link
    }

    saveDataRequest() {
        const recipes: Recipe[] = this.recipeService.getRecipes();
        const httpLink = this.getHttpLink();
        return this.http.put(httpLink, recipes)
    }

    getDataRequest() {
        let httpLink = this.getHttpLink();
        return this.http.get<Recipe[]>(httpLink)
            .pipe(
                map((recipes: Recipe[]) => {
                    if(recipes==null){
                        console.log('error')
                        return false
                    }
                    return recipes.map(recipe => {
                        return {
                            ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }),
                tap((recipes: Recipe[]) => {
                    if(recipes){
                        this.recipeService.fetchedRecipeUpdate(recipes)
                    }
                })
            )
    }
}