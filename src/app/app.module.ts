import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RecipeDisplayComponent } from './recipe-display/recipe-display.component';
import { RecipeComponent } from './recipe/recipe.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchRecipesComponent } from './search-recipes/search-recipes.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    RecipeDisplayComponent,
    RecipeComponent,
    LoginPageComponent,
    SignUpComponent,
    FavoritesComponent,
    SearchRecipesComponent,
    ProfilePageComponent,
    ConfirmationModalComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
