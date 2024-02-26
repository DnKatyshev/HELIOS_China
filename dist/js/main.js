// GSAP-ANIMATION
let tl = gsap.timeline()

let g1 = gsap.matchMedia();
g1.add("(max-width: 940px)", () => {
  tl
  .to('.header__menu-line', {duration: .6, width: "100%"})
  .from('.service__text:nth-child(1)', {autoAlpha: 0, yPercent: -10,  duration: 0.6}, '-=.6')
  .from('.service__title img', {autoAlpha: 0, width: 0,  duration: 0.5}, '+=.35')
  .from('.service__text:nth-child(3)', {autoAlpha: 0, yPercent: -10,  duration: 0.5}, '-=.35')
});


let g2 = gsap.matchMedia(); 
g2.add("(min-width: 940px)", () => {
  tl
  // .from('header .logo',{autoAlpha: 0, xPercent: -100,  duration: 0.4})
  .to('.header__menu-line', {duration: 2.5, width: "100%"})
  .from('.header__menu-li', {autoAlpha: 0, yPercent: -100,  duration: 0.3, stagger: 0.2}, '-=2.3')
  .from('.service__text:nth-child(1)', {autoAlpha: 0, yPercent: -10,  duration: 0.6}, '-=.65')
  .from('.service__title img', {autoAlpha: 0, width: 0,  duration: 0.5}, '+=.35')
  .from('.service__text:nth-child(3)', {autoAlpha: 0, yPercent: -10,  duration: 0.5}, '+=.35')
})

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
    spaceBetween: 25,
    loop: true,
    centeredSlides: true,

    breakpoints: {
      700: {
          slidesPerView: 3,
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
    delay: 2000,
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

        

// ПопапЫ
let popupButtons = document.querySelectorAll('.popup-btn')
let popupClose = document.querySelectorAll('.popup-overlay__cross')
let popupOverlay = document.querySelector('.popup-overlay')
popupButtons.forEach(function(button){
    button.addEventListener('click', function() {
        popupOverlay.classList.add('active')
        document.body.classList.add('fixed-page')

      let popupTitle = popupOverlay.querySelector('.popup-main__text');
      let popupCompany = popupOverlay.querySelector('.popup-main__company p');
      let popupMade = popupOverlay.querySelector('.popup-main__made p');
      let popupLink = popupOverlay.querySelector('.popup-main__btn');

      [popupTitle.textContent, popupCompany.textContent, popupMade.textContent] = [this.dataset.title, this.dataset.descr, this.dataset.work]

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



let popupButtonsForm = document.querySelectorAll('.popup-btn--form')
let popupCloseForm = document.querySelectorAll('.popup-overlay__cross-form')
let popupOverlayForm = document.querySelector('.popup-overlay-form')
popupButtonsForm.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault()
    popupOverlayForm.classList.add('active')
    document.body.classList.add('fixed-page')
  })
})
popupCloseForm.forEach((clsButton) => {
  clsButton.addEventListener('click', () => {
      popupOverlayForm.classList.remove('active')
      document.body.classList.remove('fixed-page')
  })
})
document.addEventListener('click', (e) => {
  if (e.target == popupOverlayForm) { 
      popupOverlayForm.classList.remove('active') 
      document.body.classList.remove('fixed-page')
  } 
})
//-------------------
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
            popupOverlay.classList.remove('active')
            document.body.classList.remove('fixed-page')
          })
        })

        
// SOCIALS-WIDGET
let widgetTrigger = document.querySelector('.widget__trigger')
let widgetIcons = document.querySelector('.widget__socials')

widgetTrigger.addEventListener('click', (e) => {
  widgetIcons.classList.toggle('widget__socials--active')
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
 

          



// КАРТА
// Yandex-Maps
let centerStart = [48.096732832947666,89.61703676275182]
let center1 = [55.699910374770525,37.85851989422596];
let center2 = [43.118602574514064,131.89076649999996];
let center3 = [23.1095977,113.0897473];
let center4 = [29.4105125,120.1294093];

function init() {

	let map1 = new ymaps.Map('map', {
		center: centerStart,
		zoom: 3,
    controls: []
	});

    const cords = [center1, center2, center3, center4]
    const cities = ['Москва', 'Владивосток',  'Фошань', 'Иу']
    const adresses = ['Лермонтовский пр-т, БЦ Лермонтовский, оф .402', 'ул. Уборевича д. 17, оф. 1',  'Warehouse 32, Nanhai District, Foshan City', 'Warehouse 788, Building 46, Changchun District 3, Yiwu']


    cords.forEach((item, index) => {

      let placeMark = new ymaps.Placemark(item, {
        iconCaption: cities[index],

        balloonContentBody: 
    `<div class="baloon">
        <ul class="baloon__list">
            <li><p class="baloon__header">Точный адрес:</p></li>
            <li><p class="baloon__body">${adresses[index]}</p></li>
            <li><a href="https://yandex.ru/maps/?rtext=~${cords[index]}" class="baloon__btn">Маршрут</a></li>
        </ul>
    </div>`}, 
    
    {
        //iconLayout: 'default#image',
        iconImageHref: 'images/components/map/point.png',
        iconImageSize: [30, 45],
        iconImageOffset: [],
        preset: 'islands#darkGreenDotIcon',
      })
      map1.geoObjects.add(placeMark)
    })

// МАРШРУТ ОТ ГЕО-ПОЗИЦИИ: как сделать, чтобы при клике на какую-либо Метку на карте - её адрес подставлялся в поле "to" ?
// let control = map1.controls.get('routePanelControl');
// let location = ymaps.geolocation.get();
// location.then(function (res) {
//     // Получение адреса местоположения пользователя.
//     let userTextLocation = res.geoObjects.get(0).properties.get('text');
//     control.routePanel.state.set({
//         from: userTextLocation,
//         to: ` `
//     });
// });

}

ymaps.ready(init);



//FancyBox
// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
Fancybox.bind("[data-fancybox='gallery']", {
  closeButton: false,
  hideScrollbar: false,
});
