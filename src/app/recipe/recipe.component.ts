import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RecipeSearchService } from '../recipe-search.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  recipe?: any;
  constructor(
    private recipeSearchService: RecipeSearchService,
    private user: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    ) {}

  favoriteRecipe: boolean = false;

  id = this.route.snapshot.paramMap.get('id');
  
  ngOnInit(): void {
    this.favoriteRecipeCheck();
    this.getRecipe();
  }

  getRecipe() {
    this.recipeSearchService.getRecipeInfo(this.id!)
      .subscribe((response: any) => {
        console.log(response);
        this.recipe = response;
      })
  }

  favoriteRecipeCheck() {
    let favorite = this.user.signedInUser.favorites?.includes(this.id!);
    if(favorite) this.favoriteRecipe = true;
  }

  favClicked() {
    if(!this.user.signedInUser.name) {
      this.router.navigate(['login'],
      { queryParams: { arg: 'Please sign in to add this Recipe to your favorites.'}});
    } else if(this.favoriteRecipe) {
      this.favoriteRecipe = false;
      this.user.removeRecipeFromFavorites(this.id!);
    } else {
      this.favoriteRecipe = true;
      this.user.addRecipeToFavorites(this.id!)
    }
  }

  goBack(): void {
    this.location.back();
  }
}
