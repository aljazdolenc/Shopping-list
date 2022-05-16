import { DataStorageService } from './header/data-storage.service';
import { RecipeService } from './Recipe book/recipe.service';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,   
  ],
  providers: [
    RecipeService, 
    DataStorageService,
    {provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptor,
     multi:true}],

  bootstrap: [AppComponent]
})
export class AppModule { }
