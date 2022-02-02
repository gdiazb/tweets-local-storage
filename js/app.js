// Variables 

const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
const tweet = document.querySelector('#tweet')
const btn = document.querySelector('.button')
let arrayTweets = []

//Add event listenrs
// document.addEventListener('DOMContentLoaded')

eventListeners()

function eventListeners() {
     formulario.addEventListener('submit', agregarTweet)

     document.addEventListener('DOMContentLoaded', () => {
          arrayTweets = JSON.parse(localStorage.getItem('tweets')) || []
          crearHTML()
     });

     listaTweets.addEventListener('click', eliminarTweet)
}


// funciones
function agregarTweet(e) {
     e.preventDefault()

     if(!tweet.value) {
          mostrarError('El tweet no puede quedar vacio..')
          return
     }
     llenarListaTweets(tweet.value)

     crearHTML()

     formulario.reset()
}

function mostrarError(error) {
     const formMessage = document.createElement('p')
     formMessage.classList.add('form__message')
     formMessage.textContent = error
     formulario.insertBefore(formMessage, btn)

     setTimeout(() => {
          formMessage.remove();
     }, 3000);
}

function llenarListaTweets(tweet) {
     //crear un objeto tweet
     const tweetObject = {
          id: Date.now(),
          text: tweet,
     }

     arrayTweets = [...arrayTweets, tweetObject]

}

function crearHTML() {

     limpiarHTML()

     if(arrayTweets.length > 0) {

          arrayTweets.forEach(tweet => {

               // crear boton de eliminar
               const botonBorrar = document.createElement('a');
               botonBorrar.classList = 'borrar-tweet';
               botonBorrar.innerHTML = '🗑<span>Eliminar</span>';

               //crear items dentro de la lista de items
               const itemList = document.createElement('li')
               itemList.classList.add('lista-tweets__item')
               itemList.textContent = tweet.text
               
               itemList.appendChild(botonBorrar);
               // añade un atributo único...
               itemList.dataset.tweetId = tweet.id;
               
               listaTweets.appendChild(itemList)

          })


     }
     
     sincronizarStorage()
     
}

// Elimina los cursos del carrito en el DOM
function limpiarHTML() {
     while(listaTweets.firstChild) {
          listaTweets.removeChild(listaTweets.firstChild);
     }
}


function sincronizarStorage() {
     localStorage.setItem('tweets', JSON.stringify(arrayTweets))
}

function eliminarTweet(e) {
     e.preventDefault();

     // console.log(e.target.parentElement.dataset.tweetId);
     const id = e.target.parentElement.dataset.tweetId;
     arrayTweets = arrayTweets.filter( tweet => tweet.id != id  );
     crearHTML();
}