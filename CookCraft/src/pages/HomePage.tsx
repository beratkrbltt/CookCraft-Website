import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import RecipeList from "../components/RecipeList";
import '../css/HomePage.css'

const HomePage = () => {

    const filteredRecipes = useSelector((state: RootState) => state.app.filteredRecipes);
    return (
        <div>
            <RecipeList recipes={filteredRecipes} />
        </div>
    );
};

export default HomePage;
