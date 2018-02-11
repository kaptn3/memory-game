var app = new Vue({
  el: '#app',
  data: {
    cards: [],
    points: 0,
    show: 'none',
    isNoClick: false
  },
  methods: {
  	open: function (index, num) {
      if (openCards.length < 2) {  
        this.cards[index].image = deck[num].image; // открываем карту
        openCards.push(index); // индекс в открытые карты   
        if (openCards.length == 2) {    
          // защита от двойного клика
          if (openCards[0] == openCards[1]) {
            openCards = [index];
          } else if (this.cards[openCards[0]].number == this.cards[index].number) { // совпадение      
            setTimeout(removeCards, 800, openCards[0],index);               
            this.points = this.points + ( 42 * countCloseCard() );           
          } else {  // несовпадение
            setTimeout(closeCard, 800, openCards[0], index);  
            this.points = this.points - ( 42 * ( 18 - countCloseCard() ) );         
          }
        }
  	  } else {
        return false;
      } 
    },
    startGame: function () {
      play();   
    },
    anew: function () {
      this.show = 'none'; // плавное исчезновение
      setTimeout(play, 300); // появление    
    }
  }
});

// вспомогательные массивы
let count = 0; // число загруженных карт
let openCards = []; // индексы открытых карт
let suits = ['H', 'D', 'S', 'C']; // 4
let names = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A']; // 13
const imgCloseCard = 'img/cards/shirt.png'; // рубашка
const deck = []; // массив колоды
const load = document.querySelector('.preload');

// конструктор карты
function Card(numb) {
  this.number = numb;
  this.name = names[numb % 13];
  this.suit = suits[parseInt(numb / 13)];
  this.image = 'https://kaptn.ru/memory-game/img/cards/' + this.name + this.suit + '.png';
}

// генерация колоды
for (let i = 0; i < 52; i++) {
  deck.push(new Card(i));
}

// начало игры
function play() {
  load.style.display = 'flex';
  count = 0;
  app.show = 'game'; // появление игры
  // очистка данных, новая игра
  app.cards = [];
  app.points = 0;
  app.isNoClick = true // защита от клика при показе 
  openCards = [];

  // случайные номера 9-ти карт без повтора карты
  let rands = [];
  while (rands.length < 9) {
    let rand = Math.round( 0 - 0.5 + Math.random() * (51 - 0 + 1));
    let found = false; // нахождение повтора
    for (var i = 0; i < rands.length; i++) {
      if (rands[i] === rand){ 
       found = true;
       break;
      }
    }
    if (!found) { 
      rands.push(rand); 
    }
  }

  // добавление пары для каждой карты
  for (let i = 0; i < 9; i++) {
    rands.push(rands[i]);
  }

  // перемешивание карт
  function compareRandom() {
    return Math.random() - 0.5;
  }
  rands.sort(compareRandom); 

  // добавление случайных карт в игру
  for (z = 0; z < rands.length; z++) {
    let suit = deck[rands[z]].suit;
    let name = deck[rands[z]].name;
    let image = deck[rands[z]].image;
    let number = rands[z];
    app.cards.push({ number: number, suit: suit, name: name, image: image, remove: false });
  }
} // конец функции

function removeCards(index1, index2) {
  app.cards[index1].remove = true; // удаление карты
  app.cards[index2].remove = true;
  openCards = []; // очистка
  // проверка на финиш   
  if (countCloseCard() == 0) {
    app.show = 'finish';
  }
  console.log(countCloseCard());
}

// две непохожие карты закрываются
function closeCard(index1, index2) {
  app.cards[index1].image = imgCloseCard;
  app.cards[index2].image = imgCloseCard;
  openCards = [];
}

// рубашкой вверх 
function hidden() {
  console.log('go');
  if (count === app.cards.length) {
    for (let m = 0; m < app.cards.length; m++) {
      app.cards[m].image = imgCloseCard;  
      app.isNoClick = false; // отключение защиты от клика
    }
  }
}

// количество закрытых карт для подсчёта очков
function countCloseCard() {
  let count = 0;
  for (let m = 0; m < app.cards.length; m++) {
    if (app.cards[m].remove) {
      count++;
    }    
  }
  return (18 - count);
}

window.onload = function() {
  
  load.style.display = 'none';
  app.show = 'start'; // плавное появление
}

function imgLoad() {
  let cardImage = document.querySelectorAll('.card-image');
  count++;
  if (count === app.cards.length) {
    for (let i = 0; i < count; i++) {
      document.querySelector('.preload').style.display = 'none';
      cardImage[i].style.opacity = 1;   
    } 
    setTimeout(hidden, 5500); // после загрузки карт запускается игра, + 500ms из-за анимации
  }
}