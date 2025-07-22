// assets/js/theme-switcher.js
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.getElementById('themeToggleButton');
  const body = document.body;
  const themeIcon = themeToggleButton.querySelector('i'); // Selecciona el icono dentro del botón

  // Función para aplicar el tema
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
      themeIcon.classList.remove('fa-sun'); // Cambia a icono de luna
      themeIcon.classList.add('fa-moon');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
      themeIcon.classList.remove('fa-moon'); // Cambia a icono de sol
      themeIcon.classList.add('fa-sun');
    }
    // Guarda la preferencia del usuario en el localStorage
    localStorage.setItem('theme', theme);
  };

  // 1. Cargar el tema guardado en localStorage al cargar la página
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Si no hay tema guardado, usa la preferencia del sistema operativo si existe
    const prefersDarkScheme =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDarkScheme ? 'dark' : 'light');
  }

  // 2. Añadir el evento click al botón
  themeToggleButton.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
      applyTheme('light'); // Si está oscuro, cambia a claro
    } else {
      applyTheme('dark'); // Si está claro, cambia a oscuro
    }
  });
});
