import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class RecipeModule {}

export interface Recipe {
  _id: string;
  id: number;
  name: string;
  title: string;
  image: string[];
  ingredients: string[];
  instructions: string;
  user: string;
  __v: number;
}
