// ------ PARTNERS-SLIDERS PARTNERS.HTML------
const partnersPageSliderFirst = new Swiper('#partners-line1', {

    navigation: {
        enabled: false,        
    },
  
    pagination: {
        enabled: false,
    },
  
    slidesPerView: 1,
    spaceBetween: 10,
  
    breakpoints: {
      700: {
          slidesPerView: 2.5,
        },
      1100: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 4,
        enabled: false,
      }
  },
  })
  
  const partnersPageSliderSecon = new Swiper('#partners-line2', {
  
    navigation: {
        enabled: false,        
    },
  
    pagination: {
        enabled: false,
    },
  
    slidesPerView: 2,
    spaceBetween: 15,
  
    breakpoints: {
      700: {
          slidesPerView: 3.5,
        },
      1100: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 5,
        enabled: false,
      }
  },
  
  })