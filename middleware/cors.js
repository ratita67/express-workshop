const cors = (req, res, next) => {
    // Permitir acceso desde cualquier origen (para desarrollo)
    res.header('Access-Control-Allow-Origin', '*');
    
    // Permitir los encabezados que enviaremos desde el frontend
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Manejo de petición preflight (OPTIONS)
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
        return res.status(200).json({});
    }

    // Pasar al siguiente middleware si no es OPTIONS
    next();
};

module.exports = cors;