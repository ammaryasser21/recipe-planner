import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from '../models/recipe.model';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        MatCheckboxModule,
        HttpClientModule,
        NavbarComponent
    ]
})
export class HomeComponent implements OnInit {
    recipes: Recipe[] = [];
    currentUser: User | null = null;
    searchForm: FormGroup;
    showOptions = false;

    constructor(private readonly authService: AuthService, private readonly recipeService: RecipeService, public router: Router, private readonly fb: FormBuilder) {
        this.searchForm = this.fb.group({
            query: [''],
            cuisine: [''],
            ingredients: [''],
            cookingTime: [null],
            follow: [false],
            posted: [false],
        });
    }

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        this.loadRecipes();
    }
    toggleOptions() {
        this.showOptions = !this.showOptions;
    }

    loadRecipes(): void {
        this.recipeService.getAllRecipes().subscribe(recipes => this.recipes = recipes);
    }

    likeRecipe(recipeId: string) {
        if (this.currentUser?.id) {
            this.recipeService.addToFavorites(recipeId, this.currentUser.id).subscribe(response => {
                if (response.unfavorited) {
                    console.log('removed from favorites!');
                    return;
                }
                console.log('added to favorites!');
            });
        }
    }

    followRecipe(recipeId: string) {
        if (this.currentUser?.id) {
            // this.recipeService.followRecipe(recipeId, this.currentUser.id).subscribe();
        }
    }
    saveRecipe(recipeId: string) {
        if (this.currentUser?.id) {
            this.recipeService.addToSaved(recipeId, this.currentUser.id).subscribe(response => {
                if (response.unsaved) {
                    console.log('Removed from saved!');
                    return;
                }
                console.log('Added to saved!');
            });
        }
    }
    navigateToDetails(recipeId: string) {
        this.router.navigate(['/details', recipeId]);
    }

    navigateToMealPlanning() {
        this.router.navigate(['/meal-planning']);
    }
    searchRecipes() {
        this.recipeService.getAllRecipes().subscribe(recipes => {
            let filteredRecipes = recipes;
            if (this.searchForm.get('query')?.value) {
                filteredRecipes = filteredRecipes.filter(recipe =>
                    recipe.name.toLowerCase().includes(this.searchForm.get('query')?.value.toLowerCase()) || recipe.description.toLowerCase().includes(this.searchForm.get('query')?.value.toLowerCase()))
            }
            if (this.searchForm.get('cuisine')?.value) {
                filteredRecipes = filteredRecipes.filter(recipe =>
                    recipe.cuisine?.toLowerCase().includes(this.searchForm.get('cuisine')?.value.toLowerCase()))
            }
            if (this.searchForm.get('ingredients')?.value) {
                filteredRecipes = filteredRecipes.filter(recipe =>
                    recipe.ingredients?.some(ingredient => ingredient.name.toLowerCase().includes(this.searchForm.get('ingredients')?.value.toLowerCase())))
            }
            if (this.searchForm.get('cookingTime')?.value) {
                filteredRecipes = filteredRecipes.filter(recipe =>
                    recipe.cookingTime === this.searchForm.get('cookingTime')?.value)
            }
            if (this.searchForm.get('follow')?.value) {
                if (this.currentUser?.id) {
                    this.recipeService.getFavoritesByUser(this.currentUser?.id).subscribe(favorites => {
                        filteredRecipes = filteredRecipes.filter(recipe => favorites.some(fav => fav.id === recipe.id));
                        this.recipes = filteredRecipes;
                    });
                    return;
                }

            }
            if (this.searchForm.get('posted')?.value) {
                if (this.currentUser?.id) {
                    filteredRecipes = filteredRecipes.filter(recipe => recipe.userId === this.currentUser?.id);
                }
            }

            this.recipes = filteredRecipes;

        });
    }
    addToShoppingList(recipe:Recipe): void {
        this.recipeService.addToShoppingList(recipe);
    }
}