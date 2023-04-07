import { Component } from '@angular/core';
import { RecipeSearchService } from '../recipe-search.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-recipe-display',
  templateUrl: './recipe-display.component.html',
  styleUrls: ['./recipe-display.component.css']
})
export class RecipeDisplayComponent {

  constructor(private recipeSearchService: RecipeSearchService,
              private userService: UserService) {}
  
  noImageUrl = 'https://spoonacular.com/recipeImages/667707-312x231.jpg';

  get resultsTitle(): string {
    return this.recipeSearchService.resultsTitle;
  }

  get recipesToDisplay(): any {
    return this.recipeSearchService.recipesToDisplay;
  }

  get p(): number {
    return this.recipeSearchService.p;
  }

  onPageChange(event: any) {
    this.recipeSearchService.setPageNumber(event);
  }

}
