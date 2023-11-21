import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe/recipe.module';
import { RecipeService } from '../services/recipe.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.css'],
})
export class SavedRecipesComponent implements OnInit {
  savedRecipes: Recipe[] = [];

  showSavedRecipes = true;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadSavedRecipes();
  }

  loadSavedRecipes() {
    if (localStorage.getItem('jwt')) {
      this.recipeService.getSavedRecipes().subscribe(
        (response: any) => {
          const recipes = (response && response.recipes) || response;

          this.savedRecipes = recipes as Recipe[];
          console.log('Saved Recipes Array:', this.savedRecipes);
        },
        (error) => {
          console.error('Error fetching saved recipes:', error);
        }
      );
    }
  }

  toggleSavedRecipes() {
    console.log('Toggle Saved Recipes clicked from saved-recipes-component');
    this.showSavedRecipes = !this.showSavedRecipes;
  }
}
