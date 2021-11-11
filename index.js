if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Registro de ServiceWorker Exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el ServiceWorker', err));
}

const navToggle = document.querySelector(".nav-toggle"),
    navMenu = document.querySelector(".nav-menu"),
    navItem = document.querySelector(".nav-menu-item"),
    portada = document.querySelector(".portada-inicio");

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav-menu_visible");
    portada.classList.toggle("hide-portada")
});

$(document).ready(function(){
    $('ul.nav-menu li a:first').addClass('active');
    $('.sections article').hide(); 
    $('.sections article:first').show();

    $('ul.nav-menu li a').click(function(){
        $('ul.nav-menu li a').removeClass('active');
        $(this).addClass('active');
        $('.sections article').hide();
        $('.nav-menu').removeClass('nav-menu_visible');
        $('.portada-inicio').removeClass('hide-portada');

        let activeMenu = $(this).attr('href');
        $(activeMenu).show();
        return false;
    });

    $('nav.nav a.logo').click(function(){
        $('ul.nav-menu li a').removeClass('active');
        $('ul.nav-menu li a.a-inicio').addClass('active');
        $('.sections article').hide();
        $('.nav-menu').removeClass('nav-menu_visible');
        $('.portada-inicio').removeClass('hide-portada');

        let activeMenu = $(this).attr('href');
        $(activeMenu).show();
        return false;
    });

    $('div.details-inicio a').click(function(){
        $('ul.nav-menu li a').removeClass('active');
        $('ul.nav-menu li a.a-productos').addClass('active');
        $('.sections article').hide();
        $('.nav-menu').removeClass('nav-menu_visible');

        let activeMenu = $(this).attr('href');
        $(activeMenu).show();
        return false;
    })
});
