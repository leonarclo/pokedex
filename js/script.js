const pokemonID = document.querySelector('.pokemon-id');
const pokemonName = document.querySelector('.pokemon-name');
const pokemonImg = document.querySelector('.pokemon-img');
const pokemonImgBg = document.querySelector('.img-bg');

const pokemonDesc = document.querySelector('.pokemon-desc');
const pokemonType = document.querySelector('.type');
const pokemonHP = document.querySelector('.hp');
const pokemonAttack = document.querySelector('.attack');
const pokemonDefense = document.querySelector('.defense');
const pokemonSpeed = document.querySelector('.speed');
const pokemonWeight = document.querySelector('.weight');
const pokemonHeight = document.querySelector('.height');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const form = document.querySelector('.form-search');
const inputSearch = document.querySelector('.input-search');

let searchPokemon = 1;

const pokemonBgColors = {
  fire: 'radial-gradient(circle at center, #ffffff , #ecafaa)',
  grass: 'radial-gradient(circle at center, #ffffff , #a7ecab)',
  electric: 'radial-gradient(circle at center, #ffffff , #Ffd7ae)',
  water: 'radial-gradient(circle at center, #ffffff , #aEF3FD)',
  ground: 'radial-gradient(circle at center, #ffffff , #F4E7ee)',
  rock: 'radial-gradient(circle at center, #ffffff , #d6d5d4)',
  fairy: 'radial-gradient(circle at center, #ffffff , #FCEAFF)',
  poison: 'radial-gradient(circle at center, #ffffff , #98D7A5)',
  bug: 'radial-gradient(circle at center, #ffffff , #F8D5A3)',
  dragon: 'radial-gradient(circle at center, #ffffff , #97B3E6)',
  psychic: 'radial-gradient(circle at center, #ffffff , #EAEDA1)',
  flying: 'radial-gradient(circle at center, #ffffff , #efda78)',
  fighting: 'radial-gradient(circle at center, #ffffff , #e0f5f5)',
  normal: 'radial-gradient(circle at center, #ffffff , rgb(145, 145, 145))',
};

const fecthPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const responseJSON = await APIResponse.json();
    return responseJSON;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerText = 'Loading...';

  const data = await fecthPokemon(pokemon);

  if (data) {
    pokemonImg.style.display = 'block';
    pokemonDesc.style.display = 'block';
    pokemonID.innerHTML = `${data.id} - `;
    pokemonName.innerHTML = data.name;
    pokemonImg.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
    const type = data.types.map((types) => types.type.name);
    pokemonType.innerHTML = `Tipo: <strong>${type.join(' | ')}</strong>`;

    pokemonHP.innerHTML = `HP: ${data.stats[0].base_stat}`;
    pokemonAttack.innerHTML = `Ataque: ${data.stats[1].base_stat}`;
    pokemonDefense.innerHTML = `Defesa: ${data.stats[2].base_stat}`;
    pokemonSpeed.innerHTML = `Velocidade: ${data.stats[3].base_stat}`;
    pokemonWeight.innerHTML = `Peso: ${data.weight} kg`;
    pokemonHeight.innerHTML = `Altura: ${data.height / 10} m`;

    pokemonHP.style.width = `${data.stats[0].base_stat}%`;
    pokemonAttack.style.width = `${data.stats[1].base_stat}%`;
    pokemonDefense.style.width = `${data.stats[2].base_stat}%`;
    pokemonSpeed.style.width = `${data.stats[3].base_stat}%`;

    const color = pokemonBgColors[type[0]];
    pokemonImgBg.style.background = color;

    inputSearch.value = '';
    searchPokemon = data.id;
  } else {
    pokemonID.innerHTML = '';
    pokemonName.innerHTML = 'Not found :c';
    pokemonImg.style.display = 'none';
    pokemonDesc.style.display = 'none';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(inputSearch.value.toLowerCase());
});

renderPokemon(searchPokemon);

const prevPokemon = () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
};

const nextPokemon = () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
};

btnPrev.addEventListener('click', prevPokemon);
btnNext.addEventListener('click', nextPokemon);
