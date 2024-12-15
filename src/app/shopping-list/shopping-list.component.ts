import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';
import { AuthService } from '../shared/auth.service';
import { Recipe } from '../models/recipe.model';
import { User } from '../models/user.model';
import { ShoppingList } from '../models/shopping-list.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  standalone: true,
  imports:[
        MatCardModule,
        CommonModule,
        NavbarComponent
    ]
})
export class ShoppingListComponent implements OnInit {
  currentUser: User | null = {
    id: "1",
    name: 'JohnDoe',
    email: 'john.doe@example.com',
    password: 'securepassword',
  };

  // Dummy Recipes
  // public recipes: Recipe[] = [
  //   {
  //     id: 1,
  //     name: 'Spaghetti Carbonara',
  //     description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.',
  //     imageUrl: 'https://asset.jamieoliver.com/images/cq7w2e71/production/08ae0b8293235129bbe7d55a3f89c2fc4f1a36d7-973x1300.jpg/08ae0b8293235129bbe7d55a3f89c2fc4f1a36d7-973x1300.jpg?rect=0,2,973,1297&w=1920&h=2560&fm=webp&q=80&fit=crop&auto=format',
      
  //     cookingTime: 30,
  //     cuisine: 'Italian',
  //     ingredients: [
  //       { name: 'Spaghetti', price: 2 },
  //       { name: 'Pancetta', price: 5 },
  //       { name: 'Eggs', price: 1.5 },
  //       { name: 'Parmesan Cheese', price: 3 },
  //       { name: 'Black Pepper', price: 0.5 },
  //     ],
  //     userId: 1,
  //     likes: 25,
  //     comments: [
  //       { id: 1, text: 'Delicious!', userId: 3, username: 'JaneDoe' },
  //       { id: 2, text: 'Tastes amazing with extra cheese!', userId: 4, username: 'FoodLover' },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: 'Chicken Tikka Masala',
  //     description: 'A rich and creamy Indian curry made with spiced yogurt-marinated chicken.',
  //     imageUrl: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/06/chicken-tikka-masala-recipe.webp',
  //     cookingTime: 45,
  //     cuisine: 'Indian',
  //     ingredients: [
  //       { name: 'Chicken', price: 8 },
  //       { name: 'Yogurt', price: 1.5 },
  //       { name: 'Tomato Sauce', price: 2 },
  //       { name: 'Cream', price: 2.5 },
  //       { name: 'Spices', price: 3 },
  //     ],
  //     userId: 2,
  //     likes: 40,
  //     comments: [
  //       { id: 3, text: 'Best recipe for a cozy night!', userId: 6, username: 'ChefMike' },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: 'Chocolate Chip Cookies',
  //     description: 'Soft and chewy cookies with gooey chocolate chips.',
  //     imageUrl: 'https://joyfoodsunshine.com/wp-content/uploads/2018/02/best-chocolate-chip-cookies-recipe-1.jpg',
      
  //     cookingTime: 25,
  //     cuisine: 'American',
  //     ingredients: [
  //       { name: 'Flour', price: 1 },
  //       { name: 'Sugar', price: 1.2 },
  //       { name: 'Butter', price: 2 },
  //       { name: 'Eggs', price: 1.5 },
  //       { name: 'Chocolate Chips', price: 3 },
  //     ],
  //     userId: 1,
  //     likes: 50,
  //     comments: [
  //       { id: 4, text: 'These cookies are heavenly!', userId: 7, username: 'SweetTooth' },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     name: 'Spaghetti Carbonara',
  //     description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.',
  //     imageUrl: 'https://asset.jamieoliver.com/images/cq7w2e71/production/08ae0b8293235129bbe7d55a3f89c2fc4f1a36d7-973x1300.jpg/08ae0b8293235129bbe7d55a3f89c2fc4f1a36d7-973x1300.jpg?rect=0,2,973,1297&w=1920&h=2560&fm=webp&q=80&fit=crop&auto=format',
      
  //     cookingTime: 30,
  //     cuisine: 'Italian',
  //     ingredients: [
  //       { name: 'Spaghetti', price: 2 },
  //       { name: 'Pancetta', price: 5 },
  //       { name: 'Eggs', price: 1.5 },
  //       { name: 'Parmesan Cheese', price: 3 },
  //       { name: 'Black Pepper', price: 0.5 },
  //     ],
  //     userId: 1,
  //     likes: 25,
  //     comments: [
  //       { id: 1, text: 'Delicious!', userId: 3, username: 'JaneDoe' },
  //       { id: 2, text: 'Tastes amazing with extra cheese!', userId: 4, username: 'FoodLover' },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     name: 'Spaghetti Carbonara',
  //     description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.',
  //     imageUrl: 'https://asset.jamieoliver.com/images/cq7w2e71/production/08ae0b8293235129bbe7d55a3f89c2fc4f1a36d7-973x1300.jpg/08ae0b8293235129bbe7d55a3f89c2fc4f1a36d7-973x1300.jpg?rect=0,2,973,1297&w=1920&h=2560&fm=webp&q=80&fit=crop&auto=format',
      
