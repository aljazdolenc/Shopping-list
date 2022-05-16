import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ShoppingEditComponent,
        ShoppingListComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path:'', component: ShoppingListComponent}
        ]),
        SharedModule
    ],
    exports: [
        ShoppingEditComponent,
        ShoppingListComponent,
    ]

}) export class ShoppingListModule { }