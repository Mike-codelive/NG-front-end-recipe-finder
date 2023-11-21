import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css'],
})
export class AppNavbarComponent {
  isProfileBtnOpen = false;

  @Output() toggleSavedRecipesEvent = new EventEmitter<void>();

  toggleSavedRecipes() {
    console.log('Toggle Saved Recipes clicked');
    this.toggleSavedRecipesEvent.emit();
  }

  handleLogout() {
    this.isProfileBtnOpen = false;
  }
}
