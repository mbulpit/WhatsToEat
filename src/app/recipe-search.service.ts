import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeSearchService {
  API_KEY = '59957691a7784bada01e68d2cb22b171';

  constructor(private http: HttpClient) {}

  recipesToDisplay: any;

  resultsTitle: string = 'Here are some random recipes:';

  p: number = 1;

   getRandomRecipes() {
    this.http.get(`https://api.spoonacular.com/recipes/random?number=12&apiKey=${this.API_KEY}`)
      .subscribe((response: any) => {
        this.recipesToDisplay = response.recipes;
      });
    this.resultsTitle = 'Here are some random recipes:';
   }



   setPageNumber(p: number) {
    this.p = p;
   }

   updateTitleForFavorites() {
    this.resultsTitle = 'Here are your Favorite recipes:';
   }

  searchRecipes(term: any) {
    this.http.get(`https://api.spoonacular.com/recipes/complexSearch?query=${term}&number=100&apiKey=${this.API_KEY}`)
      .subscribe((response: any) => {
        this.recipesToDisplay = response.results;
      });
    this.setPageNumber(1);
    this.resultsTitle = `Recipe Search results for ${term}:`;
  }

  searchIngredients(term: any) {
    this.http.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${term}&number=100&apiKey=${this.API_KEY}`)
      .subscribe((response: any) => {
        this.recipesToDisplay = response;
      });
    this.setPageNumber(1);
    this.resultsTitle = `Ingredient Search results for ${term}:`;
  }

  searchDiet(term: any) {
    this.http.get(`https://api.spoonacular.com/recipes/complexSearch?diet=${term}&number=100&apiKey=${this.API_KEY}`)
      .subscribe((response: any) => {
        this.recipesToDisplay = response.results;
      });
    this.setPageNumber(1);
    this.resultsTitle = `Diet Search results for ${term}:`;
  }

  getRecipeInfo(id: string) {
    return this.http.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${this.API_KEY}`)
  }

  loadFavorites(favs: Array<string>) {
    this.recipesToDisplay.length = 0;
    favs.map((fav: string) => {
      this.getRecipeInfo(fav)
        .subscribe((response: any) => {
          this.recipesToDisplay.push(response);
        })
    })
    this.setPageNumber(1);
  }
}
