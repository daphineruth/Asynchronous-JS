'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
 const request = new XMLHttpRequest();

 request.open('GET', 'https://restcountries.com/v3.1/name/{kenya}');
 request.send();

request.addEventListener('load', function(){
    //returns JSON data
    //console.log(this.responseText);

    const data = JSON.parse(this.responseText);
    console.log(data);
})

