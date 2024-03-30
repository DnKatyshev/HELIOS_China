const langButtons=document.querySelectorAll("[data-btn]"),allLangs=["ru","en","de"],currentPathName=window.location.pathname;let currentLang=localStorage.getItem("language")||checkBrowserLang()||"ru",currentTexts={};const homeTexts={"home_page-title":{ru:"Домашняя страница",en:"Homepage",de:"Startseite"},"home_page-1":{ru:"Первый параграф",en:"First paragraph",de:"Erster Paragraph"},"home_page-2":{ru:"Второй параграф",en:"Second paragraph",de:"Zweiter Absatz"},"home_page-3":{ru:"Третий параграф",en:"Third paragraph",de:"Dritter Absatz"},"home_page-4":{ru:"Другая страница",en:"Another page",de:"Eine andere Seite"}},anotherTexts={"another_page-title":{ru:"Другая страница",en:"Another page",de:"Eine andere Seite"},"another_page-1":{ru:"Первый параграф",en:"First paragraph on another page",de:"Erster Paragraph auf einer anderen Seite"},"another_page-2":{ru:"Второй параграф",en:"Second paragraph on another page",de:"Zweiter Absatz auf einer anderen Seite"},"another_page-3":{ru:"Третий параграф",en:"Third paragraph on another page",de:"Dritter Absatz auf einer anderen Seite"},"another_page-4":{ru:"Домашняя страница",en:"Homepage",de:"Startseite"}};function checkPagePathName(){switch(currentPathName){case"/index.html":currentTexts=homeTexts;break;case"/another_page.html":currentTexts=anotherTexts;break;default:currentTexts=homeTexts}}function changeLang(){for(const a in currentTexts){var e=document.querySelector(`[data-lang=${a}]`);e&&(e.textContent=currentTexts[a][currentLang])}}function checkActiveLangButton(){switch(currentLang){case"ru":document.querySelector('[data-btn="ru"]').classList.add("header__btn_active");break;case"en":document.querySelector('[data-btn="en"]').classList.add("header__btn_active");break;case"de":document.querySelector('[data-btn="de"]').classList.add("header__btn_active");break;default:document.querySelector('[data-btn="ru"]').classList.add("header__btn_active")}}function checkBrowserLang(){const a=navigator.language.slice(0,2).toLowerCase();if(allLangs.some(e=>e===a))return a}checkPagePathName(),changeLang(),langButtons.forEach(a=>{a.addEventListener("click",e=>{e.target.classList.contains("header__btn_active")||(currentLang=e.target.dataset.btn,localStorage.setItem("language",e.target.dataset.btn),a.classList.add("header__btn_active"),changeLang())})}),checkActiveLangButton();