  //     cookingTime: 30,
  //     cuisine: 'Italian',
  //     ingredients: [
  //       { name: 'Spaghetti', price: 2 },
  //       { name: 'Pancetta', price: 5 },
  //       { name: 'Eggs', price: 1.5 },
  //       { name: 'Parmesan Cheese', price: 3 },
  //       { name: 'Black Pepper', price: 0.5 },
  //     ],
  //     userId: 1,
  //     likes: 25,
  //     comments: [
  //       { id: 1, text: 'Delicious!', userId: 3, username: 'JaneDoe' },
  //       { id: 2, text: 'Tastes amazing with extra cheese!', userId: 4, username: 'FoodLover' },
  //     ],
  //   },
  //   {
  //     id: 6,
  //     name: 'Spaghetti Carbonara',
  //     description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.',
  //     imageUrl: 'https://asset.jamieoliver.com/images/cq7w2e71/production/08ae0b8293235129bbe7d55a3f89c2fc4f1a36d7-973x1300.jpg/08ae0b8293235129bbe7d55a3f89c2fc4f1a36d7-973x1300.jpg?rect=0,2,973,1297&w=1920&h=2560&fm=webp&q=80&fit=crop&auto=format',
      
  //     cookingTime: 30,
  //     cuisine: 'Italian',
  //     ingredients: [
  //       { name: 'Spaghetti', price: 2 },
  //       { name: 'Pancetta', price: 5 },
  //       { name: 'Eggs', price: 1.5 },
  //       { name: 'Parmesan Cheese', price: 3 },
  //       { name: 'Black Pepper', price: 0.5 },
  //     ],
  //     userId: 1,
  //     likes: 25,
  //     comments: [
  //       { id: 1, text: 'Delicious!', userId: 3, username: 'JaneDoe' },
  //       { id: 2, text: 'Tastes amazing with extra cheese!', userId: 4, username: 'FoodLover' },
  //     ],
  //   },
  // ];

  // Dummy Shopping List
  shoppingList: any[] = [
    {
      id: 'recipe_1',
      name: 'Classic Margherita Pizza',
      description: 'A simple yet delicious pizza topped with fresh basil, mozzarella, and tomato sauce.',
      cookingTime: 30,
      calories:300,
      totalCost: 12,
      image: 'pizza.jpg',
      ingredients: [
        { name: 'Pizza dough', quantity: '1 base', price: 5 },
        { name: 'Tomato sauce', quantity: '1/2 cup', price: 2 },
        { name: 'Mozzarella cheese', quantity: '200g', price: 4 },
        { name: 'Fresh basil', quantity: '10 leaves', price: 1 },
      ],
      macros:[{carb:100,protien:30,fats:15}],
      userId: 'user_1',
      cuisine: 'Italian',
      timeSlot:'Lunch',
      difficulty: 'Easy',
      rating: 4.8,
      ratings: [
        { userId: 'user_2', rating: 5 },
        { userId: 'user_3', rating: 4.5 },
      ],
      comments: [
        {
          id: 'comment_1',
          userId: 'user_2',
          username: 'Jane Doe',
          text: 'Absolutely loved this pizza!',
          timestamp: new Date(),
        },
      ],
      servings: 2,
      createdDate: new Date(),
    },
    {
      id: 'recipe_2',
      name: 'Chicken Curry',
      description: 'A rich and flavorful chicken curry with a hint of spice.',
      cookingTime: 60,
      calories:200,
      totalCost: 14,
      image: 'chicken_curry.jpg',
      ingredients: [
        { name: 'Chicken', quantity: '500g', price: 8 },
        { name: 'Coconut milk', quantity: '1 cup', price: 3 },
        { name: 'Curry powder', quantity: '2 tbsp', price: 2 },
        { name: 'Onion', quantity: '1 large', price: 1 },
      ],
      macros:[{carb:100,protien:30,fats:15}],
      userId: 'user_3',
      cuisine: 'Indian',
      timeSlot:'Lunch',
      difficulty: 'Medium',
      rating: 4.6,
      ratings: [
        { userId: 'user_1', rating: 4.5 },
        { userId: 'user_4', rating: 5 },
      ],
      comments: [
        {
          id: 'comment_2',
          userId: 'user_4',
          username: 'Emily Brown',
          text: 'So delicious! My family loved it.',
          timestamp: new Date(),
        },
      ],
      servings: 4,
      createdDate: new Date(),
    },
    {
      id: 'recipe_3',
      name: 'Vegetarian Tacos',
      description: 'Crispy tacos filled with spiced vegetables and topped with salsa.',
      cookingTime: 25,
      calories:250,
      totalCost: 8,
      image: 'vegetarian_tacos.jpg',
      ingredients: [
        { name: 'Taco shells', quantity: '6 shells', price: 3 },
        { name: 'Bell peppers', quantity: '2 medium', price: 2 },
        { name: 'Onions', quantity: '1 medium', price: 1 },
        { name: 'Salsa', quantity: '1/2 cup', price: 2 },
      ],
      macros:[{carb:100,protien:30,fats:15}],
      userId: 'user_2',
      cuisine: 'Mexican',
      timeSlot:'Breakfast',
      difficulty: 'Easy',
      rating: 4.3,
      ratings: [
        { userId: 'user_3', rating: 4 },
        { userId: 'user_5', rating: 4.5 },
      ],
      comments: [
        {
          id: 'comment_3',
          userId: 'user_5',
          username: 'Tom Green',
          text: 'Great recipe for a quick meal!',
          timestamp: new Date(),
        },
      ],
      servings: 3,
      createdDate: new Date(),
    },
  ];
  totalPrice: number = 0;

 


