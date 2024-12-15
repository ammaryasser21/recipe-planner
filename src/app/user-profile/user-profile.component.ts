import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from '../models/recipe.model';
import { User } from '../models/user.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    standalone: true,
    imports: [
        MatCardModule,
        CommonModule,
        NavbarComponent
    ]
})
export class UserProfileComponent implements OnInit, OnDestroy {
    currentUser: User | null = null;
    favoriteRecipes: Recipe[] = [];
    savedRecipes: Recipe[] = [];
    postedRecipes: Recipe[] = [];
    private userSubscription: Subscription = new Subscription();


    constructor(private readonly authService: AuthService, private readonly recipeService: RecipeService, private readonly router:Router) { }

    ngOnInit(): void {
         this.userSubscription =  this.authService.getCurrentUserSubject().subscribe(user => {
            this.currentUser = user;
            if (this.currentUser?.id) {
                this.loadUserRecipes();
            }
         });
    }

    loadUserRecipes(): void {
        if (this.currentUser?.id) {
            this.recipeService.getFavoritesByUser(this.currentUser.id).subscribe(recipes => this.favoriteRecipes = recipes);
            this.recipeService.getSavedByUser(this.currentUser.id).subscribe(recipes => this.savedRecipes = recipes);
            this.recipeService.getPostedByUser(this.currentUser.id).subscribe(recipes => this.postedRecipes = recipes);
        }
    }
      navigateToDetails(recipeId: string){
      this.router.navigate(['/details', recipeId]);
    }
    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }
}