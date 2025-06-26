// ...existing code...
const startBtn = document.getElementById("startBtn");
const counterDiv = document.getElementById("counter");
const gameDiv = document.getElementById("game");
const cardGrid = document.getElementById("cardGrid");
const correctSpan = document.getElementById("correct");
const wrongSpan = document.getElementById("wrong");

const symbols = ['🍎','🍌','🍒','🍇','🍉','🍓','🍑','🥝'];
let cards = [];
let flipped = [];
let matchedCount = 0;
let correctCount = 0;
let wrongCount = 0;

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  let count = 0;
  const interval = setInterval(() => {
    count++;
    counterDiv.textContent = `Loading... ${count}%`;
    if (count >= 100) {
      clearInterval(interval);
      counterDiv.style.display = 'none';
      startGame();
    }
  }, 30);
});

function startGame() {
  gameDiv.style.display = 'block';
  correctCount = 0;
  wrongCount = 0;
  matchedCount = 0;
  updateScore();

  const gameSymbols = [...symbols, ...symbols].sort(() => 0.5 - Math.random());
  cards = [];
  flipped = [];
  cardGrid.innerHTML = '';

  gameSymbols.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.textContent = '';
    card.addEventListener("click", flipCard);
    cardGrid.appendChild(card);
    cards.push(card);
  });
}

function flipCard(e) {
  const card = e.target;
  if (flipped.length < 2 && !card.classList.contains("flipped") && !card.classList.contains("matched")) {
    card.classList.add("flipped");
    card.textContent = card.dataset.symbol;
    flipped.push(card);

    if (flipped.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flipped;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCount += 2;
    correctCount++;
    updateScore();
    flipped = [];

    if (matchedCount === cards.length) {
      setTimeout(() => alert(`🎉 You won!\n✅ Correct Matches: ${correctCount}\n❌ Wrong Tries: ${wrongCount}`), 300);
    }
  } else {
    wrongCount++;
    updateScore();
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.textContent = '';
      card2.textContent = '';
      flipped = [];
    }, 1000);
  }
}

function updateScore() {
  correctSpan.textContent = correctCount;
  wrongSpan.textContent = wrongCount;
}
//