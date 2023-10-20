import data from '../data.json' assert {type: 'json'};

let filtrosPantalla = [];
const busqueda = {
    rol: '',
    nivel: '',
    Python: '',
    Ruby: '',
    JavaScript: '',
    HTML: '',
    CSS: '',
    React: '',
    Sass: '',
    Vue: '',
    Django: '',
    RoR: '',
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarProgramadores(data);
});

function mostrarProgramadores(listaProgramadores) {
    const resultados = document.querySelector('#programadores-lista');
    limpiarHTML(resultados);

    listaProgramadores.forEach( programador => {
        const { company, logo, newUser, featured, position, role, level, postedAt, contract, location, languages, tools } = programador;

        //programador
        const programadorUl = document.createElement('UL');
        programadorUl.classList.add('programador');
        resultados.appendChild(programadorUl);

        //programador__fotoPerfil
        const fotoPerfil = document.createElement('LI'); 
        fotoPerfil.classList.add('programador__fotoPerfil');
        fotoPerfil.innerHTML = `<img src="${logo}" alt="Programador Perfil">`;
        programadorUl.appendChild(fotoPerfil);

        //programador__perfil
        const perfil = document.createElement('LI');
        perfil.classList.add('programador__perfil');
        programadorUl.appendChild(perfil);
        
        const perfilDatos = document.createElement('DIV');
        perfilDatos.classList.add('programador__datos');
        perfil.appendChild(perfilDatos);

        const compania = document.createElement('P');
        compania.classList.add('programador__compania');
        compania.textContent = company;
        perfilDatos.appendChild(compania);

        if(newUser) {
            const estado = document.createElement('P');
            estado.classList.add('programador__estado');
            estado.textContent = 'New!';
            perfilDatos.appendChild(estado);
        }

        if(featured) {
            const destacado = document.createElement('P');
            destacado.classList.add('programador__estado' , 'programador__estado--bgNegro');
            destacado.textContent = 'Featured';
            perfilDatos.appendChild(destacado);
        }

        const posicionDiv = document.createElement('DIV');
        perfil.appendChild(posicionDiv);
        
        const posicion = document.createElement('H3');
        posicion.classList.add('programador__posicion');
        posicion.textContent = position;
        posicionDiv.appendChild(posicion);

        const ubicacionDiv = document.createElement('DIV');
        perfil.appendChild(ubicacionDiv);

        const ubicacion = document.createElement('P');
        ubicacion.classList.add('programador__ubicacion');
        ubicacion.innerHTML = `${postedAt} &#8226 ${contract} &#8226 ${location}`;
        ubicacionDiv.appendChild(ubicacion);

        //programador__tecnologias
        const tecnologias = document.createElement('LI');
        tecnologias.classList.add('programador__tecnologias');
        programadorUl.appendChild(tecnologias);

        const rolBtn = document.createElement('BUTTON');
        rolBtn.classList.add('boton__etiqueta');
        rolBtn.value = role;
        rolBtn.textContent = role;
        tecnologias.appendChild(rolBtn);
        rolBtn.onclick = () => {
            limpiarRol(role);
            busqueda.rol = role;
            mostrarFiltros();
        }

        const nivelBtn = document.createElement('BUTTON');
        nivelBtn.classList.add('boton__etiqueta');
        nivelBtn.value = level;
        nivelBtn.textContent = level;
        tecnologias.appendChild(nivelBtn);
        nivelBtn.onclick = () => {
            limpiarNivel(level);
            busqueda.nivel = level;
            mostrarFiltros();
        }

        languages.forEach( language => {
            const languageBtn = document.createElement('BUTTON');
            languageBtn.classList.add('boton__etiqueta');
            languageBtn.value = language;
            languageBtn.textContent = language;
            tecnologias.appendChild(languageBtn);
            languageBtn.onclick = () => {
                if( !filtrosPantalla.includes(language) ) {
                    filtrosPantalla = [...filtrosPantalla, language];
                    busqueda[language] = language;
                }
                mostrarFiltros();   
            }
        })

        tools.forEach( tool => {
            const toolBtn = document.createElement('BUTTON');
            toolBtn.classList.add('boton__etiqueta');
            toolBtn.value = tool;
            toolBtn.textContent = tool;
            tecnologias.appendChild(toolBtn);
            toolBtn.onclick = () => {
                if( !filtrosPantalla.includes(tool) ) {
                    filtrosPantalla = [...filtrosPantalla, tool];
                    busqueda[tool] = tool;
                }
                mostrarFiltros();
            }
        })
    })
}

