import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RecipeSearchService } from '../recipe-search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  constructor(private recipeSearchService: RecipeSearchService) {
  }

  searchTypes = ['recipes','diet','ingredients'];

  search = new FormGroup({
    searchType: new FormControl('recipes'),
    searchTerm: new FormControl('')
  })

  onSubmit(): void {
    let term = this.search.value.searchTerm;
    if(this.search.value.searchType === 'recipes') this.recipeSearchService.searchRecipes(term);
    if(this.search.value.searchType === 'diet') this.recipeSearchService.searchDiet(term);
    if(this.search.value.searchType === 'ingredients') this.recipeSearchService.searchIngredients(term);
    this.search.patchValue({searchTerm: ''});
  }
}
