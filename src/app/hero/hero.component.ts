import { Component, Output, EventEmitter } from '@angular/core';
import { AppiCallService } from '../services/appi-call.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {
  ingredients: string = '';
  recipes: any[] = [];
  isLoading: boolean = false;
  isMenuOpen: boolean = false;
  @Output() toggleSavedRecipesEvent = new EventEmitter<void>();

  recipes$: Observable<any[]> | null = null;

  constructor(
    private AppiCallService: AppiCallService,
    public authService: AuthService
  ) {}

  showSavedRecipes = true;
  toggleSavedRecipes() {
    console.log('Toggle Saved Recipes clicked from hero.component');
    this.toggleSavedRecipesEvent.emit();
    this.showSavedRecipes = !this.showSavedRecipes;
  }

  onSubmit() {
    this.isLoading = true;
    this.AppiCallService.sendData({ ingredients: this.ingredients }).subscribe(
      (response) => {
        console.log('API Response:', response);
        this.recipes = response.recipes;
        this.ingredients = '';
        this.isLoading = false;
      },
      (error) => {
        console.error('API Error:', error);
        this.isLoading = false;
      }
    );
  }

  fetchRecipeDetails(recipeId: number) {
    this.isLoading = true;
    this.AppiCallService.fetchRecipeDetails(recipeId).subscribe(
      (details) => {
        this.isLoading = false;
        console.log('Recipe Details:', details);
      },
      (error) => {
        this.isLoading = false;
        console.error('API Error:', error);
      }
    );
  }
}
