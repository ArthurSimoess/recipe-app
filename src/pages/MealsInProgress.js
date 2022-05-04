import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import useId from '../hooks/useId';
import { fetchById } from '../services/fetchApi';
import '../styles/InProgressPages.css';
import { setIngredients, getIngredients,
  setRecipesInProgress } from '../services/localStorage';
import FinishBtn from '../components/FinishBtn';

export default function MealsInProgress() {
  const [startedMeal, setStartedMeal] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const id = useId();

  const history = useHistory();

  useEffect(() => {
    fetchById('meal', id).then(({ meals }) => setStartedMeal({ ...meals[0] }));
    if (localStorage.getItem('inProgressRecipes') !== null
    && getIngredients('meals', id) !== undefined) {
      setCheckedIngredients(getIngredients('meals', id));
    } else {
      setRecipesInProgress('meals', id);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      setIngredients('meals', id, checkedIngredients);
    }
  }, [checkedIngredients, setIngredients]);

  const ingredients = startedMeal
    && Object.entries(startedMeal).reduce((acc, value) => {
      if (value[0].includes('strIngredient') && value[1] !== '' && value[1] !== null) {
        acc.push(value[1]);
      }
      return acc;
    }, []);

  const measures = startedMeal
    && Object.entries(startedMeal).reduce((acc, value) => {
      if (value[0].includes('strMeasure') && value[1] !== ' ' && value[1] !== null) {
        acc.push(value[1]);
      }
      return acc;
    }, []);

  const handleClick = useCallback(({ target }) => {
    if (checkedIngredients.includes(target.name)) {
      setCheckedIngredients(checkedIngredients.filter((ingredient) => (
        ingredient !== target.name
      )));
    } else setCheckedIngredients([...checkedIngredients, target.name]);
  }, [checkedIngredients, setCheckedIngredients, id]);

  return (
    <section className="flex flex-col items-center bg-slate-100 h-full py-10">
      { startedMeal && (
        <>
          <button
            type="button"
            onClick={ () => history.push(`/comidas/${id}`) }
            className="w-44 bg-black text-lg font-bold
            text-white border-2 border-purple-900 rounded-md my-2 h-10
            hover:opacity-75 transition ease-in-out delay-150
            hover:-translate-y-1 hover:scale-105"
          >
            VOLTAR
          </button>
          <img
            src={ startedMeal.strMealThumb }
            alt=""
            data-testid="recipe-photo"
            className="flex items-center justify-center my-4 mx-auto
            rounded-md w-3/4 sm:w-[30rem] xl:w-[35rem]"
          />
          <p
            data-testid="recipe-title"
            className="text-center font-bold text-black
            no-underline mt-3 text-2xl md:underline"
          >
            { startedMeal.strMeal }

          </p>
          <p
            data-testid="recipe-category"
            className="text-center italic text-black
            no-underline mt-3 text-2xl md:underline"
          >
            { startedMeal.strCategory}

          </p>

          <div
            className="flex flex-col text-left justify-center ml-10 font-bold text-black
            no-underline mt-3 md:underline"
          >
            {
              ingredients.map((ingredient, index) => (
                <label
                  htmlFor={ ingredient }
                  data-testid={ `${index}-ingredient-step` }
                  className={ checkedIngredients.includes(ingredient) && 'conclud' }
                  key={ ingredient }
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value={ ingredient }
                      name={ ingredient }
                      onChange={ handleClick }
                      id={ ingredient }
                      checked={
                        checkedIngredients.includes(ingredient)
                      }
                      className="
                      accent-green-500 h-6 w-6 cursor-pointer focus:accent-teal-800"
                    />
                    <span className="mx-4">
                      {`${ingredient} - ${measures[index]
                        ? measures[index] : 'to taste'}`}
                    </span>
                  </div>
                </label>
              ))
            }
          </div>
          <div className="flex items-center justify-center">
            <p
              data-testid="instructions"
              className="text-center font-extrabold bg-gray-300 w-5/6 rounded-xl p-4
          text-black no-underline mt-3 md:no-underline
          shadow-lg shadow-black-500/50 mb-4"
            >
              {startedMeal.strInstructions}
            </p>
          </div>
          <FinishBtn
            id={ id }
            nameType="Meal"
            fetchType="meal"
            typeKey="meals"
            type="comida"
            ingredients={ ingredients }
            localIngredients={ checkedIngredients }
          />
          <div className="flex justify-center m-4">
            <ShareBtn
              testId="share-btn"
              id={ id }
              type="comidas"
            />
            <FavoriteBtn
              id={ id }
              nameType="Meal"
              fetchType="meal"
              typeKey="meals"
              type="comida"
            />
          </div>
        </>)}
    </section>
  );
}
