'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const urlAPI = 'https://restcountries.com/v2/';

///////////////////////////////////////
//XML HTTP request

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${+(
          data.population / 1000000
        ).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getCountryAndNeighbor = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();

  request.open('GET', `${urlAPI}name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    // Render country 1
    renderCountry(data);

    // Get neighbor (country 2)
    let ind = 0;
    let neighbor = data.borders?.[ind];

    if (!neighbor) return;

    // I don't want see rus here
    while (neighbor === 'BLR' || neighbor === 'RUS' || neighbor === 'HUN') {
      ind++;
      neighbor = data.borders?.[ind];
      if (!neighbor) return;
    }

    // AJAX call 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `${urlAPI}alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbor('ukraine');
// getCountryAndNeighbor('usa');

// Fetch API INFO

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`${urlAPI}name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country '${country}' not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       // Get neighbor (country 2)
//       let ind = 0;
//       let neighbor = data[0].borders?.[ind];

//       if (!neighbor) return;

//       // I don't want see rus here
//       while (neighbor === 'BLR' || neighbor === 'RUS' || neighbor === 'HUN') {
//         ind++;
//         neighbor = data[0].borders?.[ind];
//         if (!neighbor) return;
//       }

//       return fetch(`${urlAPI}alpha/${neighbor}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country '${country}' not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥${err.message} 💥. Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  getJSON(`${urlAPI}name/${country}`, `Country '${country}' not found`)
    .then(data => {
      renderCountry(data[0]);

      // Get neighbor (country 2)
      let ind = 0;
      let neighbor = data[0].borders?.[ind];

      if (!neighbor) throw new Error('No neighbor found');

      // I don't want see rus here
      while (neighbor === 'BLR' || neighbor === 'RUS' || neighbor === 'HUN') {
        ind++;
        neighbor = data[0].borders?.[ind];
        if (!neighbor) throw new Error('No neighbor found');
      }

      return getJSON(`${urlAPI}alpha/${neighbor}`, `Country not found`);
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥${err.message} 💥. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', () => getCountryData('ukraine'));

// getCountryData('asfdas');

// INFO create Promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw 🔮');

//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You win 💰');
//     } else {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// INFO Promisifying setTimeout
/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited 1 second'));

Promise.resolve('I resolved immediately').then(res => console.log(res));
Promise.reject('I rejected immediately').catch(res => console.error(res));

// INFO Promisifying geolocation API

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

const whereAmIPosition = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`
    https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Geocode nor reversed ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.countryName}`);
      return fetch(`${urlAPI}name/${data.countryName}`);
    })
    .then(res => res.json())
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥${err.message} 💥. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', whereAmIPosition);
*/

// INFO Async/await
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res))

const whereAmI = async function () {
  try {
    // Geolocation
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    // Reverse geo code
    const resGeo = await fetch(`
    https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);

    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.countryName}`
    );
    const data = await res.json();

    renderCountry(data[0]);
    countriesContainer.style.opacity = 1;

    return `You are in ${dataGeo.countryName}`;
  } catch (err) {
    console.error(err.message);
    renderError(`Something went wrong 💥💥💥`);
    countriesContainer.style.opacity = 1;

    // Reject promise returned from async function
    throw err;
  }
};

// console.log('1');

// // whereAmI().then(city => console.log(city));
// (async function () {
//   const city = await whereAmI();
//   console.log(city);
// })();

// console.log('3');
