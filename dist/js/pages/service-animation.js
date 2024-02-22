let serviceAnim_2 = gsap.timeline({
    scrollTrigger: {
        trigger: '.service-info',
        start: 'top center',
    }
})

serviceAnim_2
.from('.service-info__item:nth-child(1)', {
    xPercent: -50, opacity: 0, duration: 0.7
})

.from('#arrow1', {
    width: 0, duration: 0.3
})

.from('.service-info__item:nth-child(3)', {
    xPercent: -50, opacity: 0, duration: 0.7
})
.from('#arrow2', {
    width: 0, duration: 0.3
})

.from('.service-info__item:nth-child(5)', {
    xPercent: -50, opacity: 0, duration: 0.7
}) 