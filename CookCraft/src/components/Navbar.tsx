import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch } from 'react-redux';
import { filterByCuisine, filterByMealType, filterRecipes, resetFilters, setRecipes } from '../redux/AppSlice';
import { RecipesType } from '../types/Repice';
import RepiceServis from '../services/RepiceServices';
import { CiSearch } from "react-icons/ci";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

function Navbar() {

    const dispatch = useDispatch();
    const handleFilter = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        try {
            if (e.target.value) {
                dispatch(filterRecipes(e.target.value));
            } else {
                const recipe: RecipesType[] = await RepiceServis.getAllRepice();
                dispatch(setRecipes(recipe));
            }
        } catch (error) {
            toast.error('The requested recipe was not found.');
        }
    };

    const handleMealTypeFilter = (mealType: string) => {
        dispatch(filterByMealType(mealType));
    };

    const handleCuisineFilter = (cuisine: string) => {
        dispatch(filterByCuisine(cuisine));
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    return (
        <AppBar
            position="static"
            sx={{ backgroundColor: 'transparent', boxShadow: 'none', marginTop: '50px' }}
        >
            <Toolbar>
                <Typography
                    variant="h3"
                    component="div"
                    color="black"
                    sx={{ flexGrow: 1, textAlign: 'center', position: 'relative' }}
                >
                    COOK&CRAFT
                </Typography>
                <div style={{ position: 'absolute', right: '10px' }}>
                    <TextField
                        onChange={handleFilter}
                        variant="standard"
                        autoComplete="off"
                        id="searchInput"
                        sx={{
                            width: '250px',
                            marginBottom: '1px',
                            padding: '8px',

                            '& .MuiOutlinedInput-root': { height: '45px' },
                        }}
                        placeholder="Search..."
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CiSearch style={{ width: '30px', height: '30px', color: 'black' }} />
                                    </InputAdornment>
                                ),
                                style: {
                                    color: 'black',
                                    fontSize: '14px',
                                },
                            },
                        }}
                    />
                </div>
            </Toolbar>
            <div style={{ borderBottom: '7px solid black', borderRadius: '20px', marginTop: '15px' }}></div>
            <div className="menu-container">
                <Button onClick={handleResetFilters} sx={{ color: 'black' }}>all recipes</Button>
                <div className="category-buttons">
                    <Dropdown>
                        <Dropdown.Toggle
                            style={{ color: 'black', backgroundColor: 'white', border: 'none' }}
                        >
                            CUISINE
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {['Italian', 'Thai', 'Japanese', 'Indian', 'American', 'Mediterranean']
                                .map((cuisine) => (
                                    <Dropdown.Item
                                        key={cuisine}
                                        style={{ color: 'black', backgroundColor: 'white' }}
                                        onClick={() => handleCuisineFilter(cuisine)}
                                    >
                                        {cuisine} Cuisine
                                    </Dropdown.Item>
                                ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div >
                        {['Dinner', 'Lunch', 'Snack'].map((mealType) => (
                            <Button
                                key={mealType}
                                variant="text"
                                color="primary"
                                sx={{
                                    margin: '0 5px',
                                    backgroundColor: 'white',
                                    color: 'black',
                                }}
                                onClick={() => handleMealTypeFilter(mealType)}
                            >
                                {mealType}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ borderBottom: '2px solid black', marginTop: '10px', borderRadius: '20px' }}></div>
        </AppBar>
    );
}

export default Navbar;
