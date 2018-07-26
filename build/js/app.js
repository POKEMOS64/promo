
$(document).ready(function(){
  $('.comments_car').owlCarousel({
    loop:false,
    margin:0,
    nav:true,
    navText : ["назад","Вперед"],
    /*navText : ["<i class='material-icons small'>arrow_back</i>","<i class='material-icons small'>arrow_forward</i>"],*/
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});
$('.owl-carousel.modal00, .mobi').owlCarousel({
    loop:true,
    autoplayTimeout:10000,
    autoplay:true,
    margin:20,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});
});

$(document).ready(function(){
    $('.modal').modal();
    $('.scrollspy').scrollSpy();
    $('.sidenav').sidenav();
  });