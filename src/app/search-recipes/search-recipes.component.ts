import { Component } from '@angular/core';
import { RecipeSearchService } from '../recipe-search.service';

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.css']
})
export class SearchRecipesComponent {

  constructor(private recipeSearch: RecipeSearchService) {}

  ngOnInit() {
  }
}
