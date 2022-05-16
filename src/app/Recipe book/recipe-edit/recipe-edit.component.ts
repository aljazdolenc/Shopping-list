import { RecipeService } from './../recipe.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  index:number;
  editMode= false;
  recipeEditForm: FormGroup;
  addIng:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private recipeService:RecipeService ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.index=+params['index'];
        this.editMode=params['index'] != null;
        this.initForm()
      }
    )    
  }

  private initForm(){

    let recipeName: string='';
    let imageUrl: string='';
    let description:string ='';
    let ingridientsList =new FormArray([]);


    if(this.editMode){
      const recipe= this.recipeService.getRecipe(this.index);
      recipeName= recipe.name;
      imageUrl= recipe.imagePath;
      description= recipe.description;

      if(recipe['ingredients']){
        for( let ingridient of recipe.ingredients){
          ingridientsList.push(
            new FormGroup({
              'name': new FormControl(ingridient.name, Validators.required),
              'amount': new FormControl(ingridient.amount, Validators.required, this.toLittle)
            })
          )
        }
      }

    }

    this.recipeEditForm= new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'url': new FormControl(imageUrl, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingridients': ingridientsList
    })
  };

  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe({
        'name': this.recipeEditForm.get('name').value,
        'imagePath':this.recipeEditForm.get('url').value,
        'description':this.recipeEditForm.get('description').value,
        'ingredients': this.recipeEditForm.get('ingridients').value
      }, this.index)
      this.editMode=false;
    }else{
      this.recipeService.addRecipe({
          'name': this.recipeEditForm.get('name').value,
          'imagePath':this.recipeEditForm.get('url').value,
          'description':this.recipeEditForm.get('description').value,
          'ingredients': this.recipeEditForm.get('ingridients').value
        });
    }

  }
  onAddIng(){
    (<FormArray>this.recipeEditForm.get('ingridients')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required),
        'amount': new FormControl('', Validators.required, this.toLittle),
      })
    )
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
  onDeleteIng(index){
    (<FormArray>this.recipeEditForm.get('ingridients')).removeAt(index);
  }
}
