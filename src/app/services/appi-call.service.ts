import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe/recipe.module';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppiCallService {
  constructor(private http: HttpClient) {}

  sendData(queryParams: any): Observable<any> {
    const apiUrl = 'https://recipe-finder-appi.miguelangeldevs.repl.co/search';

    let params = new HttpParams();
    if (queryParams.ingredients) {
      const ingredientsArray = queryParams.ingredients.split(' ');

      if (ingredientsArray.length > 1) {
        ingredientsArray.forEach((ingredient: string, index: number) => {
          params = params.append(`ingredients[${index}]`, ingredient.trim());
        });
      } else {
        params = params.append('ingredients', ingredientsArray[0].trim());
      }
    }

    console.log(apiUrl, { params: params });
    return this.http.get(apiUrl, { params: params });
  }

  fetchRecipeDetails(recipeId: number): Observable<any> {
    const detailsUrl = `https://recipe-finder-appi.miguelangeldevs.repl.co/search/${recipeId}`;

    return this.http.get(detailsUrl);
  }

  private baseUrl =
    'https://recipe-finder-appi.miguelangeldevs.repl.co/recipes';

  saveRecipe(recipe: Recipe): Observable<any> {
    console.log('Recipe Data:', recipe);
    const saveUrl = `${this.baseUrl}/save`;

    const token = localStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(saveUrl, recipe, { headers });
  }

  getSavedRecipes(): Observable<Recipe[]> {
    const savedRecipesUrl =
      'https://recipe-finder-appi.miguelangeldevs.repl.co/recipes/user';

    const token = localStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Recipe[]>(savedRecipesUrl, { headers });
  }

  isRecipeSaved(recipeId: number): Observable<boolean> {
    return this.getSavedRecipes().pipe(
      map((savedRecipes) =>
        savedRecipes.some((recipe) => recipe.id === recipeId)
      )
    );
  }
}
