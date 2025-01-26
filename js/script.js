// Selección de elementos del DOM
const filter_btns = document.querySelectorAll(".filter-btn"); // Botones de filtro
const skills_wrap = document.querySelector(".skills"); // Contenedor de habilidades
const skills_bars = document.querySelectorAll(".skill-progress"); // Barras de progreso de habilidades
const records_wrap = document.querySelector(".records"); // Contenedor de registros
const records_numbers = document.querySelectorAll(".number"); // Números de registros
const footer_input = document.querySelector(".footer-input"); // Campo de entrada en el pie de página
const hamburger_menu = document.querySelector(".hamburger-menu"); // Menú hamburguesa (para móvil)
const navbar = document.querySelector("header nav"); // Barra de navegación
const links = document.querySelectorAll(".links a"); // Enlaces de navegación
const contactForm = document.getElementById('contactForm'); // Formulario de contacto
const submitButton = document.getElementById('button[type="submit"]'); // Botón de envío del formulario


// Evento para cuando el campo de entrada del pie de página obtiene el foco
footer_input.addEventListener("focus", () => {
  footer_input.classList.add("focus"); // Añadir clase 'focus' para estilizar el campo
});

// Evento para cuando el campo de entrada del pie de página pierde el foco
footer_input.addEventListener("blur", () => {
  if (footer_input.value != "") return; // Si hay texto, no hace nada
  footer_input.classList.remove("focus"); // Eliminar clase 'focus' si el campo está vacío
});

// Función para cerrar el menú
function closeMenu() {
  navbar.classList.remove("open"); // Eliminar la clase 'open' que muestra el menú
  document.body.classList.remove("stop-scrolling"); // Permitir el desplazamiento de la página
}

// Evento para cuando se hace clic en el menú hamburguesa
hamburger_menu.addEventListener("click", () => {
  if (!navbar.classList.contains("open")) {
    navbar.classList.add("open"); // Abrir el menú agregando la clase 'open'
    document.body.classList.add("stop-scrolling"); // Deshabilitar el desplazamiento de la página
  } else {
    closeMenu(); // Si el menú ya está abierto, cerrarlo
  }
});

// Cerrar el menú cuando se hace clic en los enlaces de navegación
links.forEach((link) => link.addEventListener("click", () => closeMenu()));

// Evento de clic en los botones de filtro
filter_btns.forEach((btn) =>
  btn.addEventListener("click", () => {
    filter_btns.forEach((button) => button.classList.remove("active")); // Eliminar clase 'active' de todos los botones
    btn.classList.add("active"); // Agregar clase 'active' al botón clickeado

    let filterValue = btn.dataset.filter; // Obtener el valor de filtro desde el atributo 'data-filter'

    // Usar Isotope para filtrar los elementos de la grilla
    $(".grid").isotope({ filter: filterValue });
  })
);

// Inicialización de Isotope para organizar los elementos en la grilla
$(".grid").isotope({
  itemSelector: ".grid-item", // Selección de cada elemento en la grilla
  layoutMode: "fitRows", // Disposición en filas
  transitionDuration: "0.6s", // Duración de la animación de transición
});

// Evento de desplazamiento (scroll) para activar los efectos
window.addEventListener("scroll", () => {
  skillsEffect(); // Activar el efecto de las habilidades
  countUp(); // Activar el contador de números
});

// Función para verificar si un elemento es visible en la pantalla
function checkScroll(el) {
  let rect = el.getBoundingClientRect(); // Obtener las coordenadas del elemento
  if (window.innerHeight >= rect.top + el.offsetHeight) return true; // Si el elemento es visible, retorna true
  return false; // Si no es visible, retorna false
}

// Función para activar el efecto de las barras de habilidades
function skillsEffect() {
  if (!checkScroll(skills_wrap)) return; // Verificar si el contenedor de habilidades es visible
  skills_bars.forEach((skill) => (skill.style.width = skill.dataset.progress)); // Animar las barras según el 'data-progress'
}

// Función para activar el contador de números en los registros
function countUp() {
  if (!checkScroll(records_wrap)) return; // Verificar si el contenedor de registros es visible
  records_numbers.forEach((numb) => {
    const updateCount = () => {
      let currentNum = +numb.innerText; // Número actual
      let maxNum = +numb.dataset.num; // Número máximo (dato de 'data-num')
      let speed = 100; // Velocidad del contador
      const increment = Math.ceil(maxNum / speed); // Incremento por cada paso

      if (currentNum < maxNum) {
        numb.innerText = currentNum + increment; // Actualizar el número en el DOM
        setTimeout(updateCount, 1); // Llamar de nuevo para continuar el conteo
      } else {
        numb.innerText = maxNum; // Finalizar el contador y mostrar el número máximo
      }
    };

    setTimeout(updateCount, 400); // Iniciar el contador después de un retraso
  });
}

