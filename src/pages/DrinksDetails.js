import React, { Component } from 'react';
import { fetchById } from '../services/fetchApi';

class DrinksDetails extends Component {
  constructor() {
    super();

    this.state = {
      recipeInfo: {},
      ingredients: [],
      measures: [],
      nameAndMeasure: [],
    };

    this.concatenateArrays = this.concatenateArrays.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    fetchById('cocktail', id)
      .then((result) => this.setState({ recipeInfo: result.drinks[0] }))
      .then(() => {
        const { recipeInfo } = this.state;
        console.log(recipeInfo);
        this.setState({
          ingredients: Object.entries(recipeInfo)
            .filter((entry) => entry[0].includes('strIngredient'))
            .map((entry) => entry[1])
            .filter((ingredient) => ingredient !== null),
          measures: Object.entries(recipeInfo)
            .filter((entry) => entry[0].includes('strMeasure'))
            .map((entry) => entry[1])
            .filter((measure) => measure !== null),
        });
      })
      .then(() => {
        this.concatenateArrays();
      });
  }

  concatenateArrays() {
    const { ingredients, measures } = this.state;
    const nameAndMeasure = [];

    ingredients.forEach((ingredient, index) => {
      nameAndMeasure.push(`${ingredient} - ${measures[index]}`);
    });

    this.setState({
      nameAndMeasure,
    });
  }

  render() {
    const { recipeInfo, nameAndMeasure } = this.state;

    return (
      <div>
        { recipeInfo !== {}
        && (
          <div>
            <img
              data-testid="recipe-photo"
              src={ recipeInfo.strDrinkThumb }
              alt={ recipeInfo.strDrink }
            />
            <span data-testid="recipe-title">{ recipeInfo.strDrink }</span>
            <span data-testid="recipe-category">{ recipeInfo.strCategory }</span>
            <ul>
              { nameAndMeasure.map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { ingredient }
                </li>
              )) }
            </ul>
            
            <p data-testid="instructions">{ recipeInfo.strInstructions }</p>
            <button type="button" data-testid="share-btn">Compartilhar</button>
            <button type="button" data-testid="favorite-btn">Favoritar</button>
            <button type="button" data-testid="start-recipe-btn">Iniciar</button>
          </div>) }
      </div>
    );
  }
}

export default DrinksDetails;
