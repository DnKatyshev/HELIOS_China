document.addEventListener("DOMContentLoaded",function(){function o(){let s=!0;return this.querySelectorAll(".form__input").forEach(e=>{var t,r,o;r=(t=e).closest(".form__group"),t.classList.contains("error")&&(r.querySelector(".error-label").remove(),t.classList.remove("error")),""==e.value&&(r="Поле не заполнено!",e=(t=e).closest(".form__group"),o=document.createElement("p"),t.classList.add("error"),o.classList.add("error-label"),o.textContent=r,e.append(o),s=!1)}),s}async function t(e){e.preventDefault();e=new FormData(this);if(o.call(this)){e=await fetch("mailer.php",{method:"POST",body:e});if(e.ok)return this.reset(),this.querySelector(".form-done").classList.add("active-form"),e.text();alert("Ошибка на сервере!"),this.reset()}}async function r(e){e.preventDefault();if(o.call(this)){var{name:e,phone:t,email:r}=Object.fromEntries(new FormData(this).entries()),e=await fetch("https://api.telegram.org/bot6718062122:AAFPOXX9okpR0o1BwWTcQ2PzoDrs3bnOKYw/sendMessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:"-1002019685872",text:`Заявка от клиента по имени: ${e}.
 Телефон: ${t}.
 Почта: `+r,parse_mod:"html"})});if(e.ok)return this.reset(),this.querySelector(".form-done").classList.add("active-form"),e.text();alert("Ошибка на сервере!"),this.reset()}}document.querySelectorAll("form").forEach(e=>{e.addEventListener("submit",t),e.addEventListener("submit",r)})});let formPhone=document.querySelectorAll("#input-2");formPhone.forEach(e=>{new Inputmask("+7 (999) 999-99-99",{showMaskOnHover:!1}).mask(e)});