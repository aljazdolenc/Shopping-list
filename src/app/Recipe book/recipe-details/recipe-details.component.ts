import { RecipeService } from './../recipe.service';
import { Injectable } from '@angular/core';
import { Ingridient } from './../../shared/ingridient.model';
import { Recipe } from './../recipe.model';
import { Component, Input, OnInit} from '@angular/core';
import { AddToCartService } from 'src/app/shared/addToCart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({providedIn:'root'})

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})


export class RecipeDetailsComponent implements OnInit {
  index:number;
  details:Recipe;

  constructor(
    private addToCartService:AddToCartService,
    private activatedRoute:ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
   this.activatedRoute.paramMap
   .subscribe(
     params => {
      this.index= +params.get('index')// dobi index iz url
      
      if(this.index>this.recipeService.getRecipes().length){
        this.router.navigate(['../'],{relativeTo:this.activatedRoute})
      }

      this.details= this.recipeService.getRecipe(this.index)// dobi Recipe object
      }
     );

  }

  onAddToCart(recipeIngredients: Ingridient[]){
    this.addToCartService.addItem(recipeIngredients.slice())
    console.log(recipeIngredients.slice())
  }
  deleteItem(ind:number){
    this.recipeService.deleteItem(ind);
    this.router.navigate(['../'],{relativeTo: this.activatedRoute} )
  }
}
