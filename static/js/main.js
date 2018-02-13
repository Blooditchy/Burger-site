
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


//Аккордион


   
//Боковое меню


$(document).on('wheel', function(e){
    const deltaY = e.preventDefault.deltaY;

})