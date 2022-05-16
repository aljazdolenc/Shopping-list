import { RouterModule } from '@angular/router';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeBookComponent } from './recipe-book.component';
import { SelectComponent } from './select/select.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { NgModule } from '@angular/core';

const routes:Routes=[
    {
    path:'', 
    component:RecipeBookComponent, 
    canActivate:[AuthGuard],
    children:[
        {path:'', component: SelectComponent, pathMatch:'full'},
        {path:'new', component: RecipeEditComponent},
        {path:':index', component: RecipeDetailsComponent},
        {path:':index/edit', component: RecipeEditComponent}
    ]
    
}]
@NgModule({
imports:[RouterModule.forChild(routes)],
exports:[RouterModule]
})
export class RecipesRoutingModule{}