import { Subscription } from 'rxjs';
import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
 
  recipes: Recipe[];
  private recipeSub:Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();

    this.recipeSub= this.recipeService.recipesList.subscribe(
      (relist) =>{
        this.recipes=relist;
      });
  }
  
  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }
}
