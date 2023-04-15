'use strict';

const workoutCreateSide = document.querySelector('.workout-create');

// navigator.geolocation.getCurrentPosition(
//   (position) => {
//     console.log(position);
//   },
//   () => {
//     console.log('Ну ты и пипец');
//   }
// );

let map;

// По готовности размещаем карту на страницу и зсоздаем прослушку на клик по ней
ymaps.ready(() => {
  map = new ymaps.Map('map', {
    center: [55.16009176823716, 61.40247375140378],
    zoom: 15,
  });

  map.events.add('click', (e) => {
    const coords = e.get('coords');

    // Создаем новый гео-объект
    const newGeoObj = new ymaps.GeoObject(
      {
        geometry: {
          type: 'Point',
          coordinates: coords,
        },
        properties: {
          iconContent: 'Тестовая метка',
        },
      },
      {
        preset: 'islands#blackStretchyIcon',
        draggable: true,
      }
    );
    // Помещаем ГО на карту
    map.geoObjects.add(newGeoObj);

    workoutCreateSide.classList.remove('hidden');
  });
});
