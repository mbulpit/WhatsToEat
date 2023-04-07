import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchRecipesComponent } from './search-recipes/search-recipes.component';
import { RecipeComponent } from './recipe/recipe.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  { path: 'search-recipes', component: SearchRecipesComponent},
  { path: 'recipe/:id', component: RecipeComponent},
  { path: 'login', component: LoginPageComponent },
  { path: 'sign-up', component: SignUpComponent},
  { path: 'favorites', component: FavoritesComponent},
  { path: 'profile', component: ProfilePageComponent},
  { path: '', redirectTo: '/search-recipes', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
