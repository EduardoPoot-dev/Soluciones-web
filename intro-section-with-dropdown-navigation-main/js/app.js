const hamburgerIcon = document.querySelector('.nav__hamburger');
const navOverlay = document.querySelector('.nav__overlay');
const body = document.querySelector('body')
let currentDropDown = navOverlay;

//eventos

//cambia el icono de hamburguesa por el de cerrar cuando el menu esta abierto en mobile
hamburgerIcon.addEventListener('click', () => {
    hamburgerIcon.classList.toggle('nav__hamburger--open');
    navOverlay.classList.toggle('nav__overlay--show')
})

navOverlay.addEventListener('click', (e) => {
    e.preventDefault();

    //si el elemento que presioné tiene otro menu dentro....
    if(e.target.classList.value.includes('nav__parent')) {
        const subMenu = e.target.parentElement.children[1];
        //checa si estas en mobile o en desktop
        abrirSubMenu(subMenu);
    }

})

//cierra el sub menu al dar click en cualquier parte de la pantalla
body.addEventListener('click', (e) => {
    if(!e.target.classList.value.includes('nav__parent')) {
        closeDropDown(currentDropDown);
    }
})

//cierra todo lo que tenga que ver con el menu tras cambia el tamaño de pantalla
window.addEventListener('resize', () => {
    closeDropDown(currentDropDown);

    if(window.innerWidth < 768) {
        const navInners = document.querySelectorAll('.nav__inner');

        navInners.forEach( navInner => {
            navInner.style.height = '';
        })
    }
})

//funciones

function abrirSubMenu(subMenu) {
    if(window.innerWidth < 768) {
        //checa si el submenu esta abierto o cerrado, si es cero esta cerrado y si tiene un valor esta abierto
        let height = (subMenu.clientHeight == 0)? subMenu.scrollHeight : 0;

        //modifica el height para abrir o cerrar el submenu
        subMenu.style.height = `${height}px`;

    } else {
        //estamos en vista de desktop
        subMenuDesktop(subMenu);
    }
}

function subMenuDesktop(subMenu) {
    /*
        en el primer ciclo el submenu no tiene la clase, porlo que no borra nada y lo agrega, y el submenu al que
        le di click pasa a ser el current drop down, cuando abro otro, ese submenu no tiene esa clase, por lo que al 
        current drop down que fue mi elemento anterior, se le elimina esa clase y al que presione se le agrega ....
    */
    if(!subMenu.classList.value.includes('nav__inner--show')) {
        closeDropDown(currentDropDown);
    }
    subMenu.classList.toggle('nav__inner--show');
    currentDropDown = subMenu;
}

//cierra el dropdown abierto previo
function closeDropDown(dropDown) {
    if(dropDown.classList.value.includes('nav__inner--show')) {
        dropDown.classList.remove('nav__inner--show');
    }
}


