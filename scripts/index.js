'use strict';

navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position);
  },
  () => {
    console.log('Ну ты и пипец');
  }
);

ymaps.ready(() => {
  let map = new ymaps.Map('map', {
    center: [55.16009176823716, 61.40247375140378],
    zoom: 15,
  });

  console.log('YMaps Ready!');
});
