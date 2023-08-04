let caseMouse = document.querySelectorAll('.working--process--card');
let imgCase = document.querySelector('.working--process--case').querySelectorAll('img');

caseMouse.forEach(function(item){
    item.addEventListener('mouseover',function(){
        this.lastElementChild.classList.remove('hidden')
        this.style.backgroundColor = '#B9FF66';

    })
    item.addEventListener('mouseout',function(){
        this.lastElementChild.classList.add('hidden')
        this.style.backgroundColor = '#F3F3F3';
    })
})
// 
let blockHidden = document.querySelectorAll('#team--case--hidden'),
    btnOpen = document.querySelector('.open'),
    btnClose = document.querySelector('.close');

for (let i of blockHidden){
    btnOpen.addEventListener('click', function(){
        i.classList.remove('team--hidden')
        btnOpen.classList.add('hidden')
        btnClose.classList.remove('hidden')
    })
    btnClose.addEventListener('click', function(){
        i.classList.add('team--hidden')
        btnOpen.classList.remove('hidden')
        btnClose.classList.add('hidden')
    })
}
// 
let offset = 0,
    dotIndex = 0;
let slaiderLine = document.querySelector('.testimonials--slaider'),
    dots = document.querySelectorAll('.dot'),
    nextButton = document.querySelector('.next'),
    // 
    slaiderCase = document.querySelector('.slaider--case');
    // 
    prevButton = document.querySelector('.prev');
let nextBtn = function(){
    if(offset < (dots.length - 1) * slaiderCase.offsetWidth + 50){
        offset += slaiderCase.offsetWidth + 50
        dotIndex++
    }else {
        offset = 0
        dotIndex = 0
    }
    slaiderLine.style.left = -offset + 'px'
    thisSlaid(dotIndex)
}
let prevBtn = function(){
    if(offset > 0){
        offset -= slaiderCase.offsetWidth + 50
        dotIndex--
    }else {
        offset = (dots.length - 1) * slaiderCase.offsetWidth + 50
        dotIndex = (dots.length - 1)
    }
    slaiderLine.style.left = -offset + 'px'
    thisSlaid(dotIndex)
}

function thisSlaid(index){
    for(let dot of dots){
        dot.classList.remove('active');
    }
    dots[index].classList.add('active');
};

nextButton.addEventListener('click', nextBtn);
prevButton.addEventListener('click', prevBtn);

dots.forEach(function(dot, index){
    dot.addEventListener('click', function(){
        offset =  (slaiderCase.offsetWidth + 50) * index;
        slaiderLine.style.left = -offset + 'px'
        dotIndex = index
        thisSlaid(dotIndex)
    })
});
// 
$('.swiper--slaid--logo').slick({
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 2,
    centerMode: false,
    variableWidth: true
});
$('.swiper--slaid--studies').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    centerMode: false,
    variableWidth: true
});
// 
let btnOpenMenu = document.querySelector('.btn--open'),
    btnCloseMenu = document.querySelector('.btn--close'),
    caseMedia = document.querySelector('.header--menu--media'),
    secBody = document.querySelector('body');

btnOpenMenu.addEventListener('click', function(){
    caseMedia.classList.remove('hidden');
    secBody.style.overflow = "hidden";
});
btnCloseMenu.addEventListener('click', function(){
    caseMedia.classList.add('hidden');
    secBody.style.overflow = "auto";
});
// 
// 
function validation(form){
    let result = true;
    const formCheck = document.querySelectorAll('.form--check');
    // удаление класса
    function removeError(formCheck){
        const parent = formCheck.parentNode;

        if(parent.classList.contains('error--input')){
            parent.querySelector('.error--label').remove()
            parent.classList.remove('error--input')
        }
    }
    // добавление класса 
    function parentError(formCheck, text){
        const parent = formCheck.parentNode,
            errorLabel = document.createElement('label');
            errorLabel.classList.add('error--label')
            errorLabel.textContent = text

        parent.classList.add('error--input')
        parent.append(errorLabel)
    }
// проверка 
    //  
    for (const input of formCheck){
        removeError(input)   
    // проверка на минимум символов
        if(input.dataset.minLenght){
            if(input.value.length < input.dataset.minLenght){
                removeError(input)
                parentError( input, `Минимальное кол-во символов: ${input.dataset.minLenght}`)
                result = false
            }
        }
    // проверка на максимум символов
        if(input.dataset.maxLenght){

            if(input.value.length > input.dataset.maxLenght){
                removeError(input)
                parentError( input, `Максимальное кол-во символов: ${input.dataset.maxLenght}`)
                result = false
            }
        }
    // 
        if(input.dataset.required == 'true'){
            if(input.value == ""){
                removeError(input)
                parentError( input, 'Поле не заполнено !')
                result = false
            }
        }
    }
    return result
};

document.getElementById('form').addEventListener('submit', function(event){
    event.preventDefault()

    // проверка на выполнение кода
    if (validation(this) === true){
        console.log('Форма проверена!')
    }
});