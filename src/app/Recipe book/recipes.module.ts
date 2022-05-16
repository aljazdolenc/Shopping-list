import { RecipesRoutingModule } from './recipe-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { RecipeBookComponent } from "./recipe-book.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { SelectComponent } from "./select/select.component";
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        RecipeDetailsComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeBookComponent,
        RecipeEditComponent,
        SelectComponent,     
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        CommonModule,
        SharedModule,
        RecipesRoutingModule
    ],
    bootstrap: [RecipeModule]
})
export class RecipeModule {}