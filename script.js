// Variables de selección
const tipo = document.getElementById('tipo');
const imagenesContainer = document.getElementById('imagenes');
const nombre = document.getElementById('nombre');
const mensaje = document.getElementById('mensaje');
const colorFondo = document.getElementById('color-fondo');
const crearBtn = document.getElementById('crear');
const tarjeta = document.getElementById('resultado');
const titulo = document.getElementById('titulo');
const imagenSeleccionada = document.getElementById('imagen-seleccionada');
const texto = document.getElementById('texto');
const autor = document.getElementById('autor');

// Variables para selección de tipo, tamaño y color de letra
const tipoLetra = document.getElementById('tipo-letra');
const tamañoLetra = document.getElementById('tamaño-letra');
const colorLetra = document.getElementById('color-letra');

// Variable para almacenar la imagen seleccionada
let imagenActual = "";

// Conjunto de imágenes para cada tema
const imagenesPorTema = {
    cumpleaños: [
        'cumple1.png',
        'cumple2.png',
        'cumple3.png'
    ],
    'san-valentin': [
        'sanvalentin1.png',
        'sanvalentin2.png',
        'sanvalentin3.png'
    ],
    'halloween': [
        'halloween1.png',
        'halloween2.png',
        'halloween3.png'
    ]
};

// Función para cargar imágenes según el tema seleccionado
function cargarImagenes(tema) {
    imagenesContainer.innerHTML = ''; // Limpiar imágenes anteriores
    imagenesPorTema[tema].forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Imagen para ${tema}`;
        img.classList.add('opcion-imagen');
        imagenesContainer.appendChild(img);

        // Añadir evento a cada imagen
        img.addEventListener('click', () => {
            imagenActual = img.src;
            document.querySelectorAll('.opcion-imagen').forEach(img => img.classList.remove('seleccionada'));
            img.classList.add('seleccionada');
            actualizarTarjeta(); // Actualizar tarjeta cuando se selecciona una imagen
        });
    });
}

// Cargar las imágenes iniciales para el primer tema
cargarImagenes(tipo.value);

// Función para actualizar la tarjeta en tiempo real
function actualizarTarjeta() {
    // Asignar valores de los inputs a los elementos de la tarjeta
    titulo.innerText = tipo.options[tipo.selectedIndex].text;
    imagenSeleccionada.src = imagenActual;
    texto.innerText = mensaje.value;
    autor.innerText = `Para: ${nombre.value}`;

    // Aplicar estilos de fondo y texto
    tarjeta.style.backgroundColor = colorFondo.value;
    tarjeta.style.fontFamily = tipoLetra.value;
    tarjeta.style.fontSize = `${tamañoLetra.value}px`;
    tarjeta.style.color = colorLetra.value;
}

// Evento para cambiar las imágenes cuando se cambia el tipo de felicitación
tipo.addEventListener('change', () => {
    cargarImagenes(tipo.value);
    actualizarTarjeta(); // Actualiza la tarjeta cuando cambie el tipo
});

// Eventos para actualizar la tarjeta en tiempo real
nombre.addEventListener('input', actualizarTarjeta);
mensaje.addEventListener('input', actualizarTarjeta);
colorFondo.addEventListener('input', actualizarTarjeta);
tipoLetra.addEventListener('change', actualizarTarjeta);
tamañoLetra.addEventListener('input', actualizarTarjeta);
colorLetra.addEventListener('input', actualizarTarjeta);

// Evento para el botón de "Crear tarjeta" (no es estrictamente necesario ahora, pero se deja para mayor control)
crearBtn.addEventListener('click', () => {
    tarjeta.style.display = 'block'; // Mostrar tarjeta
    actualizarTarjeta(); // Aplicar los últimos cambios
});

// Evento para el botón de "Crear tarjeta"
crearBtn.addEventListener('click', () => {
    // Crear una nueva ventana
    const nuevaVentana = window.open('', '_blank');
    
    // Generar el contenido HTML para la nueva ventana
    const contenido = `
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tarjeta de Felicitación</title>
            <style>
                body {
                    font-family: ${tipoLetra.value};
                    background-color: ${colorFondo.value};
                    color: ${colorLetra.value};
                    text-align: center;
                }
                .tarjeta {
                    border: 2px solid #000;
                    padding: 20px;
                    width: 300px;
                    margin: 0 auto;
                    background-color: white;
                }
                .tarjeta img {
                    max-width: 100%;
                }
            </style>
        </head>
        <body>
            <div class="tarjeta">
                <h2>${tipo.options[tipo.selectedIndex].text}</h2>
                <img src="${imagenActual}" alt="Imagen seleccionada">
                <p>${mensaje.value}</p>
                <p>Para: ${nombre.value}</p>
            </div>
        </body>
        </html>
    `;
    
    // Escribir el contenido en la nueva ventana
    nuevaVentana.document.write(contenido);
    nuevaVentana.document.close(); // Cerrar el documento 
});
