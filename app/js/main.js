// GSAP-ANIMATION
let tl = gsap.timeline()
tl.from('header .logo',{autoAlpha: 0, xPercent: -100,  duration: 0.6})

let mq = gsap.matchMedia();
mq.add("(min-width: 940px)", () => {
  tl.from('.header__menu-li', {
    autoAlpha: 0, yPercent: -100,  duration: 0.5, stagger: 0.2}, '+=0.2')
});

tl
  .to('.header__menu-line', {duration: .5, width: "100%"}, '+=0.2')
  .from('.service__text:nth-child(1)', {autoAlpha: .4, yPercent: -30,  duration: 0.6}, '+=.2')
  .from('.service__title img', {autoAlpha: 0, width: 0,  duration: 0.6}, '+=.3')
  .from('.service__text:nth-child(3)', {autoAlpha: .4, yPercent: -30,  duration: 0.6}, '+=.2')

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
    pauseOnMouseEnter: true,
  },
})

// ------ PARTNERS-SLIDERS INDEX.HTML------
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
        let mobLinks = document.querySelectorAll('[data-mob-link]')
        mobLinks.forEach((mobLink) => {
          mobLink.addEventListener('click', (e) => {
            menuOverlay.classList.remove('active-menu')
            document.body.classList.remove('fixed-page')
          })
        })
        

// Попап
let popupButtons = document.querySelectorAll('.popup-btn')
let popupClose = document.querySelectorAll('.popup-overlay__cross')
let popupOverlay = document.querySelector('.popup-overlay')
popupButtons.forEach((button) => {
    button.addEventListener('click', () => {
        popupOverlay.classList.add('active')
        document.body.classList.add('fixed-page')
    })
})
popupClose.forEach((clsButton) => {
    clsButton.addEventListener('click', () => {
        popupOverlay.classList.remove('active')
        document.body.classList.remove('fixed-page')
    })
})
document.addEventListener('click', (e) => {
    if (e.target == popupOverlay) {
        popupOverlay.classList.remove('active')
        document.body.classList.remove('fixed-page')
    } 
})

        // Раскрытие trends-карточек 
        let hiddenArrow = document.querySelector('.trends-arrows')
        let trendsBlock = document.querySelector('.trends__content')
        let hiddenBtn = document.querySelector('.trends__title-btn-mobile')
        
        hiddenArrow.addEventListener('click', (e) => {
            trendsBlock.classList.toggle('active-trends')
            e.currentTarget.classList.toggle('active-arrow')
            document.querySelector('.trends__body--shadow').classList.toggle('shadow-active')
        })
        hiddenBtn.addEventListener('click', () => {
            trendsBlock.classList.toggle('active-trends')
            document.querySelector('.trends__body--shadow').classList.toggle('shadow-active')
        })
 

// SOCIALS-WIDGET
let widgetTrigger = document.querySelector('.widget__trigger')
let widgetIcons = document.querySelector('.widget__socials')

widgetTrigger.addEventListener('click', (e) => {
  widgetIcons.classList.toggle('widget__socials--active')
})
          
 