// GSAP-ANIMATION
let tl = gsap.timeline()
tl
    .from('.logo',{autoAlpha: 0, xPercent: -100,  duration: 0.6})
    .from('.header__menu-li', {
      autoAlpha: 0, yPercent: -100,  duration: 0.6, stagger: 0.2}, '+=0.3')
    .from('.header__menu-line',{width: 0,  duration: 1.5}, '+-0.2')


// QUESTIONS-TABS
let questionTabs = document.querySelectorAll('.question__title') 
questionTabs.forEach((tab) => tab.addEventListener('click', function(){

    let questionContent = tab.nextElementSibling
    // делаем флаг, который содержит - имеет ли текст класс active-tab(который его раскрывает)
    let flg = questionContent.classList.contains('active-tab');

  document.querySelectorAll('.active-tab').forEach((e) => {
    e.classList.remove('active-tab');
  });
  document.querySelectorAll('.active-tab-arrow').forEach((e) => {
    e.classList.remove('active-tab-arrow');
  });
  // Если выбранный блок текста не имел active-tab, добавляем класс
    if(!flg) {
        questionContent.classList.toggle('active-tab')
        tab.classList.toggle('active-tab-arrow')
    }
}))


// ------ FIRST_LAYOUT_SLIDER ------
const layoutSwiper = new Swiper('#layout-slider', {
    navigation: {
        enabled: false,        
    },

    pagination: {
        enabled: false,
    },
    slidesPerView: 2,
    slidesRerGroup: 1,
    spaceBetween: 12,
    loop: true,
    centeredSlides: true,

    breakpoints: {
      700: {
          slidesPerView: 3,
          spaceBetween: 32,
          centeredSlides: false,
        },
      1100: {
        slidesPerView: 4,
        centeredSlides: false,
      },
      1400: {
        slidesPerView: 6,
        centeredSlides: false,
      }
  },
  speed: 1200,

  autoplay: {
    delay: 2500,
  },
})

// ------ PARTNERS-SLIDERS ------
const partnersSwiperFirst = new Swiper('#partners__slider-first', {

    navigation: {
        enabled: false,        
    },

    pagination: {
        enabled: false,
    },

    slidesPerView: 1,
    spaceBetween: 15,
    centeredSlides: true,
    loop: true,

    breakpoints: {
      700: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
      1100: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 4.2,
      }
  },

  speed: 1100,

  autoplay: {
    delay: 2300,
  },
})
const partnerSwiperSecond = new Swiper('#partners__slider-second', {

    navigation: {
        enabled: false,        
    },

    pagination: {
        enabled: false,
    },

    slidesPerView: 1,
    spaceBetween: 15,
    centeredSlides: true,
    loop: true,

    breakpoints: {
      700: {
          slidesPerView: 3.3,
          spaceBetween: 20,
        },
      1100: {
        slidesPerView: 4.5,
      },
      1400: {
        slidesPerView: 5.8,
      }
  },

  speed: 1100,

  autoplay: {
    delay: 2300,
    reverseDirection: true,
  },
})




// Form-Validation
function validation(form){

    function removeError(input){
        let inputParent = input.closest('.form__group')
        
        if (input.classList.contains('error')){
            inputParent.querySelector('.error-label').remove()
            input.classList.remove('error')
        }
    }

    function createError(input, text){
        let inputParent = input.closest('.form__group')
        let errorParagraph = document.createElement('p')

        input.classList.add('error')
        errorParagraph.classList.add('error-label')
        errorParagraph.textContent = text
        
        inputParent.append(errorParagraph)
    }


    let result = true

    let formInputs = document.querySelectorAll('.form__input')
    formInputs.forEach(input => {

        removeError(input)

        if (input.value == ''){
            createError(input, 'Поле не заполнено!')
            result = false
        }
    })

    return result
}

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault()

    if (validation(this) == true) {
        alert('Форма проверена успешно!')
    }
})
// Input-Mask
let formPhone = document.querySelector('#input-2')
let im = new Inputmask('+7 (999) 999-99-99', {showMaskOnHover: false})
im.mask(formPhone)


        // Burger-Nenu
        let burgerMenu = document.querySelector('.menu-burger')
        let arrowMenu = document.querySelector('.header__menu-arrow')
        let menuOverlay = document.querySelector('.header__menu-nav-mob')
        burgerMenu.addEventListener('click', function() {
            menuOverlay.classList.add('active-menu')
            document.body.classList.add('fixed-page')
        })
        arrowMenu.addEventListener('click', function(event) {
            event.preventDefault()
            menuOverlay.classList.remove('active-menu')
            document.body.classList.remove('fixed-page')
        })
        
        // Раскрытие trends-карточек
        let hiddenArrow = document.querySelector('.trends-arrows')
        let trendsBlock = document.querySelector('.trends__content')
        let hiddenBtn = document.querySelector('.trends__title-btn-mobile')
        
        hiddenArrow.addEventListener('click', (e) => {
            trendsBlock.classList.toggle('active-trends')
            e.currentTarget.classList.toggle('active-arrow')
        })
        hiddenBtn.addEventListener('click', (e) => {
            trendsBlock.classList.toggle('active-trends')
        })