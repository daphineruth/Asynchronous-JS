'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/*
const getCountryData = function(country){
 const request = new XMLHttpRequest();

 request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
 request.send();

request.addEventListener('load', function(){
    //returns JSON data
    //console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
    <img class="country__img" src="${data.flags}" />
    <div class="country__data">
      <h3 class="country__name">"${data.name}"</h3>
      <h4 class="country__region">"${data.region}"</h4>
      <p class="country__row"><span>👫</span>"${(+data.population/1000000).toFixed(1)}"People</p>
      <p class="country__row"><span>🗣️</span>"${data.languages.eng}"</p>
      <p class="country__row"><span>💰</span>${data.currencies.kes}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);

  countriesContainer.style.opacity = 1;


});
};
getCountryData('kenya');

*/
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`) ;
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};
getCountryData('kenya');




