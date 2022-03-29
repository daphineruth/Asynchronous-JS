'use strict';


const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


const renderCountry = function (data, className = '') {
  const html = `<article class="country">
  <img class="country__img" src="${data.flags}" />
  <div class="country__data">
    <h3 class="country__name">"${data.name}"</h3>
    <h4 class="country__region">"${data.region}"</h4>
    <p class="country__row"><span>👫</span>"${(+data.population/1000000).toFixed(1)}"People</p>
    <p class="country__row"><span>🗣️</span>"${data.languages.eng}"</p>
    <p class="country__row"><span>💰</span>${data.currencies.kes}</p>
  </div>
  
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

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
/*const getCountryAndNeighbour = function (country) {
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
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
 //consuming promises
 /*const getCountryData = function (country) {
   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
      .then(function (response) {
        console.log(response);
         return response.json();
       })
       .then(function (data) {
         console.log(data);
        renderCountry(data[0]);
       });
      };
      */

      
      const getCountryData = function (country) {
        //country 1
           fetch(`https://restcountries.eu/rest/v2/name/${country}`)
             .then(response => {
               console.log(response);
             
            
            if (!response.ok)
                throw new Error(`Country not found (${response.status})`);
            
                   return response.json();
              })
                .then(data => {
                renderCountry(data[0]);
                 // const neighbour = data[0].borders[0];
                   const neighbour = 'dfsdfdef';
            
                 if (!neighbour) return;

                 //country 2

                 return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);

                });
                then(response => {
                         if (!response.ok)
                           throw new Error(`Country not found (${response.status})`);
                  
                         return response.json();
              })
              .then(data => renderCountry(data, 'neighbour'))
       .catch(err => {
       console.error(`${err} `);
       renderError(`Something went wrong ${err.message}. Try again!`);
     })
     .finally(() => {
       countriesContainer.style.opacity = 1;
     });

            } 
            
            btn.addEventListener('click', function () {
              getCountryData('kenya');
            });




            //Building a simple promise

            const lotteryPromise = new Promise( function(resolve,reject){

              setTimeout(function() {
              if (Math.random() >= 0.5){
                resolve('You won')
              }
              else{
                reject('You lost');
              }
            },3000)
              
            });

            //consuming the promise

            lotteryPromise.then(res => console.log(res)).catch (err => console.log(err));

            //promisifying setTimeout
            const wait =function(seconds) {
              return new Promise(function(resolve){
                setTimeout(resolve, seconds + 1000);
              })
            };
            wait(2).then(() => {
              console.log("waited for 2seconds");
              return wait(1);
            })
            .then(() =>console.log('waited for one second') );
        

            //promisifying geolocation API
/* 
            
            const getPosition =function() {
              return new Promise(function (resolve, reject) {
                navigator.geolocation.getCurrentPosition(
                  position => resolve(position),
                  err => reject(err),
          
            
                );
            });
          }
          
*/
          const getPosition = function () {
            return new Promise(function (resolve, reject) {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
          };

          const whereAmI = async function () {
            try {
              
              const pos = await getPosition();
              const { latitude: lat, longitude: lng } = pos.coords;
          
            
              const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
              if (!resGeo.ok) throw new Error('Problem getting location data');
              const dataGeo = await resGeo.json();
          
              // Country data
              const res = await fetch(
                `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
              );
              if (!resGeo.ok) throw new Error('Problem getting country');
              const data = await res.json();
              renderCountry(data[0]);
          
              return `You are in ${dataGeo.city}, ${dataGeo.country}`;
            } catch (err) {
              console.error(`${err} `);
              renderError(`${err.message}`);
          
              // Reject promise returned from async function
              throw err;
            }
          };
          //Running promises in parallel

          const get3Countries = async function (c1, c2, c3) {
            try {
               const [data1] = await getJSON(
                `https://restcountries.com/v3.1/name/${c1}`
               );
              const [data2] = await getJSON(
                `https://restcountries.com/v3.1/name/${c2}`
               );
               
               const [data3] = await getJSON(
                `https://restcountries.com/v3.1/name/${c3}`
                );

                const data = await Promise.all([
                  getJSON(`https://restcountries.com/v3.1name/${c1}`),
                  getJSON(`https://restcountries.com/v3.1name/${c2}`),
                  getJSON(`https://restcountries.com/v3.1name/${c3}`),
                ]);
          
            }
            catch (err) {
              console.error(err);}
            }