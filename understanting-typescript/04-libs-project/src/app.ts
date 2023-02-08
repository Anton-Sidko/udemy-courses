import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

// BUG Not my key
const GOOGLE_API_KEY = 'AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs';

// declare var google: any;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  error_message?: string;
  status: 'OK' | 'REQUEST_DENIED' | 'ZERO_RESULTS';
};

const searchAddressHandler = function (event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // send to Google's API
  //  alternative - LEAFLET

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then(response => {
      console.log(response);
      // BUG exit from program because I don't have API key
      if (response.data.status === 'REQUEST_DENIED') {
        console.warn(`💥 ${response.data.error_message}💥`);
        return;
      }

      if (response.data.status !== 'OK') {
        throw new Error('Could not fetch location!');
      }

      const coordinates = response.data.results[0].geometry.location;

      const map = new google.maps.Map(document.getElementById('map')!, {
        center: coordinates,
        zoom: 16,
      });

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch(err => console.error(err));
};

form.addEventListener('submit', searchAddressHandler);

// import axios from "axios";

// const form = document.querySelector("form")!;
// const addressInput = document.getElementById("address")! as HTMLInputElement;

// const GOOGLE_API_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs";

// // declare var google: any;

// type GoogleGeocodingResponse = {
//   results: { geometry: { location: { lat: number; lng: number } } }[];
//   status: "OK" | "ZERO_RESULTS";
// };

// function searchAddressHandler(event: Event) {
//   event.preventDefault();
//   const enteredAddress = addressInput.value;

//   axios
//     .get<GoogleGeocodingResponse>(
//       `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
//         enteredAddress
//       )}&key=${GOOGLE_API_KEY}`
//     )
//     .then(response => {
//       if (response.data.status !== "OK") {
//         throw new Error("Could not fetch location!");
//       }
//       const coordinates = response.data.results[0].geometry.location;
//       const map = new google.maps.Map(document.getElementById("map"), {
//         center: coordinates,
//         zoom: 16
//       });

//       new google.maps.Marker({ position: coordinates, map: map });
//     })
//     .catch(err => {
//       alert(err.message);
//       console.log(err);
//     });
// }

// form.addEventListener("submit", searchAddressHandler);
