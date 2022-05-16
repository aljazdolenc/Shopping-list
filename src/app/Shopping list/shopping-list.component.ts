import { ShoppingListService } from './shoppingList.service';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { Ingridient } from '../shared/ingridient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingridients: Ingridient[];
  choosenItem:string;
  indexItem:number;

  private idSubscription:Subscription;
  private cancelSub:Subscription;
  

  constructor(private shoppingListService:ShoppingListService) {}

  
  selectedItem(itemName,amount,index){
    this.shoppingListService.selectedItem(itemName,amount,index);
    this.choosenItem= itemName;

  }

  onClearClicked(){
    this.shoppingListService.onClearClicked();
  }
  
  ngOnInit(): void {

    this.ingridients= this.shoppingListService.getIngridients();

    this.cancelSub= this.shoppingListService.cancel
    .subscribe(()=>{
      this.choosenItem="";
    })

    this.idSubscription=this.shoppingListService.ingridientsChanged
    .subscribe(
      (newIngrident: Ingridient[]) => {
      this.ingridients= newIngrident;
      if(newIngrident.length==0){
        this.shoppingListService.noItems.next(true);
      }else{
        this.shoppingListService.noItems.next(false)}
    })
  }
  
  ngOnDestroy(){
    this.idSubscription.unsubscribe();
    this.cancelSub.unsubscribe();
  }
}
