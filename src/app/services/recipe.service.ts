import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../recipe/recipe.module';
import { AppiCallService } from './appi-call.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl =
    'https://recipe-finder-appi.miguelangeldevs.repl.co/recipes/save';

  constructor(
    private http: HttpClient,
    private appiCallService: AppiCallService
  ) {}

  saveRecipe(recipe: Recipe) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwt'),
    });

    console.log('this is from recipe service', recipe);

    const requestOptions = { headers };

    return this.http.post(this.apiUrl, recipe, requestOptions);
  }

  isRecipeSaved(recipeId: number): Observable<boolean> {
    return this.appiCallService.isRecipeSaved(recipeId);
  }

  private apiGetRecipesUrl =
    'https://recipe-finder-appi.miguelangeldevs.repl.co/recipes/user';

  getSavedRecipes(): Observable<Recipe[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwt'),
    });

    const requestOptions = { headers };

    return this.http.get<Recipe[]>(this.apiGetRecipesUrl, requestOptions).pipe(
      tap((recipes) => {
        console.log('API Response - Saved Recipes:', recipes);
      }),
      catchError((error) => {
        console.error('Error fetching saved recipes:', error);
        throw error;
      })
    );
  }
}
