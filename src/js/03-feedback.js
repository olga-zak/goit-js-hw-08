'use strict';

import throttle from 'lodash.throttle'

const form = document.querySelector('form')
const inputEmail = document.querySelector('input')
const inputMessage = document.querySelector('textarea')

if (localStorage.length > 0) {
    const storageData = localStorage.getItem('feedback-form-state'); //string
    const parsedData = JSON.parse(storageData); // settings object
    inputEmail.value = parsedData.email
    inputMessage.value = parsedData.message
}

form.addEventListener('input', throttle(onFormInput, 500) );
 
function onFormInput(event) {
   const formData = {
        email: inputEmail.value,
        message: inputMessage.value,
    }
    localStorage.setItem('feedback-form-state', JSON.stringify(formData))
}

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault()
    console.log(JSON.parse(localStorage.getItem('feedback-form-state')) )
    //localStorage.clear(); //опасно, так как может затронуть записи сделанные другими разработчиками проекта
    localStorage.removeItem('feedback-form-state');
    inputEmail.value = ''
    inputMessage.value = ''
}

























