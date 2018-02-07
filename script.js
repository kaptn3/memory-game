var app = new Vue({
  el: '#app',
  data: {
    cards: []
  },
  methods: {
  	open: function (index, num) {
  	  this.cards[index].image = images[num]; // открываем карту
      if (openCards.length < 1) { 
        openCards.push(index);
        //console.log(openCards.length);
      } else if (openCards.length == 1) {        
        if (this.cards[openCards[0]].number == this.cards[index].number) {
          pointsUser.points = pointsUser.points + ( 42 * countCloseCard() );          
          setTimeout(removeCards, 800, openCards[0],index);
          openCards = [];
          console.log(openCards.length);
        } else {     
          pointsUser.points = pointsUser.points - ( 42 * ( 16 - countCloseCard() ) );    
          setTimeout(closeCard, 800, openCards[0], index);
          openCards = [];
        }
      }
  	}
  }
});
var pointsUser = new Vue({
  el: '#points',
  data: {
    points: 0
  }
});

// all data
let openCards = [];
//let points = 0;
let allSuits = ['H', 'D', 'S', 'C']; // 4
let allNames = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A']; // 13
//let numb = 0;


// array for all cards
const suits = [];
const names = [];
const images = [];
const imgCloseCard = 'Cards/shirt.png';
//const numbers = [];

for (let i = 0; i < 13; i++) {
	for (let k = 0; k < 4; k++) {
    suits.push(allSuits[k]);
    names.push(allNames[i]);
    images.push('Cards/' + allNames[i] + allSuits[k] + '.png');
		//app2.allCards.push({ suit: suits[k], number: numbers, name: names[i], image: 'Cards/' + names[i] + suits[k] + '.png' });
	}	
}

/*for (let j = 0; j < 52; j++) {
  numbers.push(j);
}
*/
// вывод всех карт
/*for (let x = 0; x < 52; x++) {
  app.cards.push({ suit: suits[x], name: names[x], image: images[x], });
}*/


// случайные 9 карт по паре в перемешку
let rands = [];

for (let l = 0; l < 9; l++) {
	let rand = Math.floor(Math.random() * (52 - 1 + 1)) + 1;
  rands.push(rand);
  rands.push(rand);	
}

function compareRandom() {
  return Math.random() - 0.5;
}

rands.sort(compareRandom); // перемешиваем индексы карт
for (z = 0; z < rands.length; z++) {
  app.cards.push({ id: z, suit: suits[rands[z]], name: names[rands[z]], image: images[rands[z]], number: rands[z], open: 0 });
}

function removeCards(index1, index2) {
  app.cards[index1].image = '';
  app.cards[index2].image = '';
}
function closeCard(index1, index2) {
  app.cards[index1].image = imgCloseCard;
  app.cards[index2].image = imgCloseCard;
}
function hidden() {
  for (let m = 0; m < app.cards.length; m++) {
    app.cards[m].image = imgCloseCard;    
  }
}

function countCloseCard() {
  let f = 0;
  for (let m = 0; m < app.cards.length; m++) {
    if (app.cards[m].image) {
      f++;
    }    
  }
  return f-2;
}

setTimeout(hidden, 2000);


//app.cards.push({ suit: app2.allCards[rand].suit, number: app2.allCards[rand].number, name: app2.allCards[rand].name, image: app2.allCards[rand].image });
//app.cards.push({ suit: app2.allCards[rand].suit, number: app2.allCards[rand].number, name: app2.allCards[rand].name, image: app2.allCards[rand].image });