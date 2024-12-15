  export interface Ingredient {
    name: string;
    quantity: string; // Keep quantity as a string (e.g., "1 cup", "2 tbsp")
    price?: number;    // Price is optional (you might fetch it from an external API)
}

export interface Macros {
    carb: number;
    protien: number; // Keep quantity as a string (e.g., "1 cup", "2 tbsp")
    fats: number;    // Price is optional (you might fetch it from an external API)
}

export interface Recipe {
    id: string;
    name: string;
    description: string;
    cookingTime: number;    // In minutes (or specify units)
    calories:number;    // Added by omar ibrahem  
    imageUrl: string | null;
    ingredients: Ingredient[]; 
    totalCost: number;
    macros: Macros[];
    userId: string;        // ID of the user who created the recipe
    cuisine?: string;
    timeSlot: 'Breakfast' | 'Lunch' | 'Dinner'
    difficulty?: 'Easy' | 'Medium' | 'Hard'; // Enforce specific difficulty levels
    rating?: number;        // Average rating (could be 1-5 stars or other scale)
    ratings?: Rating[];      // Individual user ratings and reviews
    comments?: Comment[];
    servings?: number;      // Number of servings this recipe makes
    createdDate?: Date;   // Automatic timestamp for creation
    likes?:number;
}

export interface Rating {  // For individual ratings and reviews
  userId: string;
  rating: number; // Rating value (e.g., 1-5 stars)
}



export interface Comment {
    id: string;           // Give comments IDs for easier management
    userId: string;
    username: string;  // Denormalize for performance, but update when username changes
    text: string;
    timestamp: Date;       // Make timestamp required
}