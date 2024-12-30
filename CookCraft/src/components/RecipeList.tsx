import React from 'react';
import { RecipesType } from '../types/Repice';
import '../css/RecipeList.css'

interface RecipeListProps {
    recipes: RecipesType[];
}
const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
    if (recipes.length === 0) {
        return <p>No recipes found.</p>;
    }
    return (
        <div>
            {recipes.map(recipe => (
                <div key={recipe.id} className='recipe-card'>
                    <div className='recipe-image'>
                        <img
                            src={recipe.image || '/fallback-image.jpg'}
                            alt={recipe.name}
                            onError={(e) => e.currentTarget.src = '/fallback-image.jpg'} />
                    </div>
                    <div className='recipe-details'>
                        <h3>{recipe.name}</h3>
                        <div className='recipe-meta'>
                            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                            <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                        </div>
                        <div className='recipe-info'>
                            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                            <p><strong>Instructions:</strong> {recipe.instructions.length > 0 ? recipe.instructions.join(' ') : 'No instructions available.'}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;
