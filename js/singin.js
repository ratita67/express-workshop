// javascript/sign-in.js

// Obtener referencias a los elementos del DOM
const inputName = document.querySelector('input[name="name"]');
const inputMail = document.querySelector('input[name="mail"]');
const inputPassword = document.querySelector('input[name="password"]');
const btnRegister = document.querySelector('#btn-register'); // Asegúrate que el ID coincida con tu HTML

// Función principal para manejar el envío del formulario
function registrarUsuario(event) {
    event.preventDefault(); // Evitar recarga de página

    // Capturar valores
    const name = inputName.value;
    const mail = inputMail.value;
    const password = inputPassword.value;

    // Validación básica (opcional pero recomendada según el video)
    if (!name || !mail || !password) {
        alert("Todos los campos son obligatorios");
        return;
    }

    // Objeto de datos para enviar al backend
    const datos = {
        name: name,
        mail: mail,
        password: password
    };

    // Configuración de la petición
    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };

    // Ruta del backend (según transcript: /api/time-inc, ajusta si es diferente)
    fetch('/api/time-inc', opciones)
        .then(response => response.json())
        .then(data => {
            console.log('Éxito:', data);
            
            // Si el backend devuelve 201 (Usuario registrado correctamente)
            if (data.status === 201 || data.message.includes('registrado correctamente')) {
                alert("Registro exitoso");
                // Redirigir a la página de login
                window.location.href = 'login.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Hubo un error al registrar el usuario");
        });
}

// Asignar el evento click al botón de registro
// Nota: El transcript menciona que al principio falló porque no tenía el listener
if (btnRegister) {
    btnRegister.addEventListener('click', registrarUsuario);
}