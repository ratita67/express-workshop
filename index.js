const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// --- Middlewares Globales ---
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// --- Servir Archivos Estáticos ---
app.use(express.static('.'));

// --- Rutas ---

// Ruta de Login (POST)
app.post('/login', (req, res) => {
    const { user_mail, user_password } = req.body;
    console.log('📩 Datos recibidos:', req.body);

    const mockUsers = [
        { mail: 'mauricio@wat.com', pass: '123', id: 1 },
        { mail: 'mauricio@uaq.com', pass: '123456', id: 2 }
    ];

    const foundUser = mockUsers.find(u => u.mail === user_mail && u.pass === user_password);

    if (foundUser) {
        const token = `token-simulado-${Date.now()}-${foundUser.id}`;

        return res.status(200).json({
            code: 200,
            message: 'Inicio de sesión exitoso',
            token: token,
            user: {
                mail: foundUser.mail,
                id: foundUser.id
            }
        });
    } else {
        return res.status(200).json({
            code: 401,
            message: 'Usuario y contraseña incorrectos',
            token: null
        });
    }
});

// Ruta GET de Pokémons
app.get('/pokemon', (req, res) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            code: 401, 
            message: 'Token faltante o inválido' 
        });
    }

    const pokemons = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' },
        { id: 3, name: 'venusaur' },
        { id: 4, name: 'charmander' },
        { id: 5, name: 'charmeleon' },
        { id: 6, name: 'charizard' },
        { id: 7, name: 'squirtle' },
        { id: 8, name: 'wartortle' },
        { id: 9, name: 'blastoise' },
        { id: 10, name: 'caterpie' },
        { id: 11, name: 'metapod' },
        { id: 12, name: 'butterfree' },
        { id: 13, name: 'weedle' },
        { id: 14, name: 'kakuna' },
        { id: 15, name: 'beedrill' },
        { id: 16, name: 'pidgey' },
        { id: 17, name: 'pidgeotto' },
        { id: 18, name: 'pidgeot' }
    ];

    return res.status(200).json({
        code: 200,
        message: 'Lista de pokémon obtenida',
        mesas: pokemons
    });
});

// --- Iniciar Servidor ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Login: http://localhost:${PORT}/index.html`);
    console.log(`Pokédex: http://localhost:${PORT}/pokedex.html`);
});