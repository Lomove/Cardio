'use strict';

const workoutCreateHTML = document.querySelector('.workout-create');
const workoutTypeSelectHTML = document.querySelector('#type');
const inputDistance = document.querySelector('#distance');
const inputDuration = document.querySelector('#duration');
const inputPace = document.querySelector('#pace');
const labelInputPace = document.querySelector('.labelPace');
const allWorkoutInputs = [inputDistance, inputDuration, inputPace];

class App {
  static #map; // Яндекс карта
  static #labels = []; //Массив всех меток

  constructor() {
    // Получаем координата клиента, если вск ок запускаем загрузку карты #loadmap
    App.#getPosition();

    // Прослушка на селектор в форме
    workoutTypeSelectHTML.addEventListener('change', App.#toogleClimbField);

    // Сброс значений форм и корректировка гео-объекта
    workoutCreateHTML.addEventListener('submit', (e) => {
      e.preventDefault();

      allWorkoutInputs.forEach((input) => (input.value = ''));
      App.#labels[App.#labels.length - 1].properties.set('iconContent', workoutTypeSelectHTML.value);
    });
  }

  // Получение ткущих коорд юзера. После успешного получения координат вызывается загрузка карты
  static #getPosition() {
    navigator.geolocation.getCurrentPosition(App.#loadMap, () => {
      console.log('Ошика');
    });
  }

  // По готовности размещаем карту на странице и создаем прослушку на клик по ней
  static #loadMap(position) {
    ymaps.ready(() => {
      App.#map = new ymaps.Map('map', {
        center: [position.coords.latitude, position.coords.longitude],
        zoom: 15,
      });

      App.#map.events.add('click', (e) => {
        App.#showForm();

        App.newWorkout(e);
      });
    });
  }

  // Отображение формы
  static #showForm() {
    workoutCreateHTML.classList.remove('hidden');
    inputDistance.focus();
  }

  // Изменения формы по типу тренировки
  static #toogleClimbField() {
    if (workoutTypeSelectHTML.value === 'Пробежка') {
      labelInputPace.textContent = 'Темп';
      inputPace.placeholder = 'шаг/мин';
    } else {
      labelInputPace.textContent = 'Подъем';
      inputPace.placeholder = 'м';
    }
  }

  static newWorkout(e) {
    // Создаем новый гео-объект
    App.#labels.push(
      new ymaps.GeoObject(
        {
          geometry: {
            type: 'Point',
            coordinates: e.get('coords'),
          },
          properties: {
            iconContent: '',
          },
        },
        {
          preset: 'islands#blackStretchyIcon',
          draggable: true,
        }
      )
    );

    // Помещаем ГО на карту
    App.#map.geoObjects.add(App.#labels[App.#labels.length - 1]);
  }
}

const app = new App();
