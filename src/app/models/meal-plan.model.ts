

  export interface MealPlan {  // Represent the entire meal plan
    userId: string;
    items: MealPlanItem[];   // Array of MealPlanItems
    startDate?: Date;      // Optional start date for the meal plan
    endDate?: Date;  
    // timeSlot: 'breakfast' | 'lunch' | 'dinner';      // Optional end date for the meal plan
  }
  
  
  export interface MealPlanItem {
    recipeId: string;   // Store recipe ID, not the entire recipe object
      date?: Date;           // Date for which this meal is planned
      servings?: number;
  }