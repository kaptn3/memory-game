var app = new Vue({
  el: '#app',
  data: {
    cards: [
    ]
  },
  methods: {
  	check: function (num) {
  	  //alert(this.cards[num].image);
  	  
  	}
  }
});
var app2 = new Vue({
  el: '#app2',
  data: {
    allCards: [
    ]
  }
});

let suits = ['H', 'D', 'S', 'C']; // 4
let names = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A']; // 13
numbers = -1;
for (let i = 0; i < 13; i++) {
	for (let k = 0; k < 4; k++) {
		numbers = numbers + 1;
		app2.allCards.push({ suit: suits[k], number: numbers, name: names[i], image: 'Cards/' + names[i] + suits[k] + '.png' })
	}	
}

// нужно случайные 9 карт
for (let l = 0; l < 9; l++) {
	let rand = Math.floor(Math.random() * (52 - 1 + 1)) + 1;
	app.cards.push(app2.allCards[rand]);
	app.cards.push(app2.allCards[rand]);
}