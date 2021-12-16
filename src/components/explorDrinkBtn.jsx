import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRandom } from '../services/fetchApi';

export default function ExploreDrinkBtn({ testid, explore, name }) {
  const history = useHistory();
  const [random, setRandom] = useState('oi');

  useEffect(() => {
    async function fetchData() {
      const { drinks } = await fetchRandom('cocktail');
      setRandom(drinks[0].idDrink);
    }
    fetchData();
    return () => {
      setRandom('');
    };
  }, []);

  function handleClick() {
    switch (name) {
    case 'Por Ingredientes':
      history.push('/explorar/bebidas/ingredientes');
      break;
    case 'Me Surpreenda!':
      history.push(`/bebidas/${random}`);
      break;
    default:
      history.push('/');
    }
  }

  return (
    <button
      type="button"
      data-testid={ testid }
      onClick={ handleClick }
    >
      { explore }
    </button>
  );
}

ExploreDrinkBtn.propTypes = {
  explore: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
};
