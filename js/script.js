const characterList = document.getElementById('character-list');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
let actualPage = 1;
let maxPages = 1;

function showCharacters(page) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('No se pudo realizar la solicitud');
            }
            return response.json();
        })
        .then((data) => {
            maxPages = data.info.pages;
            data.results.forEach(character => {
                const characterLi = document.createElement('li');
                
                const imagen = document.createElement('img');
                imagen.src = character.image
                imagen.alt = character.name

                const name = document.createElement('p');
                name.innerHTML = `<span>Name:</span> ${character.name}`

                const species = document.createElement('p');
                species.innerHTML = `<span>Species:</span> ${character.species}`

                characterLi.appendChild(imagen);
                characterLi.appendChild(name);
                characterLi.appendChild(species);
                characterList.appendChild(characterLi);

            });
        })
        .catch((error) => {
            characterList.innerText = 'Error: No se pudieron obtener los personajes';
        });
    
};

showCharacters(actualPage);

prevPageButton.addEventListener('click', () => {
    if (actualPage > 1){
        actualPage--;
        characterList.innerHTML = "";
        showCharacters(actualPage);
    }
});

nextPageButton.addEventListener('click', () => {
    if (actualPage < maxPages ) {
        actualPage++;
        characterList.innerHTML = "";
        showCharacters(actualPage);
    }
});