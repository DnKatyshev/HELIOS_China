 // Общие данные
    let infoObject;
    const currentPath = document.location.pathname;
    let currentLang = localStorage.getItem('language') || 'ru';
    const langButtons = document.querySelectorAll('[data-switch]');
    
    // Импорт нужного файла с переводом, в зависимости от открытой страницы
    async function checkPageAdress(){
    
        switch(currentPath){
            case '/index.html':
                 infoObject = await import('/js/languages/index_translate.js');
                break
            case '/services.html':
                 infoObject = await import('/js/languages/services_translate.js');
                break
            case '/import.html':
                 infoObject = await import('/js/languages/import_translate.js');
                break
            case '/export.html':
                 infoObject = await import('/js/languages/export_translate.js');
                break
            case '/providers.html':
                 infoObject = await import('/js/languages/providers_translate.js');
                break
            case '/partners.html':
                 infoObject = await import('/js/languages/partners_translate.js');
                break
            case '/product_page.html':
                 infoObject = await import('/js/languages/product_page_translate.js');
                break
            case '/trends_page.html':
                 infoObject = await import('/js/languages/product_page_translate.js');
                break
            default: 
                 infoObject = await import('/js/languages/index_translate.js');
        }
    
    }
    checkPageAdress()
    
    
    langButtons.forEach((btn) => {btn.addEventListener('click', (event) => {
    
        currentLang = event.currentTarget.dataset.switch;
        localStorage.setItem('language', event.currentTarget.dataset.switch)
    
        langButtons.forEach(el => {
            el.classList.remove('language-active')
        })
        event.currentTarget.classList.add('language-active')
    
    
        changeLang()
    })
    })
    
    
    function checkBtnActive(){
        switch (currentLang) {
            case 'ru':
                 document.querySelector('[data-switch="ru"]').classList.add('language-active')
                break
            case 'cn':
                document.querySelector('[data-switch="cn"]').classList.add('language-active')
                break
            default: 
                document.querySelector('[data-switch="ru"]').classList.add('language-active')
        }
    }
    checkBtnActive()
    
    
    function changeLang(){
        for(let element in infoObject.translationList){
            let siteElements = document.querySelectorAll(`[data-lang="${element}"]`)
            siteElements.forEach(text => {
                text.textContent = infoObject.translationList[element][currentLang]
            })
        }
    }
    changeLang()
