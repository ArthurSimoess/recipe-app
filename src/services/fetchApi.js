export async function fetchIngredients(ingrediente, type) {
  const request = await fetch(
    `https://www.the${type}db.com/api/json/v1/1/filter.php?i=${ingrediente}`,
  );

  const response = await request.json();

  return response;
}

export async function fetchByName(name, type) {
  const request = await fetch(
    `https://www.the${type}db.com/api/json/v1/1/search.php?s=${name}`,
  );

  const response = await request.json();

  return response;
}

export async function fetchByFirstLetter(letter, type) {
  const request = await fetch(
    `https://www.the${type}db.com/api/json/v1/1/search.php?f=${letter}`,
  );

  const response = await request.json();

  return response;
}

export async function didMountFetch(type) {
  const request = await fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?s=`);

  const response = await request.json();

  return response;
}

export async function categorysFetch(type) {
  const request = await fetch(`https://www.the${type}db.com/api/json/v1/1/list.php?c=list`);

  const response = await request.json();

  return response;
}

// Faz o fetch através do end point que filtra por categoria, utilizando o type, como nos fetchs anteriores e a categoria que
// peguei através do name que incluí nos botões de categoria dinâmicos do componente CategoryFilters
export async function fetchByCategory(type, category) {
  const request = await fetch(
    `https://www.the${type}db.com/api/json/v1/1/filter.php?c=${category}`,
  );

  const response = await request.json();

  return response;
}

export async function fetchById(type, id) {
  const request = await fetch(
    `https://www.the${type}db.com/api/json/v1/1/lookup.php?i=${id}`,
  );

  const response = await request.json();

  return response;
}
