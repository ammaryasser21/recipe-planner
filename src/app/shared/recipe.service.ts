import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { MealPlan } from '../models/meal-plan.model';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private readonly recipesKey = 'recipes';
    private recipes: Recipe[] = [];


    constructor() {
        this.loadRecipes();
    }

    private loadRecipes(): void {
        const storedRecipes = localStorage.getItem(this.recipesKey);
        if (storedRecipes) {
            this.recipes = JSON.parse(storedRecipes);
        } else {
             // Set initial data if there's no stored data
              this.recipes = [
                {
                    id: "1",
                    name: 'Spaghetti Carbonara',
                    description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.',
                    imageUrl: 'https://asset.jamieoliver.com/images/cq7w2e71/production/08ae0b8293235129bbe7d55a3f89c2fc4f1a36d7-973x1300.jpg/08ae0b8293235129bbe7d55a3f89c2fc4f1a36d7-973x1300.jpg?rect=0,2,973,1297&w=1920&h=2560&fm=webp&q=80&fit=crop&auto=format',
                    cookingTime: 30,
                    calories: 400,
                    cuisine: 'Italian',
                    ingredients: [
                        { name: 'Spaghetti', quantity: "200g", price: 2 },
                        { name: 'Pancetta', quantity: "100g", price: 5 },
                        { name: 'Eggs', quantity: "2 large", price: 1.5 },
                        { name: 'Parmesan Cheese', quantity: "50g", price: 3 },
                        { name: 'Black Pepper', quantity: "1 tsp", price: 0.5 },
                    ],
                    totalCost: 12,
                    macros: [
                        { carb: 50, protien: 20, fats: 15 },
                    ],
                    userId: "1",
                    timeSlot: 'Lunch',
                    difficulty: 'Medium',
                    rating: 4.5,
                    ratings: [
                        { userId: "3", rating: 5 },
                        { userId: "4", rating: 4 },
                    ],
                    comments: [
                        { id: "1", text: 'Delicious!', userId: "3", username: 'JaneDoe', timestamp: new Date() },
                        { id: "2", text: 'Tastes amazing with extra cheese!', userId: "4", username: 'FoodLover', timestamp: new Date() },
                    ],
                    servings: 2,
                    createdDate: new Date(),
                    likes: 25,
                },
                {
                    id: "2",
                    name: 'Chicken Tikka Masala',
                    description: 'A rich and creamy Indian curry made with spiced yogurt-marinated chicken.',
                    imageUrl: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/06/chicken-tikka-masala-recipe.webp',
                    cookingTime: 45,
                    calories: 500,
                    cuisine: 'Indian',
                    ingredients: [
                        { name: 'Chicken', quantity: "500g", price: 8 },
                        { name: 'Yogurt', quantity: "1 cup", price: 1.5 },
                        { name: 'Tomato Sauce', quantity: "1 cup", price: 2 },
                        { name: 'Cream', quantity: "1/2 cup", price: 2.5 },
                        { name: 'Spices', quantity: "2 tbsp", price: 3 },
                    ],
                    totalCost: 17,
                    macros: [
                        { carb: 30, protien: 35, fats: 20 },
                    ],
                    userId: "2",
                    timeSlot: 'Dinner',
                    difficulty: 'Hard',
                    rating: 4.8,
                    ratings: [
                        { userId: "6", rating: 5 },
                    ],
                    comments: [
                        { id: "3", text: 'Best recipe for a cozy night!', userId: "6", username: 'ChefMike', timestamp: new Date() },
                    ],
                    servings: 4,
                    createdDate: new Date(),
                    likes: 40,
                },
                {
                    id: "3",
                    name: 'Chocolate Chip Cookies',
                    description: 'Soft and chewy cookies with gooey chocolate chips.',
                    imageUrl: 'https://joyfoodsunshine.com/wp-content/uploads/2018/02/best-chocolate-chip-cookies-recipe-1.jpg',
                    cookingTime: 25,
                    calories: 150,
                    cuisine: 'American',
                    ingredients: [
                        { name: 'Flour', quantity: "2 cups", price: 1 },
                        { name: 'Sugar', quantity: "1 cup", price: 1.2 },
                        { name: 'Butter', quantity: "1/2 cup", price: 2 },
                        { name: 'Eggs', quantity: "2 large", price: 1.5 },
                        { name: 'Chocolate Chips', quantity: "1 cup", price: 3 },
                    ],
                    totalCost: 8.7,
                    macros: [
                        { carb: 45, protien: 5, fats: 15 },
                    ],
                    userId: "1",
                    timeSlot: 'Breakfast',
                    difficulty: 'Easy',
                    rating: 4.9,
                    ratings: [
                        { userId: "7", rating: 5 },
                    ],
                    comments: [
                        { id: "4", text: 'These cookies are heavenly!', userId: "7", username: 'SweetTooth', timestamp: new Date() },
                    ],
                    servings: 6,
                    createdDate: new Date(),
                    likes: 50,
                },
            ];
             localStorage.setItem(this.recipesKey, JSON.stringify(this.recipes));
        }
    }

     private saveRecipes(): void {
        localStorage.setItem(this.recipesKey, JSON.stringify(this.recipes));
    }


    getAllRecipes(): Observable<Recipe[]> {
        return of(this.recipes);
    }

     getRecipeById(recipeId: string): Observable<Recipe | undefined> {
       const recipe = this.recipes.find(r => r.id === recipeId);
          return of(recipe);
      }


    addRecipe(recipe: Recipe): Observable<Recipe> {
        recipe.id = this.generateId();
        this.recipes.push(recipe);
         this.saveRecipes();
        return of(recipe);
    }

    updateRecipe(updatedRecipe: Recipe): Observable<Recipe> {
        const index = this.recipes.findIndex(r => r.id === updatedRecipe.id);
        if (index !== -1) {
            this.recipes[index] = updatedRecipe;
             this.saveRecipes();
            return of(updatedRecipe);
        }
        return throwError(() => new Error("Recipe not found!"));
    }

    addToFavorites(recipeId: string, userId: string): Observable<any> {
        const favoritesKey = `favorites_${userId}`;
        let favorites: string[] = JSON.parse(localStorage.getItem(favoritesKey) ?? '[]');

        if (!favorites.includes(recipeId)) {
            favorites.push(recipeId);
            localStorage.setItem(favoritesKey, JSON.stringify(favorites));
            return of({ success: true });
        } else {
            favorites = favorites.filter(id => id !== recipeId);
            localStorage.setItem(favoritesKey, JSON.stringify(favorites));
            return of({ success: true, unfavorited: true });
        }
    }

    addToSaved(recipeId: string, userId: string): Observable<any> {
        const savedKey = `savedRecipes_${userId}`;
        let saved: string[] = JSON.parse(localStorage.getItem(savedKey) ?? '[]');

        if (!saved.includes(recipeId)) {
            saved.push(recipeId);
            localStorage.setItem(savedKey, JSON.stringify(saved));
            return of({ success: true });
        } else {
            // You might want to allow unsaving here:
            saved = saved.filter(id => id !== recipeId);
            localStorage.setItem(savedKey, JSON.stringify(saved));
            return of({ success: true, unsaved: true });
        }
    }


   addToMealPlan(recipeId: string, userId: string, timeSlot: string): Observable<any> {
    const mealPlanKey = `mealPlan_${userId}`;
        try {
            let mealPlan: MealPlan = JSON.parse(localStorage.getItem(mealPlanKey) ?? '{}') || { userId, items: [] };

            const isRecipeInMealPlan = mealPlan.items.some(item => item.recipeId === recipeId);

            if (isRecipeInMealPlan) {
                mealPlan.items = mealPlan.items.filter(item => item.recipeId !== recipeId);
                localStorage.setItem(mealPlanKey, JSON.stringify(mealPlan));
                return of({ success: true, removed: true });
            } else {
                mealPlan.items.push({ recipeId, date: new Date() });
                localStorage.setItem(mealPlanKey, JSON.stringify(mealPlan));
                return of({ success: true });
            }
        } catch (error) {
            console.error('Error adding to meal plan:', error);
            return throwError(() => new Error('Error adding to meal plan.'));
        }
    }


    getFavoritesByUser(userId: string): Observable<Recipe[]> {
        const favoritesKey = `favorites_${userId}`;
        const favoriteIds: string[] = JSON.parse(localStorage.getItem(favoritesKey) ?? '[]');
        const favoriteRecipes = this.recipes.filter(recipe => favoriteIds.includes(recipe.id));
        return of(favoriteRecipes);
    }

    getSavedByUser(userId: string): Observable<Recipe[]> {
        const savedRecipesKey = `savedRecipes_${userId}`;
        const savedRecipeIds: string[] = JSON.parse(localStorage.getItem(savedRecipesKey) ?? '[]');
        const savedRecipes = this.recipes.filter(recipe => savedRecipeIds.includes(recipe.id));
        return of(savedRecipes);
    }

    getPostedByUser(userId: string): Observable<Recipe[]> {
        const postedRecipes = this.recipes.filter(recipe => recipe.userId === userId);
        return of(postedRecipes);
    }

    private generateId(): string {
        return crypto.randomUUID();
    }


    private readonly shoppingList = new BehaviorSubject<Recipe[]>([]);
    shoppingList$ = this.shoppingList.asObservable();

    addToShoppingList(recipe: Recipe): void {
        const currentList = JSON.parse(localStorage.getItem(`shoppingList_user_1`) ?? '[]');
        this.shoppingList.next([...currentList, recipe]);
    }
}