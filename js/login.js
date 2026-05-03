// pokedex/js/login.js

window.onload = function() {
    init();
};

function init() {
    const btnRegister = document.querySelector('.btn-secondary');
    if (btnRegister) {
        btnRegister.addEventListener('click', function() {
            window.location.href = 'singin.html'; // Nota: tu archivo se llama singin.html (sin la 'e' de sign)
        });
    }

    const btnLogin = document.querySelector('.btn-primary');
    if (btnLogin) {
        btnLogin.addEventListener('click', login);
    }
}

function login() {
    const mailInput = document.getElementById('input_mail');
    const passInput = document.getElementById('input_password');

    if (!mailInput || !passInput) {
        console.error("No se encontraron los inputs");
        return;
    }

    const mail = mailInput.value;
    const password = passInput.value;

    const data = {
        user_mail: mail,
        user_password: password
    };

    axios({
        method: 'POST',
        url: '/login', // Usamos ruta relativa porque el servidor sirve estáticos
        data: data
    })
    .then((response) => {
        console.log("Respuesta:", response.data);
        const result = response.data;

        if (result.code === 200 && result.token) {
            localStorage.setItem('auth_token', result.token);
            alert("Login exitoso: " + result.message);
            window.location.href = 'index.html'; 
        } else {
            alert(result.message || "Error al iniciar sesión");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        if (error.response) {
            alert("Error del servidor: " + error.response.data.message);
        } else {
            alert("Error de conexión. Verifica que el servidor esté activo.");
        }
    });
}