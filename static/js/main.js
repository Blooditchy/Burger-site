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
    }, 900)
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

//Всплывашка отзывы
$(function () {

    $('.reviews__hover-btn').on('click', function (e) {
        var $this = $(this),
        review = $this.siblings('.reviews__hover-descr'),
        name = $this.siblings('.reviews__hover-title'),
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

$('.popup__close').on('click', function (e) {
    e.preventDefault();
    $.fancybox.close();
});

//Слайдер

$(function () {

    var items = $('.slider__item'),
      display = $('.slider__list'),
      descs = $('.desc__item'),
      texts = $('.slider__text'),
      titles = $('.section__title_burgers'),
      prices = $('.price__item'),
      isSlide = false;
  
  
    var defineSlides = function (items) {
      var activeSlide = items.filter('.active');
      return {
        activeSlide: activeSlide,
        nextSlide: activeSlide.next(),
        prevSlide: activeSlide.prev()
      }
    };
  
    var slideTo = function (slideEq) {
  
      if (isSlide) return;
      isSlide = true;
  
      switchDesc(slideEq);
  
      var position = (slideEq * -100) + '%';
  
      display.css({
        'transform': 'translateX(' + position + ')',
        'webkit-transform': 'translateX(' + position + ')'
      });
  
      items.eq(slideEq).addClass('active')
        .siblings().removeClass('active');
  
  
      setTimeout(function () {
        isSlide = false;
      }, 500);
  
    };
  
  
  
    var slide = function (direction) {
      var slide = defineSlides(items);
  
      if (direction == 'next') {
  
        if (!slide.nextSlide.length) {
          items.first().addClass('active')
            .siblings().removeClass('active');
          descs.first().addClass('active')
            .siblings().removeClass('active');
          prices.first().addClass('active')
            .siblings().removeClass('active');
  
          slideTo(items.first().index());
        }
  
        slideTo(slide.nextSlide.index());
      }
  
      if (direction == 'prev') {
  
        if (!slide.prevSlide.length) {
          items.last().addClass('active')
            .siblings().removeClass('active');
          descs.last().addClass('active')
            .siblings().removeClass('active');
          prices.last().addClass('active')
            .siblings().removeClass('active');
  
  
          slideTo(items.last().index());
        }
  
        slideTo(slide.prevSlide.index());
      }
  
    };
  
    var switchDesc = function (slideEq) {
      var activeSlideEq = defineSlides(items).activeSlide.index();
  
      titles.removeClass('exit');
      titles.removeClass('enter');
      texts.removeClass('exit');
      texts.removeClass('enter');
      prices.removeClass('active');
  
  
      texts.eq(activeSlideEq).addClass('exit');
      titles.eq(activeSlideEq).addClass('exit');
  
      prices.eq(slideEq).addClass('active');
  
      setTimeout(function () {
        descs.eq(activeSlideEq).removeClass('active');
        descs.eq(slideEq).addClass('active');
        texts.eq(slideEq).addClass('enter');
        titles.eq(slideEq).addClass('enter');
      }, 350);
  
    }
  
  
    $('.slider__next-arrow').on('click', function (e) {
      e.preventDefault();
      slide('next');
    });
  
    $('.slider__prev-arrow').on('click', function (e) {
      e.preventDefault();
      slide('prev');
    });
  });

//Заказ

  $(document).ready(function () {

    $('.btn_order').on('click', function (e) {
      e.preventDefault();
  
      var name = $('[name=user-name]').val(),
          street = $('[name=user-street]').val(),
          home = $('[name=user-house]').val(),
          phone = $('[name=user-phone]').val(),
          order = $('.btn_order'),
          popup = $('.popup'),
          title = $('.popup>.popup__title'),
          text = $('.popup>.popup__text');
  
  
      if (name.length && phone.length && street.length && home.length) {
  
        title.text('Заказ отправлен');
        text.text('Ваш заказ отправлен. На указанный вами телефон будут приходить уведомления о смене статуса заказа.');
  
      } else {
  
        var missedData = [];
        if (!name.length) missedData.push('Имя');
        if (!phone.length) missedData.push('Контактный телефон');
        if (!street.length || !home.length) missedData.push('Адрес доставки');
        text.text('Вы забыли указать необходимые данные: ' + missedData.join(', '));
        title.text('Неполные данные');
      }
  
      $.fancybox.open({
        src: "#popup"
      });
  
    });
  
    $('.popup__close').on('click', function (e) {
      e.preventDefault();
      $.fancybox.close();
    });
  });


  

$('.form').on('submit', submitForm);

function submitForm (e){
    e.preventDefault();
    var form = $(e.target),
        data = form.serialize(),
        url = form.attr('action');

    var request = $.ajax({
        type: 'POST',
        url: url,
        data: data
    });

    request.done(function(msg){
        alert(msg);
    });

    request.fail(function(jqXHR, textStatus){
        alert("Reauest failed:" + textStatus);
    });
};