//События для формы
var phone = document.querySelector('#phone');
phone.addEventListener('keydown', function(event){
    let isDigit = false;
    let isDash = false;
    let isControl = false;

    if (event.key >= 0 || event.key <= 9) {
        isDigit = true;
    }
    if (event.key == '-') {
        isDash = true;
    }
    if (event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace') {
        isControl = true;
    }
    if (isDigit == false && isDash == false && isControl== false) {
        event.preventDefault();    
    }
});


//Аккордион-команда
$(document).ready(function(){
    $('.team__trigger').on('click', function(e){
        e.preventDefault();
        var elem = $(e.target),
            item = elem.closest('.team__acco-item'),
            items = item.siblings();
        if(!item.hasClass('team__acco-item-active')) {
            items.removeClass('team__acco-item-active');
            item.addClass('team__acco-item-active');
        }else {
            item.removeClass('team__acco-item-active');
        }
    });
});

//Аккордион-меню
$(document).ready(function(){
    $('.menu__acco-link').on('click', function(e){
        e.preventDefault();
        var elem = $(e.target),
        item = elem.closest('.menu__acco-item'),
        items = item.siblings();
        
        if(!item.hasClass('menu__acco-item-active')) {
            items.removeClass('menu__acco-item-active');
            item.addClass('menu__acco-item-active');
        }else {
            item.removeClass('menu__acco-item-active')
        }
    });
});

//Пагинатор
const section = $('.section');
const maincontent = $('.maincontent');
let inScroll = false;

let md = new MobileDetect(window.navigator.userAgent);
let isMobile = md.mobile();

const activeMenuItem = function(itemEq) {
    $('.paginator__item').eq(itemEq).addClass('paginator__item-active')
        .siblings().removeClass('paginator__item-active');
};

const performTransition = function(sectionEq){
    const position =  `${sectionEq * -100}%`;

    if (!inScroll) {

        inScroll = true;

        section.eq(sectionEq).addClass('active')
        .siblings().removeClass('active');

        maincontent.css({
        'transform' : `translate(0, ${position})`
    })
    setTimeout(function(){
        inScroll = false;
        activeMenuItem(sectionEq);
    }, 1300)
  }
};

//Скролл
const scrollToSection = function(direction) {
    const activeSection = section.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction === 'up' && prevSection.length) {
        performTransition(prevSection.index());
    }

    if (direction === 'down' && nextSection.length) {
        performTransition(nextSection.index());
    }
};

//Скролл событие
$(document).on('wheel', function(e){
   const deltaY = e.originalEvent.deltaY;
   if (deltaY > 0) {
    scrollToSection('down')
   }
   if (deltaY < 0) {
    scrollToSection('up')
   }
});

// Стрелочная обработка событий
$(document).on('keydown', function(e){
    switch (e.keyCode) {
        case 40: scrollToSection('down');
        case 38: scrollToSection('up');
    }
});

$(document).on('touchmove', function(e){
    e.preventDefault()
});

$('[data-scroll-to]').on('click', function(e){
    e.preventDefault();
    const target = parseInt($(e.currentTarget).attr('data-scroll-to'));
    performTransition(target);
});

if (isMobile){
    $(document).swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData){
            const scrollDirection = direction === 'down' ? 'up' : 'down';
            scrollToSection(scrollToDirection);
        }
    });
};

// Меню-всплывашка
$(function () {
    var sections = $('.section'),
      maincontent = $('.maincontent'),
      menu = $('.popup-menu'),
      link = $('.ham-menu'),
      close = $('.popup-menu__close');
    inScroll = false;

    $('[data-scroll-to]').on('click', function (e) {
        e.preventDefault();
        menu.hide();
        var sectionNum = parseInt($(this).attr('data-scroll-to'));

        performTransition(sectionNum);
    });

    link.on('click', function (e) {
        e.preventDefault();
        menu.show();
      });
    
      close.on('click', function (e) {
        e.preventDefault();
        menu.hide();
      });
});


$('.popup__close').on('click', function (e) {
    e.preventDefault();
    $.fancybox.close();
  });

$(function () {

    $('.reviews__hover-btn').on('click', function (e) {
        var $this = $(this),
        review = $this.parent().siblings('.reviews__hover-descr'),
        name = $this.parent().siblings('.reviews__hover-title'),
        popup = $('.popup'),
        title = $('.popup>.popup__title'),
        text = $('.popup>.popup__text');

        title.text(name.text());
        text.text(review.text());
        
        $.fancybox.open({
            src: "#popup"
        });
    });
  
});