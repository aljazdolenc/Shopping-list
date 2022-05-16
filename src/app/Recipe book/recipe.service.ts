import { Subject } from 'rxjs';

import { Injectable} from "@angular/core";
import { Ingridient } from "../shared/ingridient.model";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})

export class RecipeService{

    recipesList= new Subject<Recipe[]>()

    private recipes: Recipe[] = [
        new Recipe(
            'Dummy recipe 1',
            'Best breakfast on the world',
            'https://images.eatthismuch.com/img/412929_tabitharwheeler_b0345d67-b4a8-42f6-bcdb-e7aa6ad20577.jpg',
            [new Ingridient('sausage',2),new Ingridient('egg',1)]),
        new Recipe(
            'Dummy recipe 2',
            'Good snack sandwich',
            'https://images.kitchenstories.io/wagtailOriginalImages/R2307-photo-final-5/R2307-photo-final-5-large-landscape-150.jpg',
            [new Ingridient('bun', 2),new Ingridient('tomato',2)])
       ];

        getRecipes(){
            return this.recipes.slice();
        }
        getRecipe(index:number){
            return this.recipes.slice()[index];  
        }
        deleteItem(index:number){
            this.recipes.splice(index,1);
            this.refreshList();
        }
        addRecipe(recipe:Recipe){
            this.recipes.push(recipe)
            this.refreshList()
        }
        updateRecipe(recipe:Recipe,index){
            this.recipes.splice(index,1,recipe);
            this.refreshList()
        }

        fetchedRecipeUpdate(recipes:Recipe[]){
            this.recipes= recipes;
            this.refreshList();
        }
        refreshList(){
            this.recipesList.next(this.getRecipes());
        }
      
}