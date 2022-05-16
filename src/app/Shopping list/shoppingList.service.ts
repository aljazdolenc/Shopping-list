
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingridient } from "../shared/ingridient.model";

@Injectable({providedIn: 'root'})

export class ShoppingListService{
  
    // SUBSCRIPTIONS
    ingridientsChanged= new Subject<Ingridient[]>();
    choosenOne= new Subject<any>();
    cancel= new Subject<any>();
    noItems= new Subject<boolean>();

    //INGRIDIENTS
    public ingridients: Ingridient[]=[
        new Ingridient("Apples",5),
        new Ingridient("Tomato", 10)];
        
      choosenItem:string;
      choosenIndex:number;

      

      selectedItem(itemName,amount,index){
        this.choosenItem=itemName;
        this.choosenIndex=index;
        this.choosenOne.next(
          {'name' :itemName,
          'amount': amount,
          'index' :index});
      }

      getIngridients(){
        return this.ingridients.slice(); 
      }

      addIngridient(newIng: Ingridient){
        this.ingridients.push(newIng);
        this.refreshIngridients()
      }

      deleteSelectedItem(){
          this.ingridients.splice(this.choosenIndex,1);
          this.refreshIngridients()
      }

      onClearClicked(){
        this.ingridients=[];
        this.refreshIngridients()
      }

      addToCart(recipeIngredients: Ingridient[]){
       this.ingridients.push(... recipeIngredients)
       this.refreshIngridients()
    }
    updateIngridient( ingredient:Ingridient){
      
      this.ingridients.splice(this.choosenIndex, 1, ingredient);
      this.refreshIngridients()
    }

    refreshIngridients(){
      this.ingridientsChanged.next(this.ingridients.slice())
    }

  
  }

