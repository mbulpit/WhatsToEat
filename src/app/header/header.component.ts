import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { RecipeSearchService }  from '../recipe-search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private user: UserService,
              private recipe: RecipeSearchService) {}

  get userInfo() {
    return this.user.signedInUser;
  }

  onSearchClick() {
    this.recipe.getRandomRecipes();
  }

  signOut() {
    this.user.signOut();
  }

}
