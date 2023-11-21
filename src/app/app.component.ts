import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'recipe-finder';
  recipes: any[] = [];
  showSavedRecipes = true;

  toggleSavedRecipes() {
    // Implement the logic you want when the event is triggered
    console.log('Toggle Saved Recipes clicked in AppComponent');
    this.showSavedRecipes = !this.showSavedRecipes;
  }
}
