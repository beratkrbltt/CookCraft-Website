import { useEffect } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import { RecipesType } from './types/Repice';
import { useDispatch } from 'react-redux';
import { setLoading, setRecipes } from '../src/redux/AppSlice';
import RepiceServis from '../src/services/RepiceServices';
import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function App() {

  const dispatch = useDispatch();
  const getAllRepice = async () => {
    try {
      dispatch(setLoading(true))
      const recipe: RecipesType[] = await RepiceServis.getAllRepice();
      dispatch(setRecipes(recipe));
    } catch (error) {
      toast.error("An error occurred while fetching the recipes." + error);
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllRepice();
  }, []);

  return (
    <div>
      <Navbar />
      <HomePage />
      <Spinner />
      <ToastContainer />
    </div>
  );
}

export default App;
