import { Component, Input, OnInit } from '@angular/core';
import { AppiCallService } from '../services/appi-call.service';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../recipe/recipe.module';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {
  @Input() recipes: any;
  selectedRecipeDetails: string | null = null;
  isDetailsVisible: boolean = false;
  recipeStates: {
    [recipeId: number]: { isDetailsVisible: boolean; instructions: string };
  } = {};
  recipeInstructions: { [key: string]: string } = {};

  recipe: Recipe = {
    id: 1,
    title: 'string',
    name: 'Your Recipe Name',
    ingredients: [],
    instructions: 'Your recipe instructions go here',
    user: 'string',
    image: [],
    __v: 0,
    _id: 'string',
  };

  getUsedIngredients(recipe: any): any[] {
    if (recipe.usedIngredients && Array.isArray(recipe.usedIngredients)) {
      return recipe.usedIngredients;
    }

    return [];
  }

  getMissedIngredients(recipe: any): any[] {
    if (recipe.missedIngredients && Array.isArray(recipe.missedIngredients)) {
      return recipe.missedIngredients;
    }

    return [];
  }

  constructor(
    private appiCallService: AppiCallService,
    private recipeService: RecipeService
  ) {}

  saveRecipe() {
    this.recipeService.saveRecipe(this.recipe).subscribe(
      (response) => {
        console.log('Recipe saved successfully', response);
      },
      (error) => {
        console.error('Error saving recipe', error);
      }
    );
  }

  fetchRecipeDetails(recipeId: number) {
    if (!this.recipeStates[recipeId]) {
      this.recipeStates[recipeId] = {
        isDetailsVisible: false,
        instructions: '',
      };
    }

    const recipeState = this.recipeStates[recipeId];

    if (!recipeState.isDetailsVisible) {
      this.appiCallService.fetchRecipeDetails(recipeId).subscribe(
        (details) => {
          recipeState.instructions = details.instructions;
          recipeState.isDetailsVisible = true;
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    }
  }
}