function mostrarFiltros() {
    const resultados = document.querySelector('.resultado');
    const resultadoEtiquetas = document.querySelector('.resultado__etiquetas');

    if(!resultados) {
        const body = document.querySelector('body');
        const listaProgramadores = document.querySelector('#programadores-lista');

        const resultadosSection = document.createElement('SECTION');
        resultadosSection.classList.add('resultado', 'contenedor');
        body.insertBefore(resultadosSection, listaProgramadores);

        const resultadoEtiquetas = document.createElement('DIV');
        resultadoEtiquetas.classList.add('resultado__etiquetas');
        resultadosSection.appendChild(resultadoEtiquetas);

        const resultadoLimpiar = document.createElement('DIV');
        resultadoLimpiar.classList.add('resultado__limpiar');
        resultadosSection.appendChild(resultadoLimpiar);

        const limpiarBtn = document.createElement('BUTTON');
        limpiarBtn.classList.add('resultado__limpiarBtn');
        limpiarBtn.textContent = 'Clear';
        resultadoLimpiar.appendChild(limpiarBtn);
        limpiarBtn.onclick = () => {
            resultadosSection.remove();

            filtrosPantalla = [];

            busqueda.rol = '';
            busqueda.nivel = '';
            busqueda.Python = '';
            busqueda.Ruby = '';
            busqueda.JavaScript = '';
            busqueda.HTML = '';
            busqueda.Css = '';
            busqueda.React = '';
            busqueda.Sass = '';
            busqueda.Vue = '';
            busqueda.Django = '';
            busqueda.RoR = '';

            mostrarProgramadores(data);
        }
    }

    if(resultadoEtiquetas) {
        limpiarHTML(resultadoEtiquetas);
    }

    filtrosPantalla.forEach( filtro => {
        const resultadoEtiquetas = document.querySelector('.resultado__etiquetas');
        const resultados = document.querySelector('.resultado');

        const etiquetaDiv = document.createElement('DIV');
        etiquetaDiv.classList.add('resultado__etiqueta');
        resultadoEtiquetas.appendChild(etiquetaDiv);
    
        const etiquetaSpan = document.createElement('SPAN');
        etiquetaSpan.classList.add('resultado__etiquetaNombre');
        etiquetaSpan.textContent = filtro;
        etiquetaDiv.appendChild(etiquetaSpan);
    
        const eliminarEtiqueta = document.createElement('BUTTON');
        eliminarEtiqueta.classList.add('resultado__eliminarBtn');
        eliminarEtiqueta.innerHTML = `<img src="images/icon-remove.svg" alt="Icon remove" class="resultado__eliminarImg">`;
        etiquetaDiv.appendChild(eliminarEtiqueta);
        eliminarEtiqueta.onclick = () => {
            if( filtrosPantalla.length === 1 ) {
                resultados.remove();

                filtrosPantalla = [];
    
                busqueda.rol = '';
                busqueda.nivel = '';
                busqueda.Python = '';
                busqueda.Ruby = '';
                busqueda.JavaScript = '';
                busqueda.HTML = '';
                busqueda.Css = '';
                busqueda.React = '';
                busqueda.Sass = '';
                busqueda.Vue = '';
                busqueda.Django = '';
                busqueda.RoR = '';
    
                mostrarProgramadores(data);
            }

            const actualizarFiltros = filtrosPantalla.filter( tecnologia => filtro !== tecnologia );
            filtrosPantalla = [...actualizarFiltros];

            etiquetaDiv.remove();

            if( filtro === 'Frontend' || filtro === 'Backend' || filtro === 'FullStack') {
                busqueda.rol = '';
            }

            if( filtro === 'Junior' || filtro === 'Midweight' || filtro === 'Senior') {
                busqueda.nivel = '';
            }

            busqueda[filtro] = '';
 
            actualizarLista();
        }
    })

    actualizarLista();
}


