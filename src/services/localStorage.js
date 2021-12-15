export function setTokens() {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
}

export function setUser(loginData) {
  localStorage.setItem('user', JSON.stringify(loginData));
}

export function getUser() {
  const user = localStorage.getItem('user');
  if (user !== null) {
    return JSON.parse(user).email;
  }
  return 'Faça o login';
}

export function setRecipesInProgress(type, id) {
  const localStorageData = localStorage.getItem('inProgressRecipes');
  const inProgressRecipes = JSON.parse(localStorageData);

  if (inProgressRecipes === null) {
    return (
      localStorage.setItem(
        'inProgressRecipes', JSON.stringify({ [type]: { [id]: [] } }),
      ));
  }

  return (
    localStorage.setItem(
      'inProgressRecipes', JSON.stringify(
        { ...inProgressRecipes, [type]: { ...inProgressRecipes[type], [id]: [] } },
      ),
    )
  );
}

export function setFavoriteRecipes(id) {
  const localStorageData = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (localStorageData === null) {
    return (
      localStorage.setItem(
        'favoriteRecipes', JSON.stringify([id]),
      ));
  }

  return (
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify(
        [...localStorageData, id],
      ),
    )
  );
}

export function getFavRecipes() {
  const fav = localStorage.getItem('favoriteRecipes');
  const favJSON = JSON.parse(fav);
  return favJSON;
}
