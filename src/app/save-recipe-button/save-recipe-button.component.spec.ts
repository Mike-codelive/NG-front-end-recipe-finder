import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRecipeButtonComponent } from './save-recipe-button.component';

describe('SaveRecipeButtonComponent', () => {
  let component: SaveRecipeButtonComponent;
  let fixture: ComponentFixture<SaveRecipeButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveRecipeButtonComponent]
    });
    fixture = TestBed.createComponent(SaveRecipeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