function limpiarHTML(resultados) {
    while( resultados.firstChild ) {
        resultados.removeChild(resultados.firstChild);
    }
}

//eliminar el rol previo de la barra de filtros al presionar un nuevo rol
function limpiarRol(rol) {
    const limpiarRol = filtrosPantalla.filter(eliminarFrontend).filter(eliminarBackend).filter(eliminarFullStack);
    filtrosPantalla = [...limpiarRol, rol];
}

function eliminarFrontend(etiqueta) {
    if( etiqueta === 'Frontend') {
        return etiqueta !== 'Frontend';
    }
    return etiqueta;
}

function eliminarBackend(etiqueta) {
    if( etiqueta === 'Backend') {
        return etiqueta !== 'Backend';
    }
    return etiqueta;
}

function eliminarFullStack(etiqueta) {
    if( etiqueta === 'Fullstack') {
        return etiqueta !== 'Fullstack';
    }
    return etiqueta;
}

//eliminar el nivel previo de la barra de filtros al presionar un nuevo nivel
function limpiarNivel(nivel) {
    const limpiarNivel = filtrosPantalla.filter(eliminarJunior).filter(eliminarMidweight).filter(eliminarSenior);
    filtrosPantalla = [...limpiarNivel, nivel];
}

function eliminarJunior(etiqueta) {
    if( etiqueta === 'Junior') {
        return etiqueta !== 'Junior';
    }
    return etiqueta;
}

function eliminarMidweight(etiqueta) {
    if( etiqueta === 'Midweight') {
        return etiqueta !== 'Midweight';
    }
    return etiqueta;
}

function eliminarSenior(etiqueta) {
    if( etiqueta === 'Senior') {
        return etiqueta !== 'Senior';
    }
    return etiqueta;
}

//actualizar lista de programadores
function actualizarLista() {
    const resultado = data.filter(actualizarRol).filter(actualizarNivel).filter(actualizarPyton).filter(actualizarRuby).filter(actualizarJs).filter(actualizarHTML).filter(actualizarCss).filter(actualizarReact).filter(actualizarSass).filter(actualizarVue).filter(actualizarDjango).filter(actualizarRoR);
    mostrarProgramadores(resultado);
}

function actualizarRol(DB) {
    if(busqueda.rol) {
        return DB.role === busqueda.rol;
    }
    return DB;
}

function actualizarNivel(DB) {
    if(busqueda.nivel) {
        return DB.level === busqueda.nivel;
    }
    return DB;
}

function actualizarPyton(DB) {
    if(busqueda.Python) {
        return DB.languages.some( lenguaje => lenguaje === busqueda.Python );
    }
    return DB;
}

function actualizarRuby(DB) {
    if(busqueda.Ruby) {
        return DB.tools.some( tool => tool === busqueda.Ruby );
    }
    return DB;
}

function actualizarJs(DB) {
    if(busqueda.JavaScript) {
        return DB.languages.some( lenguaje => lenguaje === busqueda.JavaScript );
    }
    return DB;
}

function actualizarHTML(DB) {
    if(busqueda.HTML) {
        return DB.languages.some( lenguaje => lenguaje === busqueda.HTML );
    }
    return DB;
}

function actualizarCss(DB) {
    if(busqueda.CSS) {
        return DB.languages.some( lenguaje => lenguaje === busqueda.CSS );
    }
    return DB;
}

function actualizarReact(DB) {
    if(busqueda.React) {
        return DB.tools.some( tool => tool === busqueda.React );
    }
    return DB;
}

function actualizarSass(DB) {
    if(busqueda.Sass) {
        return DB.tools.some( tool => tool === busqueda.Sass );
    }
    return DB;
}

function actualizarVue(DB) {
    if(busqueda.Vue) {
        return DB.tools.some( tool => tool === busqueda.Vue );
    }
    return DB;
}

function actualizarDjango(DB) {
    if(busqueda.Django) {
        return DB.tools.some( tool => tool === busqueda.Django );
    }
    return DB;
}

function actualizarRoR(DB) {
    if(busqueda.RoR) {
        return DB.tools.some( tool => tool === busqueda.RoR );
    }
    return DB;
}