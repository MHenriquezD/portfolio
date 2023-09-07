import { habilidades, experiencia } from "../../data/data.js";

console.log(habilidades);

const cargarHabilidades = () => {
    const habilidadesContainer = document.querySelector(".habilidades-container");
    $("#iconsImg").empty();
    habilidades.forEach((habilidad) => {
        $("#iconsImg").append(`
            <div id="icon-${habilidad.id}">
                <img src="./assets/${habilidad.img}"> 
                <span>${habilidad.titulo}</span>
            </div>
        `);
    });
};
cargarHabilidades();

const cargarExperiencias = () => {
    $("#experience").empty();
    experiencia.forEach((experiencia) => {
        $("#experience").append(`
            <li id="exp-${experiencia.id}">
                <div>
                    <h3>${experiencia.periodo}</h3>
                    <h2>${experiencia.titulo}</h2>
                    <p>${experiencia.descripcion}</p>
                </div>
            </li>
        `);
    });
}
cargarExperiencias();


const items = document.querySelectorAll(".timeline-content li");

const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

const run = () =>
    items.forEach((item) => {
        if (isInViewport(item)) {
            item.classList.add("show");
        }
    });

// Events
window.addEventListener("load", run);
window.addEventListener("resize", run);
window.addEventListener("scroll", run);

// Smooth Scrolling

$(".menu-wrap .menu a").on("click", function (event) {
    $("#menu").prop("checked", false);
    if (this.hash !== " ") {
        event.preventDefault();

        const hash = this.hash;

        $("html, body").animate(
            {
                scrollTop: $(hash).offset().top - 100
            },
            800
        );

    }
});


$(".openModal").click(function () {
    $("#mdlRapidRiders").modal("show");
});

