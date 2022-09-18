'use strict';

const btnWhere = document.querySelector('.btn-where');

// const renderCountry = function (data, className = '') {
//   const html = `
//     <article class="country ${className}">
//       <img class="country__img" src="${data.flag}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${+(
//           data.population / 1000000
//         ).toFixed(1)}</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//       </div>
//     </article>
//   `;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
// };

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
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

//       return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
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
/*
const whereAmI = function () {
  const lat = +document.querySelector('#latitude').value;
  const lng = +document.querySelector('#longitude').value;
  // const lat = 52.508;
  // const lng = 13.381;

  // fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  fetch(`
  https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
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

btnWhere.addEventListener('click', whereAmI);
// Test data:
// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474
*/

// *****************************
// Challenge 2
let curImage;
const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error("Can't load image. Check your path to image."));
    });
  });
};

// createImage('img/img-1.jpg')
//   .then(img => {
//     curImage = img;
//   })
//   .then(() => {
//     curImage.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     curImage = img;
//     return wait(2);
//   })
//   .then(() => (curImage.style.display = 'none'))
//   .catch(err => console.error(err.message));

// *********************************
// Challenge 3
// Part 1
const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');

    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');

    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err.message);
  }
};

// loadNPause();

// Part 2
const loadAll = async function (imgArr) {
  try {
    let imgs = imgArr.map(async img => await createImage(img));
    imgs = await Promise.all(imgs);

    imgs.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err.message);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
