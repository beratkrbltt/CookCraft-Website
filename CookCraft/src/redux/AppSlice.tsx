import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../redux/store'
import { RecipesType } from '../types/Repice'

interface AppSliceType {
    recipes: RecipesType[];
    filteredRecipes: RecipesType[];
    loading: boolean;
}

const initialState: AppSliceType = {
    recipes: [],
    filteredRecipes: [],
    loading: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },

        setRecipes: (state, action: PayloadAction<RecipesType[]>) => {
            state.recipes = action.payload
            state.filteredRecipes = action.payload
        },

        filterByCuisine: (state, action: PayloadAction<string>) => {
            state.filteredRecipes = state.recipes.filter(
                (recipes) => recipes.cuisine === action.payload
            )
        },

        filterByMealType: (state, action: PayloadAction<string>) => {
            state.filteredRecipes = state.recipes.filter((recipe) =>
                recipe.mealType?.some((type) => type === action.payload)
            )
        },

        filterRecipes: (state, action: PayloadAction<string>) => {
            const tempList: RecipesType[] = [];
            state.recipes.map((recipe: RecipesType) => {
                if (recipe.name.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase())) {
                    tempList.push(recipe);
                }
            })
            state.filteredRecipes = [...tempList];
        },
        resetFilters: (state) => {
            state.filteredRecipes = state.recipes;
        }
    }
})
export const {
    setLoading,
    setRecipes,
    filterByCuisine,
    filterByMealType,
    filterRecipes,
    resetFilters,
} = appSlice.actions


export const selectFilteredRecipes = (state: RootState) => state.app.filteredRecipes
export const selectLoading = (state: RootState) => state.app.loading
export default appSlice.reducer
