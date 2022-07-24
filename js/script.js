const pokemonID = document.querySelector('.pokemon-id');
const pokemonName = document.querySelector('.pokemon-name');
const pokemonImg = document.querySelector('.pokemon-img');

const pokemonDesc = document.querySelector('.pokemon-desc');
const pokemonType = document.querySelector('.type');
const pokemonWeight = document.querySelector('.weight');
const pokemonHP = document.querySelector('.hp');
const pokemonAttack = document.querySelector('.attack');
const pokemonDefense = document.querySelector('.defense');
const pokemonSpeed = document.querySelector('.speed');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const form = document.querySelector('.form-search');
const inputSearch = document.querySelector('.input-search');



let searchPokemon = 1;

const fecthPokemon = async (pokemon) => {

  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const responseJSON = await APIResponse.json();
    return responseJSON; 
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerText = 'Loading...'

  const data = await fecthPokemon(pokemon);

  if (data) {
    pokemonImg.style.display = 'block';
    pokemonDesc.style.display = 'block';
    pokemonID.innerHTML = `${data.id} - `;
    pokemonName.innerHTML = data.name;
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    const type = data.types.map((type) => {
        return type.type.name
    })
    pokemonType.innerHTML = `Tipo: ${type.toString().replace(',', ' | ')}`;

    pokemonHP.innerHTML = `HP: ${data.stats[0].base_stat}`;
    pokemonHP.style.width = `${data.stats[0].base_stat}%`
    pokemonAttack.innerHTML = `Ataque: ${data.stats[1].base_stat}`;
    pokemonAttack.style.width = `${data.stats[1].base_stat}%`
    pokemonDefense.innerHTML = `Defesa: ${data.stats[2].base_stat}`;
    pokemonDefense.style.width = `${data.stats[2].base_stat}%`
    pokemonSpeed.innerHTML = `Velocidade: ${data.stats[3].base_stat}`;
    pokemonSpeed.style.width = `${data.stats[3].base_stat}%`    
    pokemonWeight.innerHTML = `Peso: ${data.stats[4].base_stat} Kg`;
  
    inputSearch.value = '';
    searchPokemon = data.id;
  } else {
    pokemonID.innerHTML = '';
    pokemonName.innerHTML = 'Not found :c';
    pokemonImg.style.display = 'none'
    pokemonDesc.style.display = 'none'
  }
}

form.addEventListener('submit', (event) => {
  
  event.preventDefault();
  renderPokemon(inputSearch.value.toLowerCase());
})

renderPokemon(searchPokemon);

const prevPokemon = () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
}

const nextPokemon = () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
}

btnPrev.addEventListener('click', prevPokemon);
btnNext.addEventListener('click', nextPokemon);
