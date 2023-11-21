// save-recipe-button.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe/recipe.module';
import { RecipeService } from '../services/recipe.service';
import { AuthService } from '../services/auth.service';
import { AppiCallService } from '../services/appi-call.service';

@Component({
  selector: 'app-save-recipe-button',
  templateUrl: './save-recipe-button.component.html',
  styleUrls: ['./save-recipe-button.component.css'],
})
export class SaveRecipeButtonComponent implements OnInit {
  @Input() recipe?: Recipe;
  @Input() recipes?: Recipe[];
  isLoggedIn = false;
  isRecipeSaved: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private appiCallService: AppiCallService
  ) {
    this.isLoggedIn = this.authService.getLoggedIn();
  }

  ngOnInit() {
    this.checkIfRecipeIsSaved();
  }

  saveRecipe() {
    if (this.isLoggedIn && this.recipe && this.recipe.id) {
      this.appiCallService.fetchRecipeDetails(this.recipe.id).subscribe(
        (recipeDetails) => {
          console.log('Fetched Recipe Details:', recipeDetails);
          this.recipeService.saveRecipe(recipeDetails).subscribe(
            (response) => {
              console.log('Recipe saved successfully', response);
              this.isRecipeSaved = true;
            },
            (error) => {
              console.error('Error saving recipe', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching recipe details:', error);
        }
      );
    }
  }

  checkIfRecipeIsSaved() {
    if (this.recipe && this.recipe.id && this.isLoggedIn) {
      this.appiCallService.fetchRecipeDetails(this.recipe.id).subscribe(
        (recipeDetails: any) => {
          console.log('Fetched Recipe Details:', recipeDetails);

          if (
            recipeDetails.savedRecipes !== undefined &&
            Array.isArray(recipeDetails.savedRecipes)
          ) {
            const isSaved = recipeDetails.savedRecipes.some(
              (savedRecipe: any) => savedRecipe.id === this.recipe?.id
            );

            this.isRecipeSaved = isSaved;
          } else {
            this.isRecipeSaved = false;
            console.error(
              'Saved recipes data is not an array or is undefined:',
              recipeDetails.savedRecipes
            );
          }
        },
        (error) => {
          console.error('Error fetching recipe details:', error);
        }
      );
    }
  }
}
