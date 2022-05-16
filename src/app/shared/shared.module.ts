import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({
declarations:[
    SpinnerComponent,
    AlertComponent,
    DropdownDirective
],
exports:[
    SpinnerComponent,
    AlertComponent,
    DropdownDirective
],
imports:[
    CommonModule
]
}) export class SharedModule{}