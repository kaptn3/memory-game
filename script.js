var app = new Vue({
  el: '#app',
  data: {
    cards: []
  },
  methods: {
  	open: function (index, num) { 
    console.log(openCards); 
      if (openCards.length < 2) {  
        this.cards[index].image = images[num]; // открываем карту
        openCards.push(index);      
        if (openCards.length == 2) {    
          if (openCards[0] == openCards[1]) {
            openCards = [index];
          } else if (this.cards[openCards[0]].number == this.cards[index].number) {        
            setTimeout(removeCards, 800, openCards[0],index);               
            pointsUser.points = pointsUser.points + ( 42 * countCloseCard() );           
          } else {   
            setTimeout(closeCard, 800, openCards[0], index);  
            pointsUser.points = pointsUser.points - ( 42 * ( 18 - countCloseCard() ) );         
          }
        }
  	  } else {
        return false;
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
var finish = new Vue({
  el: '#finish',
  data: {
    show: false
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
let d = 0;
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
  app.cards.push({ suit: suits[rands[z]], name: names[rands[z]], image: images[rands[z]], number: rands[z] });
}

function removeCards(index1, index2) {
  app.cards[index1].image = '';
  app.cards[index2].image = '';
  openCards = [];  
  console.log(countCloseCard());     
  if (countCloseCard() == 0) {
    finish.show = true;
  }
}
function closeCard(index1, index2) {
  app.cards[index1].image = imgCloseCard;
  app.cards[index2].image = imgCloseCard;
  openCards = [];
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
  return f;
}

setTimeout(hidden, 1000);


//app.cards.push({ suit: app2.allCards[rand].suit, number: app2.allCards[rand].number, name: app2.allCards[rand].name, image: app2.allCards[rand].image });
//app.cards.push({ suit: app2.allCards[rand].suit, number: app2.allCards[rand].number, name: app2.allCards[rand].name, image: app2.allCards[rand].image });