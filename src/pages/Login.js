import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Context from '../contexts/Context';
import { setTokens, setUser } from '../services/localStorage';
import '../index.css';
import imgLogin from '../images/login_page.svg';

export default function Login() {
  const { login, setLogin } = useContext(Context);
  const [inputType, setInputType] = useState(false);
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
  };

  const regexForEmail = /\S+@\S+\.\S+/;
  const length = 6;
  const passwordIsValid = login.password.length > length;
  const emailIsValid = regexForEmail.test(login.email);

  const handleClick = () => {
    setTokens();
    setUser({ email: login.email });
    history.push('/comidas');
  };

  function changeInput() {
    setInputType(!inputType);
  }

  return (
    <section
      className="
      flex items-center
      flex-col
      justify-center
      content-center
      bg-gray-900
      h-screen
      "
    >
      <div
        className="
        flex
        content-center
        items-center
        justify-center
        align-super
        my-2
        rounded-md
        lg:p-2
        md:p-2"
      >
        <h1
          className="
          text-4xl
          text-neutral-200
          font-bold
          md:text-6xl
          lg:text-7xl"
        >
          DATA-G
          {' '}
          <br />
          {' '}
          RECIPE
          <br />
          APP
          {' '}

        </h1>
        <img
          src={ imgLogin }
          alt="cozinheiro"
          className="opacity-7
        mt-1
        w-44
        md:w-80
        lg:w-96
        "
        />
      </div>
      <div
        className="
        flex
        flex-col
        w-2/3
        items-center
        content-center
        my-1"
      >
        <input
          className="
          mt-1  w-[20rem] md:w-[35rem] lg:w-[40rem] px-3 py-2 bg-white border
          border-gray-300 rounded-md text-sm shadow-sm
          placeholder-gray-400   focus:outline-none
          focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          mx-3 my-1"
          type="email"
          data-testid="email-input"
          name="email"
          placeholder="email"
          value={ login.email }
          onChange={ handleChange }
        />
        <input
          className="
          mt-1 block w-[20rem] md:w-[35rem] lg:w-[40rem] px-3 py-2 bg-white border
          border-gray-300 rounded-md text-sm shadow-sm
          placeholder-gray-400   focus:outline-none
          focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          mx-3 my-1"
          type={ !inputType ? 'password' : 'text' }
          data-testid="password-input"
          placeholder="password"
          name="password"
          value={ login.password }
          onChange={ handleChange }
        />
        <label
          htmlFor="password"
          className="text-white"
        >
          <span className="mx-2 font-bold">
            show password
          </span>
          <input
            type="checkbox"
            onClick={ changeInput }
            id="password"
          />
        </label>
        <button
          className="
          rounded-md bg-purple-600
          disabled:bg-gray-500 opacity-7 bg-origin-padding
          focus-within:shadow-lg  w-[20rem] md:w-[35rem] lg:w-[40rem]
          mx-3 mb-3 mt-2.5 px-3 py-2
          focus-visible:ring active:bg-purple-600 text-white
          font-extrabold disabled:cursor-not-allowed"
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleClick }
          disabled={ !((passwordIsValid && emailIsValid === true)) }
        >
          Enter
        </button>
      </div>
    </section>
  );
}
