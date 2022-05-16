import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';


const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes',
        loadChildren: () =>
            import('./Recipe book/recipes.module')
                .then(m => m.RecipeModule)
    },
    {path:'shopping-list',
        loadChildren:()=>
            import('./Shopping list/shopping-list.module')
                .then(m=>m.ShoppingListModule)
    },
    {path:'auth',
        loadChildren: ()=>
            import('./auth/auth.module')
                .then(m=>m.AuthModule)
            }
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy : PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {}