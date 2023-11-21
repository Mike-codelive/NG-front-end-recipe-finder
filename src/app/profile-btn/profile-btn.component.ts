import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MenuService } from '../menuservice.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-btn',
  templateUrl: './profile-btn.component.html',
  styleUrls: ['./profile-btn.component.css'],
  animations: [
    trigger('menuState', [
      state('open', style({ opacity: 1 })),
      state('open', style({ pointerEvents: 'auto' })),
      state('closed', style({ opacity: 0 })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ProfileBtnComponent implements OnInit {
  @Input() isProfileBtnOpen: boolean = false;
  @Output() toggleSavedRecipesEvent = new EventEmitter<void>();
  @Output() logoutClicked = new EventEmitter<void>();

  isMenuOpen = false;
  isLoggedIn = false;
  showProfileEditPopup = false;

  showSavedRecipes = true;
  toggleSavedRecipes() {
    console.log('Toggle Saved Recipes clicked from profile-btn');
    this.toggleSavedRecipesEvent.emit();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.getLoggedIn();
    this.isMenuOpen = false;
  }

  showPopup() {
    this.showProfileEditPopup = true;
  }

  constructor(
    private menuService: MenuService,
    public authService: AuthService
  ) {}

  logout() {
    localStorage.removeItem('jwt');
    this.isMenuOpen = false;
    this.showProfileEditPopup = false;
    this.logoutClicked.emit();
    this.authService.setLoggedIn(false);
  }

  account() {
    this.showPopup();
  }
}
