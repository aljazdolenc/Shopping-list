import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {path:'', component: AuthComponent}
        ]),
    ],
    exports: [
        AuthComponent
    ]
})
export class AuthModule { }