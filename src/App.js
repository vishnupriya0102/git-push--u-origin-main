import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

const App=()=>{

  const APP_ID = '99944edd';
  const APP_KEY = '0999c4559905410f6383ba0988ada532';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('Chicken');

  useEffect( ()=>{
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    // const response = await fetch(`https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key=${APP_KEY}type=user&q=${query}`);
    // const response = await fetch(`https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key=${APP_KEY}type=user&q=${query}&field=uri&field=label`);
    // const response = await fetch(`https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key${APP_KEY}type=user&q=chicken&field=uri&field=label`);
    // const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=99944edd&app_key=0999c4559905410f6383ba0988ada532`);
    // const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key${APP_KEY}`);
    // const response = await fetch('https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}');
    // const response = await fetch('https://api.edamam.com/doc/open-api/recipe-search-v2.json');
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

    const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch('');
    }
  
  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
        className ="search-bar" 
        type="text" 
        value={search} 
        onChange={updateSearch} 
        />
        <button className ="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map( recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
        ))}
        </div>
    </div>
  );
};

export default App;
