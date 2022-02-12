import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ index, cardName, img, recipeId, path }) {
  return (
    <Link
      to={ `/${path}/${recipeId}` }
    >
      <section
        className="mx-2 my-2 w-28 md:w-52 rounded-lg bg-white flex
        content-center flex-col
        shadow-lg shadow-black-500/50 mb-4"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ img }
          alt="imagem da receita"
          data-testid={ `${index}-card-img` }
          className="rounded-lg w-5/6 mt-2 mx-auto"
        />
        <p
          data-testid={ `${index}-card-name` }
          className="text-center font-bold text-black
          no-underline mt-3
          md:underline"
        >
          {cardName}

        </p>
      </section>
    </Link>
  );
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipeId: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