// Inicialización de Swiper para el carrusel de imágenes
var mySwiper = new Swiper(".swiper-container", {
  speed: 1100, // Velocidad de la transición entre slides
  slidesPerView: 1, // Mostrar 1 slide a la vez
  loop: true, // Hacer que el carrusel sea infinito
  autoplay: {
    delay: 5000, // Tiempo de espera entre slides (5000ms = 5 segundos)
  },
  navigation: {
    prevEl: ".swiper-button-prev", // Botón para retroceder al slide anterior
    nextEl: ".swiper-button-next", // Botón para avanzar al siguiente slide
  },
});

// Función para validar el formato del correo electrónico
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(email.trim().toLowerCase());
}

// Función para validar que solo se ingresen letras (nombre y apellido)
function validateOnlyLetters(nombre) {
  const re = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Permite letras, espacios y caracteres acentuados
  return re.test(nombre.trim());
}

// Función para validar que solo se ingresen letras (nombre y apellido)
function validateOnlyLetters(apellido) {
  const re = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Permite letras, espacios y caracteres acentuados
  return re.test(apellido.trim());
}

// Función para validar el formato del teléfono (10 dígitos numéricos)
function validatePhone(telefono) {
  const re = /^[0-9]{10}$/;
  return re.test(telefono.trim());
}

// Validar y enviar el formulario al hacer clic en el botón de envío
if (submitButton) {
  submitButton.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado

    // Obtener los valores de los campos
    const nombre = document.querySelector('[name="nombre"]').value.trim();
    const apellido = document.querySelector('[name="apellido"]').value.trim();
    const telefono = document.querySelector('[name="telefono"]').value.trim();
    const email = document.querySelector('[name="email"]').value.trim();
    const comentarios = document.querySelector('[name="comentarios"]').value.trim();

    // Validar que todos los campos estén llenos
    if (!nombre || !apellido || !telefono || !email || !comentarios) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Validar nombres y apellidos (solo letras y espacios)
    if (!validateOnlyLetters(nombre)) {
      alert("El nombre solo debe contener letras y espacios.");
      return;
    }

    if (!validateOnlyLetters(apellido)) {
      alert("El apellido solo debe contener letras y espacios.");
      return;
    }

    // Validar el formato del teléfono
    if (!validatePhone(telefono)) {
      alert("El teléfono debe contener exactamente 10 dígitos numéricos.");
      return;
    }

    // Validar el formato del correo electrónico
    if (!validateEmail(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    // Cambiar el estado del botón mientras se envía el formulario
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    // Enviar los datos del formulario al servidor
    fetch("https://formsubmit.co/fa7c3f343ce345020ae7682c6158160c", {
      method: "POST",
      body: new FormData(contactForm),
    })
      .then((response) => {
        if (response.ok) {
          alert("¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.");
          window.location.href = "./index.html"; // Redirige
          contactForm.reset(); // Limpiar el formulario después de un envío exitoso
        } else {
          alert("Hubo un problema al enviar el formulario. Intenta nuevamente.");
        }
      })
      .catch((error) => {
        alert("Hubo un error al enviar el formulario. Por favor, inténtalo más tarde.");
        console.error("Error:", error); // Mostrar detalles del error en la consola
      })
      .finally(() => {
        // Restaurar el estado del botón
        submitButton.disabled = false;
        submitButton.textContent = "Enviar";

        // Limpiar el formulario después de un envío exitoso
        if (contactForm) contactForm.reset();
      });
  });
}
  
document.addEventListener("DOMContentLoaded", () => {
  // Obtener todos los botones y popups
  const popupButtons = document.querySelectorAll('[data-popup]');
  const popups = document.querySelectorAll('.popup');

  // Manejar clic en los botones para abrir los popups
  popupButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Prevenir redirección
      const popupId = button.getAttribute('data-popup'); // Obtener el ID del popup desde el atributo
      const popup = document.getElementById(`popup-${popupId}`); // Seleccionar el popup correspondiente
      if (popup) popup.classList.remove('hidden'); // Mostrar el popup
    });
  });

  // Manejar clic en los botones para cerrar los popups
  popups.forEach(popup => {
    const closeButton = popup.querySelector('.close-popup');
    closeButton.addEventListener('click', () => {
      popup.classList.add('hidden'); // Ocultar el popup
    });
  });

  // Cerrar el popup si se hace clic fuera del contenido
  popups.forEach(popup => {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) popup.classList.add('hidden'); // Solo cerrar si el clic fue en el fondo
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const footerForm = document.getElementById("footerForm");
  const footerInput = document.querySelector(".footer-input");

  // Manejar el envío del formulario
  footerForm.addEventListener("submit", (e) => {
    const email = footerInput.value.trim();

    // Validar si el correo es válido
    if (!validateEmail(email)) {
      e.preventDefault(); // Evitar envío
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    alert("¡Gracias por suscribirte! Hemos recibido tu correo.");
  });

  // Función para validar correos electrónicos
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  }
});