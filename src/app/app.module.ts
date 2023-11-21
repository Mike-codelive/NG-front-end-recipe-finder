import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipesComponent } from './recipes/recipes.component';
import { BodyComponent } from './body/body.component';
import { AboutComponent } from './about/about.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { ProfileBtnComponent } from './profile-btn/profile-btn.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PopupComponent } from './popup/popup.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { SaveRecipeButtonComponent } from './save-recipe-button/save-recipe-button.component';
import { AuthGuard } from './guards/auth.guard';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    RecipesComponent,
    BodyComponent,
    AboutComponent,
    RegistrationComponent,
    AlertComponent,
    LoginComponent,
    ProfileBtnComponent,
    ProfileEditComponent,
    PopupComponent,
    AppNavbarComponent,
    SaveRecipeButtonComponent,
    SavedRecipesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
