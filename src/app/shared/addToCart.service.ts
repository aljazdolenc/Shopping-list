import { ShoppingListService } from './../Shopping list/shoppingList.service';
import { Ingridient } from './ingridient.model';
import {Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class AddToCartService{

    constructor(private shoppingListService:ShoppingListService){}
    
    addItem(recipeIngredients: Ingridient[]){
        this.shoppingListService.addToCart(recipeIngredients);
    }
}