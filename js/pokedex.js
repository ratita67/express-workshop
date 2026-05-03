console.log("Script pokedex.js cargado correctamente");

window.onload = function() {
    console.log("Página cargada. Iniciando...");
    init();
};

function init() {
    const token = localStorage.getItem('token');
    console.log("Token encontrado:", token);

    if (!token) {
        console.warn("No hay token. Redirigiendo a login...");
        window.location.href = 'index.html';
    } else {
        console.log("Token existe. Intentando cargar Pokédex...");
        fetchPokemon();
    }
}

const url = 'http://localhost:3000';

const headers = {
    'authorization': 'Bearer ' + localStorage.getItem('token')
};

async function fetchPokemon() {
    console.log("Enviando petición a:", url + '/pokemon');

    try {
        const res = await axios.get(url + '/pokemon', { headers });
        console.log("Respuesta del servidor:", res);

        if (res.data.code === 200) {
            console.log("Éxito. Datos:", res.data.mesas);
            displayPokemon(res.data.mesas);
        } else {
            console.error("Error en código de negocio:", res.data.message);
            alert(res.data.message);
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error("Error de red o servidor:", error);
        if (error.response) {
            console.error("Estado HTTP:", error.response.status);
            console.error("Mensaje:", error.response.data);
        }
        alert("Error de conexión o token inválido");
        window.location.href = 'index.html';
    }
}

function displayPokemon(pokemonList) {
    console.log("Mostrando Pokémon. Lista:", pokemonList);
    const listContainer = document.getElementById('pokemon-list');
    
    if (!pokemonList || pokemonList.length === 0) {
        listContainer.innerHTML = '<p>No se encontraron Pokémon.</p>';
        return;
    }

    let htmlContent = '';
    for (let i = 0; i < pokemonList.length; i++) {
        const pokemonName = pokemonList[i].name;
        htmlContent += `<h3>${pokemonName}</h3>`;
    }
    
    listContainer.innerHTML = htmlContent;
    console.log("Pokémon mostrados en pantalla");
}