import { Component, OnInit } from '@angular/core';
import { RecipeSearchService } from './recipe-search.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WhatToEat';

  constructor(private recipeSearch: RecipeSearchService,
              private user: UserService) {};

  get showConfirmationModal() {
    return this.user.showConfirmationModal;
  }

  ngOnInit() {
    this.recipeSearch.getRandomRecipes();
  }
}
