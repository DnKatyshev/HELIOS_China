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

.to('#arrow1', {
    autoAlpha: 1, left: 0, duration: 0.45
})

.from('.service-info__item:nth-child(3)', {
    xPercent: -50, opacity: 0, duration: 0.7
})
.to('#arrow2', {
    autoAlpha: 1, left: 0, duration: 0.45
})

.from('.service-info__item:nth-child(5)', {
    xPercent: -50, opacity: 0, duration: 0.7
}) 