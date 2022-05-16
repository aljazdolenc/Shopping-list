import { ShoppingListService } from './../shoppingList.service';
import { Ingridient } from './../../shared/ingridient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy{

  ingridient: Ingridient;
  shoppingAddForm: FormGroup;
  editMode= false;
  inputName;
  inputAmount;
  EditOrAdd='Add';
  hideDelete:boolean=false;

  choosenSub:Subscription;
  noItemSub: Subscription;
  
 
  constructor(private shoppingListService:ShoppingListService){}


  onDelete(){
    this.shoppingListService.deleteSelectedItem();
    this.onCancel();
  }
  onClear(){
    this.shoppingListService.onClearClicked();
    this.onCancel();
  }
  onCancel(){
    this.shoppingAddForm.reset(),
    this.shoppingListService.cancel.next(()=>{});
    this.editMode=false;
    this.EditOrAdd='Add';
  }

  ngOnInit(): void {
    this.shoppingAddForm= new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount':new FormControl(null, Validators.required ,this.toLittle)
    });

    this.choosenSub= this.shoppingListService.choosenOne.subscribe((object)=>{
      this.editMode=true;
      this.EditOrAdd='Edit';
      this.inputName=object.name;
      this.inputAmount=object.amount;
    })

    this.noItemSub= this.shoppingListService.noItems.subscribe((state)=>{
      this.hideDelete=state;
    })
  }

ngOnDestroy(): void {
  this.choosenSub.unsubscribe();
  this.noItemSub.unsubscribe();
}

  toLittle(control:FormControl): Observable<any>|Promise<any>{

    const promise = new Promise<any>((resolve,reject)=>{
      if(control.value<1){
        resolve({'NumberToSmall':true})
      }else{
        resolve(null)
      }
    }) 
    return promise;
  }

submit(){
 
  const name= this.shoppingAddForm.get('name').value;
  const value= this.shoppingAddForm.get('amount').value

  if(this.editMode==true){
    this.shoppingListService.updateIngridient(new Ingridient(name,value))
  }else{
    this.shoppingListService.addIngridient(new Ingridient(name,value));
  }
    this.shoppingAddForm.reset()
    this.EditOrAdd='Add';
    this.editMode=false;
}

}
