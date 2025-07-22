import {
  habilidades,
  experiencia,
  proyectos,
  rapidRidersProyectos,
  contacto,
} from '../../data/data.js';
// Renderizar contactos dinámicamente
const renderizarContactos = () => {
  const contactIcons = document.getElementById('contactIcons');
  const contactAddress = document.getElementById('contactAddress');
  if (contactIcons) contactIcons.innerHTML = '';
  if (contactAddress) contactAddress.innerHTML = '';

  contacto.forEach((item) => {
    if (item.tipo === 'facebook' || item.tipo === 'linkedin' || item.tipo === 'github') {
      // Íconos sociales
      if (contactIcons) {
        const div = document.createElement('div');
        div.className = 'text-center';
        div.innerHTML = `
          <a href="${item.url}" target="_blank">
            <i class="${item.icon} fa-4x"></i>
          </a>
        `;
        contactIcons.appendChild(div);
      }
    } else {
      // Email y teléfono
      if (contactAddress) {
        const div = document.createElement('div');
        div.className = 'text-center py-2';
        div.innerHTML = `
          <a href="${item.url}">
            <i class="${item.icon} fa-3x my-1"></i><br>${item.texto}
          </a>
        `;
        contactAddress.appendChild(div);
      }
    }
  });
};

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  renderizarContactos();
});

const preloadImage = (url) => {
  const img = new Image();
  img.src = url;
};

const cargarHabilidades = () => {
  const iconsImg = document.getElementById('iconsImg');
  if (!iconsImg) return;
  iconsImg.innerHTML = '';
  habilidades.forEach((habilidad) => {
    preloadImage(`./assets/${habilidad.img}`);
    const div = document.createElement('div');
    div.id = `icon-${habilidad.id}`;
    div.innerHTML = `
      <img 
        src="./assets/${habilidad.img}"
        alt="${habilidad.titulo}"
        class="icon"
        title="${habilidad.titulo}"
        loading="lazy"
        width="40"
        onerror="this.onerror=null; this.src='./assets/img/default.png';"
      />
      <span>${habilidad.titulo}</span>
    `;
    iconsImg.appendChild(div);
  });
};
cargarHabilidades();

const cargarExperiencias = () => {
  const experience = document.getElementById('experience');
  if (!experience) return;
  experience.innerHTML = '';
  experiencia.forEach((exp) => {
    const li = document.createElement('li');
    li.id = `exp-${exp.id}`;
    li.innerHTML = `
      <div>
        <h3>${exp.periodo}</h3>
        <h2>${exp.titulo}</h2>
        <p>${exp.descripcion}</p>
      </div>
    `;
    experience.appendChild(li);
  });
};

cargarExperiencias();

// Renderizar proyectos dinámicamente
const cargarProyectos = () => {
  const workContent = document.querySelector('.work-content');
  if (!workContent) return;
  workContent.innerHTML = '';
  proyectos.forEach((proyecto) => {
    const div = document.createElement('div');
    let proyectoHTML = '';
    if (proyecto.titulo === 'RapidRiders') {
      proyectoHTML = `
              <a href="#" data-toggle="modal" data-target="#mdlRapidRiders">
                  <img src="${proyecto.img}" alt="${proyecto.titulo}">
              </a>
              <div>
                  <a href="#" data-toggle="modal" data-target="#mdlRapidRiders">
                      <h2>${proyecto.titulo}</h2>
                  </a>
                  <p>${proyecto.descripcion}</p>
              </div>
          `;
    } else if (proyecto.url) {
      proyectoHTML = `
              <a href="${proyecto.url}" target="_blank">
                  <img src="${proyecto.img}" alt="${proyecto.titulo}">
              </a>
              <div>
                  <a href="${proyecto.url}" target="_blank">
                      <h2>${proyecto.titulo}</h2>
                  </a>
                  <p>${proyecto.descripcion}</p>
              </div>
          `;
    } else {
      proyectoHTML = `
              <img src="${proyecto.img}" alt="${proyecto.titulo}">
              <div>
                  <h2>${proyecto.titulo}</h2>
                  <p>${proyecto.descripcion}</p>
              </div>
          `;
    }
    div.innerHTML = proyectoHTML;
    workContent.appendChild(div);
  });
};

cargarProyectos();

const run = () => {
  const items = document.querySelectorAll('.timeline-content li');
  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const inViewport =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    const notInViewport =
      rect.bottom < 0 ||
      rect.top >
        (window.innerHeight || document.documentElement.clientHeight) ||
      rect.right < 0 ||
      rect.left > (window.innerWidth || document.documentElement.clientWidth);
    if (inViewport) {
      item.classList.add('show');
    } else if (notInViewport) {
      item.classList.remove('show');
    }
  });
};

window.addEventListener('load', run);
window.addEventListener('resize', run);
window.addEventListener('scroll', run);

// Smooth Scrolling sin jQuery
document.querySelectorAll('.menu-wrap .menu a').forEach((anchor) => {
  anchor.addEventListener('click', function (event) {
    const menuCheckbox = document.getElementById('menu');
    if (menuCheckbox) menuCheckbox.checked = false;
    if (this.hash && this.hash !== ' ') {
      event.preventDefault();
      const hash = this.hash;
      const target = document.querySelector(hash);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth',
        });
      }
    }
  });
});

// Modal sin jQuery
document.querySelectorAll('.openModal').forEach((btn) => {
  btn.addEventListener('click', function () {
    const modal = document.getElementById('mdlRapidRiders');
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
    }
  });
});

// cerramos el modal y limpiamos el contenido
const cerrarModal = () => {
  const modal = document.getElementById('mdlRapidRiders');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('show');
  }
};
document.querySelectorAll('.closeModal').forEach((btn) => {
  btn.addEventListener('click', cerrarModal);
});
const modalContent = document.getElementById('modalRapidRiders');
if (modalContent) {
  modalContent.innerHTML = '';
  rapidRidersProyectos.forEach((proyecto) => {
    const div = document.createElement('div');
    div.classList.add('modal-proyecto');

    /*
    Aquí se crea el contenido del modal para cada proyecto de RapidRiders.
    Se utiliza un template literal para insertar los datos del proyecto.
    */
            let iconHTML = '';
            div.innerHTML = `
            <a href="${proyecto.url}" target="_blank">
                <img src="${proyecto.img}" alt="${proyecto.titulo}" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 1rem;">
            </a>
            <div>
                <a href="${proyecto.url}" target="_blank">
                    <h3>${proyecto.titulo}</h3>
                    <p>${proyecto.descripcion}</p>
                </a>
            </div>
            `;
    modalContent.appendChild(div);
  });
}
