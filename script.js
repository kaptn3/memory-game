var start = new Vue({
  el: '#start',
  data: {
    show: true
  },
  methods: {
    startGame: function () {
      this.show = false;
      app.show = true;      
      setTimeout(hidden, 5000);
    }
  }
});

var app = new Vue({
  el: '#app',
  data: {
    cards: [],
    points: 0,
    show: false
  },
  methods: {
  	open: function (index, num) { 
    console.log(openCards); 
      if (openCards.length < 2) {  
        this.cards[index].image = images[num]; // открываем карту
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
    } 
  }
});
var finish = new Vue({
  el: '#finish',
  data: {
    show: false
  }
});

// all data
let openCards = []; // индексы открытых карт
let allSuits = ['H', 'D', 'S', 'C']; // 4
let allNames = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A']; // 13

// array for all cards
const suits = [];
const names = [];
const images = [];
const imgCloseCard = 'Cards/shirt.png'; // рубашка

// генерация всей колоды (52 карты)
for (let i = 0; i < 13; i++) {
	for (let k = 0; k < 4; k++) {
    suits.push(allSuits[k]);
    names.push(allNames[i]);
    images.push('Cards/' + allNames[i] + allSuits[k] + '.png');
	}	
}

// случайные 9 карт без повтора карты
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
  app.cards.push({ suit: suits[rands[z]], name: names[rands[z]], image: images[rands[z]], number: rands[z] });
}

function removeCards(index1, index2) {
  app.cards[index1].image = ''; // удаление карты
  app.cards[index2].image = '';
  openCards = []; // очистка
  // проверка на финиш   
  if (countCloseCard() == 0) {
    app.show = false;
    finish.show = true;
  }
}

// две непохожие карты закрываются
function closeCard(index1, index2) {
  app.cards[index1].image = imgCloseCard;
  app.cards[index2].image = imgCloseCard;
  openCards = [];
}

// рубашкой вверх 
function hidden() {
  for (let m = 0; m < app.cards.length; m++) {
    app.cards[m].image = imgCloseCard;    
  }
}

// количество закрытых карт для подсчёта очков
function countCloseCard() {
  let f = 0;
  for (let m = 0; m < app.cards.length; m++) {
    if (app.cards[m].image) {
      f++;
    }    
  }
  return f;
}

// todo не кликабельные при hidden

