import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { RecipeSearchService } from '../recipe-search.service';
import { NavigationStart, Router } from '@angular/router';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

  constructor(private user: UserService,
              private recipeSearch: RecipeSearchService,
              private router: Router) {}

  get userInfo() {
    return this.user.signedInUser;
  }

  ngOnInit() {
    if(!this.userInfo.name) {
      this.router.navigate(['login'], { queryParams: { arg: 'Please sign in to view your favorites.'}});
    } else {
      this.recipeSearch.updateTitleForFavorites();
      this.recipeSearch.loadFavorites(this.userInfo.favorites!);
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationStart && event.url !== '/favorites'),
      take(1)
    ).subscribe(() => {
      this.recipeSearch.getRandomRecipes();
    })
  }

}