  constructor(private readonly recipeService: RecipeService, private readonly authService: AuthService) { }

  // ngOnInit(): void {
  //   // this.currentUser = this.authService.getCurrentUser();
  //   this.loadShoppingList();
  //      this.loadRecipes();
  // }
  //   loadShoppingList():void{
  //      if(this.currentUser?.id){
  //         //  this.recipeService.getShoppingList(this.currentUser.id).subscribe(shoppingList => {
  //         //      this.shoppingList = shoppingList;
  //         //  })
  //      }
  //   }
  //     loadRecipes(): void {
  //       // this.recipeService.getAllRecipes().subscribe(recipes => this.recipes = recipes);
  //   }
  // getRecipeById(recipeId: number): Recipe | undefined {
  //       return this.recipes.find(recipe => recipe.id === recipeId)
  // }

  //   calculateTotalPrice(recipe: Recipe): number {
  //     let totalPrice = 0;
  //     if(recipe?.ingredients){
  //         recipe.ingredients.forEach(ingredient => totalPrice += ingredient.price)
  //     }
  //       return totalPrice;
  //   }
  //   getTotalPrice(): number {
  //   let totalPrice = 0;
  //     this.shoppingList.forEach(shoppingItem =>{
  //         const recipe = this.getRecipeById(shoppingItem.recipeId);
  //         if(recipe) totalPrice += this.calculateTotalPrice(recipe);
  //     });
  //     return totalPrice;
  //   }


  updatedShoppingList: any[]=[]

  ngOnInit(): void {
    // this.saveShoppingList();
    this.shoppingList = JSON.parse(localStorage.getItem(`shoppingList_user_1`) || '[]');
    this.recipeService.shoppingList$.subscribe((list) => {
      this.updatedShoppingList = [...list];
      console.log(this.updatedShoppingList);
      // console.log(list);
    });
    console.log(this.updatedShoppingList);
    this.saveShoppingList(this.updatedShoppingList); 
    this.calculateTotalPrice();
  }

  saveShoppingList(updatedShoppingList : any[]) {
    const userId = this.authService.getUserId() ?? 'user_1'; // Default to 'guest' if no user is logged in
    if (updatedShoppingList) {
        localStorage.setItem(`shoppingList_user_1`, JSON.stringify(updatedShoppingList));
    }
}

deleteRecipe(recipeId: string): void {

  // Remove the recipe from the updatedShoppingList
  this.updatedShoppingList = this.updatedShoppingList.filter(recipe => recipe.id !== recipeId);

  // Save the updated list to localStorage
  this.saveShoppingList(this.updatedShoppingList);

  // Recalculate the total price
  this.calculateTotalPrice();
}

  calculateTotalPrice(): void {
    this.totalPrice = this.updatedShoppingList.reduce(
      (total, recipe) => total + recipe.ingredients.reduce((sum: number, ing: any) => sum + ing.price, 0),
      0
    );
  }

}