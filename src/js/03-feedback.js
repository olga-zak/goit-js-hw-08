'use strict';

import throttle from 'lodash.throttle'

const form = document.querySelector('form')
const inputEmail = document.querySelector('input')
const inputMessage = document.querySelector('textarea')

const formData = {}
//При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, 
//заполняй ими поля формы.В противном случае поля должны быть пустыми.
checkLocalStorage()
function checkLocalStorage() {
    const localStorageData = localStorage.getItem('feedback-form-state') //string
    const parsedlocalStorageData = JSON.parse(localStorageData) //object
    if (parsedlocalStorageData) {
        inputEmail.value = parsedlocalStorageData[inputEmail.name] || ''
        //console.log(parsedlocalStorageData[inputEmail.name]) //=console.log(parsedlocalStorageData.email)
        inputMessage.value = parsedlocalStorageData[inputMessage.name] || ''
    } 
}

// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище 
// объект с полями email и message, в которых сохраняй текущие значения полей формы.
// Пусть ключом для хранилища будет строка "feedback-form-state".
form.addEventListener('input', throttle(onFormInput, 500) );
function onFormInput(event) {
    //console.log(event.target.name) //'email' OR 'message'
    //console.log(event.target.value) //data typed in inputs
    formData[event.target.name] = event.target.value //adding data to object formData
    //console.log(JSON.stringify(formData)) //object to string
    localStorage.setItem('feedback-form-state', JSON.stringify(formData)) //adding data to localStorage
}

// При сабмите формы очищай хранилище и поля формы, а также выводи объект с 
// полями email, message и текущими их значениями в консоль.
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault()
    
    const submitedData = JSON.parse(localStorage.getItem('feedback-form-state'))
    if (!submitedData) {
        return alert("Please, fill in the fields!")
    }
    console.log(submitedData)
    //localStorage.clear(); //опасно так чистить хранилище, так как может затронуть записи сделанные другими разработчиками проекта
    localStorage.removeItem('feedback-form-state');
    form.reset()
}

























