import axios from 'axios';
import { RecipesType } from '../types/Repice';
import { toast } from 'react-toastify';

const RepiceServis = {
    getAllRepice: async (): Promise<RecipesType[]> => {
        try {
            const response = await axios.get('https://dummyjson.com/recipes');
            return response.data.recipes;
        } catch (error) {
            toast.error("An error occurred while fetching the recipes." + error);
            throw error;
        }
    },
};
export default RepiceServis;