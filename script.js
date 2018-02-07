var app = new Vue({
  el: '#app',
  data: {
    cards: [
    ]
  },
  methods: {
  	check: function (num) {
      //alert( typeof(num) );
      //alert(num);
  	  alert(this.cards[num]);// число берёт из массива объектор cards, больше 18 не примет, вернёт undefined
  	  //alert(this.cards[num].suit);
  	}
  }
});
/*var app2 = new Vue({
  el: '#app2',
  data: {
    allCards: [
    ]
  }
});*/

// all data
let allSuits = ['H', 'D', 'S', 'C']; // 4
let allNames = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A']; // 13
//let numb = 0;


// array for all cards
const suits = [];
const names = [];
const images = [];
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

//app.cards.push({ suit: app2.allCards[rand].suit, number: app2.allCards[rand].number, name: app2.allCards[rand].name, image: app2.allCards[rand].image });
//app.cards.push({ suit: app2.allCards[rand].suit, number: app2.allCards[rand].number, name: app2.allCards[rand].name, image: app2.allCards[rand].image });