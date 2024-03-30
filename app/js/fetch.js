document.addEventListener('DOMContentLoaded', function () {


    function validation() { // возвращает true/false

        function removeError(input) {
            let inputParent = input.closest('.form__group')

            if (input.classList.contains('error')) {
                inputParent.querySelector('.error-label').remove()
                input.classList.remove('error')
            }
        }

        function createError(input, text) {
            let inputParent = input.closest('.form__group')
            let errorParagraph = document.createElement('p')

            input.classList.add('error')
            errorParagraph.classList.add('error-label')
            errorParagraph.textContent = text

            inputParent.append(errorParagraph)
        }


        let result = true

        let formInputs = this.querySelectorAll('.form__input')
        formInputs.forEach(input => {

            removeError(input)

            if (input.value == '') {
                createError(input, 'Поле не заполнено!')
                result = false
            }
        })

        return result
    }

    
    // функция для отправки на ПОЧТУ
    async function postSend(e) {

        e.preventDefault()

        let formData = new FormData(this)

        if(validation.call(this)){

            let response = await fetch('mailer.php', {
                method: 'POST',
                body: formData
            })
    
            if (response.ok) {
                this.reset()
                let formOverlay = this.querySelector('.form-done')
                formOverlay.classList.add('active-form')
                return await response.text()
            } else {
                alert('Ошибка на сервере!')
                this.reset()
            }

        }

    } 
    
   // в ТГ-БОТА
    async function postTG(e) {  
        
        e.preventDefault()

        let telegram_bot_token = '6718062122:AAFPOXX9okpR0o1BwWTcQ2PzoDrs3bnOKYw';
        let telegram_chanal_name = '-1002019685872';
        let API = `https://api.telegram.org/bot${telegram_bot_token}/sendMessage`


    if (validation.call(this)){
        
        let {name, phone, email} = Object.fromEntries(new FormData(this).entries())
        let text = `Заявка от клиента по имени: ${name}.\n Телефон: ${phone}.\n Почта: ${email}`


        let response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: telegram_chanal_name,
                text: text,
                parse_mod: 'html'
            })
        })
 
        if (response.ok){
            this.reset()
            let formOverlay = this.querySelector('.form-done')
            formOverlay.classList.add('active-form')
            return await response.text()
        }
        else{
            alert('Ошибка на сервере!')
            this.reset()
        }
    }
}


    let allForms = document.querySelectorAll('form')
    allForms.forEach((form) => {
        form.addEventListener('submit', postSend);
        form.addEventListener('submit', postTG);


        // const body = document.querySelector('body')
        // form.querySelector('input[type="hidden"]').value = body.id

    })

})


 // Input-Mask
 let formPhone = document.querySelectorAll('#input-2')
 formPhone.forEach((item) => {
   let im = new Inputmask('+7 (999) 999-99-99', {
       showMaskOnHover: false
   })
   im.mask(item)
 })

